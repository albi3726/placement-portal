/**
 * Company Aggregator Service
 * Extracts unique companies from job listings and syncs to MongoDB
 */

/**
 * Extract unique companies from jobs and save to CompanyName collection
 */
export async function syncCompaniesFromJobs(jobsDb, companiesDb) {
  try {
    console.log("🏢 Extracting companies from job listings...");
    
    const jobsCollection = jobsDb.collection("JobCenter");
    const companiesCollection = companiesDb.collection("CompanyName");

    // Get all jobs with company info
    const jobs = await jobsCollection.find({}, { 
      projection: { company: 1, location: 1, source: 1 } 
    }).toArray();

    if (jobs.length === 0) {
      console.log("⚠️ No jobs found to extract companies from");
      return {
        success: false,
        message: "No jobs available"
      };
    }

    // Group jobs by company to count openings
    const companyMap = new Map();
    
    jobs.forEach(job => {
      const companyName = job.company;
      
      if (companyMap.has(companyName)) {
        const existing = companyMap.get(companyName);
        existing.openPositions += 1;
      } else {
        companyMap.set(companyName, {
          name: companyName,
          location: job.location || "India",
          openPositions: 1,
          industry: guessIndustry(companyName),
          employees: "Not specified",
          description: `${companyName} is currently hiring through our placement portal.`,
          source: job.source || "Adzuna",
          lastUpdated: new Date()
        });
      }
    });

    const companies = Array.from(companyMap.values());
    console.log(`🏢 Found ${companies.length} unique companies`);

    // Insert or update companies in database
    const bulkOps = companies.map(company => ({
      updateOne: {
        filter: { name: company.name },
        update: { $set: company },
        upsert: true
      }
    }));

    const bulkResult = await companiesCollection.bulkWrite(bulkOps);

    console.log(`✅ Company sync complete! Inserted: ${bulkResult.upsertedCount}, Updated: ${bulkResult.modifiedCount}`);

    return {
      success: true,
      inserted: bulkResult.upsertedCount,
      updated: bulkResult.modifiedCount,
      total: companies.length
    };

  } catch (error) {
    console.error("❌ Company sync error:", error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Guess industry based on company name
 * This is a simple heuristic - you can enhance it
 */
function guessIndustry(companyName) {
  const name = companyName.toLowerCase();
  
  if (name.includes('tech') || name.includes('software') || name.includes('digital')) {
    return "Technology";
  } else if (name.includes('bank') || name.includes('finance') || name.includes('capital')) {
    return "Finance";
  } else if (name.includes('health') || name.includes('medical') || name.includes('pharma')) {
    return "Healthcare";
  } else if (name.includes('consult')) {
    return "Consulting";
  } else if (name.includes('retail') || name.includes('shop') || name.includes('store')) {
    return "Retail";
  } else if (name.includes('market') || name.includes('advertis')) {
    return "Marketing";
  } else if (name.includes('educat') || name.includes('university') || name.includes('school')) {
    return "Education";
  } else if (name.includes('telecom') || name.includes('network')) {
    return "Telecommunications";
  } else {
    return "Other";
  }
}

/**
 * Start automatic company sync (runs after job sync)
 */
export function startCompanyAutoSync(jobsDb, companiesDb) {
  console.log("🏢 Starting automatic company sync...");

  // Sync companies 5 minutes after server starts (to let jobs sync first)
  setTimeout(async () => {
    console.log("🏢 Running initial company sync...");
    const result = await syncCompaniesFromJobs(jobsDb, companiesDb);
    
    if (result.success) {
      console.log(`✅ Initial company sync completed! ${result.inserted} inserted, ${result.updated} updated`);
    } else {
      console.log(`⚠️ Initial company sync failed: ${result.error || result.message}`);
    }
  }, 5 * 60 * 1000); // 5 minutes

  // Sync companies every 24 hours (after job sync completes)
  setInterval(async () => {
    console.log("🏢 Auto-syncing companies...");
    const result = await syncCompaniesFromJobs(jobsDb, companiesDb);
    
    if (result.success) {
      console.log(`✅ Company sync completed! ${result.inserted} inserted, ${result.updated} updated`);
    } else {
      console.log(`⚠️ Company sync failed: ${result.error || result.message}`);
    }
  }, 24 * 60 * 60 * 1000); // Every 24 hours
}

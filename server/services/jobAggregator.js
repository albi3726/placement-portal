/**
 * Job Aggregator Service
 * Fetches jobs from Adzuna API and syncs to MongoDB
 */
import fetch from 'node-fetch';

// Adzuna API configuration
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;
const BASE_URL = "https://api.adzuna.com/v1/api/jobs/in/search";

/**
 * Fetch jobs from Adzuna API
 */
export async function fetchJobsFromAdzuna(options = {}) {
  try {
    const {
      query = "graduate",
      location = "bangalore",
      page = 1,
      resultsPerPage = 50
    } = options;

    console.log(`📡 Fetching jobs: "${query}" in ${location}...`);

    // Check if API credentials are set
    if (!ADZUNA_APP_ID || !ADZUNA_API_KEY) {
      throw new Error("❌ Adzuna API credentials are missing! Check your .env file.");
    }

    // Build API URL
    const params = new URLSearchParams({
      app_id: ADZUNA_APP_ID,
      app_key: ADZUNA_API_KEY,
      results_per_page: resultsPerPage.toString(),
      what: query,
      where: location,
      max_days_old: "30"
    });

    const url = `${BASE_URL}/${page}?${params}`;
    console.log(`🌐 API URL: ${url}`);

    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Adzuna API error (${response.status}):`, errorText);
      throw new Error(`Adzuna API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Fetched ${data.results?.length || 0} jobs from Adzuna`);

    if (!data.results || data.results.length === 0) {
      console.log("⚠️ No jobs found in API response");
      return {
        success: false,
        jobs: [],
        totalResults: 0
      };
    }

    // Transform Adzuna format to your format
    const transformedJobs = data.results.map(job => ({
      externalId: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name || location,
      salary: job.salary_min && job.salary_max 
        ? `₹${Math.round(job.salary_min * 85 / 12000)}k - ₹${Math.round(job.salary_max * 85 / 12000)}k/month`
        : "Not disclosed",
      type: job.contract_time === "full_time" ? "Full-time" : 
            job.contract_type === "permanent" ? "Full-time" : "Internship",
      experienceLevel: "Fresher",
      tags: job.category?.tag ? [job.category.tag] : [],
      description: job.description,
      requirements: [],
      benefits: [],
      postedAt: getRelativeTime(new Date(job.created)),
      deadline: null,
      applyUrl: job.redirect_url,
      source: "Adzuna",
      fetchedAt: new Date()
    }));

    console.log(`✅ Transformed ${transformedJobs.length} jobs`);

    return {
      success: true,
      jobs: transformedJobs,
      totalResults: data.count,
      page: page,
      hasMore: data.count > (page * resultsPerPage)
    };

  } catch (error) {
    console.error("❌ Adzuna fetch error:", error.message);
    console.error("Stack:", error.stack);
    return {
      success: false,
      error: error.message,
      jobs: []
    };
  }
}

/**
 * Sync jobs from Adzuna to MongoDB
 */
export async function syncJobsToDatabase(db, options = {}) {
  try {
    console.log(`💾 Starting sync to database...`);
    const jobsCollection = db.collection("JobCenter");

    // Fetch jobs from Adzuna
    const result = await fetchJobsFromAdzuna(options);

    if (!result.success || result.jobs.length === 0) {
      console.log(`⚠️ No jobs to sync: ${result.error || 'No jobs fetched'}`);
      return {
        success: false,
        message: result.error || "No jobs fetched from Adzuna"
      };
    }

    console.log(`💾 Syncing ${result.jobs.length} jobs to JobCenter collection...`);

    // Insert or update jobs in database
    const bulkOps = result.jobs.map(job => ({
      updateOne: {
        filter: { externalId: job.externalId },
        update: { $set: job },
        upsert: true
      }
    }));

    const bulkResult = await jobsCollection.bulkWrite(bulkOps);

    console.log(`✅ Sync complete! Inserted: ${bulkResult.upsertedCount}, Updated: ${bulkResult.modifiedCount}`);

    return {
      success: true,
      inserted: bulkResult.upsertedCount,
      updated: bulkResult.modifiedCount,
      total: result.jobs.length
    };

  } catch (error) {
    console.error("❌ Sync error:", error.message);
    console.error("Stack:", error.stack);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Schedule automatic job sync (run daily)
 */
export function startAutoSync(db) {
  console.log("🔄 Starting automatic job sync...");

  // Sync immediately on start
  console.log("🚀 Running initial sync...");
  syncJobsToDatabase(db, {
    query: "software developer",
    location: "bangalore"
  }).then(result => {
    if (result.success) {
      console.log(`✅ Initial sync completed! ${result.inserted} inserted, ${result.updated} updated`);
    } else {
      console.log(`⚠️ Initial sync failed: ${result.error || result.message}`);
    }
  }).catch(error => {
    console.error("❌ Initial sync error:", error);
  });

  // Sync every 24 hours
  setInterval(async () => {
    console.log("🔄 Auto-syncing jobs from Adzuna...");
    
    const cities = ["bangalore", "mumbai", "delhi", "hyderabad", "pune"];
    
    for (const city of cities) {
      console.log(`📍 Syncing jobs for ${city}...`);
      const result = await syncJobsToDatabase(db, {
        query: "software engineer",
        location: city
      });
      
      if (result.success) {
        console.log(`✅ ${city}: ${result.inserted} inserted, ${result.updated} updated`);
      } else {
        console.log(`⚠️ ${city}: Failed - ${result.error || result.message}`);
      }
      
      // Wait 2 seconds between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log("✅ Auto-sync completed!");
  }, 24 * 60 * 60 * 1000); // Every 24 hours
}

/**
 * Get relative time string
 */
function getRelativeTime(date) {
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}
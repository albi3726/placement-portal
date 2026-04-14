import express from "express";
import { getJobsDB } from "../config/db.js";
import { fetchJobsFromAdzuna, syncJobsToDatabase } from "../services/jobAggregator.js";

const router = express.Router();

// Manually trigger job sync from Adzuna
router.post("/sync-jobs", async (req, res) => {
  try {
    const { query, location, page } = req.body;

    const jobsDb = await getJobsDB();

    const result = await syncJobsToDatabase(jobsDb, {
      query: query || "intern fresher graduate",
      location: location || "bangalore",
      page: page || 1
    });

    if (result.success) {
      res.json({
        success: true,
        message: "Jobs synced successfully!",
        inserted: result.inserted,
        updated: result.updated,
        total: result.total
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || "Failed to sync jobs"
      });
    }

  } catch (error) {
    console.error("Sync jobs error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to sync jobs"
    });
  }
});

// Get job sync status/stats
router.get("/sync-stats", async (req, res) => {
  try {
    const jobsDb = await getJobsDB();
    const jobsCollection = jobsDb.collection("JobCenter");

    const stats = {
      totalJobs: await jobsCollection.countDocuments(),
      fresherJobs: await jobsCollection.countDocuments({
        experienceLevel: "Fresher"
      }),
      internships: await jobsCollection.countDocuments({
        type: "Internship"
      }),
      lastSyncedJobs: await jobsCollection
        .find()
        .sort({ fetchedAt: -1 })
        .limit(5)
        .toArray()
    };

    res.json({
      success: true,
      stats: stats
    });

  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get stats"
    });
  }
});

export default router;

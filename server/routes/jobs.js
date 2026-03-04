import express from "express";
import { getJobsDB } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const jobsDb = await getJobsDB();
    const jobsCollection = jobsDb.collection("JobCenter");
    const jobs = await jobsCollection.find({}).toArray();

    res.json({
      success: true,
      jobs: jobs
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch jobs"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const jobsDb = await getJobsDB();
    const jobsCollection = jobsDb.collection("jobs");
    const { ObjectId } = await import("mongodb");

    const job = await jobsCollection.findOne({ _id: new ObjectId(req.params.id) });

    if (!job) {
      return res.status(404).json({
        success: false,
        error: "Job not found"
      });
    }

    res.json({
      success: true,
      job: job
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch job"
    });
  }
});

export default router;

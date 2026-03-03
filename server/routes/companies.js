import express from "express";
import { getCompaniesDB } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const companiesDb = await getCompaniesDB();
    const companiesCollection = companiesDb.collection("companies");
    const companies = await companiesCollection.find({}).toArray();

    res.json({
      success: true,
      companies: companies
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch companies"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const companiesDb = await getCompaniesDB();
    const companiesCollection = companiesDb.collection("companies");
    const { ObjectId } = await import("mongodb");

    const company = await companiesCollection.findOne({ _id: new ObjectId(req.params.id) });

    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Company not found"
      });
    }

    res.json({
      success: true,
      company: company
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch company"
    });
  }
});

export default router;

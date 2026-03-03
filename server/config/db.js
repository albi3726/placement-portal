import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ MONGODB_URI is missing in .env file");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let studentDb;
let jobsDb;
let companiesDb;

export async function connectDB() {
  if (studentDb && jobsDb && companiesDb) {
    return { studentDb, jobsDb, companiesDb };
  }

  try {
    await client.connect();
    
    studentDb = client.db("Studentdb");
    jobsDb = client.db("JobApplication");
    companiesDb = client.db("Companies");
    
    console.log("✅ MongoDB connected to all databases");
    
    return { studentDb, jobsDb, companiesDb };
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

export async function getStudentDB() {
  if (!studentDb) {
    await connectDB();
  }
  return studentDb;
}

export async function getJobsDB() {
  if (!jobsDb) {
    await connectDB();
  }
  return jobsDb;
}

export async function getCompaniesDB() {
  if (!companiesDb) {
    await connectDB();
  }
  return companiesDb;
}

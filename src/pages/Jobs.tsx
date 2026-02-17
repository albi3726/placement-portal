import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import { Briefcase } from "lucide-react";

const jobs = [
  {
    title: "Software Engineer",
    company: "Google",
    location: "Bangalore, India",
    salary: "₹25-35 LPA",
    type: "Full-time",
    postedAt: "2 days ago",
    tags: ["React", "Node.js", "Cloud"],
  },
  {
    title: "Data Analyst",
    company: "Microsoft",
    location: "Hyderabad, India",
    salary: "₹18-25 LPA",
    type: "Full-time",
    postedAt: "3 days ago",
    tags: ["Python", "SQL", "Tableau"],
  },
  {
    title: "Product Manager Intern",
    company: "Amazon",
    location: "Mumbai, India",
    salary: "₹60K/month",
    type: "Internship",
    postedAt: "1 week ago",
    tags: ["Product", "Agile", "Strategy"],
  },
  {
    title: "UI/UX Designer",
    company: "Flipkart",
    location: "Bangalore, India",
    salary: "₹15-22 LPA",
    type: "Full-time",
    postedAt: "5 days ago",
    tags: ["Figma", "User Research", "Prototyping"],
  },
  {
    title: "Backend Developer",
    company: "Razorpay",
    location: "Bangalore, India",
    salary: "₹20-30 LPA",
    type: "Full-time",
    postedAt: "1 day ago",
    tags: ["Go", "PostgreSQL", "Microservices"],
  },
  {
    title: "Machine Learning Engineer",
    company: "Nvidia",
    location: "Pune, India",
    salary: "₹30-45 LPA",
    type: "Full-time",
    postedAt: "4 days ago",
    tags: ["Python", "TensorFlow", "Deep Learning"],
  },
];

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <section className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Job Opportunities
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse all available placement opportunities
          </p>
        </section>

        {/* Search Bar */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <SearchBar />
        </section>

        {/* Job Listings */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{jobs.length}</span> opportunities
            </p>
          </div>
          <div className="grid gap-4">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="animate-slide-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <JobCard {...job} />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-primary/10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Placement Portal</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2026 Placement Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Jobs;

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import { Briefcase, Loader2 } from "lucide-react";
import { fetchJobs } from "@/lib/api";

const Jobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then((data) => {
        if (data && data.length > 0) setJobs(data);
      })
      .catch(() => {
        console.log("Using fallback jobs data");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Job Opportunities
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse all available placement opportunities
          </p>
        </section>

        <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <SearchBar />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{jobs.length}</span> opportunities
            </p>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading opportunities...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Briefcase className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No opportunities available right now.</p>
            </div>
          ) : (
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
          )}
        </section>
      </main>

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

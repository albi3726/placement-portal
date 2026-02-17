import { Briefcase, Users, Building2, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import UpcomingEvents from "@/components/UpcomingEvents";

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
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome to Placement Portal
          </h1>
          <p className="text-muted-foreground text-lg">
            Find your dream placement opportunity today.
          </p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <StatsCard
              title="Open Positions"
              value="156"
              subtitle="Across 45 companies"
              icon={Briefcase}
              trend={{ value: 12, positive: true }}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <StatsCard
              title="Applications"
              value="12"
              subtitle="5 in review"
              icon={TrendingUp}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <StatsCard
              title="Companies Visiting"
              value="28"
              subtitle="This month"
              icon={Building2}
              trend={{ value: 8, positive: true }}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <StatsCard
              title="Students Placed"
              value="342"
              subtitle="This year"
              icon={Users}
            />
          </div>
        </section>

        {/* Search Bar */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <SearchBar />
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Latest Opportunities</h2>
              <a href="/jobs" className="text-primary font-medium hover:underline">
                View all →
              </a>
            </div>
            <div className="grid gap-4">
              {jobs.map((job, index) => (
                <div
                  key={index}
                  className="animate-slide-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <JobCard {...job} />
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <UpcomingEvents />
            </div>

            {/* Quick Links */}
            <div className="bg-card rounded-xl p-6 shadow-soft animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <h2 className="text-xl font-semibold text-foreground mb-4">Quick Links</h2>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block p-3 bg-background rounded-lg border border-primary/10 hover:border-primary/30 transition-colors text-foreground font-medium"
                >
                  📄 Update Resume
                </a>
                <a
                  href="#"
                  className="block p-3 bg-background rounded-lg border border-primary/10 hover:border-primary/30 transition-colors text-foreground font-medium"
                >
                  👤 Complete Profile
                </a>
                <a
                  href="#"
                  className="block p-3 bg-background rounded-lg border border-primary/10 hover:border-primary/30 transition-colors text-foreground font-medium"
                >
                  📊 View Analytics
                </a>
                <a
                  href="#"
                  className="block p-3 bg-background rounded-lg border border-primary/10 hover:border-primary/30 transition-colors text-foreground font-medium"
                >
                  📚 Preparation Resources
                </a>
              </div>
            </div>
          </aside>
        </div>
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

export default Index;

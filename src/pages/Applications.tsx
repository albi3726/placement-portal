import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const applications = [
  {
    jobTitle: "Software Engineer",
    company: "Google",
    appliedDate: "Jan 15, 2026",
    status: "interview",
    nextStep: "Technical Interview on Feb 10",
  },
  {
    jobTitle: "Data Analyst",
    company: "Microsoft",
    appliedDate: "Jan 12, 2026",
    status: "review",
    nextStep: "Application under review",
  },
  {
    jobTitle: "Product Manager Intern",
    company: "Amazon",
    appliedDate: "Jan 8, 2026",
    status: "accepted",
    nextStep: "Offer letter sent",
  },
  {
    jobTitle: "UI/UX Designer",
    company: "Flipkart",
    appliedDate: "Jan 5, 2026",
    status: "rejected",
    nextStep: "Position filled",
  },
  {
    jobTitle: "Backend Developer",
    company: "Razorpay",
    appliedDate: "Jan 20, 2026",
    status: "applied",
    nextStep: "Waiting for response",
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "applied":
      return { label: "Applied", icon: Clock, variant: "secondary" as const, className: "bg-muted text-muted-foreground" };
    case "review":
      return { label: "In Review", icon: Loader2, variant: "secondary" as const, className: "bg-accent text-primary" };
    case "interview":
      return { label: "Interview", icon: Calendar, variant: "secondary" as const, className: "bg-primary/20 text-primary" };
    case "accepted":
      return { label: "Accepted", icon: CheckCircle, variant: "secondary" as const, className: "bg-green-100 text-green-700" };
    case "rejected":
      return { label: "Rejected", icon: XCircle, variant: "secondary" as const, className: "bg-red-100 text-red-700" };
    default:
      return { label: "Unknown", icon: Clock, variant: "secondary" as const, className: "bg-muted text-muted-foreground" };
  }
};

const Applications = () => {
  const navigate = useNavigate();
  const stats = {
    total: applications.length,
    inProgress: applications.filter(a => ["applied", "review", "interview"].includes(a.status)).length,
    accepted: applications.filter(a => a.status === "accepted").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <section className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            My Applications
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your job application status
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-primary/10 shadow-soft animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Applied</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-primary/10 shadow-soft animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.inProgress}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-primary/10 shadow-soft animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.accepted}</p>
              <p className="text-sm text-muted-foreground">Accepted</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-primary/10 shadow-soft animate-slide-up" style={{ animationDelay: "0.25s" }}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">{stats.rejected}</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </section>

        {/* Applications List */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">All Applications</h2>
          <div className="space-y-4">
            {applications.map((application, index) => {
              const statusConfig = getStatusConfig(application.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <Card
                  key={index}
                  className="bg-card border-primary/10 shadow-soft hover:shadow-md transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {application.jobTitle}
                          </h3>
                          <p className="text-muted-foreground">{application.company}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Applied on {application.appliedDate}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-start md:items-end gap-2">
                        <Badge className={statusConfig.className}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {application.nextStep}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4 pt-4 border-t border-primary/10">
                      <Button variant="outline" size="sm" onClick={() => navigate("/jobs")}>
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        Withdraw
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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

export default Applications;

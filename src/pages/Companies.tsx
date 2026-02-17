import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Users, Briefcase } from "lucide-react";

const companies = [
  {
    name: "Google",
    industry: "Technology",
    location: "Bangalore, India",
    employees: "100,000+",
    openPositions: 5,
    description: "A multinational technology company specializing in Internet-related services and products.",
  },
  {
    name: "Microsoft",
    industry: "Technology",
    location: "Hyderabad, India",
    employees: "180,000+",
    openPositions: 3,
    description: "A global technology corporation that develops, manufactures, and supports software and services.",
  },
  {
    name: "Amazon",
    industry: "E-commerce & Cloud",
    location: "Mumbai, India",
    employees: "1,500,000+",
    openPositions: 8,
    description: "A multinational technology company focusing on e-commerce, cloud computing, and AI.",
  },
  {
    name: "Flipkart",
    industry: "E-commerce",
    location: "Bangalore, India",
    employees: "30,000+",
    openPositions: 4,
    description: "An Indian e-commerce company headquartered in Bangalore, Karnataka, India.",
  },
  {
    name: "Razorpay",
    industry: "Fintech",
    location: "Bangalore, India",
    employees: "3,000+",
    openPositions: 6,
    description: "A payment gateway platform that allows businesses to accept, process and disburse payments.",
  },
  {
    name: "Nvidia",
    industry: "Technology",
    location: "Pune, India",
    employees: "26,000+",
    openPositions: 2,
    description: "A multinational technology company designing graphics processing units and AI hardware.",
  },
];

const Companies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <section className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Partner Companies
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore companies hiring from our campus
          </p>
        </section>

        {/* Companies Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{companies.length}</span> companies actively hiring
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, index) => (
              <Card
                key={index}
                className="bg-card border-primary/10 shadow-soft hover:shadow-md transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-accent/50 text-primary">
                      {company.openPositions} openings
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {company.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {company.industry}
                  </p>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {company.description}
                  </p>
                  
                  <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{company.employees} employees</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    View Openings
                  </Button>
                </CardContent>
              </Card>
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

export default Companies;

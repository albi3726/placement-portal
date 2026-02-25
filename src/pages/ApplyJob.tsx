import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Briefcase, CheckCircle2, User, Mail, Phone, GraduationCap, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ApplyJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const job = location.state as { title: string; company: string } | null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    college: "",
    degree: "",
    graduationYear: "",
    cgpa: "",
    skills: "",
    experience: "",
    coverLetter: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Application Submitted!</h1>
          <p className="text-muted-foreground text-lg mb-2">
            Your application for <span className="font-semibold text-foreground">{job?.title}</span> at{" "}
            <span className="font-semibold text-foreground">{job?.company}</span> has been received.
          </p>
          <p className="text-muted-foreground mb-8">We'll notify you about updates via email.</p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/jobs")}>
              Browse More Jobs
            </Button>
            <Button onClick={() => navigate("/applications")}>
              View Applications
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Job Info Banner */}
        {job && (
          <div className="bg-card rounded-xl p-6 shadow-soft mb-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{job.title}</h1>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
          </div>
        )}

        {!job && (
          <Alert className="mb-8">
            <AlertDescription>No job selected. Please go back and select a job to apply.</AlertDescription>
          </Alert>
        )}

        {/* Application Form */}
        <div className="bg-card rounded-xl p-6 sm:p-8 shadow-soft">
          <h2 className="text-xl font-semibold text-foreground mb-6">Student Application Form</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@university.edu"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Details */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Academic Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="college">College / University</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="college"
                      placeholder="IIT Bombay"
                      value={formData.college}
                      onChange={(e) => handleChange("college", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Select onValueChange={(val) => handleChange("degree", val)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btech">B.Tech</SelectItem>
                      <SelectItem value="mtech">M.Tech</SelectItem>
                      <SelectItem value="bsc">B.Sc</SelectItem>
                      <SelectItem value="msc">M.Sc</SelectItem>
                      <SelectItem value="bca">BCA</SelectItem>
                      <SelectItem value="mca">MCA</SelectItem>
                      <SelectItem value="mba">MBA</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Select onValueChange={(val) => handleChange("graduationYear", val)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgpa">CGPA</Label>
                  <Input
                    id="cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="8.5"
                    value={formData.cgpa}
                    onChange={(e) => handleChange("cgpa", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Skills & Experience */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Skills & Experience
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Key Skills</Label>
                  <Input
                    id="skills"
                    placeholder="React, Python, SQL, Machine Learning..."
                    value={formData.skills}
                    onChange={(e) => handleChange("skills", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Relevant Experience</Label>
                  <Textarea
                    id="experience"
                    placeholder="Describe any internships, projects, or relevant work experience..."
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Cover Letter
              </h3>
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Why are you a good fit for this role?</Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Tell us why you're interested in this position and what makes you a great candidate..."
                  value={formData.coverLetter}
                  onChange={(e) => handleChange("coverLetter", e.target.value)}
                  rows={5}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={!job}>
                <FileText className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ApplyJob;

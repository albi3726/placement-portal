import { MapPin, Clock, DollarSign, Building2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedAt: string;
  tags: string[];
  logo?: string;
}

const JobCard = ({ title, company, location, salary, type, postedAt, tags, logo }: JobCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
          {logo ? (
            <img src={logo} alt={company} className="w-10 h-10 object-contain" />
          ) : (
            <Building2 className="w-7 h-7 text-foreground" />
          )}
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground font-medium">{company}</p>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Bookmark className="w-5 h-5" />
            </Button>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {location}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              {salary}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {postedAt}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="bg-secondary text-foreground">
              {type}
            </Badge>
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-primary/20 text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-6 pt-4 border-t border-primary/10">
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobCard;

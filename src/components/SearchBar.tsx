import { Search, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="bg-card rounded-xl p-4 shadow-soft">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Job Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for jobs, companies..."
            className="pl-10 bg-background border-primary/10 focus:border-primary"
          />
        </div>

        {/* Location */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Location"
            className="pl-10 bg-background border-primary/10 focus:border-primary"
          />
        </div>

        {/* Filter & Search */}
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="border-primary/20">
            <Filter className="w-5 h-5" />
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

import { Briefcase, Bell, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Placement Portal</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink 
              to="/" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/jobs" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Jobs
            </NavLink>
            <NavLink 
              to="/companies" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Companies
            </NavLink>
            <NavLink 
              to="/applications" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Applications
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{user?.name}</span>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary/10 animate-fade-in">
            <div className="flex flex-col gap-4">
              <NavLink to="/" className="text-muted-foreground" activeClassName="text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>
              <NavLink to="/jobs" className="text-muted-foreground" activeClassName="text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>Jobs</NavLink>
              <NavLink to="/companies" className="text-muted-foreground" activeClassName="text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>Companies</NavLink>
              <NavLink to="/applications" className="text-muted-foreground" activeClassName="text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>Applications</NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

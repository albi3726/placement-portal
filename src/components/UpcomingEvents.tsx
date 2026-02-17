import { Calendar, Clock, MapPin } from "lucide-react";

interface Event {
  id: number;
  title: string;
  company: string;
  date: string;
  time: string;
  location: string;
  type: "interview" | "workshop" | "deadline";
}

const events: Event[] = [
  {
    id: 1,
    title: "Technical Interview",
    company: "Google",
    date: "Feb 10, 2026",
    time: "10:00 AM",
    location: "Virtual",
    type: "interview",
  },
  {
    id: 2,
    title: "Resume Workshop",
    company: "Career Center",
    date: "Feb 12, 2026",
    time: "2:00 PM",
    location: "Room 301",
    type: "workshop",
  },
  {
    id: 3,
    title: "Application Deadline",
    company: "Microsoft",
    date: "Feb 15, 2026",
    time: "11:59 PM",
    location: "Online",
    type: "deadline",
  },
];

const typeStyles = {
  interview: "bg-blue-100 text-blue-700",
  workshop: "bg-green-100 text-green-700",
  deadline: "bg-amber-100 text-amber-700",
};

const UpcomingEvents = () => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 bg-background rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeStyles[event.type]}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.company}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {event.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {event.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;

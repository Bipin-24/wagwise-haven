import { Link } from "@tanstack/react-router";
import { Home, PawPrint, CalendarDays, Heart, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/services", label: "Services", icon: PawPrint },
  { to: "/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/community", label: "Community", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto flex max-w-lg">
        {items.map(({ to, label, icon: Icon, ...rest }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: "exact" in rest }}
              activeProps={{ className: "text-primary" }}
              className="flex min-h-14 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium text-muted-foreground transition-colors"
            >
              <Icon className="size-[22px]" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

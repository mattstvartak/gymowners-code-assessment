import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = memo(({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <label htmlFor="user-search" className="sr-only">
        Search users
      </label>
      <Search 
        className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" 
        aria-hidden="true"
      />
      <Input
        id="user-search"
        type="search"
        placeholder="Search by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
        aria-label="Search users by name or email"
      />
    </div>
  );
});

SearchBar.displayName = "SearchBar"; 
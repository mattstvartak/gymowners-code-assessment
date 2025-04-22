// SearchBar.tsx
// A reusable search input component with an integrated search icon
// Provides accessibility features and memoized performance optimization

import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Props interface for the SearchBar component
interface SearchBarProps {
  value: string;          // Current search input value
  onChange: (value: string) => void;  // Callback function for input changes
}

// Memoized SearchBar component to prevent unnecessary re-renders
export const SearchBar = memo(({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      {/* Hidden label for screen readers */}
      <label htmlFor="user-search" className="sr-only">
        Search users
      </label>
      {/* Search icon positioned absolutely within the input */}
      <Search 
        className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" 
        aria-hidden="true"
      />
      {/* Main search input with accessibility attributes */}
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

// Display name for debugging purposes
SearchBar.displayName = "SearchBar"; 
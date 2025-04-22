// RoleFilter.tsx
// Component for filtering users by their role
// Uses shadcn/ui Select component for consistent styling

import { memo, useMemo } from "react";
import { UserFilters } from "@/types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Props interface for the RoleFilter component
interface RoleFilterProps {
  value: UserFilters["role"];
  onChange: (value: UserFilters["role"]) => void;
}

// Type for role options
type RoleOption = {
  value: UserFilters["role"];
  label: string;
};

// Define role options outside component to prevent recreation
// Using as const for better type inference
const roleOptions: RoleOption[] = [
  { value: "all", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
] as const;

// Memoized component to prevent unnecessary rerenders
export const RoleFilter = memo(({ value, onChange }: RoleFilterProps) => {
  // Memoize options to prevent unnecessary rerenders
  const options = useMemo(() => roleOptions, []);

  return (
    <div>
      <label htmlFor="role-filter" className="sr-only">
        Filter by role
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="role-filter" className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              aria-label={`Filter by ${option.label}`}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

// Set display name for better debugging
RoleFilter.displayName = "RoleFilter"; 
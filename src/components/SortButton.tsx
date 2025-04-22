// SortButton.tsx
// Reusable component for sort buttons in the user directory
// Handles both ascending and descending states with visual indicators

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface SortButtonProps {
  label: string;
  isActive: boolean;
  isDesc: boolean;
  onClick: () => void;
}

export const SortButton = memo(({ 
  label, 
  isActive, 
  isDesc, 
  onClick 
}: SortButtonProps) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onClick}
    className={isActive ? "bg-accent" : ""}
  >
    {label}
    <ArrowUp className={`ml-2 h-4 w-4 transition-transform ${
      isActive ? (isDesc ? "rotate-0" : "rotate-180") : "rotate-180"
    }`} />
  </Button>
));

SortButton.displayName = "SortButton"; 
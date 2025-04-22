// UserCard.tsx
// A reusable card component for displaying user information
// Includes role-based styling and memoized performance optimization

import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, UserRole } from "@/types/user";

// Props interface for the UserCard component
interface UserCardProps {
  user: User;  // User object containing name, email, and role
}

// Color mapping for different user roles
// Uses Tailwind CSS classes for consistent styling
const roleColors: Record<UserRole, string> = {
  admin: "bg-red-100 text-red-800",   // Red theme for admin role
  editor: "bg-blue-100 text-blue-800", // Blue theme for editor role
  viewer: "bg-green-100 text-green-800", // Green theme for viewer role
};

// Memoized UserCard component to prevent unnecessary re-renders
export const UserCard = memo(({ user }: UserCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{user.name}</span>
          {/* Role badge with dynamic color based on user role */}
          <Badge className={roleColors[user.role]}>{user.role}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{user.email}</p>
      </CardContent>
    </Card>
  );
});

// Display name for debugging purposes
UserCard.displayName = "UserCard"; 
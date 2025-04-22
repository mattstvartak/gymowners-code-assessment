import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, UserRole } from "@/types/user";

interface UserCardProps {
  user: User;
}

const roleColors: Record<UserRole, string> = {
  admin: "bg-red-100 text-red-800",
  editor: "bg-blue-100 text-blue-800",
  viewer: "bg-green-100 text-green-800",
};

export const UserCard = memo(({ user }: UserCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{user.name}</span>
          <Badge className={roleColors[user.role]}>{user.role}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{user.email}</p>
      </CardContent>
    </Card>
  );
});

UserCard.displayName = "UserCard"; 
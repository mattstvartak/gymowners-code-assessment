// UserDirectory.tsx
// Main component for displaying and managing the user directory
// Includes search, filtering, and sorting functionality

import { useState, useMemo, useEffect, useCallback } from "react";
import { User, UserFilters } from "@/types/user";
import { SearchBar } from "./SearchBar";
import { RoleFilter } from "./RoleFilter";
import { SortButton } from "./SortButton";
import { Loader2 } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { users } from "@/data/users";

export const UserDirectory = () => {
  // State management
  const [filters, setFilters] = useState<UserFilters>({
    search: "",
    role: "all",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([{ id: "name", desc: false }]);

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Table column definitions
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
    ],
    []
  );

  // Filter users based on search and role
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesRole = filters.role === "all" || user.role === filters.role;
      return matchesSearch && matchesRole;
    });
  }, [filters]);

  // Sort filtered users
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a: User, b: User) => {
      if (sorting[0]?.id === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sorting[0]?.id === "role") {
        return a.role.localeCompare(b.role);
      }
      return 0;
    });
  }, [filteredUsers, sorting]);

  // Initialize table with data and configuration
  const table = useReactTable({
    data: sortedUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  // Event handlers
  const handleSearchChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  }, []);

  const handleRoleChange = useCallback((value: UserFilters["role"]) => {
    setFilters((prev) => ({ ...prev, role: value }));
  }, []);

  const handleNameSort = useCallback(() => {
    const currentSort = sorting[0];
    if (currentSort?.id === "name") {
      setSorting([{ id: "name", desc: !currentSort.desc }]);
    } else {
      setSorting([{ id: "name", desc: false }]);
    }
  }, [sorting]);

  const handleRoleSort = useCallback(() => {
    const currentSort = sorting[0];
    if (currentSort?.id === "role") {
      setSorting([{ id: "role", desc: !currentSort.desc }]);
    } else {
      setSorting([{ id: "role", desc: false }]);
    }
  }, [sorting]);

  // Loading state
  if (isLoading) {
    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center"
        role="status"
        aria-label="Loading user directory"
      >
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">Loading user directory...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with search and filters */}
      <header className="sticky top-0 z-[50] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-foreground">User Directory</h1>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="w-full sm:max-w-md">
                  <SearchBar value={filters.search} onChange={handleSearchChange} />
                </div>
                <div className="w-full sm:w-[180px]">
                  <RoleFilter value={filters.role} onChange={handleRoleChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1">
        <div className="h-full px-4 py-8 sm:px-6 lg:px-8">
          {/* Sort controls */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-foreground">Sort by:</span>
            <SortButton
              label="Name"
              isActive={sorting[0]?.id === "name"}
              isDesc={sorting[0]?.id === "name" && sorting[0]?.desc}
              onClick={handleNameSort}
            />
            <SortButton
              label="Role"
              isActive={sorting[0]?.id === "role"}
              isDesc={sorting[0]?.id === "role" && sorting[0]?.desc}
              onClick={handleRoleSort}
            />
          </div>

          {/* User cards grid */}
          <div 
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            role="list"
            aria-label="User list"
          >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <div
                  key={row.id}
                  className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
                  role="listitem"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{row.getValue("name")}</h3>
                      <span 
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          row.getValue("role") === "admin" 
                            ? "bg-red-100 text-red-800" 
                            : row.getValue("role") === "editor" 
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                        role="status"
                      >
                        {row.getValue("role")}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">
                      {row.getValue("email")}
                    </p>
                    <p className="text-xs text-foreground">
                      ID: {row.getValue("id")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div 
                className="col-span-full text-center text-foreground"
                role="status"
                aria-live="polite"
              >
                No users found matching your criteria
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}; 
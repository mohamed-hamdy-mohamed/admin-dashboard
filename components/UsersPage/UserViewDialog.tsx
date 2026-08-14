"use client";

import { User } from "@/types/users";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserRoleBadge from "./UserRoleBadge";

interface UserViewDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
};

const UserViewDialog = ({ user, open, onOpenChange }: UserViewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {user && (
          <>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Read-only profile information for this user.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border shadow-sm">
                <AvatarImage src={user.image} alt={user.username} />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div>
                  <p className="text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
                <UserRoleBadge role={user.role} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem label="Email" value={user.email} />
              <DetailItem label="Phone" value={user.phone} />
              <DetailItem label="Age" value={`${user.age} yrs`} />
              <DetailItem label="Gender" value={user.gender} />
              <DetailItem label="Company" value={user.company.name} />
              <DetailItem label="Job Title" value={user.company.title} />
              <DetailItem label="Country" value={user.address.country} />
              <DetailItem label="City" value={user.address.city} />
              <DetailItem label="University" value={user.university} />
              <DetailItem label="Department" value={user.company.department} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserViewDialog;

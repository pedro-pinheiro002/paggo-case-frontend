import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { User } from "@/types/types";
import { LogOut } from "lucide-react";

interface ProfileProps {
  user: User;
  handleLogOut: () => void;
}

export function Profile({ user, handleLogOut }: ProfileProps) {
  return (
    <div className="absolute top-3 left-3 text-slate-50 flex gap-4 items-center">
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage src={user.picture} />
          <AvatarFallback>Profile Pic</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          Olá {user.given_name}!
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
      </div>
      <Toggle onClick={handleLogOut} size="sm">
        <LogOut />
      </Toggle>
    </div>
  );
}

import { CalendarDaysIcon, MailIcon, User } from "lucide-react";
import { useAuth } from "@/context";
import { Separator } from "./ui/separator";
import { parseDate } from "@/utils/paresDate";
import Signout from "./Signout";

function UserInfo() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-6 m-5 md:w-[40%]">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">User Info</h3>
        <Separator />
        <div className="grid gap-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <MailIcon className="h-5 w-5" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5" />
            <span>Joined {parseDate(user.createdAt)}</span>
          </div>
        </div>
      </div>
      <Signout />
    </div>
  );
}

export default UserInfo;

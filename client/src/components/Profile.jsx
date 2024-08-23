import { Separator } from "./ui/separator";
import UserBlogs from "./UserBlogs";
import UserInfo from "./UserInfo";

function Profile() {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row justify-between gap-6 w-full">
        <UserBlogs />
        <Separator className="md:hidden bg-gray-300" />
        <UserInfo />
      </div>
    </div>
  );
}

export default Profile;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC, useEffect } from "react";
import UserMapCard from "./UserMapCard";
import { useTriggerUserStore } from "@/store/useTriggerUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import { handleGetAllTriggerUserMaps } from "@/api/handlers/triggerusermap";

interface UserMapsContainerProps {}
const UserMapsContainer: FC<UserMapsContainerProps> = () => {
  const { users, triggers, setTriggerUserMaps } = useTriggerUserStore();
  const me = useAuthStore((s) => s.user);

  useEffect(() => {
    handleGetAllTriggerUserMaps().then((res) =>
      setTriggerUserMaps(res.data.data!)
    );
  }, [me]);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Assign Triggers to Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users?.map((user) => (
            <UserMapCard user={user} triggers={triggers} key={user.username} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserMapsContainer;

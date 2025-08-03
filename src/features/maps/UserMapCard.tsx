import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC } from "react";
import UserMapCardMap from "./UserMapCardMap";
import { DisplayUserDto } from "@/api/dtos/aaa/display-user.dto";
import { DisplayTriggerDto } from "@/api/dtos/trigger/display-trigger.dto";
import { useUserMapsToggle } from "./userMapsHooks";

interface UserMapCardProps {
  user: DisplayUserDto;
  triggers?: DisplayTriggerDto[];
}
const UserMapCard: FC<UserMapCardProps> = ({ user, triggers }) => {
  const userMapsToggleHook = useUserMapsToggle();

  return (
    <Card key={user.id}>
      <CardHeader>
        <CardTitle className="text-lg">{user.username}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {triggers?.map((trigger) => (
          <UserMapCardMap
            trigger={trigger}
            user={user}
            userMapsToggleHook={userMapsToggleHook}
            key={user.username + trigger.id}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default UserMapCard;

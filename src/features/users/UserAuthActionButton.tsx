import { DisplayUserDto } from "@/api/dtos/aaa/display-user.dto";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface UserAuthActionButtonProps {
  user: DisplayUserDto;
  currentUserId?: number;
  onLogin: (username: string) => void;
  onLogout: () => void;
}
const UserAuthActionButton: FC<UserAuthActionButtonProps> = ({
  onLogin,
  onLogout,
  user,
  currentUserId,
}) => {
  if (currentUserId == user.id)
    return (
      <Button size="sm" variant={"destructive"} onClick={onLogout}>
        Sign Out
      </Button>
    );

  return (
    <Button
      size="sm"
      disabled={currentUserId ? true : false}
      onClick={() => onLogin(user.username)}
    >
      Sign In
    </Button>
  );
};

export default UserAuthActionButton;

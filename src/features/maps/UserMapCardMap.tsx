import { FC } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DisplayUserDto } from "@/api/dtos/aaa/display-user.dto";
import { DisplayTriggerDto } from "@/api/dtos/trigger/display-trigger.dto";
import { UserMapToggleHookReturn, useUserMapsToggle } from "./userMapsHooks";
import { Loader2 } from "lucide-react";

interface UserMapCardMapProps {
  trigger: DisplayTriggerDto;
  user: DisplayUserDto;
  userMapsToggleHook: UserMapToggleHookReturn;
}

const UserMapCardMap: FC<UserMapCardMapProps> = ({
  trigger,
  user,
  userMapsToggleHook,
}) => {
  const { isChecked, toggleTriggerAssignment, isLoading } = userMapsToggleHook;
  const checkboxId = `map-${user.id}-${trigger.id}`;
  const loading = isLoading(user.id, trigger.id);
  return (
    <div
      className={`flex items-center justify-between cursor-pointer gap-2 py-2 px-3 rounded-md hover:bg-muted transition-colors 
          ${loading && "bg-muted"}`}
      onClick={() => toggleTriggerAssignment(user.id, trigger.id)}
    >
      <div className="flex items-center gap-2">
        <Checkbox
          id={checkboxId}
          disabled={loading}
          checked={isChecked(user.id, trigger.id)}
          onCheckedChange={() => toggleTriggerAssignment(user.id, trigger.id)}
        />
        <label htmlFor={checkboxId} className="text-sm font-medium">
          {trigger.name}
        </label>
      </div>
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};

export default UserMapCardMap;

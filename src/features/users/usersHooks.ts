import { useAuthStore } from "@/store/useAuthStore";
import { handleBackdoorLoginUser, handleLogOutUser } from "@/api/handlers/aaa";
import { toast } from "sonner";
import axios from "@/api/handlers/axios/axios-instance";
import { useTriggerUserStore } from "@/store/useTriggerUserStore";
import { DisplayTriggerUserMapDto } from "@/api/dtos/trigger-user-map/display-trigger-user-map.dto";
import { useMemo } from "react";

export function useLogin() {
  const login = useAuthStore((s) => s.login);

  return async (username: string) => {
    const response = await handleBackdoorLoginUser({ username });
    const { success, data, message } = response.data;

    if (success && data) {
      login(data.user);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;
      toast.message("You logged in successfully");
    } else {
      toast.error(message);
    }
  };
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const setNotifications = useTriggerUserStore((s) => s.setNotifications);

  return async () => {
    try {
      const res = await handleLogOutUser();
      if (res.data.success) {
        setNotifications([]);
        logout();
        toast.message("You signed out successfully");
      } else {
        toast.error("Something went wrong: " + res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong: " + err);
    }
  };
}

export function useMapsCountByUser(
  triggerUserMaps: DisplayTriggerUserMapDto[] = []
) {
  return useMemo(() => {
    const counts: Record<number, number> = {};
    for (const map of triggerUserMaps) {
      counts[map.user_id] = (counts[map.user_id] || 0) + 1;
    }
    return counts;
  }, [triggerUserMaps]);
}

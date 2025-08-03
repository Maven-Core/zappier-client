import {
  handleCreateTriggerMap,
  handleDeleteTriggerMap,
} from "@/api/handlers/triggerusermap";
import { useTriggerUserStore } from "@/store/useTriggerUserStore";
import { useState } from "react";
import { toast } from "sonner";

export function useUserMapsToggle() {
  const [loadingMap, setLoadingMap] = useState<Set<string>>(new Set());

  const { users, triggerUserMaps, deleteTriggerUserMap, addTriggerUserMap } =
    useTriggerUserStore();

  const isLoading = (userId: number, triggerId: number) =>
    loadingMap.has(getMapKey(userId, triggerId));

  const getMapKey = (userId: number, triggerId: number) =>
    `map-${userId}-${triggerId}`;

  const toggleTriggerAssignment = async (userId: number, triggerId: number) => {
    const key = getMapKey(userId, triggerId);
    const user = users?.find((u) => u.id === userId);
    if (!user) return toast.error("User not found.");

    setLoadingMap((prev) => new Set(prev).add(key));

    try {
      const existingMapping = triggerUserMaps.find(
        (m) => m.user_id === userId && m.trigger_id === triggerId
      );

      if (existingMapping) {
        await handleDeleteTriggerMap(existingMapping.id);
        deleteTriggerUserMap(existingMapping.id);
        toast.success("Removed from trigger.");
      } else {
        const response = await handleCreateTriggerMap({
          trigger_id: triggerId,
          user_id: userId,
        });

        const { success, data, message } = response.data;
        if (!success || !data) throw new Error(message);

        await new Promise((res) => setTimeout(res, 1000));
        addTriggerUserMap(data);
        toast.success("Added to trigger.");
      }
    } catch (err: any) {
      toast.error("Something went wrong: " + (err.message || "Unknown error."));
    } finally {
      setLoadingMap((prev) => {
        const updated = new Set(prev);
        updated.delete(key);
        return updated;
      });
    }
  };

  const isChecked = (userId: number, triggerId: number) =>
    triggerUserMaps.some(
      (map) => map.user_id === userId && map.trigger_id === triggerId
    );

  return {
    toggleTriggerAssignment,
    isChecked,
    isLoading,
  };
}

export type UserMapToggleHookReturn = ReturnType<typeof useUserMapsToggle>;

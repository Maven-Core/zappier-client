"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { DisplayTriggerUserMapDto } from "@/api/dtos/trigger-user-map/display-trigger-user-map.dto";
import {
  handleCreateTriggerMap,
  handleDeleteTriggerMap,
  handleGetAllTriggerUserMaps,
} from "@/api/handlers/triggerusermap";
import { toast } from "sonner"; // make sure this is correctly imported
import { useTriggerUserStore } from "@/store/useTriggerUserStore";

interface TriggerUserMapProps {}
const TriggerUserMap: React.FC = () => {
  const {
    users,
    triggers,
    triggerUserMaps,
    setTriggerUserMaps,
    addTriggerUserMap,
    deleteTriggerUserMap,
  } = useTriggerUserStore();

  useEffect(() => {
    handleGetAllTriggerUserMaps().then((res) => setTriggerUserMaps(res.data));
  }, [setTriggerUserMaps]);

  const newToggleMap = async (
    e: React.MouseEvent<HTMLElement>,
    user_id: number,
    trigger_id: number
  ) => {
    e.preventDefault();

    const user = users?.find((u) => u.id === user_id);
    if (!user) {
      toast.error("User not found.");
      return;
    }

    // Check if mapping exists in Zustand store
    const existingMap = triggerUserMaps.find(
      (tm) => tm.user_id === user_id && tm.trigger_id === trigger_id
    );

    try {
      if (existingMap) {
        await handleDeleteTriggerMap(existingMap.id);
        deleteTriggerUserMap(existingMap.id);
        toast.success("Removed from trigger.");
      } else {
        // Create new map with temp ID (replace with real ID from API if available)
        const newMap = {
          id: Date.now(),
          user_id,
          trigger_id,
          assigned_at: new Date(),
          user,
          trigger: triggers.find((t) => t.id === trigger_id)!,
        };
        await handleCreateTriggerMap({ trigger_id, user_id });
        addTriggerUserMap(newMap);
        toast.success("Added to trigger.");
      }
    } catch (err) {
      toast.error(
        "Something went wrong: " + (err as Error).message || "Unknown error."
      );
    }
  };

  // Utility to check if user has trigger assigned
  const isChecked = (user_id: number, trigger_id: number) =>
    triggerUserMaps.some(
      (tm) => tm.user_id === user_id && tm.trigger_id === trigger_id
    );

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Assign Triggers to Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users?.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle className="text-lg">{user.username}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {triggers?.map((trigger) => (
                  <div key={trigger.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`map-${user.id}-${trigger.id}`}
                      checked={isChecked(user.id, trigger.id)}
                      onCheckedChange={(checked) =>
                        newToggleMap(
                          // workaround: create fake event to satisfy signature
                          {
                            preventDefault: () => {},
                          } as React.MouseEvent<HTMLElement>,
                          user.id,
                          trigger.id
                        )
                      }
                    />
                    <label
                      htmlFor={`map-${user.id}-${trigger.id}`}
                      className="text-sm"
                    >
                      {trigger.name}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TriggerUserMap;

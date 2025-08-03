"use client";
import React, { useEffect } from "react";
import { handleGetAllUsers, handleGetMe } from "@/api/handlers/aaa";
import Users from "@/components/dashboard/Users";
import Triggers from "@/components/dashboard/Triggers";
import TriggerUserMap from "@/components/dashboard/TriggerUserMap";
import Notifications from "@/components/dashboard/Notifications";
import { handleGetAllTriggers } from "@/api/handlers/trigger";
import {
  handleGetAllNotifications,
  handleGetUserNotifications,
} from "@/api/handlers/notification";
import { useTriggerUserStore } from "@/store/useTriggerUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export default function HomePage() {
  const {
    setUsers,

    setTriggers,

    setNotifications,
  } = useTriggerUserStore();
  const { login } = useAuthStore();
  useEffect(() => {
    try {
      handleGetMe()
        .then((res) => {
          if (res.data) {
            login(res.data);
            handleGetUserNotifications(res.data.id).then((res) =>
              setNotifications(res.data.data!)
            );
          }
        })
        .catch((reason) => {
          toast.error("You aren't logged in");
          handleGetAllNotifications().then((res) =>
            setNotifications(res.data.data!)
          );
        });
    } catch (error) {
      console.log(error);
    }
    handleGetAllUsers().then((res) => setUsers(res.data.data!));
    handleGetAllTriggers().then((res) => setTriggers(res.data.data!));
  }, []);

  return (
    <div className="p-4 md:p-6 grid grid-cols-1 gap-2 md:gap-6 lg:grid-cols-2 w-full max-w-screen-2xl mx-auto">
      {/* Users Section */}
      <Users />

      {/* Triggers Section */}
      <Triggers />

      {/* Trigger-User Map Section */}
      <TriggerUserMap />

      {/* Notifications Section */}
      <Notifications />
    </div>
  );
}

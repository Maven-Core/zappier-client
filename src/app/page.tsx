"use client";
import React, { useEffect } from "react";
import { handleGetAllUsers } from "@/api/handlers/aaa";
import Users from "@/components/dashboard/Users";
import Triggers from "@/components/dashboard/Triggers";
import TriggerUserMap from "@/components/dashboard/TriggerUserMap";
import Notifications from "@/components/dashboard/Notifications";
import { handleGetAllTriggers } from "@/api/handlers/trigger";
import { handleGetAllNotifications } from "@/api/handlers/notification";
import { useTriggerUserStore } from "@/store/useTriggerUserStore";

export default function HomePage() {
  const {
    setUsers,

    setTriggers,

    setNotifications,
  } = useTriggerUserStore();

  // Replacing addTrigger with setTriggers

  // markRead uses updateNotification action from store

  useEffect(() => {
    handleGetAllUsers().then((res) => setUsers(res.data));
    handleGetAllTriggers().then((res) => setTriggers(res.data));
    handleGetAllNotifications().then((res) => setNotifications(res.data));
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

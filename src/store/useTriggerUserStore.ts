// stores/useTriggerUserStore.ts
import { DisplayUserDto } from "@/api/dtos/aaa/display-user.dto";
import { DisplayNotificationDto } from "@/api/dtos/notification/display-notification.dto";
import { DisplayTriggerUserMapDto } from "@/api/dtos/trigger-user-map/display-trigger-user-map.dto";
import { DisplayTriggerDto } from "@/api/dtos/trigger/display-trigger.dto";
import { create } from "zustand";

type TriggerUserState = {
  // State
  users: DisplayUserDto[];
  triggers: DisplayTriggerDto[];
  triggerUserMaps: DisplayTriggerUserMapDto[];
  notifications: DisplayNotificationDto[];

  // Setters
  setUsers: (users: DisplayUserDto[]) => void;
  setTriggers: (triggers: DisplayTriggerDto[]) => void;
  setTriggerUserMaps: (map: DisplayTriggerUserMapDto[]) => void;
  setNotifications: (notifs: DisplayNotificationDto[]) => void;

  // User Actions
  updateUser: (updated: DisplayUserDto) => void;
  deleteUser: (id: number) => void;

  // Trigger Actions
  updateTrigger: (updated: DisplayTriggerDto) => void;
  deleteTrigger: (id: number) => void;

  // Notification Actions
  updateNotification: (updated: DisplayNotificationDto) => void;
  deleteNotification: (id: number) => void;
  markNotificationAsRead: (id: number) => void;

  // Map Actions
  addTriggerUserMap: (map: DisplayTriggerUserMapDto) => void;
  deleteTriggerUserMap: (id: number) => void;
  updateTriggerUserMap: (updated: DisplayTriggerUserMapDto) => void;
};

export const useTriggerUserStore = create<TriggerUserState>((set, get) => ({
  // Initial state
  users: [],
  triggers: [],
  triggerUserMaps: [],
  notifications: [],

  // ───── Setters ─────
  setUsers: (users) => set({ users }),
  setTriggers: (triggers) => set({ triggers }),
  setTriggerUserMaps: (maps) => set({ triggerUserMaps: maps }),
  setNotifications: (notifications) => set({ notifications }),

  // ───── Users ─────
  updateUser: (updated) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === updated.id ? updated : u)),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),

  // ───── Triggers ─────
  updateTrigger: (updated) =>
    set((state) => ({
      triggers: state.triggers.map((t) => (t.id === updated.id ? updated : t)),
    })),

  deleteTrigger: (id) =>
    set((state) => ({
      triggers: state.triggers.filter((t) => t.id !== id),
    })),

  // ───── Notifications ─────
  updateNotification: (updated) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === updated.id ? updated : n
      ),
    })),

  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      ),
    })),

  // ───── Map ─────
  addTriggerUserMap: (map) =>
    set((state) => ({
      triggerUserMaps: [...state.triggerUserMaps, map],
    })),

  deleteTriggerUserMap: (id) =>
    set((state) => ({
      triggerUserMaps: state.triggerUserMaps.filter((m) => m.id !== id),
    })),

  updateTriggerUserMap: (updated) =>
    set((state) => ({
      triggerUserMaps: state.triggerUserMaps.map((m) =>
        m.id === updated.id ? updated : m
      ),
    })),
}));

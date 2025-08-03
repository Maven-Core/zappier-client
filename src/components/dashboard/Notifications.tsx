import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { DisplayNotificationDto } from "@/api/dtos/notification/display-notification.dto";
import { useTriggerUserStore } from "@/store/useTriggerUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import {
  handleGetAllNotifications,
  handleGetUserNotifications,
} from "@/api/handlers/notification";
import { toast } from "sonner";

interface NotificationsProps {}
const Notifications: React.FC<NotificationsProps> = ({}) => {
  const { notifications, markNotificationAsRead, setNotifications } =
    useTriggerUserStore();
  const { user } = useAuthStore();

  const markRead = (id: number) => {
    markNotificationAsRead(id);
  };

  useEffect(() => {
    if (!user)
      handleGetAllNotifications()
        .then((res) => setNotifications(res.data.data!))
        .catch((reason) =>
          toast.error(`Couldn't get notifications: ${reason}`)
        );
    else {
      handleGetUserNotifications(user.id)
        .then((res) => setNotifications(res.data.data!))
        .catch((reason) =>
          toast.error(`Couldn't get notifications: ${reason}`)
        );
    }
  }, [user]);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Trigger ID</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Meta</TableHead>
                <TableHead>Read</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications?.map((n) => (
                <TableRow
                  key={n.id}
                  className={!n.is_read ? "bg-gray-100" : ""}
                >
                  <TableCell className="whitespace-nowrap">
                    {n.user_id}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {n.trigger_id}
                  </TableCell>
                  <TableCell className="min-w-[200px]">{n.message}</TableCell>
                  <TableCell className="min-w-[150px] max-w-[200px] truncate">
                    {JSON.stringify(n.metadata)}
                  </TableCell>
                  <TableCell>{n.is_read ? "Yes" : "No"}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(n.created_at).toDateString()}
                  </TableCell>
                  <TableCell>
                    {!n.is_read && (
                      <Button size="sm" onClick={() => markRead(n.id)}>
                        Mark Read
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Notifications;

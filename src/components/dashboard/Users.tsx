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
import { useTriggerUserStore } from "@/store/useTriggerUserStore";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";

interface UsersProps {}
const Users: React.FC<UsersProps> = ({}) => {
  const { users, triggerUserMaps } = useTriggerUserStore();
  const loading = true;
  const mapsCountByUser = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const map of triggerUserMaps) {
      counts[map.user_id] = (counts[map.user_id] || 0) + 1;
    }
    return counts;
  }, [triggerUserMaps]);

  return (
    <Card className="lg:col-span-1 overflow-hidden">
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Triggers</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-6 w-6" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-6" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                    </TableRow>
                  ))
                : users?.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="whitespace-nowrap">
                        {u.id}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {u.username}
                      </TableCell>
                      <TableCell>{mapsCountByUser[u.id] || 0}</TableCell>
                      <TableCell>
                        <Button size="sm">Sign In/Out</Button>
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

export default Users;

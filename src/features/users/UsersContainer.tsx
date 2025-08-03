import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/store/useAuthStore";
import { useTriggerUserStore } from "@/store/useTriggerUserStore";
import { useLogin, useLogout, useMapsCountByUser } from "./usersHooks";
import { useMemo } from "react";
import UsersTable from "./UsersTable";

interface UsersContainerProps {}
const UsersContainer: React.FC<UsersContainerProps> = () => {
  const { users, triggerUserMaps } = useTriggerUserStore();
  const me = useAuthStore((s) => s.user) || undefined;
  const login = useLogin();
  const logout = useLogout();

  const mapsCountByUser = useMapsCountByUser(triggerUserMaps);

  return (
    <Card className="lg:col-span-1 overflow-hidden">
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto h-[calc(4*3rem)] overflow-y-auto">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Triggers</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              <UsersTable
                mapsCountByUser={mapsCountByUser}
                onLogin={login}
                onLogout={logout}
                currentUser={me}
                users={users}
              />
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersContainer;

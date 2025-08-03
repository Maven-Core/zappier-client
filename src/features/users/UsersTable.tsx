import { DisplayUserDto } from "@/api/dtos/aaa/display-user.dto";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import UsersSkeleton from "./UsersSkeleton";
import UserAuthActionButton from "./UserAuthActionButton";
import { useEffect, useState } from "react";

interface UsersTableProps {
  users?: DisplayUserDto[];
  currentUser?: DisplayUserDto;
  mapsCountByUser: Record<number, number>;
  onLogin: (username: string) => void;
  onLogout: () => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  mapsCountByUser,
  onLogin,
  onLogout,
  currentUser,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (users) setLoading(false);
    }, 1000);
  });

  if (!users || loading) return <UsersSkeleton />;
  return users.map((u) => (
    <TableRow key={u.id}>
      <TableCell className="whitespace-nowrap">{u.id}</TableCell>
      <TableCell className="whitespace-nowrap">{u.username}</TableCell>
      <TableCell>{mapsCountByUser[u.id] || 0}</TableCell>
      <TableCell>
        <UserAuthActionButton
          onLogin={onLogin}
          onLogout={onLogout}
          user={u}
          currentUserId={currentUser?.id}
        />
      </TableCell>
    </TableRow>
  ));
};

export default UsersTable;

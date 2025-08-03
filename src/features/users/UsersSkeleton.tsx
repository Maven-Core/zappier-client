import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const UsersSkeleton = () => {
  return [...Array(5)].map((_, i) => (
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
  ));
};

export default UsersSkeleton;

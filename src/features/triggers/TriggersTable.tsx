import { DisplayTriggerDto } from "@/api/dtos/trigger/display-trigger.dto";
import { TableCell, TableRow } from "@/components/ui/table";
import { FC } from "react";

interface TriggersTableProps {
  triggers?: DisplayTriggerDto[];
}
const TriggersTable: FC<TriggersTableProps> = ({ triggers }) => {
  return triggers?.map((t) => (
    <TableRow key={t.id} className="">
      <TableCell className="whitespace-nowrap ">{t.name}</TableCell>
      <TableCell className="whitespace-nowrap truncate w-6">
        {t.external_id}
      </TableCell>
      <TableCell className="">{t.created_by}</TableCell>
      <TableCell className="whitespace-nowrap">
        {new Date(t.created_at).toDateString()}
      </TableCell>
    </TableRow>
  ));
};

export default TriggersTable;

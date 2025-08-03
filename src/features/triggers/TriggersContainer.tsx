import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import TriggersTable from "./TriggersTable";
import TriggerAddForm from "./TriggerAddForm";
import TriggersRunButton from "./TriggersRunButton";
import { useTriggerAddForm } from "./triggersHooks";
import { useTriggerUserStore } from "@/store/useTriggerUserStore";

const TriggersContainer = () => {
  const triggers = useTriggerUserStore((s) => s.triggers);
  const triggerAddFormHook = useTriggerAddForm();

  const { setShowInput, isAdding, showInput } = triggerAddFormHook;

  return (
    <Card className="lg:col-span-1 overflow-hidden">
      <CardHeader className="flex text-center justify-between items-center gap-2">
        <CardTitle>Triggers</CardTitle>
        <Button
          onClick={() => setShowInput((res) => !res)}
          size="sm"
          className="w-auto"
          disabled={isAdding}
        >
          {showInput ? <X /> : "Add"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto ">
          <Table className="table-row table-fixed h-[calc(4*3rem)]">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>External ID</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TriggersTable triggers={triggers} />
            </TableBody>
          </Table>
        </div>
        <div className="flex max-sm:flex-col-reverse max-sm:gap-y-4 justify-between pt-8">
          <TriggerAddForm triggerAddFormHook={triggerAddFormHook} />
          <TriggersRunButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default TriggersContainer;

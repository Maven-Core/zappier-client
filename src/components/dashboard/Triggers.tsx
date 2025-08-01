import { DisplayTriggerDto } from "@/api/dtos/trigger/display-trigger.dto";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTriggerUserStore } from "@/store/useTriggerUserStore";

interface TriggersProps {}
const Triggers: React.FC<TriggersProps> = ({}) => {
  const { triggers, setTriggers } = useTriggerUserStore();

  const addTrigger = () => {
    const name = prompt("Trigger name");
    if (name) {
      const newTrigger: DisplayTriggerDto = {
        id: triggers.length + 1,
        name,
        external_id: `ext_${Date.now()}`,
        created_by: 1,
        created_at: new Date(),
        notifications: [],
        userMaps: [],
      };
      setTriggers([...triggers, newTrigger]);
    }
  };
  return (
    <Card className="lg:col-span-1 overflow-hidden">
      <CardHeader className="flex text-center justify-between items-center gap-2">
        <CardTitle>Triggers</CardTitle>
        <Button onClick={addTrigger} size="sm" className="w-auto">
          Add
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>External ID</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {triggers?.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="whitespace-nowrap">{t.name}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {t.external_id}
                  </TableCell>
                  <TableCell>{t.created_by}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(t.created_at).toDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end pt-2">
          <Button
            onClick={addTrigger}
            size="sm"
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
          >
            Run
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Triggers;

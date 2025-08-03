import { useState, useRef } from "react";
import { toast } from "sonner";
import { useTriggerUserStore } from "@/store/useTriggerUserStore"; // adjust path
import { CreateTriggerDto } from "@/api/dtos/trigger/create-trigger.dto";
import { handleCreateTrigger, handleRunTriggers } from "@/api/handlers/trigger";

export function useTriggerAddForm() {
  const [inputValue, setInputValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showInput, setShowInput] = useState(false); // can be controlled externally too
  const inputRef = useRef<HTMLInputElement>(null);

  const { addTrigger } = useTriggerUserStore();

  const handleAdd = async () => {
    if (!inputValue.trim()) return;

    setIsAdding(true);
    const newTrigger: CreateTriggerDto = {
      name: inputValue,
      external_id: `ext_${Date.now()}`,
    };

    try {
      const { success, data, message } = (await handleCreateTrigger(newTrigger))
        .data;

      if (!success || !data) {
        return toast.error(message);
      }

      addTrigger(data);
      toast.success("Trigger created successfully");

      setShowInput(false);

      setTimeout(() => {
        setIsAdding(false);
        setInputValue("");
      }, 1000);
    } catch (error: any) {
      setIsAdding(false);
      toast.error(error.message || "Unknown error");
    }
  };

  return {
    inputRef,
    inputValue,
    setInputValue,
    isAdding,
    showInput,
    setShowInput,
    handleAdd,
  };
}
export type TriggerAddFormHookReturn = ReturnType<typeof useTriggerAddForm>;

export function useTriggerRunButton() {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    const execution = () =>
      handleRunTriggers()
        .then((res) => {
          if (res.data.success) toast.success(res.data.message);
          else toast.error(res.data.message);
        })
        .catch((res) => toast.error(res.message))
        .finally(() => setIsRunning(false));

    setIsRunning(true);
    setTimeout(execution, 2000);
  };

  return { isRunning, setIsRunning, handleRun };
}

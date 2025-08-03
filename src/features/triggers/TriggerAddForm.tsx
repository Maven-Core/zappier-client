import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { FC, useEffect } from "react";
import { TriggerAddFormHookReturn } from "./triggersHooks";

interface TriggerAddFormProps {
  triggerAddFormHook: TriggerAddFormHookReturn;
}
const TriggerAddForm: FC<TriggerAddFormProps> = ({ triggerAddFormHook }) => {
  const {
    inputRef,
    inputValue,
    setInputValue,
    isAdding,
    showInput,
    handleAdd,
  } = triggerAddFormHook;

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return (
    <div
      className={`flex gap-x-2 items-center justify-center origin-center transition-all duration-[500ms] ease-in-out transform ${
        showInput ? "max-h-8 opacity-100" : "max-h-0 overflow-hidden"
      }`}
    >
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter trigger name"
        className="w-full sm:w-auto"
      />
      <Button
        onClick={handleAdd}
        disabled={isAdding}
        className="bg-green-600 hover:bg-green-700 w-24 text-white"
      >
        {isAdding ? <Loader2 className="animate-spin" /> : "Add"}
      </Button>
    </div>
  );
};

export default TriggerAddForm;

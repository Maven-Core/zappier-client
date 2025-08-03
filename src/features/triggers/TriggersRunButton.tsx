import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useTriggerRunButton } from "./triggersHooks";
import { useAuthStore } from "@/store/useAuthStore";

const TriggersRunButton = () => {
  const { handleRun, isRunning } = useTriggerRunButton();
  const isAdmin = useAuthStore((s) => s.isAdmin);

  return (
    <Button
      onClick={handleRun}
      disabled={!isAdmin || isRunning}
      className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
    >
      {isRunning ? <Loader2 className="animate-spin" /> : "Run"}
    </Button>
  );
};

export default TriggersRunButton;

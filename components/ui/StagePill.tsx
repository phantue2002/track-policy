import type { Stage } from "@/types";

interface StagePillProps {
  stage: Stage;
}

const STAGE_CLASSES: Record<Stage, string> = {
  Filed: "bg-white/[.06] text-muted",
  Committee: "bg-amber-50 text-amber-700",
  Floor: "bg-orange-50 text-orange-600",
  Enacted: "bg-green-50 text-green-700",
  "Carried Over": "bg-white/[.06] text-muted italic",
  Dead: "bg-red-50 text-red-400 line-through",
};

export default function StagePill({ stage }: StagePillProps) {
  return (
    <span
      className={`rounded-full text-[10px] font-medium px-2.5 py-0.5 ${STAGE_CLASSES[stage]}`}
    >
      {stage}
    </span>
  );
}

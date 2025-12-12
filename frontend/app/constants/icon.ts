import { Ban, Edit, Eye, type LucideIcon } from "lucide-react";

export interface ActionConfig {
  icon: LucideIcon;
  label: string;
  className: string;
}

export const ACTIONS: ActionConfig[] = [
  { icon: Eye, label: "View", className: "bg-blue-500 hover:bg-blue-600" },
  { icon: Edit, label: "Edit", className: "bg-yellow-500 hover:bg-yellow-600" },
  { icon: Ban, label: "Delete", className: "bg-orange-500 hover:bg-orange-600" },
];

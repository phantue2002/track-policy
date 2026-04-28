import type { Dispatch, SetStateAction } from "react";
import type { Region, StanceType } from "@/types";

export const STANCE_HEX: Record<StanceType, string> = {
  restrictive: "#f87171",  /* red-400 — bright on dark */
  concerning:  "#fb923c",  /* orange-400 */
  review:      "#facc15",  /* yellow-400 */
  none:        "#475569",  /* slate-600 */
  favorable:   "#34d399",  /* emerald-400 */
};

export const NEUTRAL_FILL   = "#1e293b";  /* slate-800 — dark map fill */
export const NEUTRAL_STROKE = "#334155";  /* slate-700 — subtle border */
export const INK = "#f8fafc";             /* slate-50 — label color on dark */

export interface TooltipState {
  x: number;
  y: number;
  label: string;
  /** Set for entity hovers so MapShell can show a rich tooltip. */
  geoId?: string;
  region?: Region;
  /** True for US states that have county-level municipal data. Surfaced
   *  in the tooltip so users know they can double-click to drill in. */
  drillable?: boolean;
  /** 5-digit county FIPS — set on county hovers in CountyMap so MapShell
   *  can render a rich municipality tooltip (actions, context, etc.). */
  countyFips?: string;
}

export type SetTooltip = Dispatch<SetStateAction<TooltipState | null>>;

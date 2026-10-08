"use client";

import React from "react";
import { LostFoundItem } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, CheckCircle2, PhoneCall, ShieldAlert, Tag } from "lucide-react";
import { formatDateOnly } from "@/lib/utils";

interface ItemCardProps {
  item: LostFoundItem;
  onClaim: (item: LostFoundItem) => void;
  onResolve?: (item: LostFoundItem) => void;
  isOwnerOrAdmin?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onClaim,
  onResolve,
  isOwnerOrAdmin = false,
}) => {
  const isLost = item.type === "LOST";
  const isResolved = item.status === "RESOLVED";

  return (
    <Card className="flex flex-col justify-between overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300">
      {/* Visual Image / Placeholder */}
      <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800/80 p-4 text-center">
            <Tag className="h-10 w-10 mb-2 opacity-50" />
            <span className="text-xs font-medium">No photo uploaded</span>
          </div>
        )}

        {/* Type Pill (LOST vs FOUND) */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            variant={isLost ? "destructive" : "default"}
            className="font-bold uppercase tracking-wider text-[11px] shadow-sm"
          >
            {item.type}
          </Badge>
          <Badge variant="outline" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-[10px] font-semibold">
            {item.category}
          </Badge>
        </div>

        {/* Status Pill (OPEN vs RESOLVED) */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm ${
              isResolved
                ? "bg-emerald-500 text-white"
                : "bg-amber-500 text-white"
            }`}
          >
            {item.status}
          </span>
        </div>
      </div>

      <CardHeader className="pb-2 pt-4 px-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
          {item.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
          {item.description}
        </p>
      </CardHeader>

      <CardContent className="px-5 py-2 space-y-2 text-xs border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40">
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
          <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
          <span className="truncate">{item.locationFoundOrLost}</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
          <Calendar className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <span>Incident: {formatDateOnly(item.dateOfIncident)}</span>
        </div>
        <div className="text-[11px] text-slate-400 pt-1">
          Reported by: <span className="font-semibold text-slate-600 dark:text-slate-300">{item.reporterId?.name || "Campus Member"}</span>
        </div>
      </CardContent>

      <CardFooter className="px-5 py-3 flex gap-2 border-t border-slate-100 dark:border-slate-800/80">
        {!isResolved ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onClaim(item)}
              className="flex-1 text-xs h-8 flex items-center justify-center space-x-1 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Contact / Claim</span>
            </Button>
            {isOwnerOrAdmin && onResolve && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onResolve(item)}
                className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Resolve
              </Button>
            )}
          </>
        ) : (
          <div className="w-full text-center py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-center space-x-1">
            <CheckCircle2 className="h-4 w-4" />
            <span>Marked as Resolved / Claimed</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

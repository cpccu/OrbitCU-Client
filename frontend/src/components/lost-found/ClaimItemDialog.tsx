"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Calendar, ShieldCheck, UserCheck } from "lucide-react";
import { LostFoundItem } from "@/types";
import { formatDateOnly } from "@/lib/utils";

interface ClaimItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: LostFoundItem | null;
}

export const ClaimItemDialog: React.FC<ClaimItemDialogProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-1">
            <Badge
              variant={item.type === "LOST" ? "destructive" : "default"}
              className="text-xs"
            >
              {item.type}
            </Badge>
            <span className="text-xs text-slate-400 font-mono">
              {item.category}
            </span>
          </div>
          <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
            Claim / Contact Verification
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Reach out to the reporting student to coordinate verification and handover.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Item Recap Card */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
              {item.title}
            </h4>
            <div className="flex items-center text-xs text-slate-500 space-x-1">
              <MapPin className="h-3.5 w-3.5 text-blue-500" />
              <span>Location: {item.locationFoundOrLost}</span>
            </div>
            <div className="flex items-center text-xs text-slate-500 space-x-1">
              <Calendar className="h-3.5 w-3.5 text-amber-500" />
              <span>Incident Date: {formatDateOnly(item.dateOfIncident)}</span>
            </div>
          </div>

          {/* Verification Protocol Notice */}
          <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800/60 flex items-start space-x-2.5 text-xs text-blue-900 dark:text-blue-300">
            <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Campus Safety Protocol:</strong> Before handing over or claiming,
              please present your official City University ID card and verify distinguishing
              identifying features.
            </p>
          </div>

          {/* Direct Contact Coordinates */}
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Reporter Contact Details
            </p>
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <UserCheck className="h-4 w-4 text-emerald-500" />
                <span>{item.contactNumberOrEmail}</span>
              </div>
              <a
                href={`tel:${item.contactNumberOrEmail}`}
                className="inline-block"
              >
                <Button size="sm" variant="outline" className="text-xs h-7">
                  Call / Message
                </Button>
              </a>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button onClick={onClose} variant="default" className="w-full">
            Understood
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

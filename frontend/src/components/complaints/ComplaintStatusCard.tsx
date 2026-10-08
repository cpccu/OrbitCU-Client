"use client";

import React from "react";
import { ComplaintItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  Search,
  Wrench,
  AlertCircle,
  MapPin,
  Calendar,
  MessageSquare,
  UserX,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ComplaintStatusCardProps {
  complaint: ComplaintItem;
  onAdminUpdate?: (complaint: ComplaintItem) => void;
  isAdmin?: boolean;
}

const STAGES: {
  key: ComplaintItem["status"];
  label: string;
  icon: React.ElementType;
}[] = [
  { key: "SUBMITTED", label: "Submitted", icon: Clock },
  { key: "UNDER_REVIEW", label: "Under Review", icon: Search },
  { key: "ACTION_TAKEN", label: "Action Taken", icon: Wrench },
  { key: "RESOLVED", label: "Resolved", icon: CheckCircle2 },
];

export const ComplaintStatusCard: React.FC<ComplaintStatusCardProps> = ({
  complaint,
  onAdminUpdate,
  isAdmin = false,
}) => {
  const currentStageIndex = STAGES.findIndex((s) => s.key === complaint.status);

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/70 dark:bg-slate-800/40 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">
              Ticket:
            </span>
            <span className="font-mono text-sm font-black px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {complaint.ticketId}
            </span>
            {complaint.isAnonymous && (
              <Badge variant="secondary" className="text-[10px] flex items-center space-x-1">
                <UserX className="h-3 w-3 mr-1" />
                <span>Anonymous</span>
              </Badge>
            )}
          </div>
          <Badge
            variant={
              complaint.status === "RESOLVED"
                ? "success"
                : complaint.status === "ACTION_TAKEN"
                ? "purple"
                : complaint.status === "UNDER_REVIEW"
                ? "warning"
                : "default"
            }
            className="self-start sm:self-auto text-xs font-bold"
          >
            {complaint.status.replace("_", " ")}
          </Badge>
        </div>

        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white mt-2">
          {complaint.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Visual Progress Bar Timeline */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Investigation & Resolution Progress
          </p>

          <div className="relative">
            {/* Horizontal Line */}
            <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
              {STAGES.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                const Icon = stage.icon;

                return (
                  <div
                    key={stage.key}
                    className="flex flex-col items-center text-center space-y-1.5"
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                        isCurrent
                          ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950 scale-110 shadow-md"
                          : isPassed
                          ? "bg-emerald-500 text-white shadow"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        isCurrent
                          ? "text-blue-600 dark:text-blue-400 font-bold"
                          : isPassed
                          ? "text-slate-800 dark:text-slate-200"
                          : "text-slate-400"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Complaint Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs">
          <div className="space-y-1.5">
            <span className="text-slate-400 block font-medium">Department / Category:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {complaint.category}
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="text-slate-400 block font-medium">Campus Location:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-blue-500" />
              {complaint.locationRoom}
            </span>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <span className="text-slate-400 block font-medium">Description of Grievance:</span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {complaint.description}
            </p>
          </div>

          <div className="space-y-1 text-slate-400">
            <span>Submitted On: {formatDate(complaint.createdAt)}</span>
          </div>
        </div>

        {/* Official Admin Remarks / Action Notes */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            <MessageSquare className="h-4 w-4 text-blue-600" />
            <span>Official Administrative Remarks & Action Notes</span>
          </div>

          {complaint.adminRemarks ? (
            <p className="text-xs text-slate-700 dark:text-slate-300 bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900 leading-relaxed font-mono">
              "{complaint.adminRemarks}"
            </p>
          ) : (
            <p className="text-xs text-slate-400 italic">
              No remarks entered yet. The grievance has been dispatched to the relevant department head for inspection.
            </p>
          )}

          {isAdmin && onAdminUpdate && (
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => onAdminUpdate(complaint)}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Update Status / Add Official Remarks
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComplaintItem } from "@/types";
import api from "@/lib/api";
import { toast } from "sonner";

interface AdminRemarksDialogProps {
  isOpen: boolean;
  onClose: () => void;
  complaint: ComplaintItem | null;
  onUpdated: (updatedComplaint: ComplaintItem) => void;
}

export const AdminRemarksDialog: React.FC<AdminRemarksDialogProps> = ({
  isOpen,
  onClose,
  complaint,
  onUpdated,
}) => {
  const [status, setStatus] = useState<ComplaintItem["status"]>(
    complaint?.status || "UNDER_REVIEW"
  );
  const [adminRemarks, setAdminRemarks] = useState(
    complaint?.adminRemarks || ""
  );
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (complaint) {
      setStatus(complaint.status);
      setAdminRemarks(complaint.adminRemarks || "");
    }
  }, [complaint]);

  if (!complaint) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.patch(`/complaints/${complaint._id}/status`, {
        status,
        adminRemarks,
      });
      const updated: ComplaintItem = res.data?.data || res.data;
      toast.success("Grievance status and official remarks updated.");
      onUpdated(updated);
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to update grievance record."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Administrative Action & Status Update
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Ticket: <span className="font-mono font-bold text-slate-700">{complaint.ticketId}</span> — {complaint.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Workflow Status
            </label>
            <Select
              value={status}
              onValueChange={(val: any) => setStatus(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SUBMITTED">SUBMITTED</SelectItem>
                <SelectItem value="UNDER_REVIEW">UNDER_REVIEW</SelectItem>
                <SelectItem value="ACTION_TAKEN">ACTION_TAKEN</SelectItem>
                <SelectItem value="RESOLVED">RESOLVED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Official Admin Remarks
            </label>
            <Textarea
              rows={4}
              placeholder="e.g. Technician dispatched. Replaced projector bulb in Room 402 on 10/08."
              value={adminRemarks}
              onChange={(e) => setAdminRemarks(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} variant="default">
              {loading ? "Saving..." : "Save Remarks"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

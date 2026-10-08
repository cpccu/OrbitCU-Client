"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ComplaintItem } from "@/types";
import api from "@/lib/api";
import { toast } from "sonner";
import { Copy, Check, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ComplaintFormProps {
  onComplaintSubmitted?: (complaint: ComplaintItem) => void;
}

export const ComplaintForm: React.FC<ComplaintFormProps> = ({
  onComplaintSubmitted,
}) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [createdTicket, setCreatedTicket] = useState<ComplaintItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Classroom Infrastructure" as ComplaintItem["category"],
    locationRoom: "",
    description: "",
    isAnonymous: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.locationRoom || !formData.description) {
      toast.error("Please provide complaint title, location, and details.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/complaints", formData);
      const ticket: ComplaintItem = res.data?.data || res.data;
      setCreatedTicket(ticket);
      toast.success("Grievance lodged into official registry.");
      if (onComplaintSubmitted) {
        onComplaintSubmitted(ticket);
      }
      // Reset form
      setFormData({
        title: "",
        category: "Classroom Infrastructure",
        locationRoom: "",
        description: "",
        isAnonymous: false,
      });
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to submit grievance. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTicket = () => {
    if (createdTicket?.ticketId) {
      navigator.clipboard.writeText(createdTicket.ticketId);
      setCopied(true);
      toast.success("Ticket ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Grievance Subject / Title *
          </label>
          <Input
            name="title"
            required
            placeholder="e.g. Broken Projector in Room 402 / Washroom Water Supply"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Department / Category *
            </label>
            <Select
              value={formData.category}
              onValueChange={(val: any) =>
                setFormData((prev) => ({ ...prev, category: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Classroom Infrastructure">
                  Classroom Infrastructure
                </SelectItem>
                <SelectItem value="Lab Equipment">Lab Equipment</SelectItem>
                <SelectItem value="Sanitation & Hygiene">
                  Sanitation & Hygiene
                </SelectItem>
                <SelectItem value="Proctorial/Security">
                  Proctorial/Security
                </SelectItem>
                <SelectItem value="Administrative Office">
                  Administrative Office
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Campus Location / Room No. *
            </label>
            <Input
              name="locationRoom"
              required
              placeholder="e.g. Lab 3, 4th Floor, Academic Bldg 1"
              value={formData.locationRoom}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Detailed Description of Issue *
          </label>
          <Textarea
            name="description"
            required
            rows={4}
            placeholder="Specify duration of malfunction, safety hazards, equipment numbers, or impact on classes..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Anonymous Checkbox Toggle */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="isAnonymous"
              checked={formData.isAnonymous}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isAnonymous: e.target.checked,
                }))
              }
              className="h-4 w-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="text-xs">
              <label
                htmlFor="isAnonymous"
                className="font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                Submit Anonymously (Whistleblower Protection)
              </label>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                Your student profile will not be linked to this grievance. University administrators will only see the incident details and location.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          variant="gradient"
          className="w-full h-11 text-sm font-semibold"
        >
          {loading ? "Lodging Grievance..." : "Submit Grievance into Tracker"}
        </Button>
      </form>

      {/* Generated Ticket ID Success Dialog */}
      <Dialog
        open={!!createdTicket}
        onOpenChange={(open) => !open && setCreatedTicket(null)}
      >
        <DialogContent className="max-w-md text-center">
          <DialogHeader className="items-center text-center">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-2 mx-auto">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <DialogTitle className="text-xl font-bold">
              Grievance Registered Successfully
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Save your unique tracking identifier to monitor inspection, proctor remarks, and resolution progress.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
              Tracking Ticket ID
            </p>
            <div className="flex items-center justify-center space-x-2">
              <span className="font-mono text-2xl font-black text-blue-600 dark:text-blue-400">
                {createdTicket?.ticketId}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyTicket}
                className="h-8 px-2.5"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Link
              href={`/complaints/track?ticketId=${createdTicket?.ticketId}`}
              className="w-full"
            >
              <Button variant="default" className="w-full flex items-center justify-center space-x-2">
                <span>Track Resolution Status</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

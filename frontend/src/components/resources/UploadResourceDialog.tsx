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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";
import { toast } from "sonner";
import { Department, ResourceItem } from "@/types";

interface UploadResourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUploaded: (resource: ResourceItem) => void;
}

export const UploadResourceDialog: React.FC<UploadResourceDialogProps> = ({
  isOpen,
  onClose,
  onUploaded,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    courseCode: "",
    courseTitle: "",
    department: "CSE" as Department,
    semesterTerm: "Mid-Term" as ResourceItem["semesterTerm"],
    academicSession: "2024-2025",
    fileUrl: "",
    fileFormat: "PDF" as ResourceItem["fileFormat"],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.courseCode ||
      !formData.courseTitle ||
      !formData.fileUrl
    ) {
      toast.error("Please fill in all required academic resource fields.");
      return;
    }

    let formattedCode = formData.courseCode.trim().toUpperCase();
    formattedCode = formattedCode.replace(/\s*-\s*/g, '-').replace(/\s+/g, ' ');

    if (/^[A-Z]{3,4}[0-9]{3,4}$/.test(formattedCode)) {
      const match = formattedCode.match(/^([A-Z]{3,4})([0-9]{3,4})$/);
      if (match) {
        formattedCode = `${match[1]}-${match[2]}`;
      }
    }

    const courseCodeRegex = /^[A-Z]{3,4}[- ]?[0-9]{3,4}$/;
    if (!courseCodeRegex.test(formattedCode)) {
      toast.error("Course code must contain 3 or 4 letters and 3 or 4 digits (e.g. CSE-221, MATH 2105).");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        courseCode: formattedCode,
      };
      const res = await api.post("/resources", payload);
      const createdItem: ResourceItem = res.data?.data || res.data;
      toast.success("Resource deposited to academic vault successfully!");
      onUploaded(createdItem);
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to upload resource. Please check file URL."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Contribute to Academic Vault</DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Share lecture notes, previous exam questions (PYQs), or lab manuals with fellow City University peers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Resource Title *
            </label>
            <Input
              name="title"
              required
              placeholder="e.g. Algorithms Mid-Term Solution Guide & Graph Notes"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Course Code *
              </label>
              <Input
                name="courseCode"
                required
                placeholder="e.g. CSE-221 or MATH 2105"
                value={formData.courseCode}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Course Title *
              </label>
              <Input
                name="courseTitle"
                required
                placeholder="e.g. Algorithms & Complexity"
                value={formData.courseTitle}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Department *
              </label>
              <Select
                value={formData.department}
                onValueChange={(val: any) =>
                  setFormData((prev) => ({ ...prev, department: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="EEE">EEE</SelectItem>
                  <SelectItem value="BBA">BBA</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Law">Law</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Resource Category / Term *
              </label>
              <Select
                value={formData.semesterTerm}
                onValueChange={(val: any) =>
                  setFormData((prev) => ({ ...prev, semesterTerm: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mid-Term">Mid-Term</SelectItem>
                  <SelectItem value="Final-Term">Final-Term</SelectItem>
                  <SelectItem value="Quiz">Quiz</SelectItem>
                  <SelectItem value="Lab Manual">Lab Manual</SelectItem>
                  <SelectItem value="Lecture Note">Lecture Note</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Academic Session
              </label>
              <Input
                name="academicSession"
                placeholder="e.g. 2024-2025"
                value={formData.academicSession}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                File Format
              </label>
              <Select
                value={formData.fileFormat}
                onValueChange={(val: any) =>
                  setFormData((prev) => ({ ...prev, fileFormat: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF Document</SelectItem>
                  <SelectItem value="DOCX">DOCX Word Document</SelectItem>
                  <SelectItem value="ZIP">ZIP Archive</SelectItem>
                  <SelectItem value="IMAGE">Image / Scan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Direct File / Cloud Storage URL *
            </label>
            <Input
              name="fileUrl"
              required
              placeholder="https://drive.google.com/... or https://..."
              value={formData.fileUrl}
              onChange={handleChange}
            />
            <p className="text-[11px] text-slate-400">
              Paste a public Google Drive, OneDrive, or direct document download link.
            </p>
          </div>

          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} variant="gradient">
              {loading ? "Depositing..." : "Deposit Resource"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

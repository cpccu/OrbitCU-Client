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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";
import { toast } from "sonner";
import { LostFoundItem } from "@/types";

interface ReportItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onItemReported: (item: LostFoundItem) => void;
}

export const ReportItemDialog: React.FC<ReportItemDialogProps> = ({
  isOpen,
  onClose,
  onItemReported,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "FOUND" as "LOST" | "FOUND",
    title: "",
    category: "ID Card" as LostFoundItem["category"],
    locationFoundOrLost: "",
    dateOfIncident: new Date().toISOString().split("T")[0],
    description: "",
    imageUrl: "",
    contactNumberOrEmail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.locationFoundOrLost ||
      !formData.contactNumberOrEmail
    ) {
      toast.error("Please fill in the item title, location, and contact information.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/lost-found", formData);
      const createdItem: LostFoundItem = res.data?.data || res.data;
      toast.success(
        `Item reported as ${formData.type === "FOUND" ? "Found" : "Lost"} successfully!`
      );
      onItemReported(createdItem);
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to submit item report. Please check details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Report Lost or Found Belonging</DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Help the campus community recover missing items or report discovered property.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Incident Type Selector */}
          <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type: "LOST" }))}
              className={`py-2 rounded-md text-xs font-bold transition-all ${
                formData.type === "LOST"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              I LOST SOMETHING
            </button>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type: "FOUND" }))}
              className={`py-2 rounded-md text-xs font-bold transition-all ${
                formData.type === "FOUND"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              I FOUND AN ITEM
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Item Name / Headline *
            </label>
            <Input
              name="title"
              required
              placeholder="e.g. Blue Casio fx-991EX Calculator / Student ID Card"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Category *
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
                  <SelectItem value="ID Card">ID Card</SelectItem>
                  <SelectItem value="Calculator">Calculator</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Documents/Books">Documents/Books</SelectItem>
                  <SelectItem value="Wallets/Bags">Wallets/Bags</SelectItem>
                  <SelectItem value="Personal Accessories">Personal Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Date of Incident *
              </label>
              <Input
                type="date"
                name="dateOfIncident"
                required
                value={formData.dateOfIncident}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Campus Location *
              </label>
              <Input
                name="locationFoundOrLost"
                required
                placeholder="e.g. 5th Floor Canteen / Room 304"
                value={formData.locationFoundOrLost}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Contact Phone / Email *
              </label>
              <Input
                name="contactNumberOrEmail"
                required
                placeholder="e.g. 01712-XXXXXX or student@city.edu"
                value={formData.contactNumberOrEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Image / Photograph URL (Optional)
            </label>
            <Input
              name="imageUrl"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Description & Identifying Marks
            </label>
            <Textarea
              name="description"
              rows={3}
              placeholder="Describe stickers, scratches, exact color, brand or contents..."
              value={formData.description}
              onChange={handleChange}
            />
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
            <Button
              type="submit"
              disabled={loading}
              variant={formData.type === "LOST" ? "destructive" : "default"}
            >
              {loading ? "Submitting..." : `Submit ${formData.type} Report`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

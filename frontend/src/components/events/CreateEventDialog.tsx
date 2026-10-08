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
import { EventItem } from "@/types";

interface CreateEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: (newEvent: EventItem) => void;
}

export const CreateEventDialog: React.FC<CreateEventDialogProps> = ({
  isOpen,
  onClose,
  onEventCreated,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    clubName: "",
    category: "Technical" as EventItem["category"],
    description: "",
    bannerUrl: "",
    venue: "",
    eventDate: "",
    registrationDeadline: "",
    maxCapacity: 100,
    isInterUniversity: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "maxCapacity") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.clubName || !formData.venue || !formData.eventDate || !formData.registrationDeadline) {
      toast.error("Please fill in all required event details.");
      return;
    }

    if (new Date(formData.registrationDeadline).getTime() >= new Date(formData.eventDate).getTime()) {
      toast.error("Registration deadline must be strictly before the event date.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/events", formData);
      const createdItem: EventItem = res.data?.data || res.data;
      toast.success("Event created and published successfully!");
      onEventCreated(createdItem);
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Host New Campus Event</DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Publish an official club gathering, workshop, hackathon, or cultural fest.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Event Title *
              </label>
              <Input
                name="title"
                required
                placeholder="e.g. CityHack 2026 / Robotics Cup"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Organizing Club *
              </label>
              <Input
                name="clubName"
                required
                placeholder="e.g. City Tech Club / Cultural Club"
                value={formData.clubName}
                onChange={handleChange}
              />
            </div>
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
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Debate">Debate</SelectItem>
                  <SelectItem value="Academic">Academic</SelectItem>
                  <SelectItem value="Career">Career</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Venue Location *
              </label>
              <Input
                name="venue"
                required
                placeholder="e.g. Auditorium 2 / Main Campus Ground"
                value={formData.venue}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Event Date & Time *
              </label>
              <Input
                type="datetime-local"
                name="eventDate"
                required
                value={formData.eventDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Registration Deadline *
              </label>
              <Input
                type="datetime-local"
                name="registrationDeadline"
                required
                value={formData.registrationDeadline}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Max Capacity (Seats)
              </label>
              <Input
                type="number"
                name="maxCapacity"
                min={1}
                value={formData.maxCapacity}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Banner Image URL (Optional)
              </label>
              <Input
                name="bannerUrl"
                placeholder="https://images.unsplash.com/..."
                value={formData.bannerUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Event Description
            </label>
            <Textarea
              name="description"
              rows={3}
              placeholder="Outline event agenda, eligibility, guest speakers, rules, and prizes..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="isInterUniversity"
              name="isInterUniversity"
              checked={formData.isInterUniversity}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isInterUniversity: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="isInterUniversity"
              className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              Open for Inter-University Participants
            </label>
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
              {loading ? "Publishing..." : "Publish Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

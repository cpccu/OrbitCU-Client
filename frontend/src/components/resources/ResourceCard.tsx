"use client";

import React, { useState } from "react";
import { ResourceItem } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FileCode,
  Archive,
  Image as ImageIcon,
  ThumbsUp,
  Download,
  Calendar,
  User,
  GraduationCap,
} from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";
import { formatDateOnly } from "@/lib/utils";

interface ResourceCardProps {
  resource: ResourceItem;
  onUpvoted?: (id: string, newUpvotes: number) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onUpvoted,
}) => {
  const [upvotes, setUpvotes] = useState(resource.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isUpvoting, setIsUpvoting] = useState(false);

  const handleUpvote = async () => {
    if (isUpvoting || hasUpvoted) return;
    setIsUpvoting(true);
    try {
      const res = await api.patch(`/resources/${resource._id}/upvote`);
      const updatedCount =
        res.data?.data?.upvotes ?? res.data?.upvotes ?? upvotes + 1;
      setUpvotes(updatedCount);
      setHasUpvoted(true);
      toast.success("Thanks for upvoting this academic resource!");
      if (onUpvoted) {
        onUpvoted(resource._id, updatedCount);
      }
    } catch (err: any) {
      // If error or unauthenticated, give helpful toast
      toast.error(
        err.response?.data?.message || "Failed to register upvote. Sign in to upvote."
      );
    } finally {
      setIsUpvoting(false);
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "PDF":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "DOCX":
        return <FileCode className="h-4 w-4 text-blue-500" />;
      case "ZIP":
        return <Archive className="h-4 w-4 text-amber-500" />;
      case "IMAGE":
        return <ImageIcon className="h-4 w-4 text-emerald-500" />;
      default:
        return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <Card className="flex flex-col justify-between border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3 pt-5 px-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs px-2.5 py-0.5"
          >
            {resource.courseCode}
          </Badge>
          <div className="flex items-center space-x-1.5">
            <Badge variant="outline" className="text-[11px] font-medium">
              {resource.semesterTerm}
            </Badge>
            <span className="flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {getFormatIcon(resource.fileFormat)}
              <span>{resource.fileFormat}</span>
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
          {resource.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-1">
          <GraduationCap className="h-3.5 w-3.5 text-blue-500 inline" />
          <span>{resource.courseTitle}</span>
        </p>
      </CardHeader>

      <CardContent className="px-5 py-2 text-xs space-y-2 border-t border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
          <span className="flex items-center space-x-1">
            <User className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate max-w-[130px]">
              {resource.uploadedBy?.name || "Peer Contributor"}
            </span>
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {resource.academicSession || "2024-2025"}
          </span>
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-400">
          <span>Dept: {resource.department}</span>
          <span>{formatDateOnly(resource.createdAt)}</span>
        </div>
      </CardContent>

      <CardFooter className="px-5 py-3 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleUpvote}
          disabled={hasUpvoted || isUpvoting}
          className={`text-xs px-3 py-1.5 h-8 flex items-center space-x-1.5 ${
            hasUpvoted
              ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-400"
              : ""
          }`}
        >
          <ThumbsUp
            className={`h-3.5 w-3.5 ${hasUpvoted ? "fill-blue-600" : ""}`}
          />
          <span className="font-semibold">{upvotes}</span>
        </Button>

        <a
          href={resource.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button
            variant="default"
            size="sm"
            className="w-full text-xs h-8 flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900"
          >
            <Download className="h-3.5 w-3.5" />
            <span>View / Download</span>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

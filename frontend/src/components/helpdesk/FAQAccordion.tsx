"use client";

import React, { useState, useMemo } from "react";
import { FAQItem } from "@/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Pin,
  ExternalLink,
  HelpCircle,
  Sparkles,
  Info,
} from "lucide-react";

interface FAQAccordionProps {
  faqs: FAQItem[];
}

const CATEGORIES = [
  "All",
  "Accounts & Waivers",
  "Examinations & Grading",
  "Registrar & Admission",
  "Library & Labs",
  "General",
] as const;

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const pinnedFaqs = useMemo(
    () => filteredFaqs.filter((f) => f.isPinned),
    [filteredFaqs]
  );
  const regularFaqs = useMemo(
    () => filteredFaqs.filter((f) => !f.isPinned),
    [filteredFaqs]
  );

  return (
    <div className="space-y-6">
      {/* Search & Category Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Type your question or query (e.g., fee waiver deadline, grading policy, admit card)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 text-base rounded-xl bg-slate-50 dark:bg-slate-800/60"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pinned Administrative Notices Section */}
      {pinnedFaqs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Pin className="h-4 w-4 rotate-45" />
            <span>Pinned Official Notices & Guidelines</span>
          </div>

          <div className="space-y-3">
            {pinnedFaqs.map((faq) => (
              <div
                key={faq._id}
                className="bg-amber-50/70 dark:bg-amber-950/20 border-2 border-amber-300/80 dark:border-amber-700/60 rounded-xl p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="warning" className="text-[10px] font-bold">
                    {faq.category}
                  </Badge>
                  <span className="flex items-center text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                    <Pin className="h-3 w-3 mr-1" />
                    PINNED NOTICE
                  </span>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {faq.question}
                </h4>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
                {faq.referenceUrl && (
                  <div className="mt-3 pt-2 border-t border-amber-200 dark:border-amber-900/60">
                    <a
                      href={faq.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-1 font-medium"
                    >
                      <span>Official Circular Document</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Accordion FAQs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </h3>
          <span className="text-xs text-slate-400">
            Showing {filteredFaqs.length} entries
          </span>
        </div>

        {regularFaqs.length === 0 && pinnedFaqs.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <Info className="h-8 w-8 mx-auto mb-2 text-slate-400" />
            <p className="font-medium text-sm">No knowledge base articles found.</p>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or switching categories.
            </p>
          </div>
        ) : (
          <Accordion type="multiple" className="w-full">
            {regularFaqs.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id} className="py-1">
                <AccordionTrigger className="text-left font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 transition-colors text-sm">
                  <div className="flex items-center space-x-3 pr-2">
                    <Badge variant="outline" className="text-[10px] shrink-0 font-medium">
                      {faq.category}
                    </Badge>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pl-2 pr-4 pt-1 pb-3 whitespace-pre-line">
                  <p>{faq.answer}</p>
                  {faq.referenceUrl && (
                    <div className="mt-3">
                      <a
                        href={faq.referenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-1"
                      >
                        <span>Official Reference Link</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

"use client";

import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { helpData } from "@/constants/help";
import { Button } from "@/components/ui/button";
import HelpSearch from "./HelpSearch";
import HelpFaqSection from "./HelpFaqSection";
import HelpContactDialog from "./HelpContactDialog";

const HelpPage = () => {
  const [search, setSearch] = useState<string>("");
  const [contactOpen, setContactOpen] = useState<boolean>(false);

  const filteredFaqs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return helpData.faqs;
    }

    return helpData.faqs.filter((faq) => {
      const searchableText = [faq.question, faq.answer].join(" ").toLowerCase();
      return searchableText.includes(normalizedSearch);
    });
  }, [search]);

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8">
        <section className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Help & Support
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Find answers to common questions or reach out to our support team
            when you need extra help.
          </p>
        </section>

        <HelpSearch value={search} onChange={setSearch} />

        <HelpFaqSection faqs={filteredFaqs} />

        <Button
          type="button"
          onClick={() => setContactOpen(true)}
          className="h-11 rounded-xl bg-primary px-6 text-primary-foreground hover:bg-primary/90"
        >
          <Mail data-icon="inline-start" />
          Contact Support
        </Button>

        <HelpContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      </div>
    </main>
  );
};

export default HelpPage;

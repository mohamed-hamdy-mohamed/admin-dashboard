"use client";

import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { getLocalizedFaqs } from "@/lib/localizedContent";
import { Button } from "@/components/ui/button";
import HelpSearch from "./HelpSearch";
import HelpFaqSection from "./HelpFaqSection";
import HelpContactDialog from "./HelpContactDialog";
import { useTranslation } from "@/providers/LanguageProvider";

const HelpPage = () => {
  const { locale, t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const [contactOpen, setContactOpen] = useState<boolean>(false);

  const filteredFaqs = useMemo(() => {
    const faqs = getLocalizedFaqs(locale);
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return faqs;
    }

    return faqs.filter((faq) => {
      const searchableText = [faq.question, faq.answer].join(" ").toLowerCase();
      return searchableText.includes(normalizedSearch);
    });
  }, [locale, search]);

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8">
        <section className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("help.title")}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {t("help.intro")}
          </p>
        </section>

        <HelpSearch value={search} onChange={setSearch} />

        <HelpFaqSection faqs={filteredFaqs} />

        <Button
          type="button"
          onClick={() => setContactOpen(true)}
          className="h-11 w-full rounded-xl bg-primary px-6 text-primary-foreground hover:bg-primary/90 sm:w-auto"
        >
          <Mail data-icon="inline-start" />
          {t("help.contactSupport")}
        </Button>

        <HelpContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      </div>
    </main>
  );
};

export default HelpPage;

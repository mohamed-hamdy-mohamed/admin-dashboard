"use client";

import { HelpFaqItem } from "@/types/help";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/providers/LanguageProvider";

interface HelpFaqSectionProps {
  faqs: HelpFaqItem[];
}

const HelpFaqSection = ({ faqs }: HelpFaqSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="w-full rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          {t("help.faq.title")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("help.faq.subtitle")}
        </p>
      </div>

      {faqs.length > 0 ? (
        <Accordion className="w-full">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-border"
            >
              <AccordionTrigger className="py-4 text-start text-base font-medium text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {t("help.faq.empty")}
        </p>
      )}
    </section>
  );
};

export default HelpFaqSection;

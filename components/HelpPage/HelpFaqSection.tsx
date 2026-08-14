import { HelpFaqItem } from "@/types/help";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface HelpFaqSectionProps {
  faqs: HelpFaqItem[];
}

const HelpFaqSection = ({ faqs }: HelpFaqSectionProps) => {
  return (
    <section className="w-full rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Quick answers to common admin dashboard questions.
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
              <AccordionTrigger className="py-4 text-left text-base font-medium text-foreground hover:no-underline">
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
          No FAQs match your search.
        </p>
      )}
    </section>
  );
};

export default HelpFaqSection;

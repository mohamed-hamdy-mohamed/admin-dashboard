"use client";

import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/providers/LanguageProvider";

interface HelpContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const HelpContactDialog = ({ open, onOpenChange }: HelpContactDialogProps) => {
  const { t } = useTranslation();
  const [formValues, setFormValues] =
    useState<ContactFormValues>(initialFormValues);

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setFormValues(initialFormValues);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-xl border-border sm:max-w-lg" closeLabel={t("common.close")}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t("help.contactDialog.title")}</DialogTitle>
            <DialogDescription>
              {t("help.contactDialog.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="supportName">{t("help.contactDialog.name")}</Label>
              <Input
                id="supportName"
                value={formValues.name}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                className="h-11 rounded-xl"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="supportEmail">{t("help.contactDialog.email")}</Label>
              <Input
                id="supportEmail"
                type="email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="h-11 rounded-xl"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="supportSubject">{t("help.contactDialog.subject")}</Label>
              <Input
                id="supportSubject"
                value={formValues.subject}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    subject: event.target.value,
                  }))
                }
                className="h-11 rounded-xl"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="supportMessage">{t("help.contactDialog.message")}</Label>
              <textarea
                id="supportMessage"
                value={formValues.message}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }
                required
                className={cn(
                  "min-h-28 w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t("common.sendMessage")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HelpContactDialog;

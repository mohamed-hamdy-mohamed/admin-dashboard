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
      <DialogContent className="rounded-xl border-slate-200 sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
            <DialogDescription>
              Send us a message and our team will get back to you shortly.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="supportName">Name</Label>
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
              <Label htmlFor="supportEmail">Email</Label>
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
              <Label htmlFor="supportSubject">Subject</Label>
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
              <Label htmlFor="supportMessage">Message</Label>
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
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-slate-800 text-white hover:bg-slate-700"
            >
              Send Message
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HelpContactDialog;

import type { ReactNode } from "react";
import { Label } from "@/components/atoms/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactNode;
}

const FormField = ({ id, label, children }: FormFieldProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
};

export default FormField;

"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/atoms/ui/input";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type">;

const PasswordInput = ({ className, disabled, ...props }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={cn("pe-10", className)}
        disabled={disabled}
      />
      <button
        type="button"
        disabled={disabled}
        className="absolute inset-y-0 end-0 flex cursor-pointer items-center px-3 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
};

export default PasswordInput;

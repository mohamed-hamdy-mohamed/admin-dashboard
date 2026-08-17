import { memo, type ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/atoms/ui/dialog";

interface EntityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeLabel: string;
  className?: string;
  children: ReactNode;
}

const EntityDialog = ({
  open,
  onOpenChange,
  closeLabel,
  className = "sm:max-w-lg",
  children,
}: EntityDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className} closeLabel={closeLabel}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default memo(EntityDialog);

import { Button } from "@/shared/atoms/button";
import { DialogFooter } from "@/shared/atoms/dialog";

interface DialogFormActionsProps {
  cancelLabel: string;
  submitLabel: string;
  onCancel: () => void;
}

const DialogFormActions = ({
  cancelLabel,
  submitLabel,
  onCancel,
}: DialogFormActionsProps) => {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button type="submit">{submitLabel}</Button>
    </DialogFooter>
  );
};

export default DialogFormActions;

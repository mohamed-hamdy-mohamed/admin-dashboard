import { useState } from "react";

export const useLazyMount = (open: boolean) => {
  const [mounted, setMounted] = useState(false);

  if (open && !mounted) {
    setMounted(true);
  }

  return mounted;
};

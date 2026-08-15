"use client";

import { useServerInsertedHTML } from "next/navigation";
import { languageInitScript } from "@/constants/language";
import { themeInitScript } from "@/constants/theme";

const BlockingInitScripts = () => {
  useServerInsertedHTML(() => (
    <>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: themeInitScript }}
      />
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: languageInitScript }}
      />
    </>
  ));

  return null;
};

export default BlockingInitScripts;

import { SETTINGS_STORAGE_KEY } from "@/util/settingsStorage";

export const languageInitScript = `(function(){try{var k=${JSON.stringify(SETTINGS_STORAGE_KEY)},l="en",s=localStorage.getItem(k);if(s){var p=JSON.parse(s);if(p.appearance&&p.appearance.language==="ar")l="ar"}document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr"}catch(e){}})();`;

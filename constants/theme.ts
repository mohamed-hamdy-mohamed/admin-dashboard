export const THEME_STORAGE_KEY = "admin-dashboard-theme";

export const THEME_DEFAULT = "light";

export const THEME_CLASS_NAMES = ["light", "dark"] as const;

export const themeInitScript = `(function(){try{var e=document.documentElement,k=${JSON.stringify(THEME_STORAGE_KEY)},d=${JSON.stringify(THEME_DEFAULT)},c=${JSON.stringify(THEME_CLASS_NAMES)},s=localStorage.getItem(k)||d,r=s==="system"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":s;e.classList.remove.apply(e.classList,c);e.classList.add(r);e.style.colorScheme=r}catch(e){}})();`;

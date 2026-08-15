export const THEME_STORAGE_KEY = "admin-dashboard-theme";

export const THEME_DEFAULT = "light";

export const THEME_CLASS_NAMES = ["light", "dark"] as const;

export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)},d=${JSON.stringify(THEME_DEFAULT)},c=${JSON.stringify(THEME_CLASS_NAMES)},el=document.documentElement,t=localStorage.getItem(k)||d;if(t==="system")t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";el.classList.remove.apply(el.classList,c);el.classList.add(t);if(c.indexOf(t)!==-1)el.style.colorScheme=t}catch(e){}})();`;

/* open everything in new tab */
user_pref("browser.search.openintab", true);
user_pref("browser.tabs.loadBookmarksInTabs", true);
user_pref("browser.urlbar.openintab", true);

/* disable url bar suggestions */
user_pref("browser.urlbar.maxRichResults", 0);
user_pref("browser.urlbar.suggest.bookmark", false);
user_pref("browser.urlbar.suggest.history", false);
user_pref("browser.urlbar.suggest.openpage", false);
user_pref("browser.urlbar.suggest.searches", false);
user_pref("browser.urlbar.suggest.topsites", false);

/* block video autoplay */
user_pref("media.autoplay.blocking_policy", 2);
user_pref("media.autoplay.default", 5);

/* block notification */
user_pref("dom.webnotifications.enabled", false);
user_pref("permissions.default.desktop-notification", 2);

/* block gps */
user_pref("permissions.default.geo", 2);

/* enable userchrome.css */
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

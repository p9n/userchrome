/* open everything in new tab */
user_pref("browser.search.openintab", true);
user_pref("browser.tabs.loadBookmarksInTabs", true);
user_pref("browser.urlbar.openintab", true);

/* disable url bar suggestions */
user_pref("browser.urlbar.maxRichResults", 0);
user_pref("browser.urlbar.showSearchSuggestionsFirst", false);
user_pref("browser.urlbar.suggest.bookmark", false);
user_pref("browser.urlbar.suggest.engines", false);
user_pref("browser.urlbar.suggest.history", false);
user_pref("browser.urlbar.suggest.openpage", false);
user_pref("browser.urlbar.suggest.quicksuggest", false);
user_pref("browser.urlbar.suggest.searches", false);
user_pref("browser.urlbar.suggest.topsites", false);

/* diable url bar shortcut */
user_pref("browser.urlbar.shortcuts.bookmarks", false);
user_pref("browser.urlbar.shortcuts.history", false);
user_pref("browser.urlbar.shortcuts.tabs", false);

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

/* support mouse gesture in non-windows */
user_pref("ui.context_menus.after_mouseup", true);

/* domain whitelist for internal sites */
user_pref("browser.fixup.domainwhitelist.b", true);
user_pref("browser.fixup.domainwhitelist.c", true);
user_pref("browser.fixup.domainwhitelist.cl", true);
user_pref("browser.fixup.domainwhitelist.crrev", true);
user_pref("browser.fixup.domainwhitelist.cs", true);
user_pref("browser.fixup.domainwhitelist.g", true);
user_pref("browser.fixup.domainwhitelist.go", true);
user_pref("browser.fixup.domainwhitelist.m", true);
user_pref("browser.fixup.domainwhitelist.moma", true);
user_pref("browser.fixup.domainwhitelist.t", true);
user_pref("browser.fixup.domainwhitelist.who", true);

/* disable dragging to new window */
user_pref("browser.tabs.allowTabDetach", false);

/* Confirm before quitting */
user_pref("browser.warnOnQuit", true);
user_pref("browser.warnOnQuitShortcut", true);

/* disable url prefix suffix auto fix */
user_pref("browser.fixup.alternate.enabled", false);

/*
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1712734
 * disable native context menu on macos
 */
user_pref("widget.macos.native-context-menus", false);

/* disable download panel popup */
user_pref("browser.download.alwaysOpenPanel", false);

/* disable TSF for win10 */
user_pref("intl.tsf.enabled", false);

/* Allow client certs on CORS preflight */
user_perf("network.cors_preflight.allow_client_cert", true);

/* Hide tab preview */
user_pref("browser.tabs.hoverPreview.enabled", false);
user_pref("browser.tabs.hoverPreview.showThumbnails", false);

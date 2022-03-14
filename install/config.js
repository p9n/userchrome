// skip 1st line
/*
 2019-10-22 23:00
*/

try {

    let {
      classes: Cc,
      interfaces: Ci,
      utils: Cu
    } = Components;

    Cu.import('resource://gre/modules/Services.jsm');
    Cu.import('resource://gre/modules/osfile.jsm');

    const scripts = [
      'mouseGestures.js',
      'hotkey.js',
    ];

    function UserChrome_js() {
      Services.obs.addObserver(this, 'domwindowopened', false);
    };

    UserChrome_js.prototype = {
      observe: function (aSubject, aTopic, aData) {
          aSubject.addEventListener('DOMContentLoaded', this, true);
      },

      handleEvent: function (aEvent) {
        let document = aEvent.originalTarget;
        if (document.location && document.location.protocol == 'chrome:') {
          for (const script of scripts) {
            let file = Services.dirsvc.get('UChrm', Ci.nsIFile);
            file.append(script);
            let fileURL = Services.io.getProtocolHandler('file')
                          .QueryInterface(Ci.nsIFileProtocolHandler)
                          .getURLSpecFromActualFile(file) + "?" + file.lastModifiedTime;
            Services.scriptloader.loadSubScript(fileURL, document.defaultView, 'UTF-8');
          }
        }
      },
    };

    if (!Cc['@mozilla.org/xre/app-info;1'].getService(Ci.nsIXULRuntime).inSafeMode)
      new UserChrome_js();

} catch(ex) {};

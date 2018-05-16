(() => {
  class UcjsMouseGestures {
    constructor() {
      this.lastX = 0;
      this.lastY = 0;
      this.directionChain = '';
      this.hideFireContext = false;

      this.GESTURES =  {
        'L': {name: 'Back', cmd: () => gBrowser.goBack()},
        'R': {name: 'Forward', cmd: () => gBrowser.goForward()},

        'UD': {name: 'Reload', cmd: () => gBrowser.reload()},
        'UDU': {name: 'Reload (Skip Cache)', cmd: () => gBrowser.reloadWithFlags(gBrowser.webNavigation.LOAD_FLAGS_BYPASS_CACHE)},

        'DR': {name: 'Close Window', cmd: () => document.getElementById('cmd_closeWindow').doCommand()},
        'LD': {name: 'Close Tab', cmd: () => gBrowser.removeCurrentTab()},

        'LR': {name: 'Previous Tab', cmd: () => gBrowser.tabContainer.advanceSelectedTab(-1, true)},
        'RL': {name: 'Next Tab', cmd: () => gBrowser.tabContainer.advanceSelectedTab(1, true)},
      }
    }

    init() {
      let self = this;
      ['mousedown', 'mousemove', 'mouseup', 'contextmenu'].forEach(type => {
        gBrowser.mPanelContainer.addEventListener(type, self, true);
      });
      gBrowser.mPanelContainer.addEventListener('unload', () => {
        ['mousedown', 'mousemove', 'mouseup', 'contextmenu'].forEach(type => {
          gBrowser.mPanelContainer.removeEventListener(type, self, true);
        });
      }, false);
    }

    handleEvent(event) {
      var leftClick = (event.buttons & 1) != 0;
      var rightClick = (event.buttons & 2) != 0;

      switch (event.type) {
      case 'mousedown':
        if (rightClick) {
          this.hideFireContext = false;
          [this.lastX, this.lastY, this.directionChain] = [event.screenX, event.screenY, ''];
        }
        if (leftClick) {
          this.stopGesture();
        }
        break;
      case 'mousemove':
        if (rightClick) {
          let[subX, subY] = [event.screenX - this.lastX, event.screenY - this.lastY];
          let[distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
          let direction;
          if (distX < 10 && distY < 10) return;
          if (distX > distY) direction = subX < 0 ? 'L' : 'R';
          else direction = subY < 0 ? 'U' : 'D';
          if (!this.xdTrailArea) {
            this.xdTrailArea = document.createElement('hbox');
            let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
            canvas.setAttribute('width', window.screen.width);
            canvas.setAttribute('height', window.screen.height);
            this.xdTrailAreaContext = canvas.getContext('2d');
            this.xdTrailArea.style.cssText = '-moz-user-focus: none !important;-moz-user-select: none !important;display: -moz-box !important;box-sizing: border-box !important;pointer-events: none !important;margin: 0 !important;padding: 0 !important;width: 100% !important;height: 100% !important;border: none !important;box-shadow: none !important;overflow: hidden !important;background: none !important;opacity: 0.9 !important;position: fixed !important;z-index: 2147483647 !important;';
            this.xdTrailArea.appendChild(canvas);
            gBrowser.selectedBrowser.parentNode.insertBefore(this.xdTrailArea, gBrowser.selectedBrowser.nextSibling);
          }
          if (this.xdTrailAreaContext) {
            this.hideFireContext = true;
            this.xdTrailAreaContext.strokeStyle = '#0065FF';
            this.xdTrailAreaContext.lineJoin = 'round';
            this.xdTrailAreaContext.lineCap = 'round';
            this.xdTrailAreaContext.lineWidth = 3;
            this.xdTrailAreaContext.beginPath();
            this.xdTrailAreaContext.moveTo(this.lastX - gBrowser.selectedBrowser.boxObject.screenX, this.lastY - gBrowser.selectedBrowser.boxObject.screenY);
            this.xdTrailAreaContext.lineTo(event.screenX - gBrowser.selectedBrowser.boxObject.screenX, event.screenY - gBrowser.selectedBrowser.boxObject.screenY);
            this.xdTrailAreaContext.closePath();
            this.xdTrailAreaContext.stroke();
            this.lastX = event.screenX;
            this.lastY = event.screenY;
          }
          if (direction != this.directionChain.charAt(this.directionChain.length - 1)) {
            this.directionChain += direction;
            XULBrowserWindow.statusTextField.label = this.GESTURES[this.directionChain] ? 'Gesture: ' + this.directionChain + ' ' + this.GESTURES[this.directionChain].name : 'Unknown Gesture:' + this.directionChain;
          }
        }
        break;
      case 'mouseup':
        if (this.directionChain) {
          this.stopGesture();
        }
        break;
      case 'contextmenu':
        if (rightClick || this.hideFireContext) {
          this.hideFireContext = false;
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      }
    }

    stopGesture() {
      if (this.GESTURES[this.directionChain]) this.GESTURES[this.directionChain].cmd();
      if (this.xdTrailArea) {
        this.xdTrailArea.parentNode.removeChild(this.xdTrailArea);
        this.xdTrailArea = null;
        this.xdTrailAreaContext = null;
      }
      this.directionChain = '';
      setTimeout(() => XULBrowserWindow.statusTextField.label = '', 2000);
      this.hideFireContext = true;
    }
  };

  if (!window.ucjsMouseGestures) {
    window.ucjsMouseGestures = new UcjsMouseGestures();
    ucjsMouseGestures.init();
  }
})(); 


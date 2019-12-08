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
      'UDU': {name: 'Reload (Skip Cache)',
              cmd: () => gBrowser.reloadWithFlags(
                  gBrowser.webNavigation.LOAD_FLAGS_BYPASS_CACHE)},

      'DR': {name: 'Close Window',
             cmd: () => document.getElementById('cmd_closeWindow')
                .doCommand()},
      'LD': {name: 'Close Tab', cmd: () => gBrowser.removeCurrentTab()},

      'LR': {name: 'Previous Tab',
             cmd: () => gBrowser.tabContainer.advanceSelectedTab(-1, true)},
      'RL': {name: 'Next Tab',
             cmd: () => gBrowser.tabContainer.advanceSelectedTab(1, true)},
    }
  }

  init() {
    ['mousedown', 'mousemove', 'mouseup', 'contextmenu'].forEach(type => {
      gBrowser.tabpanels.addEventListener(type, this, true);
    });
    gBrowser.tabpanels.addEventListener('unload', () => {
      ['mousedown', 'mousemove', 'mouseup', 'contextmenu'].forEach(type => {
        gBrowser.tabpanels.removeEventListener(type, this, true);
      });
    }, false);
  }

  createTrailArea() {
    let canvas = document.createElementNS(
        'http://www.w3.org/1999/xhtml', 'canvas');
    const browser = gBrowser.selectedBrowser;
    canvas.setAttribute('width', browser.clientWidth);
    canvas.setAttribute('height', browser.clientHeight);
    canvas.style.position = 'fixed';

    let context = canvas.getContext('2d');

    if (context) {
      context.strokeStyle = '#0065FF';
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.lineWidth = 3;
    }

    return canvas;
  }

  handleEvent(event) {
    var leftClick = (event.buttons & 1) != 0;
    var rightClick = (event.buttons & 2) != 0;

    switch (event.type) {
    case 'mousedown':
      if (rightClick) {
        this.hideFireContext = false;
        [this.lastX, this.lastY, this.directionChain] =
            [event.screenX, event.screenY, ''];
      }
      if (leftClick) {
        this.stopGesture();
      }
      break;
    case 'mousemove':
      if (rightClick) {
        let [subX, subY] =
            [event.screenX - this.lastX, event.screenY - this.lastY];
        let [distX, distY] = [Math.abs(subX), Math.abs(subY)];
        if (distX < 10 && distY < 10) return;
        let direction;
        if (distX > distY) direction = subX < 0 ? 'L' : 'R';
        else direction = subY < 0 ? 'U' : 'D';
        if (!this.xdTrailArea) {
          this.xdTrailArea = this.createTrailArea();
          gBrowser.selectedBrowser.parentNode.insertBefore(
              this.xdTrailArea, gBrowser.selectedBrowser.nextSibling);
        }

        let context = this.xdTrailArea.getContext('2d');
        if (context) {
          this.hideFireContext = true;
          context.beginPath();
          context.moveTo(
              this.lastX - gBrowser.selectedBrowser.screenX,
              this.lastY - gBrowser.selectedBrowser.screenY);
          context.lineTo(
              event.screenX - gBrowser.selectedBrowser.screenX,
              event.screenY - gBrowser.selectedBrowser.screenY);
          context.closePath();
          context.stroke();
          this.lastX = event.screenX;
          this.lastY = event.screenY;
        }

        if (direction != this.directionChain.charAt(
            this.directionChain.length - 1)) {
          this.directionChain += direction;
          StatusPanel._label = (this.GESTURES[this.directionChain] ?
                                'Gesture: ' + this.directionChain + ' ' +
                                    this.GESTURES[this.directionChain].name :
                                'Unknown Gesture: ' + this.directionChain);
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
    if (this.GESTURES[this.directionChain])
      this.GESTURES[this.directionChain].cmd();
    if (this.xdTrailArea) {
      this.xdTrailArea.parentNode.removeChild(this.xdTrailArea);
      this.xdTrailArea = null;
    }
    this.directionChain = '';
    setTimeout(() => StatusPanel._label = '', 2000);
    this.hideFireContext = true;
  }
};

if (!window.ucjsMouseGestures) {
  /* HACK: wait 0.5s for gBrowser to init */
  setTimeout(() => {
    window.ucjsMouseGestures = new UcjsMouseGestures();
    ucjsMouseGestures.init();
  }, 500);
}

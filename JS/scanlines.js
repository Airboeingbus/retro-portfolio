// CRT Scanlines Manager - Global Module
class CRTScanlines {
  constructor() {
    // Default to true (CRT mode ON by default)
    this.isActive = localStorage.getItem('crtMode') === null 
      ? true 
      : localStorage.getItem('crtMode') === 'true';
    this.init();
  }

  init() {
    // Create scanlines overlay element
    if (!document.querySelector('.crt-scanlines')) {
      const scanlines = document.createElement('div');
      scanlines.className = 'crt-scanlines';
      document.body.appendChild(scanlines);
    }

    // Create vignette overlay element
    if (!document.querySelector('.crt-vignette')) {
      const vignette = document.createElement('div');
      vignette.className = 'crt-vignette';
      document.body.appendChild(vignette);
    }

    // Create status indicator
    if (!document.querySelector('.crt-status')) {
      const status = document.createElement('div');
      status.className = 'crt-status';
      document.body.appendChild(status);
    }

    // Apply saved state or default (enabled)
    if (this.isActive) {
      this.enable();
    }

    // Listen for toggle command from other scripts
    window.addEventListener('crtToggle', () => this.toggle());
  }

  enable() {
    this.isActive = true;
    document.querySelector('.crt-scanlines').classList.add('active');
    document.querySelector('.crt-vignette').classList.add('active');
    document.querySelector('.crt-status').classList.add('active');
    document.body.classList.add('crt-active');
    localStorage.setItem('crtMode', 'true');
  }

  disable() {
    this.isActive = false;
    document.querySelector('.crt-scanlines').classList.remove('active');
    document.querySelector('.crt-vignette').classList.remove('active');
    document.querySelector('.crt-status').classList.remove('active');
    document.body.classList.remove('crt-active');
    localStorage.setItem('crtMode', 'false');
  }

  toggle() {
    if (this.isActive) {
      this.disable();
    } else {
      this.enable();
    }
  }

  getStatus() {
    return this.isActive;
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.crtManager = new CRTScanlines();
});

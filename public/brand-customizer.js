(function() {
  if (typeof window === 'undefined') return;

  // Add styles dynamically to avoid polluting main stylesheet files
  const styles = `
    /* Floating Customizer Button */
    .color-customizer-trigger {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 99999;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .color-customizer-trigger:hover {
      transform: scale(1.08) rotate(15deg);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.6);
      background: rgba(20, 30, 55, 0.95);
    }
    .color-customizer-trigger svg {
      width: 24px;
      height: 24px;
      fill: none;
      stroke: #f1f5f9;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Main Customizer Panel */
    .color-customizer-panel {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 340px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
      z-index: 99998;
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #f1f5f9;
      user-select: none;
      animation: customizer-fade-in 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    @keyframes customizer-fade-in {
      from { opacity: 0; transform: translateY(10px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* Drag Handle Header */
    .customizer-header {
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: move;
    }
    .customizer-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .customizer-title {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #cbd5e1;
    }
    .customizer-drag-icon {
      width: 14px;
      height: 14px;
      fill: #64748b;
    }
    .customizer-close {
      background: none;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: all 0.2s;
    }
    .customizer-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #f1f5f9;
    }

    /* Content Area */
    .customizer-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-height: calc(100vh - 180px);
      overflow-y: auto;
    }
    .customizer-content::-webkit-scrollbar {
      width: 6px;
    }
    .customizer-content::-webkit-scrollbar-track {
      background: transparent;
    }
    .customizer-content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
    }
    .customizer-content::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .customizer-section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #94a3b8;
      margin-bottom: 8px;
    }

    /* Palettes List */
    .preset-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .preset-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 8px 12px;
      cursor: pointer;
      width: 100%;
      text-align: left;
      transition: all 0.2s ease;
    }
    .preset-button:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateY(-1px);
    }
    .preset-button.is-active {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
    }
    .preset-name {
      font-size: 12px;
      font-weight: 500;
      color: #cbd5e1;
    }
    .preset-dots {
      display: flex;
      gap: 4px;
    }
    .preset-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Custom Pickers */
    .pickers-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .picker-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.03);
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .picker-label {
      font-size: 12px;
      color: #cbd5e1;
    }
    .picker-input-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .color-input-preview {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      overflow: hidden;
      position: relative;
    }
    .color-input-native {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      transform: scale(2);
    }
    .color-code-text {
      font-family: monospace;
      font-size: 11px;
      color: #94a3b8;
      background: rgba(0, 0, 0, 0.2);
      padding: 2px 6px;
      border-radius: 4px;
    }

    /* Accessibility Box */
    .customizer-info-box {
      background: rgba(14, 116, 144, 0.15);
      border: 1px solid rgba(14, 116, 144, 0.25);
      border-radius: 8px;
      padding: 12px;
      font-size: 12px;
      line-height: 1.5;
      color: #a5f3fc;
    }
    .info-box-title {
      font-weight: 600;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .contrast-badge {
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
    }

    /* Code Snippet Box */
    .css-snippet-box {
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 12px;
      font-family: monospace;
      font-size: 11px;
      color: #38bdf8;
      position: relative;
      overflow: hidden;
    }
    .css-snippet-code {
      white-space: pre-wrap;
      word-break: break-all;
    }
    .copy-snippet-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #cbd5e1;
      padding: 4px 8px;
      font-size: 10px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .copy-snippet-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
    }
    .copy-snippet-btn.copied {
      background: rgba(16, 185, 129, 0.2);
      border-color: rgba(16, 185, 129, 0.4);
      color: #34d399;
    }
  `;

  // Inject Styles
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // Palettes Preset Config
  const presets = [
    {
      name: 'CAPS Official (Navy/Gold)',
      primary: '#20315f',
      accent: '#bb8d2f',
      secondary: '#161b33',
      background: '#f9f9f9'
    },
    {
      name: 'Original Cherry',
      primary: '#293762',
      accent: '#b21e3b',
      secondary: '#383d4e',
      background: '#f0ede8'
    },
    {
      name: 'Academic Royal (Purple/Gold)',
      primary: '#1e1b4b',
      accent: '#d97706',
      secondary: '#312e81',
      background: '#fafaf9'
    },
    {
      name: 'Emerald Corporate',
      primary: '#064e3b',
      accent: '#10b981',
      secondary: '#0f172a',
      background: '#f4fbf7'
    },
    {
      name: 'Midnight Dark Mode',
      primary: '#020617',
      accent: '#38bdf8',
      secondary: '#f1f5f9',
      background: '#0b0f19'
    }
  ];

  // Default values
  const defaultTheme = presets[0];

  // Load saved colors from localStorage if they exist
  let currentTheme = {
    primary: localStorage.getItem('caps-theme-primary') || defaultTheme.primary,
    accent: localStorage.getItem('caps-theme-accent') || defaultTheme.accent,
    secondary: localStorage.getItem('caps-theme-secondary') || defaultTheme.secondary,
    background: localStorage.getItem('caps-theme-background') || defaultTheme.background
  };

  // Setup initial variables on page load
  updateTheme(currentTheme, false);

  // Function to apply variables to the document
  function updateTheme(theme, save = true) {
    currentTheme = theme;

    // Apply primary navy (dark blue, uniforms)
    document.documentElement.style.setProperty('--_color---dark-blue', theme.primary);
    const rgbPrimary = hexToRgb(theme.primary);
    if (rgbPrimary) {
      document.documentElement.style.setProperty('--_color---dark-blue-30', `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.3)`);
    }

    // Apply accent gold (cherry red)
    document.documentElement.style.setProperty('--_color---cherry', theme.accent);
    document.documentElement.style.setProperty('--_color---bright-cherry', theme.accent);
    document.documentElement.style.setProperty('--_theme---text-accent', theme.accent);
    document.documentElement.style.setProperty('--_theme---link', theme.accent);
    document.documentElement.style.setProperty('--_theme---link-hover', theme.accent);
    document.documentElement.style.setProperty('--_theme---button-primary--background', theme.accent);
    document.documentElement.style.setProperty('--_theme---button-primary--background-hover', theme.accent);
    document.documentElement.style.setProperty('--_theme---selection--background', theme.accent);
    document.documentElement.style.setProperty('--_theme---detail--primary', theme.accent);

    // Apply secondary slate (text, dark details)
    document.documentElement.style.setProperty('--_color---uniform', theme.secondary);
    document.documentElement.style.setProperty('--_color---cherry-black', theme.secondary);
    document.documentElement.style.setProperty('--_theme---text', theme.secondary);

    // Apply background light (linen background)
    document.documentElement.style.setProperty('--_color---linen', theme.background);
    document.documentElement.style.setProperty('--_theme---background-secondary', theme.background);
    const rgbBg = hexToRgb(theme.background);
    if (rgbBg) {
      document.documentElement.style.setProperty('--_color---linen-30', `rgba(${rgbBg.r}, ${rgbBg.g}, ${rgbBg.b}, 0.3)`);
    }

    // If background is extremely dark, make body bg follow it
    if (rgbBg && (rgbBg.r + rgbBg.g + rgbBg.b) < 150) {
      // Dark mode active
      document.documentElement.style.setProperty('--_theme---background', theme.background);
      // Ensure body text is highly readable
      document.body.style.backgroundColor = theme.background;
      document.body.style.color = theme.secondary;
    } else {
      document.documentElement.style.removeProperty('--_theme---background');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }

    // Save
    if (save) {
      localStorage.setItem('caps-theme-primary', theme.primary);
      localStorage.setItem('caps-theme-accent', theme.accent);
      localStorage.setItem('caps-theme-secondary', theme.secondary);
      localStorage.setItem('caps-theme-background', theme.background);
    }

    // Update UI components
    updateUI(theme);
  }

  // Update UI component values
  function updateUI(theme) {
    // 1. Text Codes
    const txtPrimary = document.querySelector('.color-code-primary');
    const txtAccent = document.querySelector('.color-code-accent');
    const txtSecondary = document.querySelector('.color-code-secondary');
    const txtBackground = document.querySelector('.color-code-background');

    if (txtPrimary) txtPrimary.textContent = theme.primary.toUpperCase();
    if (txtAccent) txtAccent.textContent = theme.accent.toUpperCase();
    if (txtSecondary) txtSecondary.textContent = theme.secondary.toUpperCase();
    if (txtBackground) txtBackground.textContent = theme.background.toUpperCase();

    // 2. Pickers Value and Previews
    const pickPrimary = document.querySelector('.picker-primary');
    const pickAccent = document.querySelector('.picker-accent');
    const pickSecondary = document.querySelector('.picker-secondary');
    const pickBackground = document.querySelector('.picker-background');

    if (pickPrimary) pickPrimary.value = theme.primary;
    if (pickAccent) pickAccent.value = theme.accent;
    if (pickSecondary) pickSecondary.value = theme.secondary;
    if (pickBackground) pickBackground.value = theme.background;

    const prevPrimary = document.querySelector('.prev-primary');
    const prevAccent = document.querySelector('.prev-accent');
    const prevSecondary = document.querySelector('.prev-secondary');
    const prevBackground = document.querySelector('.prev-background');

    if (prevPrimary) prevPrimary.style.backgroundColor = theme.primary;
    if (prevAccent) prevAccent.style.backgroundColor = theme.accent;
    if (prevSecondary) prevSecondary.style.backgroundColor = theme.secondary;
    if (prevBackground) prevBackground.style.backgroundColor = theme.background;

    // 3. Highlight Active Preset
    const presetButtons = document.querySelectorAll('.preset-button');
    presetButtons.forEach(btn => {
      const idx = parseInt(btn.dataset.index);
      const p = presets[idx];
      if (p &&
          p.primary.toLowerCase() === theme.primary.toLowerCase() &&
          p.accent.toLowerCase() === theme.accent.toLowerCase() &&
          p.secondary.toLowerCase() === theme.secondary.toLowerCase() &&
          p.background.toLowerCase() === theme.background.toLowerCase()) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    // 4. Update snippet output
    const codeEl = document.querySelector('.css-code-vars');
    if (codeEl) {
      codeEl.textContent = `:root {\n  --color-primary-navy: ${theme.primary.toLowerCase()};\n  --color-accent-gold: ${theme.accent.toLowerCase()};\n  --color-secondary-slate: ${theme.secondary.toLowerCase()};\n  --color-background-light: ${theme.background.toLowerCase()};\n}`;
    }

    // 5. Contrast Calculator
    updateContrastInfo(theme);
  }

  // Relative Luminance & Contrast Ratio calculation (WCAG guidelines)
  function getLuminance(r, g, b) {
    const a = [r, g, b].map(function(v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function getContrastRatio(hex1, hex2) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return 1;
    
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  }

  function updateContrastInfo(theme) {
    const contrastAccent = getContrastRatio(theme.accent, theme.background);
    const contrastBody = getContrastRatio(theme.secondary, theme.background);
    
    const accentRatio = contrastAccent.toFixed(2);
    const bodyRatio = contrastBody.toFixed(2);
    
    const statusTextEl = document.querySelector('.contrast-status-text');
    const badgeEl = document.querySelector('.contrast-badge');
    
    if (!statusTextEl || !badgeEl) return;
    
    statusTextEl.innerHTML = `
      Accent vs Background: <strong>${accentRatio}:1</strong><br>
      Body Text vs Background: <strong>${bodyRatio}:1</strong>
    `;
    
    if (contrastBody >= 4.5 && contrastAccent >= 3.0) {
      badgeEl.textContent = 'WCAG Pass (AA)';
      badgeEl.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
      badgeEl.style.color = '#34d399';
    } else if (contrastBody >= 3.0) {
      badgeEl.textContent = 'Marginal Contrast';
      badgeEl.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
      badgeEl.style.color = '#fbbf24';
    } else {
      badgeEl.textContent = 'Low Contrast Warning';
      badgeEl.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
      badgeEl.style.color = '#f87171';
    }
  }

  // Create UI Elements
  const triggerEl = document.createElement('div');
  triggerEl.className = 'color-customizer-trigger';
  triggerEl.setAttribute('title', 'Change Brand Colors');
  triggerEl.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C4.94541 19.088 5 19.208 5 19.333V20C5 21.1046 5.89543 22 7 22H12Z" />
      <circle cx="7.5" cy="10.5" r="1.5" fill="#f1f5f9"/>
      <circle cx="11.5" cy="7.5" r="1.5" fill="#f1f5f9"/>
      <circle cx="16.5" cy="9.5" r="1.5" fill="#f1f5f9"/>
      <circle cx="15.5" cy="14.5" r="1.5" fill="#f1f5f9"/>
    </svg>
  `;

  const panelEl = document.createElement('div');
  panelEl.className = 'color-customizer-panel';
  panelEl.innerHTML = `
    <div class="customizer-header">
      <div class="customizer-title-wrap">
        <svg class="customizer-drag-icon" viewBox="0 0 24 24" width="14" height="14">
          <path d="M9 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm10-14a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fill="currentColor"/>
        </svg>
        <span class="customizer-title">Theme Visualizer</span>
      </div>
      <button class="customizer-close" title="Close Panel">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="customizer-content">
      <div class="presets-container">
        <div class="customizer-section-title">Color Palettes</div>
        <div class="preset-list">
          ${presets.map((p, idx) => `
            <button class="preset-button" data-index="${idx}" title="${p.name}">
              <span class="preset-name">${p.name}</span>
              <div class="preset-dots">
                <span class="preset-dot" style="background-color: ${p.primary};"></span>
                <span class="preset-dot" style="background-color: ${p.accent};"></span>
                <span class="preset-dot" style="background-color: ${p.secondary};"></span>
                <span class="preset-dot" style="background-color: ${p.background};"></span>
              </div>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="pickers-container">
        <div class="customizer-section-title">Custom Brand Colors</div>
        
        <div class="picker-row">
          <span class="picker-label">Primary (Navy)</span>
          <div class="picker-input-wrap">
            <span class="color-code-text color-code-primary">${currentTheme.primary.toUpperCase()}</span>
            <div class="color-input-preview prev-primary" style="background-color: ${currentTheme.primary}">
              <input type="color" class="color-input-native picker-primary" value="${currentTheme.primary}">
            </div>
          </div>
        </div>

        <div class="picker-row">
          <span class="picker-label">Accent (Gold)</span>
          <div class="picker-input-wrap">
            <span class="color-code-text color-code-accent">${currentTheme.accent.toUpperCase()}</span>
            <div class="color-input-preview prev-accent" style="background-color: ${currentTheme.accent}">
              <input type="color" class="color-input-native picker-accent" value="${currentTheme.accent}">
            </div>
          </div>
        </div>

        <div class="picker-row">
          <span class="picker-label">Secondary (Slate)</span>
          <div class="picker-input-wrap">
            <span class="color-code-text color-code-secondary">${currentTheme.secondary.toUpperCase()}</span>
            <div class="color-input-preview prev-secondary" style="background-color: ${currentTheme.secondary}">
              <input type="color" class="color-input-native picker-secondary" value="${currentTheme.secondary}">
            </div>
          </div>
        </div>

        <div class="picker-row">
          <span class="picker-label">Background (Light)</span>
          <div class="picker-input-wrap">
            <span class="color-code-text color-code-background">${currentTheme.background.toUpperCase()}</span>
            <div class="color-input-preview prev-background" style="background-color: ${currentTheme.background}">
              <input type="color" class="color-input-native picker-background" value="${currentTheme.background}">
            </div>
          </div>
        </div>
      </div>

      <div class="customizer-info-box">
        <div class="info-box-title">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01"/>
          </svg>
          Accessibility Check
        </div>
        <div class="contrast-status-text">Contrast: Calculating...</div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
          <span>Contrast Status</span>
          <span class="contrast-badge">Checking...</span>
        </div>
      </div>

      <div>
        <div class="customizer-section-title">CSS Variables Output</div>
        <div class="css-snippet-box">
          <button class="copy-snippet-btn">Copy CSS</button>
          <div class="css-snippet-code css-code-vars">:root {
  --color-primary-navy: ${currentTheme.primary.toLowerCase()};
  --color-accent-gold: ${currentTheme.accent.toLowerCase()};
  --color-secondary-slate: ${currentTheme.secondary.toLowerCase()};
  --color-background-light: ${currentTheme.background.toLowerCase()};
}</div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(triggerEl);
  document.body.appendChild(panelEl);

  // Initialize values
  updateUI(currentTheme);

  // Toggle Panel
  triggerEl.addEventListener('click', function(e) {
    if (isDraggingTrigger) return;
    const isOpen = panelEl.style.display === 'flex';
    panelEl.style.display = isOpen ? 'none' : 'flex';
    if (!isOpen) {
      if (!panelEl.style.left) {
        panelEl.style.right = '24px';
        panelEl.style.bottom = '96px';
        panelEl.style.top = '';
      }
    }
  });

  // Close Panel
  panelEl.querySelector('.customizer-close').addEventListener('click', function() {
    panelEl.style.display = 'none';
  });

  // Preset Buttons click listener
  panelEl.querySelectorAll('.preset-button').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(this.dataset.index);
      const p = presets[idx];
      if (p) {
        updateTheme(p);
      }
    });
  });

  // Individual picker listeners
  const pickPrimary = panelEl.querySelector('.picker-primary');
  const pickAccent = panelEl.querySelector('.picker-accent');
  const pickSecondary = panelEl.querySelector('.picker-secondary');
  const pickBackground = panelEl.querySelector('.picker-background');

  function getThemeFromPickers() {
    return {
      primary: pickPrimary.value,
      accent: pickAccent.value,
      secondary: pickSecondary.value,
      background: pickBackground.value
    };
  }

  [pickPrimary, pickAccent, pickSecondary, pickBackground].forEach(picker => {
    picker.addEventListener('input', function() {
      const theme = getThemeFromPickers();
      updateTheme(theme);
    });
    picker.addEventListener('change', function() {
      const theme = getThemeFromPickers();
      updateTheme(theme);
    });
  });

  // Copy CSS snippet
  const copyBtn = panelEl.querySelector('.copy-snippet-btn');
  copyBtn.addEventListener('click', function() {
    const snippet = panelEl.querySelector('.css-code-vars').textContent;
    navigator.clipboard.writeText(snippet).then(() => {
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copy CSS';
        copyBtn.classList.remove('copied');
      }, 2000);
    });
  });

  // Dragging the Trigger button
  let isDraggingTrigger = false;
  let triggerStartX, triggerStartY;
  let triggerStartLeft, triggerStartTop;

  triggerEl.addEventListener('mousedown', startDragTrigger);
  triggerEl.addEventListener('touchstart', startDragTrigger, { passive: false });

  function startDragTrigger(e) {
    if (e.type === 'touchstart') {
      triggerStartX = e.touches[0].clientX;
      triggerStartY = e.touches[0].clientY;
    } else {
      triggerStartX = e.clientX;
      triggerStartY = e.clientY;
    }

    const rect = triggerEl.getBoundingClientRect();
    triggerStartLeft = rect.left;
    triggerStartTop = rect.top;

    isDraggingTrigger = false;

    document.addEventListener('mousemove', dragTrigger);
    document.addEventListener('touchmove', dragTrigger, { passive: false });
    document.addEventListener('mouseup', endDragTrigger);
    document.addEventListener('touchend', endDragTrigger);
  }

  function dragTrigger(e) {
    let clientX, clientY;
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const dx = clientX - triggerStartX;
    const dy = clientY - triggerStartY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      isDraggingTrigger = true;
    }

    if (isDraggingTrigger) {
      let newLeft = triggerStartLeft + dx;
      let newTop = triggerStartTop + dy;

      const padding = 10;
      newLeft = Math.max(padding, Math.min(window.innerWidth - triggerEl.offsetWidth - padding, newLeft));
      newTop = Math.max(padding, Math.min(window.innerHeight - triggerEl.offsetHeight - padding, newTop));

      triggerEl.style.left = newLeft + 'px';
      triggerEl.style.top = newTop + 'px';
      triggerEl.style.right = 'auto';
      triggerEl.style.bottom = 'auto';
    }
  }

  // Dragging the main Customizer Panel via its header
  const headerEl = panelEl.querySelector('.customizer-header');
  let isDraggingPanel = false;
  let panelStartX, panelStartY;
  let panelStartLeft, panelStartTop;

  headerEl.addEventListener('mousedown', startDragPanel);
  headerEl.addEventListener('touchstart', startDragPanel, { passive: false });

  function startDragPanel(e) {
    if (e.type !== 'touchstart' && e.button !== 0) return;

    if (e.type === 'touchstart') {
      panelStartX = e.touches[0].clientX;
      panelStartY = e.touches[0].clientY;
    } else {
      panelStartX = e.clientX;
      panelStartY = e.clientY;
    }

    const rect = panelEl.getBoundingClientRect();
    panelStartLeft = rect.left;
    panelStartTop = rect.top;

    isDraggingPanel = true;

    document.addEventListener('mousemove', dragPanel);
    document.addEventListener('touchmove', dragPanel, { passive: false });
    document.addEventListener('mouseup', endDragPanel);
    document.addEventListener('touchend', endDragPanel);
  }

  function dragPanel(e) {
    if (!isDraggingPanel) return;

    let clientX, clientY;
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const dx = clientX - panelStartX;
    const dy = clientY - panelStartY;

    let newLeft = panelStartLeft + dx;
    let newTop = panelStartTop + dy;

    const padding = 10;
    newLeft = Math.max(padding, Math.min(window.innerWidth - panelEl.offsetWidth - padding, newLeft));
    newTop = Math.max(padding, Math.min(window.innerHeight - panelEl.offsetHeight - padding, newTop));

    panelEl.style.left = newLeft + 'px';
    panelEl.style.top = newTop + 'px';
    panelEl.style.right = 'auto';
    panelEl.style.bottom = 'auto';
  }

  function endDragPanel() {
    isDraggingPanel = false;
    document.removeEventListener('mousemove', dragPanel);
    document.removeEventListener('touchmove', dragPanel);
    document.removeEventListener('mouseup', endDragPanel);
    document.removeEventListener('touchend', endDragPanel);
  }

  function endDragTrigger() {
    document.removeEventListener('mousemove', dragTrigger);
    document.removeEventListener('touchmove', dragTrigger);
    document.removeEventListener('mouseup', endDragTrigger);
    document.removeEventListener('touchend', endDragTrigger);
  }

})();

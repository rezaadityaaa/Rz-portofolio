// Dynamic script loader for modern browsers
class ModernScriptLoader {
  private loadedScripts = new Set<string>();
  private isModernBrowser = this.checkModernBrowserSupport();

  private checkModernBrowserSupport(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Check for modern browser features
    return !!(
      typeof window.Promise !== 'undefined' &&
      typeof window.fetch !== 'undefined' &&
      typeof window.IntersectionObserver !== 'undefined' &&
      typeof window.WeakMap !== 'undefined' &&
      typeof Array.prototype.includes === 'function' &&
      typeof Object.assign === 'function' &&
      typeof String.prototype.startsWith === 'function'
    );
  }

  async loadScript(src: string, options: {
    module?: boolean;
    async?: boolean;
    defer?: boolean;
    crossOrigin?: string;
  } = {}): Promise<void> {
    if (this.loadedScripts.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      
      // Use module scripts for modern browsers
      if (this.isModernBrowser && options.module !== false) {
        script.type = 'module';
      }
      
      script.src = src;
      script.async = options.async !== false;
      script.defer = options.defer !== false;
      
      if (options.crossOrigin) {
        script.crossOrigin = options.crossOrigin;
      }

      script.onload = () => {
        this.loadedScripts.add(src);
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error(`Failed to load script: ${src}`));
      };

      document.head.appendChild(script);
    });
  }

  async loadScriptConditionally(
    modernSrc: string, 
    legacySrc: string, 
    options?: any
  ): Promise<void> {
    const src = this.isModernBrowser ? modernSrc : legacySrc;
    return this.loadScript(src, options);
  }

  preloadScript(src: string): void {
    if (this.loadedScripts.has(src)) return;

    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = src;
    document.head.appendChild(link);
  }

  getIsModernBrowser(): boolean {
    return this.isModernBrowser;
  }
}

export const scriptLoader = new ModernScriptLoader();

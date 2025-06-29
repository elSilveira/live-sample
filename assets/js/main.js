// BitNet Dethron - Main JavaScript

class BitNetWeb {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupCodeBlocks();
  }

  setupNavigation() {
    const header = document.querySelector('.header');
    const toggle = document.querySelector('.header__toggle, .nav-toggle');
    const nav = document.querySelector('.nav, .nav-menu');
    const navLinks = document.querySelectorAll('.nav__link, .nav-link');

    // Mobile menu toggle
    if (toggle) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('nav--open');
        nav.classList.toggle('nav-menu--open');
        toggle.setAttribute('aria-expanded', 
          toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
      });
    }

    // Active link highlighting
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '/' && href === 'index.html')) {
        link.classList.add('nav__link--active');
        link.classList.add('nav-link--active');
      }
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
      } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
      }

      lastScroll = currentScroll;
    });
  }

  setupScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements with animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  setupAnimations() {
    // Counter animation for statistics
    const animateCounters = () => {
      document.querySelectorAll('.stat__number[data-count]').forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };

        updateCounter();
      });
    };

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      });
      statsObserver.observe(statsSection);
    }
  }

  setupCodeBlocks() {
    // Copy to clipboard functionality
    document.querySelectorAll('.code-block').forEach(block => {
      const code = block.querySelector('code, pre');
      if (code) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn btn--sm copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.style.cssText = `
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 8px;
          font-size: 12px;
          background: var(--color-neural-light);
          color: var(--text-secondary);
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        `;

        copyBtn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(code.textContent);
            copyBtn.textContent = 'Copied!';
            copyBtn.style.background = 'var(--color-success)';
            copyBtn.style.color = 'white';
            
            setTimeout(() => {
              copyBtn.textContent = 'Copy';
              copyBtn.style.background = 'var(--color-neural-light)';
              copyBtn.style.color = 'var(--text-secondary)';
            }, 2000);
          } catch (err) {
            console.error('Failed to copy:', err);
          }
        });

        block.style.position = 'relative';
        block.appendChild(copyBtn);
      }
    });
  }

  // Utility methods
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }
}

// Theme toggle functionality
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('bitnet-theme') || 'dark';
    this.init();
  }

  init() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.setupToggle();
  }

  setupToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('bitnet-theme', this.theme);
  }
}

// Search functionality
class SearchManager {
  constructor() {
    this.init();
  }

  init() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', 
        BitNetWeb.debounce(this.handleSearch.bind(this), 300)
      );
    }
  }

  handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const searchableElements = document.querySelectorAll('[data-searchable]');
    
    searchableElements.forEach(element => {
      const text = element.textContent.toLowerCase();
      const isMatch = text.includes(query);
      element.style.display = isMatch || query === '' ? '' : 'none';
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BitNetWeb();
  new ThemeManager();
  new SearchManager();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause any animations or heavy operations
    document.querySelectorAll('video, audio').forEach(media => {
      if (!media.paused) media.pause();
    });
  }
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    if (perfData.loadEventEnd - perfData.loadEventStart > 3000) {
      console.warn('Page load time exceeds 3 seconds');
    }
  });
}

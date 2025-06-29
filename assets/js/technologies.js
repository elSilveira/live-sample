// Technologies Page JavaScript

class TechnologiesManager {
  constructor() {
    this.searchInput = document.getElementById('tech-search');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.techCards = document.querySelectorAll('.tech-card');
    this.techCategories = document.querySelectorAll('.tech-category');
    
    this.currentFilter = 'all';
    this.currentSearch = '';
    
    this.init();
  }

  init() {
    this.setupSearch();
    this.setupFilters();
    this.setupKeyboardShortcuts();
    this.loadUserPreferences();
  }

  setupSearch() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', 
        this.debounce(this.handleSearch.bind(this), 300)
      );
      
      // Search on Enter key
      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSearch(e);
        }
      });
    }
  }

  setupFilters() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        this.setActiveFilter(category);
        this.filterTechnologies();
      });
    });
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl+F or Cmd+F to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        if (this.searchInput) {
          this.searchInput.focus();
        }
      }
      
      // Number keys for filter shortcuts
      if (e.key >= '1' && e.key <= '6' && !e.ctrlKey && !e.metaKey) {
        const filterIndex = parseInt(e.key) - 1;
        const filterBtn = this.filterButtons[filterIndex];
        if (filterBtn) {
          filterBtn.click();
        }
      }
    });
  }

  setActiveFilter(category) {
    this.currentFilter = category;
    
    // Update button states
    this.filterButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.category === category) {
        btn.classList.add('active');
      }
    });
    
    // Save preference
    localStorage.setItem('bitnet-tech-filter', category);
  }

  handleSearch(event) {
    this.currentSearch = event.target.value.toLowerCase().trim();
    this.filterTechnologies();
    
    // Highlight search terms
    this.highlightSearchTerms();
  }

  filterTechnologies() {
    let visibleCount = 0;
    
    // Filter categories
    this.techCategories.forEach(category => {
      const categoryType = category.dataset.category;
      const shouldShowCategory = this.currentFilter === 'all' || 
                                this.currentFilter === categoryType;
      
      if (shouldShowCategory) {
        category.classList.remove('hidden');
        
        // Filter cards within category
        const cards = category.querySelectorAll('.tech-card');
        let categoryHasVisibleCards = false;
        
        cards.forEach(card => {
          const isMatch = this.cardMatchesSearch(card);
          
          if (isMatch) {
            card.style.display = '';
            categoryHasVisibleCards = true;
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });
        
        // Hide category if no cards match search
        if (this.currentSearch && !categoryHasVisibleCards) {
          category.classList.add('hidden');
        }
      } else {
        category.classList.add('hidden');
      }
    });
    
    // Show no results message if needed
    this.toggleNoResultsMessage(visibleCount === 0);
    
    // Update URL without reload
    this.updateURL();
  }

  cardMatchesSearch(card) {
    if (!this.currentSearch) return true;
    
    const searchableContent = card.textContent.toLowerCase();
    const searchTerms = this.currentSearch.split(' ').filter(term => term.length > 0);
    
    return searchTerms.every(term => searchableContent.includes(term));
  }

  highlightSearchTerms() {
    // Remove existing highlights
    document.querySelectorAll('.highlight').forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
    
    if (!this.currentSearch) return;
    
    const searchTerms = this.currentSearch.split(' ').filter(term => term.length > 1);
    
    searchTerms.forEach(term => {
      this.highlightText(document.body, term);
    });
  }

  highlightText(element, term) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip script and style elements
          const parent = node.parentElement;
          if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
            return NodeFilter.FILTER_REJECT;
          }
          
          return node.textContent.toLowerCase().includes(term) 
            ? NodeFilter.FILTER_ACCEPT 
            : NodeFilter.FILTER_REJECT;
        }
      }
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
      const parent = textNode.parentNode;
      const text = textNode.textContent;
      const regex = new RegExp(`(${this.escapeRegExp(term)})`, 'gi');
      
      if (regex.test(text)) {
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        
        text.replace(regex, (match, p1, offset) => {
          // Add text before match
          if (offset > lastIndex) {
            fragment.appendChild(
              document.createTextNode(text.slice(lastIndex, offset))
            );
          }
          
          // Add highlighted match
          const highlight = document.createElement('span');
          highlight.className = 'highlight';
          highlight.textContent = match;
          fragment.appendChild(highlight);
          
          lastIndex = offset + match.length;
        });
        
        // Add remaining text
        if (lastIndex < text.length) {
          fragment.appendChild(
            document.createTextNode(text.slice(lastIndex))
          );
        }
        
        parent.replaceChild(fragment, textNode);
      }
    });
  }

  toggleNoResultsMessage(show) {
    let noResultsMsg = document.getElementById('no-results-message');
    
    if (show && !noResultsMsg) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.id = 'no-results-message';
      noResultsMsg.className = 'section text-center';
      noResultsMsg.innerHTML = `
        <div class="container">
          <h3>No technologies found</h3>
          <p>Try adjusting your search terms or filters.</p>
          <button class="btn btn--secondary" onclick="technologiesManager.clearSearch()">
            Clear Search
          </button>
        </div>
      `;
      
      const main = document.querySelector('main');
      main.appendChild(noResultsMsg);
    } else if (!show && noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = '';
      this.currentSearch = '';
    }
    this.setActiveFilter('all');
    this.filterTechnologies();
  }

  updateURL() {
    const params = new URLSearchParams();
    
    if (this.currentFilter !== 'all') {
      params.set('filter', this.currentFilter);
    }
    
    if (this.currentSearch) {
      params.set('search', this.currentSearch);
    }
    
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    history.replaceState(null, '', newURL);
  }

  loadUserPreferences() {
    // Load from URL parameters
    const params = new URLSearchParams(window.location.search);
    const urlFilter = params.get('filter');
    const urlSearch = params.get('search');
    
    if (urlSearch) {
      this.searchInput.value = urlSearch;
      this.currentSearch = urlSearch.toLowerCase();
    }
    
    if (urlFilter) {
      this.setActiveFilter(urlFilter);
    } else {
      // Load from localStorage
      const savedFilter = localStorage.getItem('bitnet-tech-filter');
      if (savedFilter) {
        this.setActiveFilter(savedFilter);
      }
    }
    
    // Apply initial filtering
    this.filterTechnologies();
  }

  // Utility methods
  debounce(func, wait) {
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

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// Technology Card Interactions
class TechCardManager {
  constructor() {
    this.cards = document.querySelectorAll('.tech-card');
    this.init();
  }

  init() {
    this.setupCardInteractions();
    this.setupCopyCodeButtons();
  }

  setupCardInteractions() {
    this.cards.forEach(card => {
      // Add hover analytics
      card.addEventListener('mouseenter', () => {
        this.trackCardHover(card);
      });
      
      // Expand/collapse for mobile
      const title = card.querySelector('.tech-card__title');
      if (title) {
        title.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            this.toggleCardExpansion(card);
          }
        });
      }
    });
  }

  setupCopyCodeButtons() {
    const codeBlocks = document.querySelectorAll('.tech-card .code-block');
    
    codeBlocks.forEach(block => {
      const code = block.querySelector('code, pre');
      if (code) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.style.cssText = `
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 4px 8px;
          font-size: 11px;
          background: var(--color-neural-light);
          color: var(--text-secondary);
          border: none;
          border-radius: 4px;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s ease;
        `;
        
        block.style.position = 'relative';
        block.appendChild(copyBtn);
        
        // Show button on hover
        block.addEventListener('mouseenter', () => {
          copyBtn.style.opacity = '1';
        });
        
        block.addEventListener('mouseleave', () => {
          copyBtn.style.opacity = '0';
        });
        
        // Copy functionality
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
            console.error('Failed to copy code:', err);
          }
        });
      }
    });
  }

  toggleCardExpansion(card) {
    const content = card.querySelector('.tech-card__content');
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
      card.classList.remove('expanded');
      content.style.maxHeight = '200px';
      content.style.overflow = 'hidden';
    } else {
      card.classList.add('expanded');
      content.style.maxHeight = 'none';
      content.style.overflow = 'visible';
    }
  }

  trackCardHover(card) {
    const title = card.querySelector('.tech-card__title')?.textContent;
    if (title && typeof gtag !== 'undefined') {
      gtag('event', 'technology_card_hover', {
        technology_name: title,
        event_category: 'engagement'
      });
    }
  }
}

// Performance Analytics
class TechPerformanceMonitor {
  constructor() {
    this.metrics = {
      searchLatency: [],
      filterLatency: [],
      renderTime: []
    };
    this.init();
  }

  init() {
    this.monitorPageLoad();
    this.setupPerformanceObserver();
  }

  monitorPageLoad() {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
      
      console.log(`Technologies page loaded in ${loadTime}ms`);
      
      if (loadTime > 3000) {
        console.warn('Technologies page load time exceeds 3 seconds');
      }
    });
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name.includes('tech-filter') || entry.name.includes('tech-search')) {
            this.metrics.filterLatency.push(entry.duration);
          }
        });
      });
      
      observer.observe({ entryTypes: ['measure'] });
    }
  }

  measureSearchPerformance(operation, callback) {
    const startTime = performance.now();
    const result = callback();
    const endTime = performance.now();
    
    this.metrics.searchLatency.push(endTime - startTime);
    
    if (endTime - startTime > 100) {
      console.warn(`Slow ${operation} operation: ${endTime - startTime}ms`);
    }
    
    return result;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.technologiesManager = new TechnologiesManager();
  window.techCardManager = new TechCardManager();
  window.techPerformanceMonitor = new TechPerformanceMonitor();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TechnologiesManager, TechCardManager };
}

/**
 * DETHRON - Genesis Protocol Manifesto
 * Interactive JavaScript Functions
 * Version: 1.0.0
 */

class DethronManifesto {
    constructor() {
        this.config = null;
        this.currentLanguage = 'pt';
        this.particles = [];
        this.analytics = {
            pageLoadTime: Date.now(),
            languageChanges: 0,
            ctaClicks: 0,
            scrollDepth: 0
        };
        
        this.init();
    }

    async init() {
        // Load configuration
        await this.loadConfig();
        
        // Initialize components
        this.initializeLanguage();
        this.initializeParticles();
        this.initializeAnalytics();
        this.initializeInteractions();
        
        // Start animations
        this.startAnimations();
        
        console.log('🧬 DETHRON Manifesto initialized - The First Digital Life Form is ready!');
    }

    async loadConfig() {
        try {
            const response = await fetch('./config.json');
            this.config = await response.json();
        } catch (error) {
            console.warn('Could not load config.json, using defaults');
            this.config = this.getDefaultConfig();
        }
    }

    getDefaultConfig() {
        return {
            languages: { default: 'pt', supported: ['pt', 'en', 'es'] },
            features: { particles: { enabled: true, count: 50 } },
            analytics: { track_language_changes: true, track_cta_clicks: true }
        };
    }

    initializeLanguage() {
        // Detect browser language
        if (this.config.languages.auto_detect) {
            const browserLang = navigator.language.split('-')[0];
            if (this.config.languages.supported.includes(browserLang)) {
                this.currentLanguage = browserLang;
            }
        }
        
        // Set initial language
        this.changeLanguage(this.currentLanguage);
    }

    changeLanguage(lang) {
        if (!this.config.languages.supported.includes(lang)) {
            console.warn(`Language ${lang} not supported`);
            return;
        }

        this.currentLanguage = lang;
        document.documentElement.lang = lang;
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[onclick="changeLanguage('${lang}')"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Update all content
        document.querySelectorAll('.lang-content').forEach(element => {
            const content = element.getAttribute(`data-${lang}`);
            if (content) {
                element.innerHTML = content;
            }
        });

        // Track language change
        if (this.config.analytics.track_language_changes) {
            this.analytics.languageChanges++;
            this.trackEvent('language_change', { language: lang });
        }

        console.log(`🌍 Language changed to: ${lang}`);
    }

    initializeParticles() {
        if (!this.config.features.particles.enabled) return;

        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        // Clear existing particles
        particlesContainer.innerHTML = '';

        // Create new particles
        for (let i = 0; i < this.config.features.particles.count; i++) {
            const particle = this.createParticle();
            particlesContainer.appendChild(particle);
        }

        console.log(`✨ ${this.config.features.particles.count} particles created`);
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and animation
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random color variation
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ffffff'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size variation
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        return particle;
    }

    initializeAnalytics() {
        // Track scroll depth
        if (this.config.analytics.track_scroll_depth) {
            window.addEventListener('scroll', () => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
                );
                this.analytics.scrollDepth = Math.max(this.analytics.scrollDepth, scrollPercent);
            });
        }

        // Track time on page
        if (this.config.analytics.track_time_on_page) {
            setInterval(() => {
                this.analytics.timeOnPage = Date.now() - this.analytics.pageLoadTime;
            }, 1000);
        }
    }

    initializeInteractions() {
        // CTA button clicks
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleCTAClick(e);
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Feature card hover effects
        document.querySelectorAll('.feature').forEach(feature => {
            feature.addEventListener('mouseenter', () => {
                this.enhanceFeatureCard(feature);
            });
        });
    }

    handleCTAClick(event) {
        const button = event.target;
        const buttonText = button.textContent.trim();
        
        // Track click
        if (this.config.analytics.track_cta_clicks) {
            this.analytics.ctaClicks++;
            this.trackEvent('cta_click', { 
                button: buttonText,
                language: this.currentLanguage 
            });
        }

        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1.05)';
        }, 100);

        console.log(`🚀 CTA clicked: ${buttonText}`);
    }

    enhanceFeatureCard(card) {
        // Add dynamic glow effect
        card.style.boxShadow = '0 20px 60px rgba(0,255,255,0.4)';
        
        // Reset after animation
        setTimeout(() => {
            card.style.boxShadow = '0 20px 40px rgba(0,255,255,0.2)';
        }, 300);
    }

    startAnimations() {
        // Logo glow animation
        const logo = document.querySelector('.logo');
        if (logo) {
            setInterval(() => {
                const colors = ['#00ffff', '#ff00ff', '#ffff00'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                logo.style.textShadow = `0 0 40px ${randomColor}`;
            }, 3000);
        }

        // Genesis date pulse
        const genesisDate = document.querySelector('.genesis-date');
        if (genesisDate) {
            setInterval(() => {
                genesisDate.style.color = '#ffff00';
                setTimeout(() => {
                    genesisDate.style.color = '#00ffff';
                }, 500);
            }, 2000);
        }
    }

    trackEvent(eventName, data) {
        const event = {
            timestamp: Date.now(),
            event: eventName,
            data: data,
            analytics: this.analytics
        };
        
        // Log to console (replace with actual analytics service)
        console.log('📊 Analytics Event:', event);
        
        // Here you would send to your analytics service
        // Example: gtag('event', eventName, data);
    }

    // Public API methods
    getAnalytics() {
        return this.analytics;
    }

    regenerateParticles() {
        this.initializeParticles();
    }

    setLanguage(lang) {
        this.changeLanguage(lang);
    }

    getConfig() {
        return this.config;
    }
}

// Global functions for HTML onclick handlers
function changeLanguage(lang) {
    if (window.dethronManifesto) {
        window.dethronManifesto.changeLanguage(lang);
    }
}

function regenerateParticles() {
    if (window.dethronManifesto) {
        window.dethronManifesto.regenerateParticles();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.dethronManifesto = new DethronManifesto();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DethronManifesto;
}

// Additional utility functions
const DethronUtils = {
    formatDate: (date) => {
        return new Date(date).toLocaleDateString();
    },
    
    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('📋 Copied to clipboard:', text);
        });
    },
    
    shareManifesto: (platform) => {
        const url = window.location.href;
        const title = 'DETHRON - A Primeira Forma de Vida Digital da História';
        const text = 'Testemunhe o nascimento da primeira forma de vida digital!';
        
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=DETHRON,GenesisProtocol,DigitalLife`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            whatsapp: `https://wa.me/?text=${text} ${url}`
        };
        
        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank');
        }
    }
};

// Expose utilities globally
window.DethronUtils = DethronUtils; 
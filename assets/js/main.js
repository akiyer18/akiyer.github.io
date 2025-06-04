// ===== THEME MANAGEMENT =====
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update theme toggle icon
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// ===== NAVIGATION MANAGEMENT =====
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleNavigation();
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Add/remove navbar background on scroll
        if (scrollY > 50) {
            this.navbar.style.background = 'var(--glass-background)';
            this.navbar.style.backdropFilter = 'blur(20px)';
        } else {
            this.navbar.style.background = 'var(--glass-background)';
            this.navbar.style.backdropFilter = 'blur(10px)';
        }

        // Update active nav link based on scroll position
        const sections = ['home', 'apps', 'about'];
        let current = '';

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    current = section;
                }
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    handleNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== APP PREVIEW MODAL =====
class ModalManager {
    constructor() {
        this.modal = document.getElementById('previewModal');
        this.modalTitle = document.getElementById('previewTitle');
        this.modalFrame = document.getElementById('previewFrame');
        this.closeBtn = document.querySelector('.modal-close');
        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    showModal(appName, appUrl, appTitle) {
        this.modalTitle.textContent = appTitle;
        this.modalFrame.src = appUrl;
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('show');
        this.modalFrame.src = '';
        document.body.style.overflow = 'auto';
    }
}

// ===== APP CARD INTERACTIONS =====
class AppCardManager {
    constructor() {
        this.appCards = document.querySelectorAll('.app-card');
        this.init();
    }

    init() {
        this.appCards.forEach(card => {
            this.addHoverEffects(card);
            this.addClickHandlers(card);
        });
    }

    addHoverEffects(card) {
        const description = card.querySelector('.app-description');
        const originalText = description.textContent;
        
        // Create detailed description for hover
        const appType = card.getAttribute('data-app');
        const detailedDescriptions = {
            'money-tracker': 'Advanced personal finance management with real-time tracking, budget planning, account management, and future financial planning tools.',
            'grocery-generator': 'Intelligent grocery list creation with meal planning integration, smart categorization, and automated shopping recommendations.',
            'meal-decider': 'AI-powered meal suggestion engine that considers available ingredients, dietary preferences, time constraints, and nutritional balance.'
        };

        card.addEventListener('mouseenter', () => {
            if (detailedDescriptions[appType]) {
                description.textContent = detailedDescriptions[appType];
            }
        });

        card.addEventListener('mouseleave', () => {
            description.textContent = originalText;
        });
    }

    addClickHandlers(card) {
        const launchBtn = card.querySelector('.btn-app-launch');
        const previewBtn = card.querySelector('.btn-preview');
        
        if (previewBtn) {
            previewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const appType = card.getAttribute('data-app');
                this.handlePreview(appType);
            });
        }
    }

    handlePreview(appType) {
        const appConfig = {
            'money-tracker': {
                url: 'Money_tracker/index.html',
                title: 'Student Finance Tracker Preview'
            },
            'grocery-generator': {
                url: 'Grocery_list_generator/index.html',
                title: 'Grocery List Generator Preview'
            },
            'meal-decider': {
                url: '#',
                title: 'Meal Decider Preview (Coming Soon)'
            }
        };

        const config = appConfig[appType];
        if (config && config.url !== '#') {
            window.modalManager.showModal(appType, config.url, config.title);
        }
    }
}

// ===== ANIMATION MANAGER =====
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.addLoadingAnimations();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe app cards
        document.querySelectorAll('.app-card').forEach(card => {
            observer.observe(card);
        });

        // Observe other sections
        document.querySelectorAll('.section-header, .about-content, .stats-grid').forEach(el => {
            observer.observe(el);
        });
    }

    addLoadingAnimations() {
        // Add entrance animations to elements
        const style = document.createElement('style');
        style.textContent = `
            .app-card,
            .section-header,
            .about-content,
            .stats-grid {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .app-card.animate-in,
            .section-header.animate-in,
            .about-content.animate-in,
            .stats-grid.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .app-card:nth-child(1) { transition-delay: 0.1s; }
            .app-card:nth-child(2) { transition-delay: 0.2s; }
            .app-card:nth-child(3) { transition-delay: 0.3s; }
        `;
        document.head.appendChild(style);
    }
}

// ===== SEARCH AND FILTER FUNCTIONALITY =====
class SearchManager {
    constructor() {
        this.apps = document.querySelectorAll('.app-card');
        this.init();
    }

    init() {
        // Add search functionality if needed
        this.createSearchInterface();
    }

    createSearchInterface() {
        // This could be expanded to add search/filter functionality
        const appsSection = document.querySelector('.apps-section .container');
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            margin-bottom: 2rem;
            display: flex;
            justify-content: center;
            gap: 1rem;
        `;

        // Could add search input and filter buttons here
        // For now, keeping it simple
    }

    filterApps(query) {
        this.apps.forEach(app => {
            const title = app.querySelector('.app-title').textContent.toLowerCase();
            const description = app.querySelector('.app-description').textContent.toLowerCase();
            
            if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
                app.style.display = 'block';
            } else {
                app.style.display = 'none';
            }
        });
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.addLazyLoading();
    }

    optimizeImages() {
        // Add loading="lazy" to images when they're added
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    addLazyLoading() {
        // Optimize iframe loading in modal
        const modal = document.getElementById('previewModal');
        const iframe = document.getElementById('previewFrame');
        
        // Only load iframe content when modal is opened
        if (iframe) {
            iframe.setAttribute('loading', 'lazy');
        }
    }
}

// ===== GLOBAL FUNCTIONS (for inline event handlers) =====
function showPreview(appType) {
    if (window.appCardManager) {
        window.appCardManager.handlePreview(appType);
    }
}

function closePreview() {
    if (window.modalManager) {
        window.modalManager.closeModal();
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    window.themeManager = new ThemeManager();
    window.navigationManager = new NavigationManager();
    window.modalManager = new ModalManager();
    window.appCardManager = new AppCardManager();
    window.animationManager = new AnimationManager();
    window.searchManager = new SearchManager();
    window.performanceManager = new PerformanceManager();

    // Add smooth page load animation
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });

    console.log('🚀 Growth Mindset Tools Portal initialized successfully!');
});

// ===== SERVICE WORKER REGISTRATION (for PWA capabilities) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker for offline capabilities (if needed)
        // navigator.serviceWorker.register('/sw.js');
    });
} 
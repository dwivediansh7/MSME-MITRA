// MSME Portal - Main Application JavaScript

class MSMEPortal {
    constructor() {
        this.currentPage = 'dashboard';
        this.isVerified = false;
        this.userData = {
            name: 'Rajesh Kumar',
            businessName: 'Kumar Textiles Pvt Ltd',
            udyamNumber: 'UDYAM-MH-12-0012345',
            gstNumber: '27ABCDE1234F1Z5',
            businessScore: 78,
            verificationStatus: {
                aadhaar: false,
                gst: false,
                udyam: false
            }
        };
        this.init();
    }

    init() {
        console.log('MSME Portal initializing...');
        this.showLoadingScreen();
        this.setupEventListeners();
        this.loadInitialData();

        // Hide loading screen after 2 seconds
        setTimeout(() => {
            console.log('Loading complete, showing dashboard');
            this.hideLoadingScreen();
            this.loadPage(this.currentPage);
        }, 2000);
    }

    showLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'flex';
        document.getElementById('app').style.display = 'none';
    }

    hideLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
    }

    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        // Sidebar toggle for mobile
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.openSidebar();
            });
        }

        // Close sidebar button
        const closeSidebarBtn = document.getElementById('closeSidebarBtn');
        if (closeSidebarBtn) {
            closeSidebarBtn.addEventListener('click', () => {
                this.closeSidebar();
            });
        }

        // Sidebar backdrop
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');
        if (sidebarBackdrop) {
            sidebarBackdrop.addEventListener('click', () => {
                this.closeSidebar();
            });
        }

        // Language switcher
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        // Search functionality
        document.querySelector('.search-bar input').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');
            
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target) &&
                sidebar.classList.contains('open')) {
                this.closeSidebar();
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeSidebar();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const sidebar = document.getElementById('sidebar');
                if (sidebar.classList.contains('open')) {
                    this.closeSidebar();
                }
            }
        });
    }

    loadInitialData() {
        // Check verification status
        this.checkVerificationStatus();
        
        // Load user preferences
        this.loadUserPreferences();
        
        // Initialize notifications
        this.initializeNotifications();
    }

    checkVerificationStatus() {
        const { aadhaar, gst, udyam } = this.userData.verificationStatus;
        this.isVerified = aadhaar && gst && udyam;
        
        // Update verification badge in sidebar
        const verificationLink = document.querySelector('[data-page="verification"]');
        const badge = verificationLink.querySelector('.nav-badge');
        
        if (this.isVerified) {
            if (badge) badge.remove();
        } else {
            if (!badge) {
                const badgeElement = document.createElement('span');
                badgeElement.className = 'nav-badge';
                badgeElement.textContent = '!';
                verificationLink.appendChild(badgeElement);
            }
        }
    }

    loadUserPreferences() {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('msme-portal-language') || 'en';
        document.getElementById('languageSelect').value = savedLanguage;
        
        // Load saved theme preference (if implemented)
        const savedTheme = localStorage.getItem('msme-portal-theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
    }

    initializeNotifications() {
        // Simulate some notifications
        const notifications = [
            {
                id: 1,
                type: 'warning',
                title: 'Verification Pending',
                message: 'Complete your business verification to access all features.',
                timestamp: new Date()
            },
            {
                id: 2,
                type: 'info',
                title: 'New Scheme Available',
                message: 'MSME Technology Upgradation Scheme is now open for applications.',
                timestamp: new Date()
            },
            {
                id: 3,
                type: 'success',
                title: 'Payment Received',
                message: 'Payment of ₹25,000 received from ABC Industries.',
                timestamp: new Date()
            }
        ];
        
        this.notifications = notifications;
        this.updateNotificationBadge();
    }

    updateNotificationBadge() {
        const badge = document.querySelector('.notification-badge');
        badge.textContent = this.notifications.length;
        
        if (this.notifications.length === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'block';
        }
    }

    navigateToPage(page) {
        console.log('Navigating to page:', page);

        // Check if verification is required for certain pages
        const restrictedPages = ['marketplace', 'erp', 'crm'];

        if (restrictedPages.includes(page) && !this.isVerified) {
            this.showToast('Please complete verification to access this feature.', 'warning');
            page = 'verification';
        }

        this.currentPage = page;
        this.updateActiveNavigation(page);
        this.loadPage(page);
        this.closeSidebar(); // Close sidebar on mobile after navigation

        // Trigger Smart Tips for the new section
        setTimeout(() => {
            if (window.smartTips) {
                window.smartTips.onPageChange(page);
            }
        }, 500);
    }

    updateActiveNavigation(page) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current page
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.closest('.nav-item').classList.add('active');
        }
    }

    loadPage(page) {
        console.log('Loading page:', page);
        const pageContent = document.getElementById('page-content');

        if (!pageContent) {
            console.error('Page content element not found!');
            return;
        }

        // Show loading state
        pageContent.innerHTML = '<div class="loading"><div class="spinner"></div> Loading...</div>';

        // Simulate loading delay
        setTimeout(() => {
            try {
                switch (page) {
                    case 'dashboard':
                        pageContent.innerHTML = this.getDashboardHTML();
                        break;
                    case 'verification':
                        pageContent.innerHTML = this.getVerificationHTML();
                        break;
                    case 'marketplace':
                        pageContent.innerHTML = this.getMarketplaceHTML();
                        break;
                    case 'erp':
                        pageContent.innerHTML = this.getERPHTML();
                        break;
                    case 'crm':
                        pageContent.innerHTML = this.getCRMHTML();
                        break;
                    case 'schemes':
                        pageContent.innerHTML = this.getSchemesHTML();
                        break;
                    case 'business-score':
                        pageContent.innerHTML = this.getBusinessScoreHTML();
                        break;
                    case 'learning':
                        pageContent.innerHTML = this.getLearningHTML();
                        break;
                    default:
                        pageContent.innerHTML = this.getDashboardHTML();
                }

                console.log('Page loaded successfully:', page);

                // Initialize page-specific functionality
                this.initializePageFunctionality(page);
            } catch (error) {
                console.error('Error loading page:', error);
                pageContent.innerHTML = '<div class="error">Error loading page. Please try again.</div>';
            }
        }, 300);
    }

    initializePageFunctionality(page) {
        // Initialize page-specific event listeners and functionality
        switch (page) {
            case 'verification':
                this.initializeVerificationPage();
                break;
            case 'marketplace':
                this.initializeMarketplacePage();
                break;
            case 'erp':
                this.initializeERPPage();
                break;
            case 'crm':
                this.initializeCRMPage();
                break;
            case 'schemes':
                this.initializeSchemesPage();
                break;
            case 'business-score':
                this.initializeBusinessScorePage();
                break;
            case 'learning':
                this.initializeLearningPage();
                break;
        }
    }

    openSidebar() {
        const sidebar = document.getElementById('sidebar');
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');
        const mainContent = document.querySelector('.main-content');

        if (sidebar) {
            sidebar.classList.add('open');
        }
        if (sidebarBackdrop) {
            sidebarBackdrop.classList.add('show');
        }
        if (mainContent) {
            mainContent.classList.add('sidebar-open');
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('open')) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');
        const mainContent = document.querySelector('.main-content');

        if (sidebar) {
            sidebar.classList.remove('open');
        }
        if (sidebarBackdrop) {
            sidebarBackdrop.classList.remove('show');
        }
        if (mainContent) {
            mainContent.classList.remove('sidebar-open');
        }
    }

    changeLanguage(language) {
        localStorage.setItem('msme-portal-language', language);
        this.showToast(`Language changed to ${language === 'hi' ? 'Hindi' : 'English'}`, 'success');
        // In a real application, this would trigger a translation update
    }

    handleSearch(query) {
        if (query.length > 2) {
            // Implement search functionality
            console.log('Searching for:', query);
        }
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <strong>${this.getToastTitle(type)}</strong>
                <p>${message}</p>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    getToastTitle(type) {
        const titles = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Information'
        };
        return titles[type] || 'Notification';
    }

    // Placeholder methods for page HTML - will be implemented in pages.js
    getDashboardHTML() { return window.PageTemplates?.dashboard() || '<h1>Dashboard</h1>'; }
    getVerificationHTML() { return window.PageTemplates?.verification() || '<h1>Verification</h1>'; }
    getMarketplaceHTML() { return window.PageTemplates?.marketplace() || '<h1>Marketplace</h1>'; }
    getERPHTML() { return window.PageTemplates?.erp() || '<h1>ERP Dashboard</h1>'; }
    getCRMHTML() { return window.PageTemplates?.crm() || '<h1>CRM Panel</h1>'; }
    getSchemesHTML() { return window.PageTemplates?.schemes() || '<h1>Government Schemes</h1>'; }
    getBusinessScoreHTML() { return window.PageTemplates?.businessScore() || '<h1>Business Score</h1>'; }
    getLearningHTML() { return window.PageTemplates?.learning() || '<h1>Learning Hub</h1>'; }

    // Placeholder methods for page initialization - will be implemented in components.js
    initializeVerificationPage() { window.PageComponents?.initVerification?.(); }
    initializeMarketplacePage() { window.PageComponents?.initMarketplace?.(); }
    initializeERPPage() { window.PageComponents?.initERP?.(); }
    initializeCRMPage() { window.PageComponents?.initCRM?.(); }
    initializeSchemesPage() { window.PageComponents?.initSchemes?.(); }
    initializeBusinessScorePage() { window.PageComponents?.initBusinessScore?.(); }
    initializeLearningPage() { window.PageComponents?.initLearning?.(); }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('DOM loaded, initializing MSME Portal...');
        window.msmePortal = new MSMEPortal();

        // Initialize ERP System with advanced features
        if (typeof ERPSystem !== 'undefined') {
            window.erpSystem = new ERPSystem();

            // Initialize advanced animations and micro-interactions
            window.erpSystem.initAdvancedAnimations();

            // Initialize performance optimizations
            window.erpSystem.initSmartCaching();
            window.erpSystem.setupErrorHandling();
            window.erpSystem.initProgressiveEnhancement();
        }

        // Add advanced CSS classes to elements
        enhanceUIElements();

        // Initialize accessibility features
        initializeAccessibility();

        // Setup performance monitoring
        setupPerformanceMonitoring();

        console.log('MSME Portal initialized successfully with advanced features');
    } catch (error) {
        console.error('Error initializing MSME Portal:', error);

        // Show error message to user
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #f5c6cb;
            z-index: 9999;
            text-align: center;
        `;
        errorDiv.innerHTML = `
            <strong>Error loading MSME Portal</strong><br>
            Please refresh the page or check the browser console for details.
        `;
        document.body.appendChild(errorDiv);

        // Hide loading screen if it's still showing
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }

        // Show app container
        const app = document.getElementById('app');
        if (app) {
            app.style.display = 'block';
        }
    }
});

// Advanced UI Enhancement Functions
function enhanceUIElements() {
    // Add micro-interaction classes to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('btn-micro', 'interactive-element');
    });

    // Add card interaction classes
    document.querySelectorAll('.card, .stat-card, .module-card').forEach(card => {
        card.classList.add('card-interactive', 'hover-lift', 'gpu-accelerated');
    });

    // Add stagger animation classes to grouped elements
    document.querySelectorAll('.stats-grid .stat-card').forEach((card, index) => {
        card.classList.add('stagger-item');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add parallax classes to hero sections
    document.querySelectorAll('.hero-section, .header-section').forEach(section => {
        section.classList.add('parallax-element');
        section.dataset.speed = '0.5';
    });

    // Add loading skeleton classes for dynamic content
    document.querySelectorAll('[data-loading]').forEach(element => {
        element.classList.add('skeleton');
    });
}

function initializeAccessibility() {
    // Add ARIA labels to interactive elements
    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.getAttribute('aria-label') && btn.textContent.trim()) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });

    // Add role attributes to cards
    document.querySelectorAll('.card').forEach(card => {
        card.setAttribute('role', 'article');
    });

    // Add keyboard navigation support
    document.querySelectorAll('.card, .module-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Add focus indicators
    document.querySelectorAll('button, a, input, select, textarea').forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('focus-visible');
        });

        element.addEventListener('blur', () => {
            element.classList.remove('focus-visible');
        });
    });

    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

function setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would integrate with a real performance monitoring service
        console.log('Performance monitoring initialized');
    }

    // Monitor page load times
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);

        // Log slow page loads
        if (loadTime > 3000) {
            console.warn('Slow page load detected:', loadTime);
        }
    });

    // Monitor memory usage
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            const memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

            if (memoryUsage > 80) {
                console.warn('High memory usage detected:', memoryUsage.toFixed(2) + '%');
            }
        }, 30000); // Check every 30 seconds
    }

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.duration > 50) {
                    console.warn('Long task detected:', entry.duration + 'ms');
                }
            });
        });

        observer.observe({ entryTypes: ['longtask'] });
    }

    // Monitor layout shifts
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            let cumulativeLayoutShift = 0;

            list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    cumulativeLayoutShift += entry.value;
                }
            });

            if (cumulativeLayoutShift > 0.1) {
                console.warn('High cumulative layout shift:', cumulativeLayoutShift);
            }
        });

        observer.observe({ entryTypes: ['layout-shift'] });
    }
}

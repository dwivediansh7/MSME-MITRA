// Smart Pop-Up Tips System for MSME Portal
// Provides contextual, progressive learning tips throughout the platform

class SmartTipsSystem {
    constructor() {
        this.tips = new Map();
        this.userProgress = this.loadUserProgress();
        this.currentTip = null;
        this.tipQueue = [];
        this.isEnabled = true;
        this.tipDelay = 3000; // 3 seconds delay before showing tips
        this.maxTipsPerSession = 3;
        this.tipsShownThisSession = 0;
        
        this.initializeTips();
        this.setupEventListeners();
        this.startTipSystem();
    }

    initializeTips() {
        // Dashboard Tips
        this.addTip('dashboard-revenue-card', {
            title: '💡 Revenue Insights',
            message: 'Click on your revenue card to see detailed monthly trends and set revenue targets for better planning.',
            trigger: 'hover',
            position: 'bottom',
            priority: 'medium',
            category: 'dashboard'
        });

        this.addTip('dashboard-whatsapp-action', {
            title: '📱 WhatsApp Integration',
            message: 'Did you know you can send invoices directly to WhatsApp? This increases payment collection rates by 40%!',
            trigger: 'click',
            position: 'top',
            priority: 'high',
            category: 'features'
        });

        this.addTip('dashboard-inventory-alert', {
            title: '📦 Smart Inventory Management',
            message: 'Set up automatic reorder alerts to never run out of stock. Click here to configure minimum stock levels.',
            trigger: 'hover',
            position: 'right',
            priority: 'high',
            category: 'inventory'
        });

        // ERP Module Tips
        this.addTip('erp-invoice-create', {
            title: '🧾 Smart Invoicing',
            message: 'Pro tip: Use invoice templates to save time. GST calculations are automatic based on your business registration.',
            trigger: 'focus',
            position: 'bottom',
            priority: 'high',
            category: 'erp'
        });

        this.addTip('erp-payment-tracking', {
            title: '💰 Payment Tracking',
            message: 'Click here to see payment history and send automated reminders to customers with overdue payments.',
            trigger: 'hover',
            position: 'left',
            priority: 'medium',
            category: 'erp'
        });

        this.addTip('erp-gst-filing', {
            title: '📋 GST Compliance',
            message: 'Never miss GST deadlines! Enable automatic reminders and file returns directly from here.',
            trigger: 'click',
            position: 'top',
            priority: 'high',
            category: 'compliance'
        });

        // Marketplace Tips
        this.addTip('marketplace-product-upload', {
            title: '🛍️ Product Visibility',
            message: 'Add high-quality images and detailed descriptions to increase your product visibility by 60%.',
            trigger: 'focus',
            position: 'right',
            priority: 'medium',
            category: 'marketplace'
        });

        this.addTip('marketplace-pricing-strategy', {
            title: '💲 Smart Pricing',
            message: 'Use competitive pricing analysis to set optimal prices. Check similar products in your category.',
            trigger: 'hover',
            position: 'bottom',
            priority: 'medium',
            category: 'marketplace'
        });

        // Schemes Tips
        this.addTip('schemes-eligibility-check', {
            title: '🎯 Scheme Matching',
            message: 'Our AI automatically matches you with eligible schemes. Complete your profile for better recommendations.',
            trigger: 'load',
            position: 'center',
            priority: 'high',
            category: 'schemes'
        });

        this.addTip('schemes-application-status', {
            title: '📊 Application Tracking',
            message: 'Track your scheme applications in real-time and get notified about status updates.',
            trigger: 'click',
            position: 'top',
            priority: 'medium',
            category: 'schemes'
        });

        // CRM Tips
        this.addTip('crm-customer-segmentation', {
            title: '👥 Customer Insights',
            message: 'Segment customers by purchase history to create targeted marketing campaigns and increase sales.',
            trigger: 'hover',
            position: 'right',
            priority: 'medium',
            category: 'crm'
        });

        this.addTip('crm-follow-up-automation', {
            title: '🔄 Automated Follow-ups',
            message: 'Set up automatic follow-up sequences to nurture leads and convert them into customers.',
            trigger: 'focus',
            position: 'bottom',
            priority: 'high',
            category: 'crm'
        });

        // General Navigation Tips
        this.addTip('navigation-shortcuts', {
            title: '⚡ Quick Navigation',
            message: 'Use Ctrl+K to open quick search and navigate to any module instantly.',
            trigger: 'idle',
            position: 'center',
            priority: 'low',
            category: 'navigation'
        });

        this.addTip('profile-completion', {
            title: '✅ Profile Optimization',
            message: 'Complete your business profile to unlock advanced features and better scheme recommendations.',
            trigger: 'load',
            position: 'top-right',
            priority: 'high',
            category: 'profile'
        });
    }

    addTip(elementId, tipConfig) {
        this.tips.set(elementId, {
            id: elementId,
            ...tipConfig,
            shown: false,
            dismissed: false,
            showCount: 0
        });
    }

    setupEventListeners() {
        // Listen for page navigation
        window.addEventListener('popstate', () => this.onPageChange());
        
        // Listen for user interactions
        document.addEventListener('click', (e) => this.handleInteraction(e, 'click'));
        document.addEventListener('mouseover', (e) => this.handleInteraction(e, 'hover'));
        document.addEventListener('focus', (e) => this.handleInteraction(e, 'focus'), true);
        
        // Listen for idle state
        this.setupIdleDetection();
        
        // Listen for module changes
        if (window.msmePortal) {
            const originalNavigate = window.msmePortal.navigateToPage;
            window.msmePortal.navigateToPage = (page) => {
                originalNavigate.call(window.msmePortal, page);
                setTimeout(() => this.onPageChange(page), 500);
            };
        }
    }

    handleInteraction(event, triggerType) {
        const element = event.target.closest('[data-tip-id]') || 
                       event.target.closest('.metric-card') ||
                       event.target.closest('.action-btn') ||
                       event.target.closest('.erp-module-card');
        
        if (element) {
            const tipId = element.getAttribute('data-tip-id') || this.inferTipId(element);
            if (tipId) {
                this.triggerTip(tipId, triggerType, element);
            }
        }
    }

    inferTipId(element) {
        // Infer tip ID based on element classes and context
        if (element.classList.contains('metric-card')) {
            if (element.classList.contains('revenue')) return 'dashboard-revenue-card';
            if (element.classList.contains('inventory')) return 'dashboard-inventory-alert';
        }
        
        if (element.classList.contains('action-btn')) {
            const btnText = element.textContent.toLowerCase();
            if (btnText.includes('whatsapp')) return 'dashboard-whatsapp-action';
            if (btnText.includes('payment')) return 'erp-payment-tracking';
            if (btnText.includes('gst')) return 'erp-gst-filing';
        }
        
        return null;
    }

    triggerTip(tipId, triggerType, element) {
        const tip = this.tips.get(tipId);
        if (!tip || !this.shouldShowTip(tip, triggerType)) return;
        
        // Add to queue if we're at the limit
        if (this.tipsShownThisSession >= this.maxTipsPerSession) {
            this.tipQueue.push({ tipId, element });
            return;
        }
        
        setTimeout(() => {
            this.showTip(tip, element);
        }, this.tipDelay);
    }

    shouldShowTip(tip, triggerType) {
        // Always show welcome tips when entering a new section
        if (tip.isWelcome) {
            return this.isEnabled && !this.userProgress.dismissedTips.includes(tip.id);
        }

        // For regular tips, be more permissive to ensure they show
        return this.isEnabled &&
               (tip.trigger === triggerType || triggerType === 'load') &&
               !tip.dismissed &&
               tip.showCount < 5 && // Allow more shows
               !this.userProgress.dismissedTips.includes(tip.id) &&
               this.tipsShownThisSession < this.maxTipsPerSession;
    }

    showTip(tip, element) {
        if (this.currentTip) {
            this.hideTip();
        }
        
        this.currentTip = tip;
        this.tipsShownThisSession++;
        tip.showCount++;
        
        const tipElement = this.createTipElement(tip);
        document.body.appendChild(tipElement);
        
        this.positionTip(tipElement, element, tip.position);
        
        // Animate in
        requestAnimationFrame(() => {
            tipElement.classList.add('show');
        });
        
        // Auto-hide after delay
        setTimeout(() => {
            if (this.currentTip === tip) {
                this.hideTip();
            }
        }, 8000);
        
        // Track analytics
        this.trackTipShown(tip);
    }

    createTipElement(tip) {
        const tipElement = document.createElement('div');
        tipElement.className = `smart-tip smart-tip-${tip.priority}`;
        tipElement.innerHTML = `
            <div class="tip-content">
                <div class="tip-header">
                    <h4 class="tip-title">${tip.title}</h4>
                    <button class="tip-close" onclick="window.smartTips.dismissTip('${tip.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p class="tip-message">${tip.message}</p>
                <div class="tip-actions">
                    <button class="tip-action-btn primary" onclick="window.smartTips.acceptTip('${tip.id}')">
                        Got it!
                    </button>
                    <button class="tip-action-btn secondary" onclick="window.smartTips.dismissTip('${tip.id}')">
                        Don't show again
                    </button>
                </div>
            </div>
            <div class="tip-arrow"></div>
        `;
        
        return tipElement;
    }

    positionTip(tipElement, targetElement, position) {
        if (!targetElement) {
            // Center position for general tips
            tipElement.style.position = 'fixed';
            tipElement.style.top = '50%';
            tipElement.style.left = '50%';
            tipElement.style.transform = 'translate(-50%, -50%)';
            tipElement.style.zIndex = '10000';
            return;
        }
        
        const rect = targetElement.getBoundingClientRect();
        const tipRect = tipElement.getBoundingClientRect();
        
        tipElement.style.position = 'fixed';
        tipElement.style.zIndex = '10000';
        
        switch (position) {
            case 'top':
                tipElement.style.left = `${rect.left + rect.width / 2 - tipRect.width / 2}px`;
                tipElement.style.top = `${rect.top - tipRect.height - 10}px`;
                break;
            case 'bottom':
                tipElement.style.left = `${rect.left + rect.width / 2 - tipRect.width / 2}px`;
                tipElement.style.top = `${rect.bottom + 10}px`;
                break;
            case 'left':
                tipElement.style.left = `${rect.left - tipRect.width - 10}px`;
                tipElement.style.top = `${rect.top + rect.height / 2 - tipRect.height / 2}px`;
                break;
            case 'right':
                tipElement.style.left = `${rect.right + 10}px`;
                tipElement.style.top = `${rect.top + rect.height / 2 - tipRect.height / 2}px`;
                break;
            default:
                tipElement.style.left = `${rect.left + rect.width / 2 - tipRect.width / 2}px`;
                tipElement.style.top = `${rect.bottom + 10}px`;
        }
        
        // Ensure tip stays within viewport
        this.adjustTipPosition(tipElement);
    }

    adjustTipPosition(tipElement) {
        const rect = tipElement.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        if (rect.right > viewport.width) {
            tipElement.style.left = `${viewport.width - rect.width - 20}px`;
        }
        if (rect.left < 0) {
            tipElement.style.left = '20px';
        }
        if (rect.bottom > viewport.height) {
            tipElement.style.top = `${viewport.height - rect.height - 20}px`;
        }
        if (rect.top < 0) {
            tipElement.style.top = '20px';
        }
    }

    hideTip() {
        const tipElement = document.querySelector('.smart-tip');
        if (tipElement) {
            tipElement.classList.add('hide');
            setTimeout(() => {
                tipElement.remove();
            }, 300);
        }
        this.currentTip = null;
    }

    acceptTip(tipId) {
        const tip = this.tips.get(tipId);
        if (tip) {
            tip.shown = true;
            this.userProgress.acceptedTips.push(tipId);
            this.saveUserProgress();
            this.trackTipAccepted(tip);
        }
        this.hideTip();
        this.showNextTip();
    }

    dismissTip(tipId) {
        const tip = this.tips.get(tipId);
        if (tip) {
            tip.dismissed = true;
            this.userProgress.dismissedTips.push(tipId);
            this.saveUserProgress();
            this.trackTipDismissed(tip);
        }
        this.hideTip();
        this.showNextTip();
    }

    showNextTip() {
        if (this.tipQueue.length > 0 && this.tipsShownThisSession < this.maxTipsPerSession) {
            const nextTip = this.tipQueue.shift();
            const tip = this.tips.get(nextTip.tipId);
            if (tip && this.shouldShowTip(tip, tip.trigger)) {
                setTimeout(() => {
                    this.showTip(tip, nextTip.element);
                }, 2000);
            }
        }
    }

    onPageChange(page) {
        this.hideTip();
        this.tipsShownThisSession = 0; // Reset to allow tips to show again

        console.log(`Smart Tips: Entering ${page} section`);

        // Show welcome tip for the section first
        setTimeout(() => {
            this.showSectionWelcomeTip(page);
        }, 1000);

        // Show page-specific tips after welcome
        setTimeout(() => {
            this.showPageSpecificTips(page);
        }, 3000);
    }

    showSectionWelcomeTip(page) {
        const sectionTips = {
            'dashboard': {
                title: '📊 Dashboard',
                message: 'Track your business performance and get insights to grow faster.'
            },
            'erp': {
                title: '💼 ERP Suite',
                message: 'Manage invoices, inventory, and accounting efficiently in one place.'
            },
            'marketplace': {
                title: '🛒 Marketplace',
                message: 'List your products and reach more customers online.'
            },
            'schemes': {
                title: '🏛️ Government Schemes',
                message: 'Find and apply for government funding and benefits for your business.'
            },
            'crm': {
                title: '🤝 Customer Management',
                message: 'Manage customer relationships and grow your business network.'
            },
            'verification': {
                title: '✅ Business Verification',
                message: 'Complete verification to unlock premium features and build trust.'
            }
        };

        const sectionTip = sectionTips[page];
        if (sectionTip && this.isEnabled) {
            const welcomeTip = {
                id: `welcome-${page}`,
                title: sectionTip.title,
                message: sectionTip.message,
                position: 'top-right',
                priority: 'high',
                category: 'navigation',
                isWelcome: true
            };

            this.showTip(welcomeTip, null);
        }
    }

    showPageSpecificTips(page) {
        const pageTips = {
            'dashboard': ['dashboard-revenue-card', 'profile-completion'],
            'erp': ['erp-invoice-create', 'erp-payment-tracking'],
            'marketplace': ['marketplace-product-upload', 'marketplace-pricing-strategy'],
            'schemes': ['schemes-eligibility-check', 'schemes-application-status'],
            'crm': ['crm-customer-segmentation', 'crm-follow-up-automation']
        };

        const tips = pageTips[page] || [];
        tips.forEach((tipId, index) => {
            setTimeout(() => {
                const tip = this.tips.get(tipId);
                if (tip && this.shouldShowTip(tip, 'load')) {
                    this.showTip(tip, null);
                }
            }, index * 4000); // Longer delay between tips
        });
    }

    setupIdleDetection() {
        let idleTimer;
        const idleTime = 30000; // 30 seconds
        
        const resetIdleTimer = () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                this.triggerIdleTips();
            }, idleTime);
        };
        
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetIdleTimer, true);
        });
        
        resetIdleTimer();
    }

    triggerIdleTips() {
        const idleTips = Array.from(this.tips.values()).filter(tip => 
            tip.trigger === 'idle' && this.shouldShowTip(tip, 'idle')
        );
        
        if (idleTips.length > 0) {
            const randomTip = idleTips[Math.floor(Math.random() * idleTips.length)];
            this.showTip(randomTip, null);
        }
    }

    loadUserProgress() {
        const saved = localStorage.getItem('msme-smart-tips-progress');
        return saved ? JSON.parse(saved) : {
            acceptedTips: [],
            dismissedTips: [],
            totalTipsShown: 0,
            lastSession: Date.now()
        };
    }

    saveUserProgress() {
        localStorage.setItem('msme-smart-tips-progress', JSON.stringify(this.userProgress));
    }

    trackTipShown(tip) {
        this.userProgress.totalTipsShown++;
        console.log(`Smart Tip Shown: ${tip.id} (${tip.category})`);
    }

    trackTipAccepted(tip) {
        console.log(`Smart Tip Accepted: ${tip.id} (${tip.category})`);
    }

    trackTipDismissed(tip) {
        console.log(`Smart Tip Dismissed: ${tip.id} (${tip.category})`);
    }

    startTipSystem() {
        // Show welcome tip for new users
        if (this.userProgress.totalTipsShown === 0) {
            setTimeout(() => {
                this.showWelcomeTip();
            }, 3000);
        }
    }

    showWelcomeTip() {
        const welcomeTip = {
            id: 'welcome',
            title: '🎉 Welcome to Smart Tips!',
            message: 'I\'ll help you discover powerful features as you use the platform. You can disable these tips anytime by clicking the lightbulb icon.',
            position: 'center',
            priority: 'high'
        };

        this.showTip(welcomeTip, null);
    }

    // Advanced tip features
    showTipsByCategory(category) {
        const categoryTips = Array.from(this.tips.values()).filter(tip =>
            tip.category === category && this.shouldShowTip(tip, tip.trigger)
        );

        categoryTips.forEach((tip, index) => {
            setTimeout(() => {
                this.showTip(tip, null);
            }, index * 2000);
        });
    }

    getTipProgress() {
        const totalTips = this.tips.size;
        const acceptedTips = this.userProgress.acceptedTips.length;
        const dismissedTips = this.userProgress.dismissedTips.length;

        return {
            total: totalTips,
            accepted: acceptedTips,
            dismissed: dismissedTips,
            remaining: totalTips - acceptedTips - dismissedTips,
            completionRate: Math.round((acceptedTips / totalTips) * 100)
        };
    }

    showProgressSummary() {
        const progress = this.getTipProgress();
        const summaryTip = {
            id: 'progress-summary',
            title: '📊 Your Learning Progress',
            message: `You've learned ${progress.accepted} out of ${progress.total} features (${progress.completionRate}% complete). Keep exploring to discover more!`,
            position: 'center',
            priority: 'medium'
        };

        this.showTip(summaryTip, null);
    }

    // Contextual tip suggestions
    suggestRelevantTips(currentPage) {
        const relevantTips = {
            'dashboard': ['dashboard-revenue-card', 'dashboard-inventory-alert'],
            'erp': ['erp-invoice-create', 'erp-payment-tracking', 'erp-gst-filing'],
            'marketplace': ['marketplace-product-upload', 'marketplace-pricing-strategy'],
            'schemes': ['schemes-eligibility-check', 'schemes-application-status'],
            'crm': ['crm-customer-segmentation', 'crm-follow-up-automation']
        };

        const tips = relevantTips[currentPage] || [];
        const availableTips = tips.filter(tipId => {
            const tip = this.tips.get(tipId);
            return tip && this.shouldShowTip(tip, 'load');
        });

        if (availableTips.length > 0) {
            const randomTip = availableTips[Math.floor(Math.random() * availableTips.length)];
            const tip = this.tips.get(randomTip);
            setTimeout(() => {
                this.showTip(tip, null);
            }, 3000);
        }
    }

    // Smart tip scheduling based on user behavior
    scheduleSmartTips() {
        // Show tips based on time of day
        const hour = new Date().getHours();

        if (hour >= 9 && hour <= 11) {
            // Morning: Focus on planning and setup
            this.suggestRelevantTips('dashboard');
        } else if (hour >= 14 && hour <= 16) {
            // Afternoon: Focus on operations
            this.suggestRelevantTips('erp');
        } else if (hour >= 17 && hour <= 19) {
            // Evening: Focus on analysis and follow-up
            this.showProgressSummary();
        }
    }

    // Public API methods
    enableTips() {
        this.isEnabled = true;
        this.updateToggleButton();
    }

    disableTips() {
        this.isEnabled = false;
        this.hideTip();
        this.updateToggleButton();
    }

    toggleTips() {
        if (this.isEnabled) {
            this.disableTips();
            this.showToast('Smart Tips disabled', 'info');
        } else {
            this.enableTips();
            this.showToast('Smart Tips enabled', 'success');
        }
    }

    updateToggleButton() {
        const toggleBtn = document.querySelector('.tips-toggle-btn');
        if (toggleBtn) {
            if (this.isEnabled) {
                toggleBtn.classList.add('active');
                toggleBtn.title = 'Disable Smart Tips';
            } else {
                toggleBtn.classList.remove('active');
                toggleBtn.title = 'Enable Smart Tips';
            }
        }
    }

    showToast(message, type = 'info') {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.className = `smart-toast smart-toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-remove
        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    resetTips() {
        this.userProgress = {
            acceptedTips: [],
            dismissedTips: [],
            totalTipsShown: 0,
            lastSession: Date.now()
        };
        this.saveUserProgress();
        
        // Reset all tips
        this.tips.forEach(tip => {
            tip.shown = false;
            tip.dismissed = false;
            tip.showCount = 0;
        });
    }

    // Tip management interface
    showTipManager() {
        const progress = this.getTipProgress();
        const modal = document.createElement('div');
        modal.className = 'tip-manager-modal';
        modal.innerHTML = `
            <div class="tip-manager-overlay" onclick="this.parentElement.remove()"></div>
            <div class="tip-manager-content">
                <div class="tip-manager-header">
                    <h2>🧠 Smart Tips Manager</h2>
                    <button class="tip-manager-close" onclick="this.closest('.tip-manager-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="tip-manager-body">
                    <div class="tip-progress-section">
                        <h3>Learning Progress</h3>
                        <div class="progress-stats">
                            <div class="progress-circle">
                                <svg viewBox="0 0 36 36" class="circular-chart">
                                    <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                    <path class="circle" stroke-dasharray="${progress.completionRate}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                    <text x="18" y="20.35" class="percentage">${progress.completionRate}%</text>
                                </svg>
                            </div>
                            <div class="progress-details">
                                <div class="stat-item">
                                    <span class="stat-value">${progress.accepted}</span>
                                    <span class="stat-label">Tips Learned</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-value">${progress.remaining}</span>
                                    <span class="stat-label">Remaining</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-value">${progress.total}</span>
                                    <span class="stat-label">Total Tips</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tip-categories-section">
                        <h3>Tip Categories</h3>
                        <div class="category-grid">
                            ${this.generateCategoryCards()}
                        </div>
                    </div>

                    <div class="tip-settings-section">
                        <h3>Settings</h3>
                        <div class="settings-options">
                            <label class="setting-option">
                                <input type="checkbox" ${this.isEnabled ? 'checked' : ''} onchange="window.smartTips.toggleTips()">
                                <span>Enable Smart Tips</span>
                            </label>
                            <label class="setting-option">
                                <input type="range" min="1" max="5" value="${this.maxTipsPerSession}" onchange="window.smartTips.setMaxTipsPerSession(this.value)">
                                <span>Tips per session: ${this.maxTipsPerSession}</span>
                            </label>
                            <button class="btn btn-outline" onclick="window.smartTips.resetTips(); this.closest('.tip-manager-modal').remove();">
                                Reset All Tips
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate in
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    }

    generateCategoryCards() {
        const categories = {};
        this.tips.forEach(tip => {
            if (!categories[tip.category]) {
                categories[tip.category] = { total: 0, learned: 0 };
            }
            categories[tip.category].total++;
            if (this.userProgress.acceptedTips.includes(tip.id)) {
                categories[tip.category].learned++;
            }
        });

        return Object.entries(categories).map(([category, stats]) => {
            const percentage = Math.round((stats.learned / stats.total) * 100);
            const categoryIcons = {
                dashboard: 'fas fa-tachometer-alt',
                erp: 'fas fa-calculator',
                marketplace: 'fas fa-store',
                schemes: 'fas fa-gift',
                crm: 'fas fa-users',
                features: 'fas fa-star',
                inventory: 'fas fa-boxes',
                compliance: 'fas fa-shield-alt',
                navigation: 'fas fa-compass',
                profile: 'fas fa-user'
            };

            return `
                <div class="category-card" onclick="window.smartTips.showTipsByCategory('${category}')">
                    <div class="category-icon">
                        <i class="${categoryIcons[category] || 'fas fa-lightbulb'}"></i>
                    </div>
                    <div class="category-info">
                        <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                        <div class="category-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${percentage}%"></div>
                            </div>
                            <span>${stats.learned}/${stats.total}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    setMaxTipsPerSession(value) {
        this.maxTipsPerSession = parseInt(value);
        // Update the display
        const label = document.querySelector('.setting-option span:last-child');
        if (label) {
            label.textContent = `Tips per session: ${this.maxTipsPerSession}`;
        }
    }
}

// Initialize Smart Tips System
window.smartTips = new SmartTipsSystem();

// MSME Portal - Utility Functions

window.Utils = {
    // Format currency in Indian Rupees
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    // Format numbers with Indian numbering system
    formatNumber(number) {
        return new Intl.NumberFormat('en-IN').format(number);
    },

    // Format date in Indian format
    formatDate(date) {
        return new Intl.DateTimeFormat('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(date));
    },

    // Format relative time (e.g., "2 hours ago")
    formatRelativeTime(date) {
        const now = new Date();
        const diff = now - new Date(date);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    },

    // Validate Aadhaar number
    validateAadhaar(aadhaar) {
        const aadhaarRegex = /^\d{12}$/;
        return aadhaarRegex.test(aadhaar);
    },

    // Validate GST number
    validateGST(gst) {
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        return gstRegex.test(gst);
    },

    // Validate PAN number
    validatePAN(pan) {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(pan);
    },

    // Validate email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone number (Indian)
    validatePhone(phone) {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    },

    // Generate random ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Debounce function
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
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Local storage helpers
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Error saving to localStorage:', e);
                return false;
            }
        },

        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('Error reading from localStorage:', e);
                return defaultValue;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Error removing from localStorage:', e);
                return false;
            }
        },

        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('Error clearing localStorage:', e);
                return false;
            }
        }
    },

    // API helpers (mock functions for prototype)
    api: {
        async get(endpoint) {
            // Simulate API delay
            await this.delay(500);
            
            // Mock responses based on endpoint
            const mockData = {
                '/schemes': [
                    {
                        id: 1,
                        name: 'Technology Upgradation Fund Scheme',
                        description: 'Financial assistance for technology upgradation',
                        amount: 10000000,
                        deadline: '2024-12-31',
                        eligible: true
                    }
                ],
                '/products': [
                    {
                        id: 1,
                        name: 'Premium Cotton Fabric',
                        price: 450,
                        seller: 'Kumar Textiles',
                        rating: 4.8
                    }
                ]
            };
            
            return mockData[endpoint] || [];
        },

        async post(endpoint, data) {
            await this.delay(1000);
            return { success: true, id: this.generateId() };
        },

        async put(endpoint, data) {
            await this.delay(800);
            return { success: true };
        },

        async delete(endpoint) {
            await this.delay(600);
            return { success: true };
        },

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },

    // File helpers
    file: {
        // Convert file to base64
        toBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },

        // Format file size
        formatSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        // Check if file type is allowed
        isAllowedType(file, allowedTypes) {
            return allowedTypes.includes(file.type);
        },

        // Check if file size is within limit
        isWithinSizeLimit(file, maxSizeInMB) {
            return file.size <= maxSizeInMB * 1024 * 1024;
        }
    },

    // Animation helpers
    animation: {
        // Smooth scroll to element
        scrollTo(element, duration = 500) {
            const targetPosition = element.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation.bind(this));
        },

        // Easing function
        easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },

        // Fade in element
        fadeIn(element, duration = 300) {
            element.style.opacity = 0;
            element.style.display = 'block';
            
            let start = null;
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                element.style.opacity = Math.min(progress / duration, 1);
                if (progress < duration) {
                    requestAnimationFrame(step);
                }
            }
            requestAnimationFrame(step);
        },

        // Fade out element
        fadeOut(element, duration = 300) {
            let start = null;
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                element.style.opacity = Math.max(1 - progress / duration, 0);
                if (progress < duration) {
                    requestAnimationFrame(step);
                } else {
                    element.style.display = 'none';
                }
            }
            requestAnimationFrame(step);
        }
    },

    // Device detection
    device: {
        isMobile() {
            return window.innerWidth <= 768;
        },

        isTablet() {
            return window.innerWidth > 768 && window.innerWidth <= 1024;
        },

        isDesktop() {
            return window.innerWidth > 1024;
        },

        isTouchDevice() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        }
    },

    // URL helpers
    url: {
        getParams() {
            const params = new URLSearchParams(window.location.search);
            const result = {};
            for (const [key, value] of params) {
                result[key] = value;
            }
            return result;
        },

        setParam(key, value) {
            const url = new URL(window.location);
            url.searchParams.set(key, value);
            window.history.pushState({}, '', url);
        },

        removeParam(key) {
            const url = new URL(window.location);
            url.searchParams.delete(key);
            window.history.pushState({}, '', url);
        }
    }
};

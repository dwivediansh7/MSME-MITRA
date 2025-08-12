// MSME Portal - Page Components and Functionality

window.PageComponents = {
    initVerification() {
        // File upload handlers
        this.initFileUploads();
        
        // Verification button handlers
        document.getElementById('verifyAadhaar')?.addEventListener('click', () => {
            this.handleAadhaarVerification();
        });
        
        document.getElementById('verifyGST')?.addEventListener('click', () => {
            this.handleGSTVerification();
        });
        
        document.getElementById('verifyUdyam')?.addEventListener('click', () => {
            this.handleUdyamVerification();
        });
    },

    initFileUploads() {
        const fileUploads = document.querySelectorAll('.file-upload');
        
        fileUploads.forEach(upload => {
            const input = upload.querySelector('input[type="file"]');
            
            upload.addEventListener('click', () => {
                input.click();
            });
            
            upload.addEventListener('dragover', (e) => {
                e.preventDefault();
                upload.classList.add('dragover');
            });
            
            upload.addEventListener('dragleave', () => {
                upload.classList.remove('dragover');
            });
            
            upload.addEventListener('drop', (e) => {
                e.preventDefault();
                upload.classList.remove('dragover');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileUpload(files[0], upload);
                }
            });
            
            input.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFileUpload(e.target.files[0], upload);
                }
            });
        });
    },

    handleFileUpload(file, uploadElement) {
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            window.msmePortal.showToast('File size must be less than 5MB', 'error');
            return;
        }
        
        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            window.msmePortal.showToast('Please upload PDF, JPG, or PNG files only', 'error');
            return;
        }
        
        // Update UI to show file selected
        const textElement = uploadElement.querySelector('.file-upload-text');
        textElement.textContent = `Selected: ${file.name}`;
        uploadElement.classList.add('file-selected');
        
        window.msmePortal.showToast('File uploaded successfully', 'success');
    },

    handleAadhaarVerification() {
        const aadhaarNumber = document.getElementById('aadhaarNumber').value;
        
        if (!aadhaarNumber || aadhaarNumber.length !== 12) {
            window.msmePortal.showToast('Please enter a valid 12-digit Aadhaar number', 'error');
            return;
        }
        
        // Simulate OTP verification
        this.showOTPModal('Aadhaar', () => {
            window.msmePortal.userData.verificationStatus.aadhaar = true;
            window.msmePortal.checkVerificationStatus();
            window.msmePortal.loadPage('verification');
            window.msmePortal.showToast('Aadhaar verified successfully!', 'success');
        });
    },

    handleGSTVerification() {
        const gstNumber = document.getElementById('gstNumber').value;
        
        if (!gstNumber || gstNumber.length !== 15) {
            window.msmePortal.showToast('Please enter a valid 15-digit GST number', 'error');
            return;
        }
        
        // Simulate verification
        setTimeout(() => {
            window.msmePortal.userData.verificationStatus.gst = true;
            window.msmePortal.checkVerificationStatus();
            window.msmePortal.loadPage('verification');
            window.msmePortal.showToast('GST certificate verified successfully!', 'success');
        }, 1500);
    },

    handleUdyamVerification() {
        const udyamNumber = document.getElementById('udyamNumber').value;
        
        if (!udyamNumber) {
            window.msmePortal.showToast('Please enter Udyam registration number', 'error');
            return;
        }
        
        // Simulate verification
        setTimeout(() => {
            window.msmePortal.userData.verificationStatus.udyam = true;
            window.msmePortal.checkVerificationStatus();
            window.msmePortal.loadPage('verification');
            window.msmePortal.showToast('Udyam registration verified successfully!', 'success');
        }, 1500);
    },

    showOTPModal(type, onSuccess) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">OTP Verification</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Enter the OTP sent to your registered mobile number for ${type} verification:</p>
                    <div class="form-group">
                        <input type="text" class="form-input" id="otpInput" placeholder="Enter 6-digit OTP" maxlength="6">
                    </div>
                    <p class="text-sm text-gray">Didn't receive OTP? <a href="#" class="text-primary">Resend</a></p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancelOTP">Cancel</button>
                    <button class="btn btn-primary" id="verifyOTP">Verify OTP</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#cancelOTP').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#verifyOTP').addEventListener('click', () => {
            const otp = modal.querySelector('#otpInput').value;
            if (otp.length === 6) {
                modal.remove();
                onSuccess();
            } else {
                window.msmePortal.showToast('Please enter a valid 6-digit OTP', 'error');
            }
        });
        
        // Auto-focus on OTP input
        modal.querySelector('#otpInput').focus();
    },

    initMarketplace() {
        // Add product button
        document.getElementById('addProductBtn')?.addEventListener('click', () => {
            this.showAddProductModal();
        });
        
        // Product action buttons
        document.querySelectorAll('.product-actions .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.textContent.trim();
                if (action.includes('Send RFQ')) {
                    this.handleSendRFQ();
                } else if (action.includes('Buy Now')) {
                    this.handleBuyNow();
                }
            });
        });
    },

    showAddProductModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal" style="max-width: 600px;">
                <div class="modal-header">
                    <h3 class="modal-title">Add New Product</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Product Name</label>
                        <input type="text" class="form-input" placeholder="Enter product name">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Category</label>
                        <select class="form-select">
                            <option>Select category</option>
                            <option>Textiles</option>
                            <option>Electronics</option>
                            <option>Food Processing</option>
                            <option>Handicrafts</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Price</label>
                        <input type="number" class="form-input" placeholder="Enter price">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea class="form-textarea" placeholder="Enter product description"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Product Images</label>
                        <div class="file-upload">
                            <div class="file-upload-icon">
                                <i class="fas fa-cloud-upload-alt"></i>
                            </div>
                            <div class="file-upload-text">Upload product images</div>
                            <div class="file-upload-hint">JPG, PNG (Max 5MB each)</div>
                            <input type="file" hidden accept=".jpg,.jpeg,.png" multiple>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary">Cancel</button>
                    <button class="btn btn-primary">Add Product</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.querySelector('.btn-secondary').addEventListener('click', () => modal.remove());
        
        // Add product handler
        modal.querySelector('.btn-primary').addEventListener('click', () => {
            window.msmePortal.showToast('Product added successfully!', 'success');
            modal.remove();
        });
    },

    handleSendRFQ() {
        window.msmePortal.showToast('RFQ sent successfully!', 'success');
    },

    handleBuyNow() {
        window.msmePortal.showToast('Redirecting to payment...', 'info');
    },

    initERP() {
        // ERP module cards
        document.querySelectorAll('.erp-module-card .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const moduleCard = e.target.closest('.erp-module-card');
                const moduleName = moduleCard.querySelector('h3').textContent;
                window.msmePortal.showToast(`Opening ${moduleName} module...`, 'info');
            });
        });
    },

    initCRM() {
        // Add lead button
        document.querySelector('.crm-page .btn-primary')?.addEventListener('click', () => {
            this.showAddLeadModal();
        });
    },

    showAddLeadModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">Add New Lead</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Company Name</label>
                        <input type="text" class="form-input" placeholder="Enter company name">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Contact Person</label>
                        <input type="text" class="form-input" placeholder="Enter contact person name">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" placeholder="Enter email address">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-input" placeholder="Enter phone number">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Lead Source</label>
                        <select class="form-select">
                            <option>Website</option>
                            <option>Referral</option>
                            <option>Social Media</option>
                            <option>Trade Show</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary">Cancel</button>
                    <button class="btn btn-primary">Add Lead</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.querySelector('.btn-secondary').addEventListener('click', () => modal.remove());
        
        // Add lead handler
        modal.querySelector('.btn-primary').addEventListener('click', () => {
            window.msmePortal.showToast('Lead added successfully!', 'success');
            modal.remove();
        });
    },

    initSchemes() {
        // Apply now buttons
        document.querySelectorAll('.schemes-page .btn-primary').forEach(btn => {
            if (btn.textContent.includes('Apply Now')) {
                btn.addEventListener('click', () => {
                    window.msmePortal.showToast('Redirecting to application form...', 'info');
                });
            }
        });
    },

    initBusinessScore() {
        // Request loan button
        document.querySelector('.business-score-page .btn-primary')?.addEventListener('click', () => {
            window.msmePortal.showToast('Loan request submitted successfully!', 'success');
        });
    },

    initLearning() {
        // Learning content buttons
        document.querySelectorAll('.learning-page .btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.textContent.trim();
                if (action.includes('Watch')) {
                    window.msmePortal.showToast('Opening video player...', 'info');
                } else if (action.includes('Read')) {
                    window.msmePortal.showToast('Opening guide...', 'info');
                }
            });
        });
    },

    // CRM System Functionality
    initCRM() {
        this.initCRMTabs();
        this.initCRMInteractions();
        this.initAnimatedCounters();
        this.initInteractiveStats();

        // Initialize CRM system globally
        window.crmSystem = {
            showQuickSearch: () => this.showQuickSearch(),
            addNewContact: () => this.addNewContact(),
            addNewLead: () => this.addNewLead()
        };
    },

    initCRMTabs() {
        // Modern tab cards
        const tabCards = document.querySelectorAll('.tab-card');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetTab = card.getAttribute('data-tab');

                // Remove active class from all cards and panels
                tabCards.forEach(c => c.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked card and corresponding panel
                card.classList.add('active');
                const targetPanel = document.getElementById(`${targetTab}-tab`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }

                // Add click animation
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });

        // Legacy tab buttons (fallback)
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                button.classList.add('active');
                const targetPanel = document.getElementById(`${targetTab}-tab`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    },

    initAnimatedCounters() {
        const counters = document.querySelectorAll('.metric-value[data-target]');

        const animateCounter = (counter) => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const start = performance.now();
            const isDecimal = target % 1 !== 0;
            const isCurrency = counter.textContent.includes('₹');

            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = target * easeOutQuart;

                if (isCurrency) {
                    counter.textContent = `₹${isDecimal ? current.toFixed(1) : Math.floor(current)}L`;
                } else {
                    counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        };

        // Intersection Observer for triggering animations when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    },

    initInteractiveStats() {
        // Add hover effects and click interactions to uniform stat cards
        const statCards = document.querySelectorAll('.uniform-stat-card');

        statCards.forEach(card => {
            // Add click effect
            card.addEventListener('click', (event) => {
                const statType = card.getAttribute('data-stat');
                this.showStatDetails(statType);

                // Add ripple effect
                this.createRippleEffect(card, event);
            });

            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });

        // Animate progress circles and charts
        this.animateUniformCharts();
    },

    createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 153, 51, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        // Add ripple animation to CSS if not exists
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to { transform: scale(2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    },

    animateCharts() {
        // Legacy chart animation (fallback)
        const progressCircles = document.querySelectorAll('.progress-circle');
        progressCircles.forEach(circle => {
            const circumference = 2 * Math.PI * 25; // radius = 25
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;

            setTimeout(() => {
                circle.style.strokeDashoffset = circle.getAttribute('stroke-dashoffset');
            }, 500);
        });

        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            const height = bar.style.height;
            bar.style.height = '0';
            setTimeout(() => {
                bar.style.height = height;
            }, 200 + index * 100);
        });
    },

    animateUniformCharts() {
        // Animate uniform bar charts
        const barCharts = document.querySelectorAll('.bar-chart');
        barCharts.forEach(chart => {
            const bars = chart.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                const height = bar.style.height;
                bar.style.height = '0';
                setTimeout(() => {
                    bar.style.height = height;
                    bar.style.transition = 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 300 + index * 150);
            });
        });

        // Animate uniform progress circles
        const progressCircles = document.querySelectorAll('.circular-progress .progress-circle');
        progressCircles.forEach(circle => {
            const circumference = 2 * Math.PI * 25; // radius = 25
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;

            setTimeout(() => {
                circle.style.strokeDashoffset = circle.getAttribute('stroke-dashoffset') || '47';
            }, 800);
        });

        // Animate uniform donut charts
        const donutCharts = document.querySelectorAll('.donut-chart .donut-progress');
        donutCharts.forEach(donut => {
            const circumference = 2 * Math.PI * 22; // radius = 22
            donut.style.strokeDasharray = circumference;
            donut.style.strokeDashoffset = circumference;

            setTimeout(() => {
                donut.style.strokeDashoffset = donut.getAttribute('stroke-dashoffset') || '35';
            }, 1000);
        });

        // Animate trend lines
        const trendLines = document.querySelectorAll('.trend-line');
        trendLines.forEach(line => {
            line.style.strokeDasharray = '100';
            line.style.strokeDashoffset = '100';

            setTimeout(() => {
                line.style.strokeDashoffset = '0';
                line.style.transition = 'stroke-dashoffset 2s ease-out';
            }, 600);
        });

        // Animate status indicators
        const indicators = document.querySelectorAll('.status-indicators .indicator');
        indicators.forEach((indicator, index) => {
            indicator.style.opacity = '0';
            indicator.style.transform = 'scale(0)';

            setTimeout(() => {
                indicator.style.opacity = '1';
                indicator.style.transform = 'scale(1)';
                indicator.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 1200 + index * 100);
        });

        // Animate alert rings
        const alertRings = document.querySelectorAll('.alert-rings .ring');
        alertRings.forEach((ring, index) => {
            ring.style.animationDelay = `${index * 0.5}s`;
        });
    },

    showStatDetails(statType) {
        const statData = {
            contacts: {
                title: 'Contact Management Details',
                content: `
                    <div class="stat-details">
                        <div class="detail-grid">
                            <div class="detail-item">
                                <h4>Total Contacts</h4>
                                <p>1,247 active contacts in your database</p>
                            </div>
                            <div class="detail-item">
                                <h4>Growth Rate</h4>
                                <p>+12% increase this month</p>
                            </div>
                            <div class="detail-item">
                                <h4>Contact Sources</h4>
                                <p>Website: 45%, Referrals: 30%, Events: 25%</p>
                            </div>
                        </div>
                    </div>
                `
            },
            leads: {
                title: 'Lead Management Details',
                content: `
                    <div class="stat-details">
                        <div class="detail-grid">
                            <div class="detail-item">
                                <h4>Active Leads</h4>
                                <p>89 leads currently in your pipeline</p>
                            </div>
                            <div class="detail-item">
                                <h4>Conversion Rate</h4>
                                <p>23% average conversion rate</p>
                            </div>
                            <div class="detail-item">
                                <h4>Hot Leads</h4>
                                <p>15 leads with high conversion probability</p>
                            </div>
                        </div>
                    </div>
                `
            }
            // Add more stat types as needed
        };

        const data = statData[statType] || {
            title: 'Statistics Details',
            content: '<p>Detailed information about this statistic.</p>'
        };

        this.createModal(data.title, data.content);
    },

    initCRMInteractions() {
        // Contact card interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.contact-card')) {
                const card = e.target.closest('.contact-card');
                if (!e.target.closest('.contact-actions')) {
                    this.showContactDetails(card);
                }
            }
        });

        // Pipeline card drag and drop (simplified)
        this.initPipelineDragDrop();

        // Task management
        this.initTaskManagement();
    },

    initPipelineDragDrop() {
        const pipelineCards = document.querySelectorAll('.pipeline-card');

        pipelineCards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', card.innerHTML);
                card.style.opacity = '0.5';
            });

            card.addEventListener('dragend', () => {
                card.style.opacity = '1';
            });
        });

        const pipelineColumns = document.querySelectorAll('.pipeline-column');

        pipelineColumns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                column.style.backgroundColor = 'rgba(255, 153, 51, 0.1)';
            });

            column.addEventListener('dragleave', () => {
                column.style.backgroundColor = '';
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                column.style.backgroundColor = '';
                // Handle the drop logic here
                this.showToast('Deal moved successfully!', 'success');
            });
        });
    },

    initTaskManagement() {
        // Task completion toggle
        document.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox' && e.target.closest('.task-item')) {
                const taskItem = e.target.closest('.task-item');
                if (e.target.checked) {
                    taskItem.classList.add('completed');
                    this.showToast('Task completed!', 'success');
                } else {
                    taskItem.classList.remove('completed');
                }
            }
        });
    },

    showQuickSearch() {
        const searchModal = this.createModal('Quick Search', `
            <div class="quick-search">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search contacts, leads, deals..." class="form-input" id="quickSearchInput">
                </div>
                <div class="search-results" id="searchResults">
                    <div class="search-category">
                        <h4>Contacts</h4>
                        <div class="search-item">
                            <i class="fas fa-user"></i>
                            <span>Rajesh Kumar - Kumar Textiles</span>
                        </div>
                    </div>
                    <div class="search-category">
                        <h4>Deals</h4>
                        <div class="search-item">
                            <i class="fas fa-handshake"></i>
                            <span>ERP Implementation - ₹12,00,000</span>
                        </div>
                    </div>
                </div>
            </div>
        `);

        // Focus on search input
        setTimeout(() => {
            document.getElementById('quickSearchInput')?.focus();
        }, 100);
    },

    addNewContact() {
        const contactModal = this.createModal('Add New Contact', `
            <form class="contact-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Full Name *</label>
                        <input type="text" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Company</label>
                        <input type="text" class="form-input">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email *</label>
                        <input type="email" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-input">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Position</label>
                        <input type="text" class="form-input">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" class="form-input">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Tags</label>
                    <input type="text" class="form-input" placeholder="VIP Customer, Hot Lead, etc.">
                </div>
                <div class="form-group">
                    <label class="form-label">Notes</label>
                    <textarea class="form-textarea" rows="3"></textarea>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Contact</button>
                </div>
            </form>
        `);
    },

    addNewLead() {
        const leadModal = this.createModal('Add New Lead', `
            <form class="lead-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Lead Name *</label>
                        <input type="text" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Company *</label>
                        <input type="text" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-input">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Lead Source</label>
                        <select class="form-select">
                            <option>Website</option>
                            <option>Referral</option>
                            <option>Social Media</option>
                            <option>Cold Call</option>
                            <option>Trade Show</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Estimated Value</label>
                        <input type="number" class="form-input" placeholder="₹">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-textarea" rows="3"></textarea>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Lead</button>
                </div>
            </form>
        `);
    },

    showContactDetails(contactCard) {
        const contactName = contactCard.querySelector('h4').textContent;
        const contactModal = this.createModal(`Contact Details - ${contactName}`, `
            <div class="contact-details-view">
                <div class="contact-header">
                    <div class="contact-avatar-large">
                        <img src="https://via.placeholder.com/100" alt="Contact">
                    </div>
                    <div class="contact-info-large">
                        <h2>${contactName}</h2>
                        <p>CEO, Kumar Textiles</p>
                        <div class="contact-status-large online">
                            <span class="status-dot"></span>
                            <span>Online</span>
                        </div>
                    </div>
                </div>

                <div class="contact-tabs">
                    <button class="tab-btn active" data-tab="overview">Overview</button>
                    <button class="tab-btn" data-tab="activity">Activity</button>
                    <button class="tab-btn" data-tab="deals">Deals</button>
                    <button class="tab-btn" data-tab="notes">Notes</button>
                </div>

                <div class="contact-tab-content">
                    <div class="tab-pane active" id="overview">
                        <div class="info-grid">
                            <div class="info-item">
                                <label>Email</label>
                                <span>rajesh@kumartextiles.com</span>
                            </div>
                            <div class="info-item">
                                <label>Phone</label>
                                <span>+91 98765 43210</span>
                            </div>
                            <div class="info-item">
                                <label>Location</label>
                                <span>Mumbai, Maharashtra</span>
                            </div>
                            <div class="info-item">
                                <label>Last Contact</label>
                                <span>2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="contact-actions-large">
                    <button class="btn btn-primary">
                        <i class="fas fa-envelope"></i>
                        Send Email
                    </button>
                    <button class="btn btn-outline">
                        <i class="fas fa-phone"></i>
                        Call
                    </button>
                    <button class="btn btn-outline">
                        <i class="fas fa-calendar"></i>
                        Schedule Meeting
                    </button>
                    <button class="btn btn-outline">
                        <i class="fas fa-edit"></i>
                        Edit Contact
                    </button>
                </div>
            </div>
        `);
    },

    // ===== MODULE ACTION IMPLEMENTATIONS =====

    // Invoicing Module Actions
    createNewInvoice() {
        this.showToast('Opening invoice creation form...', 'info');
        const modal = this.createModal('Create New Invoice', `
            <div class="invoice-form">
                <div class="form-section">
                    <h4>Customer Details</h4>
                    <div class="form-row">
                        <input type="text" class="form-input" placeholder="Customer Name" value="Ramesh Traders">
                        <input type="text" class="form-input" placeholder="GST Number" value="27ABCDE1234F1Z5">
                    </div>
                </div>
                <div class="form-section">
                    <h4>Invoice Items</h4>
                    <div class="invoice-items">
                        <div class="item-row">
                            <input type="text" class="form-input" placeholder="Item Description" value="Parle G Biscuits">
                            <input type="number" class="form-input" placeholder="Qty" value="100">
                            <input type="number" class="form-input" placeholder="Rate" value="150">
                            <span class="item-total">₹15,000</span>
                        </div>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="window.erpSystem?.addInvoiceItem()">Add Item</button>
                </div>
                <div class="invoice-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>₹15,000</span>
                    </div>
                    <div class="summary-row">
                        <span>GST (18%):</span>
                        <span>₹2,700</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total:</span>
                        <span>₹17,700</span>
                    </div>
                </div>
                <div class="form-actions">
                    <button class="btn btn-primary" onclick="window.erpSystem?.saveInvoice()">Save Invoice</button>
                    <button class="btn btn-success" onclick="window.erpSystem?.saveAndSendWhatsApp()">Save & Send WhatsApp</button>
                </div>
            </div>
        `);
    },

    sendWhatsAppInvoice() {
        this.showToast('Preparing invoice for WhatsApp...', 'info');
        setTimeout(() => {
            const modal = this.createModal('Send Invoice via WhatsApp', `
                <div class="whatsapp-send">
                    <div class="invoice-preview">
                        <h4>Invoice Preview</h4>
                        <div class="preview-content">
                            <p><strong>Invoice #INV-001</strong></p>
                            <p>To: Ramesh Traders</p>
                            <p>Amount: ₹17,700</p>
                            <p>Due Date: ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="whatsapp-options">
                        <input type="tel" class="form-input" placeholder="WhatsApp Number" value="+91 98765 43210">
                        <textarea class="form-input" placeholder="Custom message (optional)">Hi Ramesh, Please find your invoice attached. Payment due in 30 days. Thank you!</textarea>
                        <button class="btn btn-success" onclick="window.erpSystem?.confirmWhatsAppSend()">
                            <i class="fab fa-whatsapp"></i> Send Invoice
                        </button>
                    </div>
                </div>
            `);
        }, 1000);
    },

    viewInvoiceHistory() {
        const modal = this.createModal('Invoice History', `
            <div class="invoice-history">
                <div class="history-filters">
                    <select class="form-input">
                        <option>All Invoices</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Overdue</option>
                    </select>
                    <input type="date" class="form-input" value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="invoice-list-detailed">
                    <div class="invoice-item-detailed">
                        <div class="invoice-header">
                            <span class="invoice-number">#INV-001</span>
                            <span class="invoice-date">15 Mar 2024</span>
                            <span class="invoice-status paid">Paid</span>
                        </div>
                        <div class="invoice-details">
                            <span class="customer">Ramesh Traders</span>
                            <span class="amount">₹17,700</span>
                        </div>
                        <div class="invoice-actions">
                            <button class="btn btn-sm btn-outline">View</button>
                            <button class="btn btn-sm btn-outline">Download</button>
                            <button class="btn btn-sm btn-success">WhatsApp</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    },

    viewInvoice(id) {
        this.showToast(`Opening invoice ${id}...`, 'info');
        // Implementation for viewing specific invoice
    },

    sendReminder(id) {
        this.showToast(`Sending payment reminder for ${id}...`, 'success');
        // Implementation for sending reminder
    },

    // Billing Module Actions
    createBill() {
        this.showToast('Opening bill creation form...', 'info');
        // Similar to createNewInvoice but for bills
    },

    trackPayments() {
        const modal = this.createModal('Payment Tracking', `
            <div class="payment-tracking">
                <div class="tracking-summary">
                    <div class="tracking-stats">
                        <div class="stat-item">
                            <div class="stat-value">₹2,45,000</div>
                            <div class="stat-label">Collected This Month</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">₹45,000</div>
                            <div class="stat-label">Pending</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">₹12,000</div>
                            <div class="stat-label">Overdue</div>
                        </div>
                    </div>
                </div>
                <div class="payment-timeline">
                    <h4>Recent Payments</h4>
                    <div class="timeline-item">
                        <div class="timeline-date">Today</div>
                        <div class="timeline-content">
                            <span class="payment-from">Ramesh Traders</span>
                            <span class="payment-amount">₹15,000</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
    },

    sendReminders() {
        this.showToast('Sending payment reminders to all pending customers...', 'info');
        setTimeout(() => {
            this.showToast('Reminders sent successfully to 5 customers', 'success');
        }, 2000);
    },

    sendUrgentReminder(id) {
        this.showToast(`Sending urgent reminder for ${id}...`, 'warning');
        setTimeout(() => {
            this.showToast('Urgent reminder sent successfully', 'success');
        }, 1500);
    },

    // Inventory Module Actions
    addNewItem() {
        const modal = this.createModal('Add New Item', `
            <div class="add-item-form">
                <div class="form-section">
                    <h4>Item Details</h4>
                    <div class="form-row">
                        <input type="text" class="form-input" placeholder="Item Name" value="">
                        <input type="text" class="form-input" placeholder="SKU Code" value="">
                    </div>
                    <div class="form-row">
                        <input type="number" class="form-input" placeholder="Initial Stock" value="">
                        <input type="number" class="form-input" placeholder="Minimum Stock Level" value="">
                    </div>
                    <div class="form-row">
                        <input type="number" class="form-input" placeholder="Purchase Price" value="">
                        <input type="number" class="form-input" placeholder="Selling Price" value="">
                    </div>
                </div>
                <div class="form-actions">
                    <button class="btn btn-primary" onclick="window.erpSystem?.saveNewItem()">Add Item</button>
                </div>
            </div>
        `);
    },

    updateStock() {
        this.showToast('Opening stock update interface...', 'info');
    },

    generateStockReport() {
        this.showToast('Generating stock report...', 'info');
        setTimeout(() => {
            this.showToast('Stock report generated successfully', 'success');
        }, 2000);
    },

    reorderItem(sku) {
        this.showToast(`Initiating reorder for ${sku}...`, 'info');
        setTimeout(() => {
            this.showToast('Reorder request sent to supplier', 'success');
        }, 1500);
    },

    viewItemDetails(sku) {
        const modal = this.createModal(`Item Details - ${sku}`, `
            <div class="item-details">
                <div class="item-header">
                    <h4>Parle G Biscuits</h4>
                    <span class="item-sku">SKU: ${sku}</span>
                </div>
                <div class="item-stats">
                    <div class="stat-row">
                        <span>Current Stock:</span>
                        <span class="stock-value critical">5 units</span>
                    </div>
                    <div class="stat-row">
                        <span>Minimum Level:</span>
                        <span>10 units</span>
                    </div>
                    <div class="stat-row">
                        <span>Last Reorder:</span>
                        <span>15 days ago</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-primary" onclick="window.erpSystem?.reorderItem('${sku}')">Reorder Now</button>
                    <button class="btn btn-outline" onclick="window.erpSystem?.updateItemStock('${sku}')">Update Stock</button>
                </div>
            </div>
        `);
    },

    // Accounting Module Actions
    addTransaction() {
        const modal = this.createModal('Add Transaction', `
            <div class="transaction-form">
                <div class="form-section">
                    <h4>Transaction Details</h4>
                    <div class="form-row">
                        <select class="form-input">
                            <option>Income</option>
                            <option>Expense</option>
                        </select>
                        <input type="number" class="form-input" placeholder="Amount" value="">
                    </div>
                    <div class="form-row">
                        <input type="text" class="form-input" placeholder="Description" value="">
                        <input type="date" class="form-input" value="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-row">
                        <select class="form-input">
                            <option>Cash</option>
                            <option>Bank Transfer</option>
                            <option>UPI</option>
                            <option>Cheque</option>
                        </select>
                        <select class="form-input">
                            <option>Sales</option>
                            <option>Office Expenses</option>
                            <option>Travel</option>
                            <option>Marketing</option>
                        </select>
                    </div>
                </div>
                <div class="form-actions">
                    <button class="btn btn-primary" onclick="window.erpSystem?.saveTransaction()">Save Transaction</button>
                </div>
            </div>
        `);
    },

    viewLedger() {
        this.showToast('Opening ledger view...', 'info');
    },

    generateProfitLoss() {
        this.showToast('Generating P&L report...', 'info');
        setTimeout(() => {
            this.showToast('P&L report generated successfully', 'success');
        }, 2000);
    },

    // Tax Module Actions
    fileGSTReturn() {
        const modal = this.createModal('File GST Return', `
            <div class="gst-filing">
                <div class="filing-summary">
                    <h4>GST Return Summary</h4>
                    <div class="gst-breakdown">
                        <div class="gst-item">
                            <span>CGST:</span>
                            <span>₹15,000</span>
                        </div>
                        <div class="gst-item">
                            <span>SGST:</span>
                            <span>₹15,000</span>
                        </div>
                        <div class="gst-item">
                            <span>IGST:</span>
                            <span>₹15,000</span>
                        </div>
                        <div class="gst-total">
                            <span>Total GST:</span>
                            <span>₹45,000</span>
                        </div>
                    </div>
                </div>
                <div class="filing-actions">
                    <button class="btn btn-primary" onclick="window.erpSystem?.submitGSTReturn()">Submit Return</button>
                    <button class="btn btn-outline" onclick="window.erpSystem?.saveGSTDraft()">Save as Draft</button>
                </div>
            </div>
        `);
    },

    viewGSTReports() {
        this.showToast('Opening GST reports...', 'info');
    },

    payGST() {
        this.showToast('Redirecting to GST payment portal...', 'info');
        setTimeout(() => {
            this.showToast('Payment portal opened', 'success');
        }, 1500);
    },

    // Reports Module Actions
    generateCustomReport() {
        this.showToast('Opening custom report builder...', 'info');
    },

    scheduleReport() {
        this.showToast('Opening report scheduler...', 'info');
    },

    exportAllReports() {
        this.showToast('Preparing all reports for export...', 'info');
        setTimeout(() => {
            this.showToast('Reports exported successfully', 'success');
        }, 2000);
    },

    openReportCategory(category) {
        this.showToast(`Opening ${category} reports...`, 'info');
    },

    // General Actions
    requestFeature(feature) {
        this.showToast(`Feature request submitted for ${feature} module`, 'success');
    },

    // Helper functions for module actions
    saveInvoice() {
        this.showToast('Invoice saved successfully', 'success');
    },

    saveAndSendWhatsApp() {
        this.showToast('Invoice saved and sent via WhatsApp', 'success');
    },

    confirmWhatsAppSend() {
        this.showToast('Invoice sent via WhatsApp successfully', 'success');
    },

    saveNewItem() {
        this.showToast('New item added to inventory', 'success');
    },

    saveTransaction() {
        this.showToast('Transaction recorded successfully', 'success');
    },

    submitGSTReturn() {
        this.showToast('GST return submitted successfully', 'success');
    },

    saveGSTDraft() {
        this.showToast('GST return saved as draft', 'info');
    },

    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        return modal;
    },

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 5000);
    },

    // Comprehensive ERP System
    initBankReconciliation() {
        // Initialize comprehensive ERP system globally
        window.erpSystem = {
            openBankReconciliation: () => this.openBankReconciliation(),
            toggleLanguage: () => this.toggleLanguage(),
            toggleVoiceAssistant: () => this.toggleVoiceAssistant(),
            showDailySummary: () => this.showDailySummary(),
            handleSmartSearch: (query) => this.handleSmartSearch(query),
            showSearchSuggestions: () => this.showSearchSuggestions(),
            startVoiceSearch: () => this.startVoiceSearch(),
            openModule: (module) => this.openModule(module),
            exportFinancialReport: () => this.exportFinancialReport(),
            showDetailedAnalysis: () => this.showDetailedAnalysis(),
            showPendingPayments: () => this.showPendingPayments(),
            sendWhatsAppSummary: () => this.sendWhatsAppSummary(),
            dismissTip: () => this.dismissTip(),

            // Invoicing Module Actions
            createNewInvoice: () => this.createNewInvoice(),
            sendWhatsAppInvoice: () => this.sendWhatsAppInvoice(),
            viewInvoiceHistory: () => this.viewInvoiceHistory(),
            viewInvoice: (id) => this.viewInvoice(id),
            sendReminder: (id) => this.sendReminder(id),

            // Billing Module Actions
            createBill: () => this.createBill(),
            trackPayments: () => this.trackPayments(),
            sendReminders: () => this.sendReminders(),
            sendUrgentReminder: (id) => this.sendUrgentReminder(id),

            // Inventory Module Actions
            addNewItem: () => this.addNewItem(),
            updateStock: () => this.updateStock(),
            generateStockReport: () => this.generateStockReport(),
            reorderItem: (sku) => this.reorderItem(sku),
            viewItemDetails: (sku) => this.viewItemDetails(sku),

            // Accounting Module Actions
            addTransaction: () => this.addTransaction(),
            viewLedger: () => this.viewLedger(),
            generateProfitLoss: () => this.generateProfitLoss(),

            // Tax Module Actions
            fileGSTReturn: () => this.fileGSTReturn(),
            viewGSTReports: () => this.viewGSTReports(),
            payGST: () => this.payGST(),

            // Reports Module Actions
            generateCustomReport: () => this.generateCustomReport(),
            scheduleReport: () => this.scheduleReport(),
            exportAllReports: () => this.exportAllReports(),
            openReportCategory: (category) => this.openReportCategory(category),

            // General Actions
            requestFeature: (feature) => this.requestFeature(feature),
            showTipDemo: () => this.showTipDemo()
        };

        window.bankRecon = {
            connectBank: () => this.connectBank(),
            fetchTransactions: () => this.fetchTransactions(),
            autoReconcile: () => this.autoReconcile()
        };

        // Initialize drag and drop for transaction matching
        this.initTransactionMatching();

        // Initialize drag and drop for transaction matching
        this.initTransactionMatching();
    },

    openBankReconciliation() {
        // Navigate to bank reconciliation page
        const content = window.Pages.bankReconciliation();
        document.getElementById('main-content').innerHTML = content;

        // Initialize the module after content is loaded
        setTimeout(() => {
            this.initBankReconciliation();
            this.animateBankStats();
            this.initSmartTips();
            this.initLanguageSupport();
            this.initOfflineMode();
            this.updateCurrentTime();
        }, 100);

        this.showToast('Bank Reconciliation module opened', 'success');
    },

    connectBank() {
        const modal = this.createModal('Connect Bank Account', `
            <div class="bank-connection-form">
                <div class="form-group">
                    <label class="form-label">Select Bank</label>
                    <select class="form-select">
                        <option>Select your bank</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>SBI</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                        <option>Yes Bank</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Account Number</label>
                    <input type="text" class="form-input" placeholder="Enter account number">
                </div>

                <div class="form-group">
                    <label class="form-label">IFSC Code</label>
                    <input type="text" class="form-input" placeholder="Enter IFSC code">
                </div>

                <div class="form-group">
                    <label class="form-label">Account Holder Name</label>
                    <input type="text" class="form-input" placeholder="Enter account holder name">
                </div>

                <div class="api-connection-info">
                    <div class="info-box">
                        <i class="fas fa-info-circle"></i>
                        <div>
                            <h4>Secure API Connection</h4>
                            <p>We use bank-approved APIs to securely fetch your transaction data. Your login credentials are never stored.</p>
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="window.bankRecon.processConnection(this)">
                        <i class="fas fa-link"></i>
                        Connect Account
                    </button>
                </div>
            </div>
        `);

        // Add connection processing function
        window.bankRecon.processConnection = (button) => {
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            button.disabled = true;

            setTimeout(() => {
                modal.remove();
                this.showToast('Bank account connected successfully!', 'success');
                // Refresh the page to show new account
                this.openBankReconciliation();
            }, 3000);
        };
    },

    fetchTransactions() {
        this.showToast('Fetching transactions from connected banks...', 'info');

        // Simulate API call
        const fetchButton = document.querySelector('[onclick*="fetchTransactions"]');
        if (fetchButton) {
            const originalText = fetchButton.innerHTML;
            fetchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching...';
            fetchButton.disabled = true;

            setTimeout(() => {
                fetchButton.innerHTML = originalText;
                fetchButton.disabled = false;
                this.showToast('Successfully fetched 25 new transactions', 'success');
                this.updateTransactionCounts();
            }, 4000);
        }
    },

    autoReconcile() {
        const modal = this.createModal('Auto Reconciliation', `
            <div class="auto-reconcile-process">
                <div class="process-header">
                    <h4>Automatic Transaction Matching</h4>
                    <p>AI-powered matching will analyze and match transactions automatically</p>
                </div>

                <div class="process-steps">
                    <div class="step active">
                        <div class="step-icon">
                            <i class="fas fa-search"></i>
                        </div>
                        <div class="step-content">
                            <h5>Analyzing Transactions</h5>
                            <p>Scanning bank transactions and ERP entries...</p>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-icon">
                            <i class="fas fa-brain"></i>
                        </div>
                        <div class="step-content">
                            <h5>AI Matching</h5>
                            <p>Using machine learning to find matches...</p>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="step-content">
                            <h5>Validation</h5>
                            <p>Validating matches and generating report...</p>
                        </div>
                    </div>
                </div>

                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <div class="progress-text">0% Complete</div>
            </div>
        `);

        // Simulate auto-reconciliation process
        this.simulateAutoReconciliation(modal);
    },

    simulateAutoReconciliation(modal) {
        const steps = modal.querySelectorAll('.step');
        const progressFill = modal.querySelector('.progress-fill');
        const progressText = modal.querySelector('.progress-text');

        let currentStep = 0;
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5;

            if (progress >= 33 && currentStep === 0) {
                steps[0].classList.remove('active');
                steps[0].classList.add('completed');
                steps[1].classList.add('active');
                currentStep = 1;
            } else if (progress >= 66 && currentStep === 1) {
                steps[1].classList.remove('active');
                steps[1].classList.add('completed');
                steps[2].classList.add('active');
                currentStep = 2;
            } else if (progress >= 100) {
                progress = 100;
                steps[2].classList.remove('active');
                steps[2].classList.add('completed');
                clearInterval(interval);

                setTimeout(() => {
                    modal.remove();
                    this.showAutoReconcileResults();
                }, 1000);
            }

            progressFill.style.width = `${Math.min(progress, 100)}%`;
            progressText.textContent = `${Math.floor(Math.min(progress, 100))}% Complete`;
        }, 500);
    },

    showAutoReconcileResults() {
        const modal = this.createModal('Reconciliation Complete', `
            <div class="reconcile-results">
                <div class="results-header">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Auto-Reconciliation Completed!</h3>
                </div>

                <div class="results-stats">
                    <div class="result-stat">
                        <div class="stat-number">18</div>
                        <div class="stat-label">New Matches Found</div>
                    </div>
                    <div class="result-stat">
                        <div class="stat-number">5</div>
                        <div class="stat-label">Require Manual Review</div>
                    </div>
                    <div class="result-stat">
                        <div class="stat-number">95.2%</div>
                        <div class="stat-label">Accuracy Rate</div>
                    </div>
                </div>

                <div class="results-actions">
                    <button class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">
                        Review Later
                    </button>
                    <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-eye"></i>
                        Review Matches
                    </button>
                </div>
            </div>
        `);

        this.showToast('Auto-reconciliation completed successfully!', 'success');
    },

    initTransactionMatching() {
        // Add drag and drop functionality for manual matching
        const transactionItems = document.querySelectorAll('.transaction-item');
        const entryItems = document.querySelectorAll('.entry-item');

        transactionItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.dataset.id || 'transaction');
                item.style.opacity = '0.5';
            });

            item.addEventListener('dragend', () => {
                item.style.opacity = '1';
            });
        });

        entryItems.forEach(item => {
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                item.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            });

            item.addEventListener('dragleave', () => {
                item.style.backgroundColor = '';
            });

            item.addEventListener('drop', (e) => {
                e.preventDefault();
                item.style.backgroundColor = '';
                this.showToast('Transactions matched successfully!', 'success');
            });
        });
    },

    animateBankStats() {
        // Animate the dashboard statistics
        const statNumbers = document.querySelectorAll('.dashboard-stats .stat-number');

        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const isPercentage = finalValue.includes('%');
            const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));

            let currentValue = 0;
            const increment = numericValue / 50;

            const animate = () => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                } else {
                    if (isPercentage) {
                        stat.textContent = `${currentValue.toFixed(1)}%`;
                    } else {
                        stat.textContent = Math.floor(currentValue).toString();
                    }
                    requestAnimationFrame(animate);
                }
            };

            stat.textContent = '0';
            setTimeout(() => animate(), 500);
        });
    },

    updateTransactionCounts() {
        // Update transaction counts after fetching
        const matchedStat = document.querySelector('.stat-card.matched .stat-number');
        const unmatchedStat = document.querySelector('.stat-card.unmatched .stat-number');

        if (matchedStat) {
            const current = parseInt(matchedStat.textContent);
            matchedStat.textContent = (current + 15).toString();
        }

        if (unmatchedStat) {
            const current = parseInt(unmatchedStat.textContent);
            unmatchedStat.textContent = (current + 10).toString();
        }
    },

    // Enhanced ERP System Features

    // Language Support System
    toggleLanguage() {
        const currentLang = document.getElementById('current-language');
        const isHindi = currentLang.textContent === 'हिंदी';

        if (isHindi) {
            currentLang.textContent = 'English';
            this.switchToEnglish();
        } else {
            currentLang.textContent = 'हिंदी';
            this.switchToHindi();
        }

        this.showToast(isHindi ? 'Language switched to English' : 'भाषा हिंदी में बदली गई', 'success');
    },

    switchToHindi() {
        const translations = {
            'erp_dashboard': 'ईआरपी डैशबोर्ड',
            'erp_subtitle': 'अपने व्यापारिक संचालन को कुशलता से प्रबंधित करें',
            'online': 'ऑनलाइन',
            'last_backup': 'अंतिम बैकअप: 2 मिनट पहले',
            'voice_guide': 'आवाज गाइड',
            'daily_summary': 'दैनिक सारांश',
            'search_placeholder': 'कुछ भी खोजें... (ग्राहक, चालान, वस्तु, आदि)',
            'recent_searches': 'हाल की खोजें',
            'quick_actions': 'त्वरित कार्य',
            'create_invoice': 'नया चालान बनाएं',
            'add_customer': 'ग्राहक जोड़ें',
            'business_modules': 'व्यापारिक मॉड्यूल',
            'all': 'सभी',
            'finance': 'वित्त',
            'operations': 'संचालन',
            'reports': 'रिपोर्ट',
            'invoicing': 'चालान',
            'invoicing_desc': 'ऑटो-जीएसटी गणना के साथ चालान बनाएं और प्रबंधित करें',
            'billing': 'बिलिंग',
            'billing_desc': 'भुगतान ट्रैक करें और बिलिंग चक्र प्रबंधित करें',
            'inventory': 'इन्वेंटरी',
            'inventory_desc': 'स्टॉक प्रबंधन और इन्वेंटरी ट्रैकिंग',
            'accounting': 'लेखांकन',
            'accounting_desc': 'वित्तीय रिपोर्ट और लेखांकन प्रबंधन',
            'tax_gst': 'कर (जीएसटी)',
            'tax_desc': 'जीएसटी फाइलिंग और कर अनुपालन प्रबंधन',
            'reports': 'रिपोर्ट',
            'reports_desc': 'पीडीएफ/एक्सेल प्रारूप में रिपोर्ट निर्यात करें',
            'open_module': 'मॉड्यूल खोलें',
            'financial_overview': 'वित्तीय अवलोकन',
            'export': 'निर्यात',
            'detailed_view': 'विस्तृत दृश्य',
            'total_revenue': 'कुल आय',
            'outstanding': 'बकाया',
            'expenses': 'खर्च',
            'net_profit': 'शुद्ध लाभ',
            'follow_up': 'फॉलो अप',
            'todays_summary': 'आज का व्यापारिक सारांश',
            'earned_today': 'आज कमाया',
            'payments_pending': 'लंबित भुगतान',
            'low_stock_items': 'कम स्टॉक वस्तुएं',
            'new_orders': 'नए ऑर्डर',
            'send_whatsapp_summary': 'व्हाट्सऐप पर सारांश भेजें',
            'auto_summary_note': 'ऑटो-सारांश दैनिक शाम 6 बजे भेजा जाएगा',
            'got_it': 'समझ गया',
            'show_me': 'दिखाएं'
        };

        this.applyTranslations(translations);
    },

    switchToEnglish() {
        const translations = {
            'erp_dashboard': 'ERP Dashboard',
            'erp_subtitle': 'Manage your business operations efficiently',
            'online': 'Online',
            'last_backup': 'Last backup: 2 mins ago',
            'voice_guide': 'Voice Guide',
            'daily_summary': 'Daily Summary',
            'search_placeholder': 'Search anything... (Customer, Invoice, Item, etc.)',
            'recent_searches': 'Recent Searches',
            'quick_actions': 'Quick Actions',
            'create_invoice': 'Create New Invoice',
            'add_customer': 'Add Customer',
            'business_modules': 'Business Modules',
            'all': 'All',
            'finance': 'Finance',
            'operations': 'Operations',
            'reports': 'Reports',
            'invoicing': 'Invoicing',
            'invoicing_desc': 'Create and manage invoices with auto-GST calculations',
            'billing': 'Billing',
            'billing_desc': 'Track payments and manage billing cycles',
            'inventory': 'Inventory',
            'inventory_desc': 'Stock management and inventory tracking',
            'accounting': 'Accounting',
            'accounting_desc': 'Financial reports and accounting management',
            'tax_gst': 'Tax (GST)',
            'tax_desc': 'GST filing and tax compliance management',
            'reports': 'Reports',
            'reports_desc': 'Export reports in PDF/Excel format',
            'open_module': 'Open Module',
            'financial_overview': 'Financial Overview',
            'export': 'Export',
            'detailed_view': 'Detailed View',
            'total_revenue': 'Total Revenue',
            'outstanding': 'Outstanding',
            'expenses': 'Expenses',
            'net_profit': 'Net Profit',
            'follow_up': 'Follow Up',
            'todays_summary': "Today's Business Summary",
            'earned_today': 'Earned Today',
            'payments_pending': 'Payments Pending',
            'low_stock_items': 'Low Stock Items',
            'new_orders': 'New Orders',
            'send_whatsapp_summary': 'Send Summary to WhatsApp',
            'auto_summary_note': 'Auto-summary will be sent at 6 PM daily',
            'got_it': 'Got it',
            'show_me': 'Show me'
        };

        this.applyTranslations(translations);
    },

    applyTranslations(translations) {
        document.body.classList.add('language-switching');

        Object.keys(translations).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                element.textContent = translations[key];
            });

            const placeholderElements = document.querySelectorAll(`[data-translate-placeholder="${key}"]`);
            placeholderElements.forEach(element => {
                element.placeholder = translations[key];
            });
        });

        setTimeout(() => {
            document.body.classList.remove('language-switching');
        }, 300);
    },

    initLanguageSupport() {
        // Initialize language support
        this.currentLanguage = 'english';

        // Add voice guidance for Hindi users
        if (navigator.language.includes('hi')) {
            this.showLanguageSuggestion();
        }
    },

    showLanguageSuggestion() {
        setTimeout(() => {
            this.showToast('हिंदी में उपलब्ध है! Language button पर click करें', 'info', 5000);
        }, 2000);
    },

    // Voice Assistant System
    toggleVoiceAssistant() {
        const voiceBtn = document.querySelector('.voice-assistant');
        const isActive = voiceBtn.classList.contains('active');

        if (isActive) {
            this.stopVoiceAssistant();
            voiceBtn.classList.remove('active');
            this.showToast('Voice assistant disabled', 'info');
        } else {
            this.startVoiceAssistant();
            voiceBtn.classList.add('active');
            this.showToast('Voice assistant enabled', 'success');
        }
    },

    startVoiceAssistant() {
        this.voiceAssistantActive = true;
        this.speakWelcomeMessage();

        // Add voice guidance to module cards
        this.addVoiceGuidance();
    },

    stopVoiceAssistant() {
        this.voiceAssistantActive = false;
        if (this.currentSpeech) {
            speechSynthesis.cancel();
        }
    },

    speakWelcomeMessage() {
        const currentLang = document.getElementById('current-language').textContent;
        const message = currentLang === 'हिंदी'
            ? 'नमस्ते! मैं आपका व्यापारिक सहायक हूं। किसी भी मॉड्यूल पर होवर करें और मैं आपको बताऊंगा।'
            : 'Hello! I am your business assistant. Hover over any module and I will guide you.';

        this.speak(message);
    },

    speak(text) {
        if (!this.voiceAssistantActive) return;

        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        const currentLang = document.getElementById('current-language').textContent;
        utterance.lang = currentLang === 'हिंदी' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;

        this.currentSpeech = utterance;
        speechSynthesis.speak(utterance);
    },

    addVoiceGuidance() {
        const moduleCards = document.querySelectorAll('.erp-module-card');

        moduleCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!this.voiceAssistantActive) return;

                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                const currentLang = document.getElementById('current-language').textContent;

                let message;
                if (currentLang === 'हिंदी') {
                    message = `${title} मॉड्यूल। ${description}`;
                } else {
                    message = `${title} module. ${description}`;
                }

                this.speak(message);
            });
        });
    },

    // Smart Search System
    handleSmartSearch(query) {
        if (!query.trim()) {
            this.hideSearchSuggestions();
            return;
        }

        const suggestions = this.generateSearchSuggestions(query);
        this.displaySearchSuggestions(suggestions);
    },

    generateSearchSuggestions(query) {
        const mockData = [
            { type: 'customer', name: 'Customer Ramesh', icon: 'fas fa-user' },
            { type: 'customer', name: 'Customer Priya', icon: 'fas fa-user' },
            { type: 'invoice', name: 'Invoice #INV-102', icon: 'fas fa-file-invoice' },
            { type: 'invoice', name: 'Invoice #INV-103', icon: 'fas fa-file-invoice' },
            { type: 'item', name: 'Item: Parle G', icon: 'fas fa-box' },
            { type: 'item', name: 'Item: Maggi', icon: 'fas fa-box' },
            { type: 'action', name: 'Create New Invoice', icon: 'fas fa-plus' },
            { type: 'action', name: 'Add Customer', icon: 'fas fa-user-plus' },
            { type: 'action', name: 'View Reports', icon: 'fas fa-chart-bar' }
        ];

        return mockData.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6);
    },

    displaySearchSuggestions(suggestions) {
        const suggestionsContainer = document.getElementById('search-suggestions');

        if (suggestions.length === 0) {
            this.hideSearchSuggestions();
            return;
        }

        const html = `
            <div class="suggestion-category">
                <h4>Search Results</h4>
                ${suggestions.map(item => `
                    <div class="suggestion-item" onclick="window.erpSystem?.selectSearchResult('${item.type}', '${item.name}')">
                        <i class="${item.icon}"></i>
                        <span>${item.name}</span>
                    </div>
                `).join('')}
            </div>
        `;

        suggestionsContainer.innerHTML = html;
        suggestionsContainer.style.display = 'block';
    },

    showSearchSuggestions() {
        const suggestionsContainer = document.getElementById('search-suggestions');
        const html = `
            <div class="suggestion-category">
                <h4 data-translate="recent_searches">Recent Searches</h4>
                <div class="suggestion-item" onclick="window.erpSystem?.selectSearchResult('customer', 'Customer Ramesh')">
                    <i class="fas fa-user"></i>
                    <span>Customer Ramesh</span>
                </div>
                <div class="suggestion-item" onclick="window.erpSystem?.selectSearchResult('invoice', 'Invoice #INV-102')">
                    <i class="fas fa-file-invoice"></i>
                    <span>Invoice #INV-102</span>
                </div>
            </div>
            <div class="suggestion-category">
                <h4 data-translate="quick_actions">Quick Actions</h4>
                <div class="suggestion-item" onclick="window.erpSystem?.selectSearchResult('action', 'Create New Invoice')">
                    <i class="fas fa-plus"></i>
                    <span data-translate="create_invoice">Create New Invoice</span>
                </div>
                <div class="suggestion-item" onclick="window.erpSystem?.selectSearchResult('action', 'Add Customer')">
                    <i class="fas fa-user-plus"></i>
                    <span data-translate="add_customer">Add Customer</span>
                </div>
            </div>
        `;

        suggestionsContainer.innerHTML = html;
        suggestionsContainer.style.display = 'block';
    },

    hideSearchSuggestions() {
        const suggestionsContainer = document.getElementById('search-suggestions');
        suggestionsContainer.style.display = 'none';
    },

    selectSearchResult(type, name) {
        this.hideSearchSuggestions();
        document.querySelector('.search-input').value = name;

        // Simulate navigation based on type
        switch(type) {
            case 'customer':
                this.showToast(`Opening customer: ${name}`, 'success');
                break;
            case 'invoice':
                this.showToast(`Opening invoice: ${name}`, 'success');
                break;
            case 'item':
                this.showToast(`Showing item: ${name}`, 'success');
                break;
            case 'action':
                this.executeQuickAction(name);
                break;
        }
    },

    executeQuickAction(action) {
        switch(action) {
            case 'Create New Invoice':
                this.openModule('invoicing');
                break;
            case 'Add Customer':
                this.showAddCustomerModal();
                break;
            case 'View Reports':
                this.openModule('reports');
                break;
        }
    },

    startVoiceSearch() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showToast('Voice search not supported in this browser', 'error');
            return;
        }

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        const voiceBtn = document.querySelector('.search-voice');

        recognition.lang = document.getElementById('current-language').textContent === 'हिंदी' ? 'hi-IN' : 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceBtn.classList.add('voice-recording');

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.querySelector('.search-input').value = transcript;
            this.handleSmartSearch(transcript);
            voiceBtn.classList.remove('voice-recording');
        };

        recognition.onerror = () => {
            voiceBtn.classList.remove('voice-recording');
            this.showToast('Voice search failed. Please try again.', 'error');
        };

        recognition.onend = () => {
            voiceBtn.classList.remove('voice-recording');
        };

        recognition.start();
        this.showToast('Listening... Speak now', 'info');
    },

    // Module Management
    openModule(moduleName) {
        this.showToast(`Opening ${moduleName} module...`, 'info');

        // Simulate module opening with loading
        const loadingModal = this.createModal(`Opening ${moduleName}`, `
            <div style="text-align: center; padding: 2rem;">
                <div class="loading-spinner" style="margin: 0 auto 1rem;"></div>
                <p>Loading ${moduleName} module...</p>
            </div>
        `);

        setTimeout(() => {
            loadingModal.remove();
            this.showModuleInterface(moduleName);
        }, 2000);
    },

    showModuleInterface(moduleName) {
        const moduleContent = this.getModuleContent(moduleName);
        const modal = this.createModal(`${moduleName} Module`, moduleContent);

        // Add module-specific functionality
        this.initModuleFeatures(moduleName, modal);
    },

    getModuleContent(moduleName) {
        const moduleTemplates = {
            invoicing: this.getInvoicingModule(),
            billing: this.getBillingModule(),
            inventory: this.getInventoryModule(),
            accounting: this.getAccountingModule(),
            tax: this.getTaxModule(),
            reports: this.getReportsModule()
        };

        return moduleTemplates[moduleName] || this.getDefaultModule(moduleName);
    },

    getInvoicingModule() {
        return `
            <div class="module-interface">
                <div class="module-header">
                    <h3><i class="fas fa-file-invoice"></i> Invoice Management</h3>
                    <div class="module-stats">
                        <span class="stat-badge">156 invoices this month</span>
                        <span class="stat-badge success">₹2,45,000 collected</span>
                    </div>
                </div>

                <div class="module-toolbar">
                    <button class="btn btn-primary" onclick="window.erpSystem?.createNewInvoice()">
                        <i class="fas fa-plus"></i> Create Invoice
                    </button>
                    <button class="btn btn-success" onclick="window.erpSystem?.sendWhatsAppInvoice()">
                        <i class="fab fa-whatsapp"></i> Send via WhatsApp
                    </button>
                    <button class="btn btn-outline" onclick="window.erpSystem?.viewInvoiceHistory()">
                        <i class="fas fa-history"></i> View History
                    </button>
                </div>

                <div class="module-content">
                    <div class="recent-invoices">
                        <h4>Recent Invoices</h4>
                        <div class="invoice-list">
                            <div class="invoice-item">
                                <div class="invoice-info">
                                    <span class="invoice-number">#INV-001</span>
                                    <span class="customer-name">Ramesh Traders</span>
                                </div>
                                <div class="invoice-amount">₹15,000</div>
                                <div class="invoice-status paid">Paid</div>
                                <button class="btn btn-sm btn-outline" onclick="window.erpSystem?.viewInvoice('INV-001')">View</button>
                            </div>
                            <div class="invoice-item">
                                <div class="invoice-info">
                                    <span class="invoice-number">#INV-002</span>
                                    <span class="customer-name">Sharma Electronics</span>
                                </div>
                                <div class="invoice-amount">₹8,500</div>
                                <div class="invoice-status pending">Pending</div>
                                <button class="btn btn-sm btn-primary" onclick="window.erpSystem?.sendReminder('INV-002')">Remind</button>
                            </div>
                        </div>
                    </div>

                    <div class="feature-highlight">
                        <i class="fas fa-lightbulb"></i>
                        <strong>Smart Feature:</strong> Auto-calculate GST and send invoices directly to WhatsApp!
                    </div>
                </div>
            </div>
        `;
    },

    getBillingModule() {
        return `
            <div class="module-interface">
                <div class="module-header">
                    <h3><i class="fas fa-calculator"></i> Billing Management</h3>
                    <div class="module-stats">
                        <span class="stat-badge">89 bills this month</span>
                        <span class="stat-badge warning">₹45,000 pending</span>
                    </div>
                </div>

                <div class="module-toolbar">
                    <button class="btn btn-primary" onclick="window.erpSystem?.createBill()">
                        <i class="fas fa-plus"></i> Create Bill
                    </button>
                    <button class="btn btn-outline" onclick="window.erpSystem?.trackPayments()">
                        <i class="fas fa-chart-line"></i> Track Payments
                    </button>
                    <button class="btn btn-warning" onclick="window.erpSystem?.sendReminders()">
                        <i class="fas fa-bell"></i> Send Reminders
                    </button>
                </div>

                <div class="module-content">
                    <div class="payment-overview">
                        <div class="payment-stats-grid">
                            <div class="payment-stat">
                                <div class="stat-value">₹2,45,000</div>
                                <div class="stat-label">Total Collected</div>
                            </div>
                            <div class="payment-stat">
                                <div class="stat-value">₹45,000</div>
                                <div class="stat-label">Pending</div>
                            </div>
                            <div class="payment-stat">
                                <div class="stat-value">₹12,000</div>
                                <div class="stat-label">Overdue</div>
                            </div>
                        </div>
                    </div>

                    <div class="pending-payments">
                        <h4>Pending Payments</h4>
                        <div class="payment-list">
                            <div class="payment-item overdue">
                                <div class="payment-info">
                                    <span class="customer">Gupta Store</span>
                                    <span class="due-date">Due: 15 days ago</span>
                                </div>
                                <div class="payment-amount">₹12,000</div>
                                <button class="btn btn-sm btn-warning" onclick="window.erpSystem?.sendUrgentReminder('GUPTA001')">Send Reminder</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getInventoryModule() {
        return `
            <div class="module-interface">
                <div class="module-header">
                    <h3><i class="fas fa-boxes"></i> Inventory Management</h3>
                    <div class="module-stats">
                        <span class="stat-badge warning">3 low stock items</span>
                        <span class="stat-badge">245 total items</span>
                    </div>
                </div>

                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Low Stock Alert:</strong> 3 items need immediate restocking
                </div>

                <div class="module-toolbar">
                    <button class="btn btn-primary" onclick="window.erpSystem?.addNewItem()">
                        <i class="fas fa-plus"></i> Add Item
                    </button>
                    <button class="btn btn-outline" onclick="window.erpSystem?.updateStock()">
                        <i class="fas fa-edit"></i> Update Stock
                    </button>
                    <button class="btn btn-warning" onclick="window.erpSystem?.generateStockReport()">
                        <i class="fas fa-chart-bar"></i> Stock Report
                    </button>
                </div>

                <div class="module-content">
                    <div class="stock-overview">
                        <h4>Stock Status</h4>
                        <div class="stock-items">
                            <div class="stock-item critical">
                                <div class="item-info">
                                    <span class="item-name">Parle G Biscuits</span>
                                    <span class="item-code">SKU: PG001</span>
                                </div>
                                <div class="stock-level critical">5 units</div>
                                <button class="btn btn-sm btn-primary" onclick="window.erpSystem?.reorderItem('PG001')">Reorder</button>
                            </div>
                            <div class="stock-item low">
                                <div class="item-info">
                                    <span class="item-name">Maggi Noodles</span>
                                    <span class="item-code">SKU: MG002</span>
                                </div>
                                <div class="stock-level low">12 units</div>
                                <button class="btn btn-sm btn-outline" onclick="window.erpSystem?.viewItemDetails('MG002')">View</button>
                            </div>
                            <div class="stock-item good">
                                <div class="item-info">
                                    <span class="item-name">Tata Tea</span>
                                    <span class="item-code">SKU: TT003</span>
                                </div>
                                <div class="stock-level good">45 units</div>
                                <button class="btn btn-sm btn-outline" onclick="window.erpSystem?.viewItemDetails('TT003')">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getAccountingModule() {
        return `
            <div class="module-interface">
                <div class="module-header">
                    <h3><i class="fas fa-chart-pie"></i> Accounting</h3>
                    <div class="module-stats">
                        <span class="stat-badge success">₹3,45,000 revenue</span>
                        <span class="stat-badge">₹1,23,000 expenses</span>
                    </div>
                </div>

                <div class="module-toolbar">
                    <button class="btn btn-primary" onclick="window.erpSystem?.addTransaction()">
                        <i class="fas fa-plus"></i> Add Transaction
                    </button>
                    <button class="btn btn-outline" onclick="window.erpSystem?.viewLedger()">
                        <i class="fas fa-book"></i> View Ledger
                    </button>
                    <button class="btn btn-success" onclick="window.erpSystem?.generateProfitLoss()">
                        <i class="fas fa-chart-line"></i> P&L Report
                    </button>
                </div>

                <div class="module-content">
                    <div class="financial-summary">
                        <div class="summary-cards">
                            <div class="summary-card revenue">
                                <div class="card-icon"><i class="fas fa-arrow-up"></i></div>
                                <div class="card-content">
                                    <div class="card-value">₹3,45,000</div>
                                    <div class="card-label">Total Revenue</div>
                                </div>
                            </div>
                            <div class="summary-card expense">
                                <div class="card-icon"><i class="fas fa-arrow-down"></i></div>
                                <div class="card-content">
                                    <div class="card-value">₹1,23,000</div>
                                    <div class="card-label">Total Expenses</div>
                                </div>
                            </div>
                            <div class="summary-card profit">
                                <div class="card-icon"><i class="fas fa-chart-line"></i></div>
                                <div class="card-content">
                                    <div class="card-value">₹2,22,000</div>
                                    <div class="card-label">Net Profit</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="recent-transactions">
                        <h4>Recent Transactions</h4>
                        <div class="transaction-list">
                            <div class="transaction-item income">
                                <div class="transaction-info">
                                    <span class="transaction-desc">Payment from Ramesh Traders</span>
                                    <span class="transaction-date">Today, 2:30 PM</span>
                                </div>
                                <div class="transaction-amount income">+₹15,000</div>
                            </div>
                            <div class="transaction-item expense">
                                <div class="transaction-info">
                                    <span class="transaction-desc">Office Rent Payment</span>
                                    <span class="transaction-date">Yesterday, 10:00 AM</span>
                                </div>
                                <div class="transaction-amount expense">-₹25,000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getTaxModule() {
        return `
            <div class="module-interface">
                <div class="module-header">
                    <h3><i class="fas fa-receipt"></i> Tax (GST) Management</h3>
                    <div class="module-stats">
                        <span class="stat-badge">GST due in 5 days</span>
                        <span class="stat-badge warning">₹45,000 pending</span>
                    </div>
                </div>

                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    <strong>GST Filing Reminder:</strong> Your next GST return is due on 20th of this month
                </div>

                <div class="module-toolbar">
                    <button class="btn btn-primary" onclick="window.erpSystem?.fileGSTReturn()">
                        <i class="fas fa-file-upload"></i> File GST Return
                    </button>
                    <button class="btn btn-outline" onclick="window.erpSystem?.viewGSTReports()">
                        <i class="fas fa-chart-bar"></i> GST Reports
                    </button>
                    <button class="btn btn-success" onclick="window.erpSystem?.payGST()">
                        <i class="fas fa-credit-card"></i> Pay GST
                    </button>
                </div>

                <div class="module-content">
                    <div class="gst-overview">
                        <div class="gst-summary">
                            <div class="gst-card">
                                <div class="gst-type">CGST</div>
                                <div class="gst-amount">₹15,000</div>
                            </div>
                            <div class="gst-card">
                                <div class="gst-type">SGST</div>
                                <div class="gst-amount">₹15,000</div>
                            </div>
                            <div class="gst-card">
                                <div class="gst-type">IGST</div>
                                <div class="gst-amount">₹15,000</div>
                            </div>
                        </div>
                    </div>

                    <div class="compliance-status">
                        <h4>Compliance Status</h4>
                        <div class="compliance-items">
                            <div class="compliance-item completed">
                                <i class="fas fa-check-circle"></i>
                                <span>GSTR-1 Filed (March 2024)</span>
                            </div>
                            <div class="compliance-item pending">
                                <i class="fas fa-clock"></i>
                                <span>GSTR-3B Due (April 2024)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getReportsModule() {
        return `
            <div class="module-interface">
                <div class="module-header">
                    <h3><i class="fas fa-chart-bar"></i> Reports & Analytics</h3>
                    <div class="module-stats">
                        <span class="stat-badge">25 reports generated</span>
                        <span class="stat-badge success">All data up-to-date</span>
                    </div>
                </div>

                <div class="module-toolbar">
                    <button class="btn btn-primary" onclick="window.erpSystem?.generateCustomReport()">
                        <i class="fas fa-plus"></i> Custom Report
                    </button>
                    <button class="btn btn-outline" onclick="window.erpSystem?.scheduleReport()">
                        <i class="fas fa-clock"></i> Schedule Report
                    </button>
                    <button class="btn btn-success" onclick="window.erpSystem?.exportAllReports()">
                        <i class="fas fa-download"></i> Export All
                    </button>
                </div>

                <div class="module-content">
                    <div class="report-categories">
                        <div class="report-category" onclick="window.erpSystem?.openReportCategory('financial')">
                            <div class="category-icon"><i class="fas fa-chart-line"></i></div>
                            <div class="category-info">
                                <h4>Financial Reports</h4>
                                <p>P&L, Balance Sheet, Cash Flow</p>
                            </div>
                            <div class="category-count">8 reports</div>
                        </div>

                        <div class="report-category" onclick="window.erpSystem?.openReportCategory('sales')">
                            <div class="category-icon"><i class="fas fa-shopping-cart"></i></div>
                            <div class="category-info">
                                <h4>Sales Reports</h4>
                                <p>Sales analysis, Customer reports</p>
                            </div>
                            <div class="category-count">12 reports</div>
                        </div>

                        <div class="report-category" onclick="window.erpSystem?.openReportCategory('inventory')">
                            <div class="category-icon"><i class="fas fa-boxes"></i></div>
                            <div class="category-info">
                                <h4>Inventory Reports</h4>
                                <p>Stock levels, Movement analysis</p>
                            </div>
                            <div class="category-count">5 reports</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getDefaultModule(moduleName) {
        return `
            <div class="module-interface">
                <div class="module-header">
                    <h3><i class="fas fa-cog"></i> ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} Module</h3>
                    <div class="module-stats">
                        <span class="stat-badge">Coming Soon</span>
                    </div>
                </div>

                <div class="module-content">
                    <div class="coming-soon">
                        <i class="fas fa-tools"></i>
                        <h4>Module Under Development</h4>
                        <p>The ${moduleName} module is currently being developed and will be available soon.</p>
                        <button class="btn btn-primary" onclick="window.erpSystem?.requestFeature('${moduleName}')">
                            <i class="fas fa-bell"></i> Notify When Ready
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    initModuleFeatures(moduleName, modal) {
        // Add smart tips for specific modules
        setTimeout(() => {
            this.showModuleTip(moduleName);
        }, 1000);
    },

    showModuleTip(moduleName) {
        const tips = {
            invoicing: {
                title: 'WhatsApp Integration',
                message: 'Did you know you can send this invoice directly to WhatsApp?',
                demo: 'whatsapp_demo'
            },
            billing: {
                title: 'Payment Tracking',
                message: 'Click here to track payment history and send reminders.',
                demo: 'payment_demo'
            },
            inventory: {
                title: 'Low Stock Alerts',
                message: 'Set up automatic reorder points to never run out of stock.',
                demo: 'stock_demo'
            }
        };

        const tip = tips[moduleName];
        if (tip) {
            this.showSmartTip(tip.title, tip.message, tip.demo);
        }
    },

    // Smart Tips System
    initSmartTips() {
        this.tipQueue = [
            {
                title: 'WhatsApp Integration',
                message: 'Did you know you can send invoices directly to WhatsApp?',
                trigger: 'invoicing',
                demo: 'whatsapp_demo'
            },
            {
                title: 'Payment Tracking',
                message: 'Click here to track payment history and follow up on pending payments.',
                trigger: 'billing',
                demo: 'payment_demo'
            },
            {
                title: 'Voice Search',
                message: 'Try using voice search! Click the microphone icon and say "Customer Ramesh".',
                trigger: 'search',
                demo: 'voice_demo'
            },
            {
                title: 'Daily Summary',
                message: 'Get your business summary sent to WhatsApp every evening automatically.',
                trigger: 'summary',
                demo: 'summary_demo'
            }
        ];

        this.currentTipIndex = 0;
        this.showNextTip();
    },

    showNextTip() {
        if (this.currentTipIndex >= this.tipQueue.length) {
            this.currentTipIndex = 0;
        }

        const tip = this.tipQueue[this.currentTipIndex];

        setTimeout(() => {
            this.showSmartTip(tip.title, tip.message, tip.demo);
        }, 10000 + (this.currentTipIndex * 15000)); // Show tips every 15 seconds
    },

    showSmartTip(title, message, demo) {
        const overlay = document.getElementById('smart-tips-overlay');
        const titleEl = document.getElementById('tip-title');
        const messageEl = document.getElementById('tip-message');

        titleEl.textContent = title;
        messageEl.textContent = message;

        overlay.style.display = 'block';
        overlay.dataset.demo = demo;

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            this.dismissTip();
        }, 8000);
    },

    dismissTip() {
        const overlay = document.getElementById('smart-tips-overlay');
        overlay.style.display = 'none';

        this.currentTipIndex++;
        this.showNextTip();
    },

    showTipDemo() {
        const overlay = document.getElementById('smart-tips-overlay');
        const demo = overlay.dataset.demo;

        this.dismissTip();

        switch(demo) {
            case 'whatsapp_demo':
                this.demonstrateWhatsAppIntegration();
                break;
            case 'payment_demo':
                this.demonstratePaymentTracking();
                break;
            case 'voice_demo':
                this.demonstrateVoiceSearch();
                break;
            case 'summary_demo':
                this.showDailySummary();
                break;
        }
    },

    demonstrateWhatsAppIntegration() {
        this.showToast('Opening WhatsApp integration demo...', 'info');

        const modal = this.createModal('WhatsApp Integration Demo', `
            <div class="demo-content">
                <h4>Send Invoice via WhatsApp</h4>
                <div class="demo-steps">
                    <div class="demo-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h5>Select Invoice</h5>
                            <p>Choose the invoice you want to send</p>
                        </div>
                    </div>
                    <div class="demo-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h5>Click WhatsApp Button</h5>
                            <p>Click the green WhatsApp button</p>
                        </div>
                    </div>
                    <div class="demo-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h5>Send Automatically</h5>
                            <p>Invoice PDF is automatically attached and sent</p>
                        </div>
                    </div>
                </div>
                <div class="demo-actions">
                    <button class="btn btn-success" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fab fa-whatsapp"></i>
                        Try WhatsApp Integration
                    </button>
                </div>
            </div>
        `);
    },

    demonstratePaymentTracking() {
        this.showToast('Opening payment tracking demo...', 'info');
        this.showPendingPayments();
    },

    demonstrateVoiceSearch() {
        this.showToast('Voice search demo - Try saying "Customer Ramesh"', 'info');
        this.startVoiceSearch();
    },

    // Financial Dashboard Features
    exportFinancialReport() {
        this.showToast('Preparing financial report for export...', 'info');

        setTimeout(() => {
            const modal = this.createModal('Export Financial Report', `
                <div class="export-options">
                    <h4>Select Export Format</h4>
                    <div class="format-options">
                        <button class="btn btn-outline format-btn" onclick="window.erpSystem?.downloadReport('pdf')">
                            <i class="fas fa-file-pdf"></i>
                            <span>PDF Report</span>
                        </button>
                        <button class="btn btn-outline format-btn" onclick="window.erpSystem?.downloadReport('excel')">
                            <i class="fas fa-file-excel"></i>
                            <span>Excel Spreadsheet</span>
                        </button>
                        <button class="btn btn-outline format-btn" onclick="window.erpSystem?.downloadReport('csv')">
                            <i class="fas fa-file-csv"></i>
                            <span>CSV Data</span>
                        </button>
                    </div>
                    <div class="export-options-detail">
                        <h5>Include:</h5>
                        <label><input type="checkbox" checked> Revenue Details</label>
                        <label><input type="checkbox" checked> Expense Breakdown</label>
                        <label><input type="checkbox" checked> Profit Analysis</label>
                        <label><input type="checkbox"> Tax Information</label>
                    </div>
                </div>
            `);
        }, 1000);
    },

    downloadReport(format) {
        this.showToast(`Downloading ${format.toUpperCase()} report...`, 'success');

        // Simulate download
        setTimeout(() => {
            this.showToast(`Financial report downloaded successfully!`, 'success');
        }, 2000);

        // Close modal
        document.querySelector('.modal-overlay').remove();
    },

    showDetailedAnalysis() {
        const modal = this.createModal('Detailed Financial Analysis', `
            <div class="detailed-analysis">
                <div class="analysis-tabs">
                    <button class="tab-btn active">Revenue Trends</button>
                    <button class="tab-btn">Expense Analysis</button>
                    <button class="tab-btn">Profit Margins</button>
                    <button class="tab-btn">Cash Flow</button>
                </div>
                <div class="analysis-content">
                    <div class="chart-placeholder">
                        <i class="fas fa-chart-line" style="font-size: 4rem; color: #ccc;"></i>
                        <p>Interactive charts would be displayed here</p>
                    </div>
                    <div class="analysis-insights">
                        <h5>Key Insights:</h5>
                        <ul>
                            <li>Revenue increased by 12.5% this month</li>
                            <li>Best performing day: Fridays</li>
                            <li>Top expense category: Raw Materials (45%)</li>
                            <li>Profit margin improved by 3.2%</li>
                        </ul>
                    </div>
                </div>
            </div>
        `);
    },

    showPendingPayments() {
        const modal = this.createModal('Pending Payments', `
            <div class="pending-payments">
                <div class="payments-header">
                    <h4>Outstanding Payments (₹85,000)</h4>
                    <button class="btn btn-primary btn-sm">Send All Reminders</button>
                </div>
                <div class="payments-list">
                    <div class="payment-item overdue">
                        <div class="payment-info">
                            <h5>Kumar Textiles</h5>
                            <p>Invoice #INV-098 • Due: Dec 10, 2024</p>
                        </div>
                        <div class="payment-amount">₹45,000</div>
                        <div class="payment-actions">
                            <button class="btn btn-sm btn-warning">
                                <i class="fab fa-whatsapp"></i>
                                Remind
                            </button>
                            <button class="btn btn-sm btn-outline">Call</button>
                        </div>
                    </div>
                    <div class="payment-item due-soon">
                        <div class="payment-info">
                            <h5>ABC Enterprises</h5>
                            <p>Invoice #INV-102 • Due: Dec 20, 2024</p>
                        </div>
                        <div class="payment-amount">₹25,000</div>
                        <div class="payment-actions">
                            <button class="btn btn-sm btn-warning">
                                <i class="fab fa-whatsapp"></i>
                                Remind
                            </button>
                            <button class="btn btn-sm btn-outline">Call</button>
                        </div>
                    </div>
                    <div class="payment-item">
                        <div class="payment-info">
                            <h5>XYZ Trading</h5>
                            <p>Invoice #INV-105 • Due: Dec 25, 2024</p>
                        </div>
                        <div class="payment-amount">₹15,000</div>
                        <div class="payment-actions">
                            <button class="btn btn-sm btn-warning">
                                <i class="fab fa-whatsapp"></i>
                                Remind
                            </button>
                            <button class="btn btn-sm btn-outline">Call</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    },

    // Daily Summary & WhatsApp Integration
    showDailySummary() {
        const modal = this.createModal("Today's Business Summary", `
            <div class="daily-summary-modal">
                <div class="summary-overview">
                    <h4>December 15, 2024 - Business Summary</h4>
                    <div class="summary-stats">
                        <div class="summary-stat">
                            <div class="stat-icon earnings">
                                <i class="fas fa-rupee-sign"></i>
                            </div>
                            <div class="stat-details">
                                <div class="stat-value">₹25,000</div>
                                <div class="stat-label">Earned Today</div>
                            </div>
                        </div>
                        <div class="summary-stat">
                            <div class="stat-icon pending">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="stat-details">
                                <div class="stat-value">3</div>
                                <div class="stat-label">Payments Pending</div>
                            </div>
                        </div>
                        <div class="summary-stat">
                            <div class="stat-icon alerts">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="stat-details">
                                <div class="stat-value">2</div>
                                <div class="stat-label">Low Stock Items</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="summary-actions">
                    <button class="btn btn-success" onclick="window.erpSystem?.sendWhatsAppSummary()">
                        <i class="fab fa-whatsapp"></i>
                        Send to WhatsApp
                    </button>
                    <button class="btn btn-outline" onclick="window.erpSystem?.scheduleDailySummary()">
                        <i class="fas fa-clock"></i>
                        Schedule Daily
                    </button>
                </div>
            </div>
        `);
    },

    sendWhatsAppSummary() {
        this.showToast('Preparing WhatsApp summary...', 'info');

        setTimeout(() => {
            const modal = this.createModal('Send WhatsApp Summary', `
                <div class="whatsapp-send">
                    <div class="whatsapp-preview">
                        <h5>Preview Message:</h5>
                        <div class="message-preview">
                            <p><strong>📊 Daily Business Summary - Dec 15, 2024</strong></p>
                            <p>💰 Earned Today: ₹25,000</p>
                            <p>⏰ Pending Payments: 3 (₹85,000)</p>
                            <p>⚠️ Low Stock Alert: 2 items</p>
                            <p>📦 New Orders: 12</p>
                            <p><em>Powered by Your ERP System</em></p>
                        </div>
                    </div>
                    <div class="send-options">
                        <input type="tel" class="form-input" placeholder="Enter WhatsApp number" value="+91 98765 43210">
                        <button class="btn btn-success" onclick="window.erpSystem?.confirmWhatsAppSend()">
                            <i class="fab fa-whatsapp"></i>
                            Send Summary
                        </button>
                    </div>
                </div>
            `);
        }, 1000);
    },

    confirmWhatsAppSend() {
        this.showToast('Sending WhatsApp summary...', 'info');

        setTimeout(() => {
            document.querySelector('.modal-overlay').remove();
            this.showToast('Daily summary sent to WhatsApp successfully! 📱', 'success');
        }, 2000);
    },

    scheduleDailySummary() {
        const modal = this.createModal('Schedule Daily Summary', `
            <div class="schedule-summary">
                <h4>Automatic Daily Summary</h4>
                <div class="schedule-options">
                    <div class="form-group">
                        <label>Send Time:</label>
                        <select class="form-select">
                            <option value="18:00">6:00 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="20:00">8:00 PM</option>
                            <option value="21:00">9:00 PM</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>WhatsApp Number:</label>
                        <input type="tel" class="form-input" value="+91 98765 43210">
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" checked> Include revenue details
                        </label>
                        <label>
                            <input type="checkbox" checked> Include pending payments
                        </label>
                        <label>
                            <input type="checkbox" checked> Include stock alerts
                        </label>
                    </div>
                </div>
                <div class="schedule-actions">
                    <button class="btn btn-primary" onclick="window.erpSystem?.saveSchedule()">
                        <i class="fas fa-save"></i>
                        Save Schedule
                    </button>
                </div>
            </div>
        `);
    },

    saveSchedule() {
        this.showToast('Daily summary schedule saved successfully!', 'success');
        document.querySelector('.modal-overlay').remove();
    },

    // Offline Mode & Auto Backup
    initOfflineMode() {
        // Check online status
        this.updateConnectionStatus();

        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.updateConnectionStatus();
            this.syncOfflineData();
        });

        window.addEventListener('offline', () => {
            this.updateConnectionStatus();
            this.showOfflineMode();
        });

        // Auto backup every 2 minutes
        setInterval(() => {
            this.performAutoBackup();
        }, 120000);
    },

    updateConnectionStatus() {
        const statusIndicator = document.querySelector('.status-indicator');
        const backupStatus = document.querySelector('.backup-status');

        if (navigator.onLine) {
            statusIndicator.className = 'status-indicator online';
            statusIndicator.innerHTML = '<i class="fas fa-wifi"></i><span data-translate="online">Online</span>';
            this.hideOfflineIndicator();
        } else {
            statusIndicator.className = 'status-indicator offline';
            statusIndicator.innerHTML = '<i class="fas fa-wifi-slash"></i><span>Offline</span>';
            this.showOfflineIndicator();
        }
    },

    showOfflineMode() {
        this.showToast('You are now offline. Core features are still available.', 'warning', 5000);
    },

    showOfflineIndicator() {
        let indicator = document.querySelector('.offline-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'offline-indicator';
            indicator.innerHTML = '<i class="fas fa-wifi-slash"></i> Offline Mode';
            document.body.appendChild(indicator);
        }
        indicator.classList.add('show');
    },

    hideOfflineIndicator() {
        const indicator = document.querySelector('.offline-indicator');
        if (indicator) {
            indicator.classList.remove('show');
        }
    },

    performAutoBackup() {
        if (!navigator.onLine) return;

        const backupStatus = document.querySelector('.backup-status span');
        if (backupStatus) {
            backupStatus.textContent = 'Backing up...';

            setTimeout(() => {
                backupStatus.textContent = 'Last backup: Just now';
            }, 2000);
        }
    },

    syncOfflineData() {
        this.showToast('Syncing offline data...', 'info');

        setTimeout(() => {
            this.showToast('All data synced successfully!', 'success');
        }, 3000);
    },

    // Utility Functions
    updateCurrentTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            timeElement.textContent = `Last updated: ${timeString}`;
        }

        // Update every minute
        setTimeout(() => this.updateCurrentTime(), 60000);
    },

    showAddCustomerModal() {
        const modal = this.createModal('Add New Customer', `
            <div class="add-customer-form">
                <div class="form-group">
                    <label>Customer Name</label>
                    <input type="text" class="form-input" placeholder="Enter customer name">
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" class="form-input" placeholder="Enter phone number">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-input" placeholder="Enter email address">
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <textarea class="form-input" placeholder="Enter address"></textarea>
                </div>
                <div class="form-actions">
                    <button class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button class="btn btn-primary">
                        <i class="fas fa-save"></i>
                        Save Customer
                    </button>
                </div>
            </div>
        `);
    },

    // Advanced Animation System
    initAdvancedAnimations() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupMicroInteractions();
        this.setupPerformanceOptimizations();
        this.setupAccessibilityFeatures();
    },

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    // Add entrance animations based on element type
                    if (element.classList.contains('stat-card')) {
                        element.classList.add('fade-in-up');
                    } else if (element.classList.contains('module-card')) {
                        element.classList.add('scale-in-center');
                    } else if (element.classList.contains('nav-item')) {
                        element.classList.add('slide-in-left');
                    } else {
                        element.classList.add('fade-in-up');
                    }

                    // Stagger animations for grouped elements
                    this.addStaggeredAnimation(element);

                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.stat-card, .module-card, .nav-item, .card').forEach(el => {
            observer.observe(el);
        });
    },

    addStaggeredAnimation(element) {
        const siblings = element.parentElement.children;
        const index = Array.from(siblings).indexOf(element);

        if (siblings.length > 1) {
            element.style.animationDelay = `${index * 0.1}s`;
            element.classList.add('stagger-item');
        }
    },

    setupParallaxEffects() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');

            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        };

        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    },

    setupMicroInteractions() {
        // Enhanced button interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
                const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
                this.createRippleEffect(btn, e);
            }
        });

        // Card hover effects
        document.querySelectorAll('.card, .module-card, .stat-card').forEach(card => {
            card.classList.add('card-interactive');

            card.addEventListener('mouseenter', () => {
                card.classList.add('hover-lift-rotate');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-lift-rotate');
            });
        });

        // Form input focus effects
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('input-focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('input-focused');
            });
        });
    },

    createRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    },

    setupPerformanceOptimizations() {
        // Add GPU acceleration to animated elements
        document.querySelectorAll('.card, .btn, .modal-content').forEach(el => {
            el.classList.add('gpu-accelerated');
        });

        // Optimize will-change properties
        const optimizeWillChange = (elements, property) => {
            elements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    el.style.willChange = property;
                });

                el.addEventListener('mouseleave', () => {
                    el.style.willChange = 'auto';
                });
            });
        };

        optimizeWillChange(document.querySelectorAll('.hover-lift, .card-interactive'), 'transform');
        optimizeWillChange(document.querySelectorAll('.fade-in, .notification'), 'opacity');

        // Lazy load images
        this.setupLazyLoading();
    },

    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    },

    setupAccessibilityFeatures() {
        // Enhanced focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Screen reader announcements
        this.setupScreenReaderAnnouncements();

        // High contrast mode detection
        this.detectHighContrastMode();

        // Reduced motion preference
        this.respectReducedMotionPreference();
    },

    setupScreenReaderAnnouncements() {
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);

        this.announcer = announcer;
    },

    announce(message) {
        if (this.announcer) {
            this.announcer.textContent = message;
            setTimeout(() => {
                this.announcer.textContent = '';
            }, 1000);
        }
    },

    detectHighContrastMode() {
        const testElement = document.createElement('div');
        testElement.style.border = '1px solid';
        testElement.style.borderColor = 'red green';
        document.body.appendChild(testElement);

        const computedStyle = window.getComputedStyle(testElement);
        const isHighContrast = computedStyle.borderTopColor === computedStyle.borderRightColor;

        if (isHighContrast) {
            document.body.classList.add('high-contrast-mode');
        }

        document.body.removeChild(testElement);
    },

    respectReducedMotionPreference() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            document.body.classList.add('reduced-motion');

            // Disable auto-playing animations
            document.querySelectorAll('[data-auto-animate]').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        }
    },

    // Enhanced Error Handling
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            this.handleError('JavaScript Error', e.message, e.filename, e.lineno);
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.handleError('Promise Rejection', e.reason);
        });
    },

    handleError(type, message, filename = '', lineno = '') {
        console.error(`${type}: ${message}`, filename, lineno);

        // Show user-friendly error message
        this.showToast('Something went wrong. Please try again.', 'error');

        // Log error for analytics (in production)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: `${type}: ${message}`,
                fatal: false
            });
        }
    },

    // Smart Caching System
    initSmartCaching() {
        this.cache = new Map();
        this.cacheExpiry = new Map();

        // Cache frequently accessed data
        this.cacheData('user_preferences', this.getUserPreferences(), 3600000); // 1 hour
        this.cacheData('business_data', this.getBusinessData(), 1800000); // 30 minutes
    },

    cacheData(key, data, ttl = 300000) { // Default 5 minutes
        this.cache.set(key, data);
        this.cacheExpiry.set(key, Date.now() + ttl);
    },

    getCachedData(key) {
        if (this.cache.has(key)) {
            const expiry = this.cacheExpiry.get(key);
            if (Date.now() < expiry) {
                return this.cache.get(key);
            } else {
                this.cache.delete(key);
                this.cacheExpiry.delete(key);
            }
        }
        return null;
    },

    // Progressive Enhancement
    initProgressiveEnhancement() {
        // Check for modern browser features
        const features = {
            intersectionObserver: 'IntersectionObserver' in window,
            webAnimations: 'animate' in document.createElement('div'),
            customProperties: CSS.supports('color', 'var(--test)'),
            gridLayout: CSS.supports('display', 'grid'),
            flexbox: CSS.supports('display', 'flex')
        };

        // Apply enhancements based on feature support
        if (features.intersectionObserver) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.setupScrollBasedAnimations();
        }

        if (features.webAnimations) {
            this.enableAdvancedAnimations();
        }

        // Store feature support for conditional loading
        this.browserFeatures = features;
    },

    setupScrollBasedAnimations() {
        let ticking = false;

        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            const windowHeight = window.innerHeight;

            elements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;

                if (elementTop < windowHeight * 0.8) {
                    el.classList.add('animated');
                }
            });

            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(animateOnScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    },

    enableAdvancedAnimations() {
        // Use Web Animations API for complex animations
        document.querySelectorAll('.advanced-animate').forEach(el => {
            const animation = el.animate([
                { opacity: 0, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
                fill: 'forwards'
            });

            animation.pause();

            // Play animation when element comes into view
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animation.play();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(el);
        });
    }
};

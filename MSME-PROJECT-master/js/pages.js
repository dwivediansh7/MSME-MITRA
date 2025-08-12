// MSME Portal - Page Templates

window.PageTemplates = {
    dashboard() {
        const portal = window.msmePortal;
        const userData = portal?.userData || {
            name: 'Rajesh Kumar',
            businessName: 'Kumar Electronics',
            businessScore: 78,
            location: 'Mumbai, Maharashtra'
        };
        const isVerified = portal?.isVerified || true;

        return `
            <div class="dashboard-page">
                <!-- Enhanced Dashboard Header -->
                <div class="dashboard-header">
                    <div class="header-content">
                        <div class="welcome-section">
                            <div class="user-avatar">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80" alt="User Avatar">
                                <div class="online-indicator"></div>
                                <div class="avatar-badge">
                                    <i class="fas fa-crown"></i>
                                </div>
                            </div>
                            <div class="welcome-text">
                                <h1 class="welcome-title">Welcome back, ${userData.name}! 👋</h1>
                                <p class="business-info">
                                    <i class="fas fa-building"></i> ${userData.businessName}
                                    <span class="location">
                                        <i class="fas fa-map-marker-alt"></i> ${userData.location}
                                    </span>
                                </p>
                                <div class="business-details">
                                    <span class="detail-item">
                                        <i class="fas fa-clock"></i> Last login: Today at 9:30 AM
                                    </span>
                                    <span class="detail-item">
                                        <i class="fas fa-calendar"></i> Member since: Jan 2023
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="header-actions">
                            <div class="quick-stats">
                                <div class="quick-stat">
                                    <span class="stat-value">₹45K</span>
                                    <span class="stat-label">Today's Sales</span>
                                </div>
                                <div class="quick-stat">
                                    <span class="stat-value">12</span>
                                    <span class="stat-label">Pending Orders</span>
                                </div>
                            </div>
                            <div class="header-buttons">
                                <button class="btn btn-outline btn-sm" onclick="window.erpSystem?.showDailySummary()">
                                    <i class="fas fa-chart-line"></i> Daily Report
                                </button>
                                <button class="btn btn-primary btn-sm" onclick="window.erpSystem?.openModule('invoicing')">
                                    <i class="fas fa-plus"></i> New Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Business Status Banner -->
                ${isVerified ? `
                <div class="status-banner verified">
                    <div class="banner-content">
                        <div class="status-icon">
                            <i class="fas fa-shield-check"></i>
                        </div>
                        <div class="status-text">
                            <h3>🏆 Government Verified MSME</h3>
                            <p>Your business is fully verified and eligible for all government schemes and benefits</p>
                        </div>
                        <div class="status-actions">
                            <span class="verification-badge">
                                <i class="fas fa-check-circle"></i> Verified
                            </span>
                            <button class="btn btn-outline btn-sm" onclick="window.msmePortal?.navigateToPage('schemes')">
                                <i class="fas fa-gift"></i> View Benefits
                            </button>
                        </div>
                    </div>
                </div>
                ` : `
                <div class="status-banner unverified">
                    <div class="banner-content">
                        <div class="status-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="status-text">
                            <h3>⚡ Complete Your Verification</h3>
                            <p>Get verified to unlock government schemes, better loan rates, and customer trust</p>
                        </div>
                        <div class="status-actions">
                            <button class="btn btn-primary btn-sm" onclick="window.msmePortal?.navigateToPage('verification')">
                                <i class="fas fa-rocket"></i> Start Verification
                            </button>
                        </div>
                    </div>
                </div>
                `}

                <!-- Enhanced Business Metrics -->
                <div class="business-metrics">
                    <div class="metrics-header">
                        <h2>📊 Business Performance</h2>
                        <div class="time-filter">
                            <button class="filter-btn active">Today</button>
                            <button class="filter-btn">This Week</button>
                            <button class="filter-btn">This Month</button>
                        </div>
                    </div>

                    <div class="metrics-grid">
                        <!-- Revenue Card -->
                        <div class="metric-card revenue" data-tip-id="dashboard-revenue-card">
                            <div class="metric-header">
                                <div class="metric-icon">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="metric-trend positive">
                                    <i class="fas fa-trending-up"></i>
                                    <span>+12.5%</span>
                                </div>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">₹2,45,000</div>
                                <div class="metric-label">Monthly Revenue</div>
                                <div class="metric-subtitle">₹45,000 today • Target: ₹3,00,000</div>
                            </div>
                            <div class="metric-visual">
                                <div class="revenue-chart">
                                    <div class="chart-bars">
                                        <div class="bar" style="height: 60%"></div>
                                        <div class="bar" style="height: 75%"></div>
                                        <div class="bar" style="height: 45%"></div>
                                        <div class="bar" style="height: 85%"></div>
                                        <div class="bar" style="height: 70%"></div>
                                        <div class="bar" style="height: 90%"></div>
                                        <div class="bar active" style="height: 95%"></div>
                                    </div>
                                </div>
                                <div class="metric-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 82%"></div>
                                    </div>
                                    <span class="progress-text">82% of monthly target</span>
                                </div>
                            </div>
                        </div>

                        <!-- Orders Card -->
                        <div class="metric-card orders">
                            <div class="metric-header">
                                <div class="metric-icon">
                                    <i class="fas fa-shopping-bag"></i>
                                </div>
                                <div class="metric-trend positive">
                                    <i class="fas fa-trending-up"></i>
                                    <span>+8.3%</span>
                                </div>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">156</div>
                                <div class="metric-label">Total Orders</div>
                                <div class="metric-subtitle">12 pending • 8 processing • 136 completed</div>
                            </div>
                            <div class="metric-visual">
                                <div class="orders-breakdown">
                                    <div class="breakdown-item">
                                        <div class="breakdown-dot completed"></div>
                                        <span>Completed (136)</span>
                                    </div>
                                    <div class="breakdown-item">
                                        <div class="breakdown-dot pending"></div>
                                        <span>Pending (12)</span>
                                    </div>
                                    <div class="breakdown-item">
                                        <div class="breakdown-dot processing"></div>
                                        <span>Processing (8)</span>
                                    </div>
                                </div>
                                <div class="orders-chart">
                                    <div class="donut-chart">
                                        <svg viewBox="0 0 42 42" class="donut">
                                            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e5e7eb" stroke-width="3"></circle>
                                            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" stroke-width="3" stroke-dasharray="87 13" stroke-dashoffset="25"></circle>
                                        </svg>
                                        <div class="donut-center">87%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Customer Satisfaction -->
                        <div class="metric-card satisfaction">
                            <div class="metric-header">
                                <div class="metric-icon">
                                    <i class="fas fa-heart"></i>
                                </div>
                                <div class="metric-trend positive">
                                    <i class="fas fa-trending-up"></i>
                                    <span>+0.2</span>
                                </div>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">4.8</div>
                                <div class="metric-label">Customer Rating</div>
                                <div class="metric-subtitle">Based on 89 reviews this month</div>
                            </div>
                            <div class="metric-visual">
                                <div class="rating-display">
                                    <div class="rating-stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <span class="rating-text">Excellent</span>
                                </div>
                                <div class="rating-breakdown">
                                    <div class="rating-row">
                                        <span>5★</span>
                                        <div class="rating-bar">
                                            <div class="rating-fill" style="width: 85%"></div>
                                        </div>
                                        <span>76</span>
                                    </div>
                                    <div class="rating-row">
                                        <span>4★</span>
                                        <div class="rating-bar">
                                            <div class="rating-fill" style="width: 12%"></div>
                                        </div>
                                        <span>11</span>
                                    </div>
                                    <div class="rating-row">
                                        <span>3★</span>
                                        <div class="rating-bar">
                                            <div class="rating-fill" style="width: 3%"></div>
                                        </div>
                                        <span>2</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Business Score -->
                        <div class="metric-card score">
                            <div class="metric-header">
                                <div class="metric-icon">
                                    <i class="fas fa-trophy"></i>
                                </div>
                                <div class="metric-trend positive">
                                    <i class="fas fa-trending-up"></i>
                                    <span>+5 pts</span>
                                </div>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">${userData.businessScore}</div>
                                <div class="metric-label">Business Score</div>
                                <div class="metric-subtitle">Excellent rating</div>
                            </div>
                            <div class="score-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${userData.businessScore}%"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Profit Margin -->
                        <div class="metric-card profit">
                            <div class="metric-header">
                                <div class="metric-icon">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="metric-trend positive">
                                    <i class="fas fa-trending-up"></i>
                                    <span>+3.2%</span>
                                </div>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">32%</div>
                                <div class="metric-label">Profit Margin</div>
                                <div class="metric-subtitle">Above industry avg</div>
                            </div>
                            <div class="metric-chart">
                                <div class="mini-chart profit-chart"></div>
                            </div>
                        </div>

                        <!-- Inventory Status -->
                        <div class="metric-card inventory" data-tip-id="dashboard-inventory-alert">
                            <div class="metric-header">
                                <div class="metric-icon">
                                    <i class="fas fa-boxes"></i>
                                </div>
                                <div class="metric-trend warning">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <span>3 critical</span>
                                </div>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">245</div>
                                <div class="metric-label">Items in Stock</div>
                                <div class="metric-subtitle">Total inventory value: ₹1,25,000</div>
                            </div>
                            <div class="metric-visual">
                                <div class="inventory-grid">
                                    <div class="inventory-item good">
                                        <div class="item-icon">
                                            <i class="fas fa-check-circle"></i>
                                        </div>
                                        <div class="item-info">
                                            <span class="item-count">220</span>
                                            <span class="item-label">Good Stock</span>
                                        </div>
                                    </div>
                                    <div class="inventory-item low">
                                        <div class="item-icon">
                                            <i class="fas fa-exclamation-circle"></i>
                                        </div>
                                        <div class="item-info">
                                            <span class="item-count">22</span>
                                            <span class="item-label">Low Stock</span>
                                        </div>
                                    </div>
                                    <div class="inventory-item critical">
                                        <div class="item-icon">
                                            <i class="fas fa-times-circle"></i>
                                        </div>
                                        <div class="item-info">
                                            <span class="item-count">3</span>
                                            <span class="item-label">Critical</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="critical-items">
                                    <h5>Critical Items:</h5>
                                    <div class="critical-list">
                                        <span class="critical-item">Parle G Biscuits</span>
                                        <span class="critical-item">Maggi Noodles</span>
                                        <span class="critical-item">Tata Tea</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Smart Quick Actions -->
                <div class="quick-actions-section">
                    <div class="section-header">
                        <h2>⚡ Smart Actions</h2>
                        <p>Most used actions based on your business patterns</p>
                    </div>

                    <div class="actions-grid">
                        <!-- Primary Actions -->
                        <div class="action-category primary">
                            <h3>💼 Business Operations</h3>
                            <div class="action-buttons">
                                <button class="action-btn primary" data-tip-id="dashboard-whatsapp-action" onclick="window.erpSystem?.createNewInvoice()">
                                    <div class="btn-icon">
                                        <i class="fas fa-file-invoice-dollar"></i>
                                    </div>
                                    <div class="btn-content">
                                        <span class="btn-title">Create Invoice</span>
                                        <span class="btn-subtitle">Generate & send invoices</span>
                                    </div>
                                    <div class="btn-badge">Most Used</div>
                                </button>

                                <button class="action-btn" onclick="window.erpSystem?.addNewItem()">
                                    <div class="btn-icon">
                                        <i class="fas fa-plus-circle"></i>
                                    </div>
                                    <div class="btn-content">
                                        <span class="btn-title">Add Product</span>
                                        <span class="btn-subtitle">Add to inventory</span>
                                    </div>
                                </button>

                                <button class="action-btn" onclick="window.erpSystem?.trackPayments()">
                                    <div class="btn-icon">
                                        <i class="fas fa-credit-card"></i>
                                    </div>
                                    <div class="btn-content">
                                        <span class="btn-title">Track Payments</span>
                                        <span class="btn-subtitle">Monitor receivables</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- Customer Actions -->
                        <div class="action-category secondary">
                            <h3>👥 Customer Management</h3>
                            <div class="action-buttons">
                                <button class="action-btn" onclick="window.msmePortal?.navigateToPage('crm')">
                                    <div class="btn-icon">
                                        <i class="fas fa-user-plus"></i>
                                    </div>
                                    <div class="btn-content">
                                        <span class="btn-title">Add Customer</span>
                                        <span class="btn-subtitle">New customer entry</span>
                                    </div>
                                </button>

                                <button class="action-btn" onclick="window.erpSystem?.sendReminders()">
                                    <div class="btn-icon">
                                        <i class="fas fa-bell"></i>
                                    </div>
                                    <div class="btn-content">
                                        <span class="btn-title">Send Reminders</span>
                                        <span class="btn-subtitle">Payment follow-ups</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- Growth Actions -->
                        <div class="action-category tertiary">
                            <h3>🚀 Growth & Compliance</h3>
                            <div class="action-buttons">
                                <button class="action-btn" onclick="window.msmePortal?.navigateToPage('schemes')">
                                    <div class="btn-icon">
                                        <i class="fas fa-gift"></i>
                                    </div>
                                    <div class="btn-content">
                                        <span class="btn-title">Find Schemes</span>
                                        <span class="btn-subtitle">Government benefits</span>
                                    </div>
                                    <div class="btn-badge new">New</div>
                                </button>

                                <button class="action-btn" onclick="window.erpSystem?.fileGSTReturn()">
                                    <div class="btn-icon">
                                        <i class="fas fa-file-upload"></i>
                                    </div>
                                    <div class="btn-content">
                                        <span class="btn-title">File GST</span>
                                        <span class="btn-subtitle">Tax compliance</span>
                                    </div>
                                    <div class="btn-badge urgent">Due Soon</div>
                                </button>

                                <button class="action-btn" onclick="window.msmePortal?.navigateToPage('marketplace')">
                                    <div class="btn-icon">
                                        <i class="fas fa-store"></i>
                                    </div>
                                    <div class="btn-content">
                                        <span class="btn-title">Marketplace</span>
                                        <span class="btn-subtitle">Expand reach</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Business Insights & Activity Dashboard -->
                <div class="insights-dashboard">
                    <div class="dashboard-grid">
                        <!-- Business Insights -->
                        <div class="insight-card">
                            <div class="card-header">
                                <h3>🧠 Smart Business Insights</h3>
                                <span class="insight-badge">AI Powered</span>
                            </div>
                            <div class="insights-content">
                                <div class="insight-item positive">
                                    <div class="insight-visual">
                                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=80&fit=crop&auto=format&q=80" alt="Growth Chart" class="insight-image">
                                        <div class="insight-icon">
                                            <i class="fas fa-trending-up"></i>
                                        </div>
                                    </div>
                                    <div class="insight-text">
                                        <h4>🚀 Revenue Growth Opportunity</h4>
                                        <p>Your sales are 15% higher this month. Consider increasing inventory for top-selling items to capitalize on this growth trend.</p>
                                        <div class="insight-stats">
                                            <span class="stat-highlight">+₹35,000</span>
                                            <span class="stat-label">vs last month</span>
                                        </div>
                                        <button class="insight-action" onclick="window.erpSystem?.generateStockReport()">
                                            <i class="fas fa-chart-bar"></i> View Stock Report
                                        </button>
                                    </div>
                                </div>

                                <div class="insight-item warning">
                                    <div class="insight-visual">
                                        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=80&h=80&fit=crop&auto=format&q=80" alt="Payment Alert" class="insight-image">
                                        <div class="insight-icon">
                                            <i class="fas fa-clock"></i>
                                        </div>
                                    </div>
                                    <div class="insight-text">
                                        <h4>⚠️ Payment Collection Alert</h4>
                                        <p>₹45,000 in payments are overdue. Send reminders to improve cash flow and maintain healthy business operations.</p>
                                        <div class="insight-stats">
                                            <span class="stat-highlight warning">₹45,000</span>
                                            <span class="stat-label">overdue amount</span>
                                        </div>
                                        <button class="insight-action warning" onclick="window.erpSystem?.sendReminders()">
                                            <i class="fas fa-bell"></i> Send Reminders
                                        </button>
                                    </div>
                                </div>

                                <div class="insight-item info">
                                    <div class="insight-visual">
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=80" alt="Government Schemes" class="insight-image">
                                        <div class="insight-icon">
                                            <i class="fas fa-gift"></i>
                                        </div>
                                    </div>
                                    <div class="insight-text">
                                        <h4>🎁 New Scheme Available</h4>
                                        <p>MSME Credit Guarantee Scheme offers loans up to ₹2 Cr at reduced rates. Perfect for business expansion.</p>
                                        <div class="insight-stats">
                                            <span class="stat-highlight info">Up to ₹2 Cr</span>
                                            <span class="stat-label">loan amount</span>
                                        </div>
                                        <button class="insight-action info" onclick="window.msmePortal?.navigateToPage('schemes')">
                                            <i class="fas fa-external-link-alt"></i> Explore Schemes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Recent Activity Feed -->
                        <div class="activity-card">
                            <div class="card-header">
                                <h3>⚡ Recent Activity</h3>
                                <button class="view-all-btn" onclick="window.erpSystem?.viewAllActivity()">
                                    View All
                                </button>
                            </div>
                            <div class="activity-feed">
                                <div class="activity-item success">
                                    <div class="activity-timeline">
                                        <div class="timeline-dot success"></div>
                                        <div class="timeline-line"></div>
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-header">
                                            <span class="activity-title">Payment Received</span>
                                            <span class="activity-time">2 hours ago</span>
                                        </div>
                                        <p class="activity-description">₹15,000 received from Ramesh Traders for Invoice #INV-001</p>
                                        <div class="activity-meta">
                                            <span class="meta-tag success">Completed</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="activity-item info">
                                    <div class="activity-timeline">
                                        <div class="timeline-dot info"></div>
                                        <div class="timeline-line"></div>
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-header">
                                            <span class="activity-title">New Order Created</span>
                                            <span class="activity-time">4 hours ago</span>
                                        </div>
                                        <p class="activity-description">Order #ORD-2024-156 for ₹8,500 from Sharma Electronics</p>
                                        <div class="activity-meta">
                                            <span class="meta-tag info">Processing</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="activity-item warning">
                                    <div class="activity-timeline">
                                        <div class="timeline-dot warning"></div>
                                        <div class="timeline-line"></div>
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-header">
                                            <span class="activity-title">Low Stock Alert</span>
                                            <span class="activity-time">6 hours ago</span>
                                        </div>
                                        <p class="activity-description">Parle G Biscuits stock is critically low (5 units remaining)</p>
                                        <div class="activity-meta">
                                            <span class="meta-tag warning">Action Required</span>
                                            <button class="quick-action-btn" onclick="window.erpSystem?.reorderItem('PG001')">
                                                Reorder Now
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="activity-item success">
                                    <div class="activity-timeline">
                                        <div class="timeline-dot success"></div>
                                        <div class="timeline-line"></div>
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-header">
                                            <span class="activity-title">Invoice Sent</span>
                                            <span class="activity-time">1 day ago</span>
                                        </div>
                                        <p class="activity-description">Invoice #INV-002 sent via WhatsApp to Gupta Store</p>
                                        <div class="activity-meta">
                                            <span class="meta-tag success">Delivered</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="activity-item info">
                                    <div class="activity-timeline">
                                        <div class="timeline-dot info"></div>
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-header">
                                            <span class="activity-title">GST Return Filed</span>
                                            <span class="activity-time">2 days ago</span>
                                        </div>
                                        <p class="activity-description">GSTR-1 for March 2024 filed successfully</p>
                                        <div class="activity-meta">
                                            <span class="meta-tag success">Compliant</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-medal"></i>
                                Recommended Schemes
                            </h2>
                        </div>
                        <div class="card-body">
                            <div class="scheme-list">
                                <div class="scheme-item">
                                    <h4>Technology Upgradation Scheme</h4>
                                    <p>Get up to ₹1 Crore subsidy for technology upgradation</p>
                                    <div class="scheme-meta">
                                        <span class="badge badge-success">Eligible</span>
                                        <span class="scheme-deadline">Deadline: 30 days</span>
                                    </div>
                                </div>
                                <div class="scheme-item">
                                    <h4>Export Promotion Scheme</h4>
                                    <p>Financial assistance for export market development</p>
                                    <div class="scheme-meta">
                                        <span class="badge badge-info">New</span>
                                        <span class="scheme-deadline">Deadline: 45 days</span>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-outline btn-sm" onclick="window.msmePortal?.navigateToPage('schemes')">
                                View All Schemes
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `;
    },

    verification() {
        const portal = window.msmePortal;
        const userData = portal?.userData || {
            gstNumber: '27ABCDE1234F1Z5',
            udyamNumber: 'UDYAM-MH-12-0012345',
            verificationStatus: { aadhaar: false, gst: false, udyam: false }
        };

        return `
            <div class="verification-page">
                <div class="page-header mb-8">
                    <h1 class="page-title">Business Verification</h1>
                    <p class="page-subtitle">Complete your verification to unlock all portal features</p>
                </div>

                <!-- Progress Tracker -->
                <div class="card mb-6">
                    <div class="card-body">
                        <div class="verification-progress">
                            <div class="progress-steps">
                                <div class="progress-step ${userData.verificationStatus.aadhaar ? 'completed' : 'active'}">
                                    <div class="step-icon">
                                        <i class="fas fa-id-card"></i>
                                    </div>
                                    <div class="step-content">
                                        <h4>Aadhaar Verification</h4>
                                        <p>Upload and verify your Aadhaar card</p>
                                    </div>
                                    ${userData.verificationStatus.aadhaar ?
                                        '<div class="step-status"><i class="fas fa-check-circle text-success"></i></div>' :
                                        '<div class="step-status"><span class="badge badge-warning">Pending</span></div>'
                                    }
                                </div>

                                <div class="progress-step ${userData.verificationStatus.gst ? 'completed' : userData.verificationStatus.aadhaar ? 'active' : ''}">
                                    <div class="step-icon">
                                        <i class="fas fa-file-alt"></i>
                                    </div>
                                    <div class="step-content">
                                        <h4>GST Certificate</h4>
                                        <p>Upload your GST registration certificate</p>
                                    </div>
                                    ${userData.verificationStatus.gst ?
                                        '<div class="step-status"><i class="fas fa-check-circle text-success"></i></div>' :
                                        '<div class="step-status"><span class="badge badge-warning">Pending</span></div>'
                                    }
                                </div>

                                <div class="progress-step ${userData.verificationStatus.udyam ? 'completed' : userData.verificationStatus.gst ? 'active' : ''}">
                                    <div class="step-icon">
                                        <i class="fas fa-certificate"></i>
                                    </div>
                                    <div class="step-content">
                                        <h4>Udyam Registration</h4>
                                        <p>Upload your Udyam registration certificate</p>
                                    </div>
                                    ${userData.verificationStatus.udyam ?
                                        '<div class="step-status"><i class="fas fa-check-circle text-success"></i></div>' :
                                        '<div class="step-status"><span class="badge badge-warning">Pending</span></div>'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Verification Forms -->
                <div class="verification-forms">
                    <!-- Aadhaar Verification -->
                    <div class="card mb-6">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-id-card"></i>
                                Aadhaar Verification
                            </h2>
                        </div>
                        <div class="card-body">
                            ${!userData.verificationStatus.aadhaar ? `
                                <div class="form-group">
                                    <label class="form-label">Aadhaar Number</label>
                                    <input type="text" class="form-input" id="aadhaarNumber" placeholder="Enter 12-digit Aadhaar number" maxlength="12">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Upload Aadhaar Card</label>
                                    <div class="file-upload" id="aadhaarUpload">
                                        <div class="file-upload-icon">
                                            <i class="fas fa-cloud-upload-alt"></i>
                                        </div>
                                        <div class="file-upload-text">Click to upload or drag and drop</div>
                                        <div class="file-upload-hint">PDF, JPG, PNG (Max 5MB)</div>
                                        <input type="file" hidden accept=".pdf,.jpg,.jpeg,.png">
                                    </div>
                                </div>
                                <button class="btn btn-primary" id="verifyAadhaar">
                                    <i class="fas fa-shield-alt"></i>
                                    Verify with OTP
                                </button>
                            ` : `
                                <div class="verification-success">
                                    <i class="fas fa-check-circle text-success"></i>
                                    <h4>Aadhaar Verified Successfully</h4>
                                    <p>Your Aadhaar has been verified and linked to your profile.</p>
                                </div>
                            `}
                        </div>
                    </div>

                    <!-- GST Certificate -->
                    <div class="card mb-6">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-file-alt"></i>
                                GST Certificate
                            </h2>
                        </div>
                        <div class="card-body">
                            ${!userData.verificationStatus.gst ? `
                                <div class="form-group">
                                    <label class="form-label">GST Number</label>
                                    <input type="text" class="form-input" id="gstNumber" placeholder="Enter 15-digit GST number" value="${userData.gstNumber}">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Upload GST Certificate</label>
                                    <div class="file-upload" id="gstUpload">
                                        <div class="file-upload-icon">
                                            <i class="fas fa-cloud-upload-alt"></i>
                                        </div>
                                        <div class="file-upload-text">Click to upload or drag and drop</div>
                                        <div class="file-upload-hint">PDF, JPG, PNG (Max 5MB)</div>
                                        <input type="file" hidden accept=".pdf,.jpg,.jpeg,.png">
                                    </div>
                                </div>
                                <button class="btn btn-primary" id="verifyGST">
                                    <i class="fas fa-check"></i>
                                    Verify GST Certificate
                                </button>
                            ` : `
                                <div class="verification-success">
                                    <i class="fas fa-check-circle text-success"></i>
                                    <h4>GST Certificate Verified</h4>
                                    <p>GST Number: ${userData.gstNumber}</p>
                                </div>
                            `}
                        </div>
                    </div>

                    <!-- Udyam Registration -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-certificate"></i>
                                Udyam Registration
                            </h2>
                        </div>
                        <div class="card-body">
                            ${!userData.verificationStatus.udyam ? `
                                <div class="form-group">
                                    <label class="form-label">Udyam Registration Number</label>
                                    <input type="text" class="form-input" id="udyamNumber" placeholder="Enter Udyam registration number" value="${userData.udyamNumber}">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Upload Udyam Certificate</label>
                                    <div class="file-upload" id="udyamUpload">
                                        <div class="file-upload-icon">
                                            <i class="fas fa-cloud-upload-alt"></i>
                                        </div>
                                        <div class="file-upload-text">Click to upload or drag and drop</div>
                                        <div class="file-upload-hint">PDF, JPG, PNG (Max 5MB)</div>
                                        <input type="file" hidden accept=".pdf,.jpg,.jpeg,.png">
                                    </div>
                                </div>
                                <button class="btn btn-primary" id="verifyUdyam">
                                    <i class="fas fa-check"></i>
                                    Verify Udyam Registration
                                </button>
                            ` : `
                                <div class="verification-success">
                                    <i class="fas fa-check-circle text-success"></i>
                                    <h4>Udyam Registration Verified</h4>
                                    <p>Udyam Number: ${userData.udyamNumber}</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    marketplace() {
        return `
            <div class="marketplace-page">
                <div class="page-header mb-8">
                    <h1 class="page-title">MSME Marketplace</h1>
                    <p class="page-subtitle">Connect with other MSMEs, buy and sell products</p>
                </div>

                <!-- Marketplace Header -->
                <div class="marketplace-header mb-6">
                    <div class="marketplace-search">
                        <div class="search-filters">
                            <div class="search-input-group">
                                <input type="text" class="form-input" placeholder="Search products, services, or companies...">
                                <button class="btn btn-primary">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                            <div class="filter-buttons">
                                <select class="form-select">
                                    <option>All Categories</option>
                                    <option>Textiles</option>
                                    <option>Electronics</option>
                                    <option>Food Processing</option>
                                    <option>Handicrafts</option>
                                </select>
                                <select class="form-select">
                                    <option>All States</option>
                                    <option>Maharashtra</option>
                                    <option>Gujarat</option>
                                    <option>Tamil Nadu</option>
                                    <option>Karnataka</option>
                                </select>
                                <button class="btn btn-outline">
                                    <i class="fas fa-filter"></i>
                                    More Filters
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="marketplace-actions">
                        <button class="btn btn-primary" id="addProductBtn" data-tip-id="marketplace-product-upload">
                            <i class="fas fa-plus"></i>
                            Add Product
                        </button>
                        <button class="btn btn-outline" data-tip-id="marketplace-pricing-strategy">
                            <i class="fas fa-store"></i>
                            My Store
                        </button>
                    </div>
                </div>

                <!-- Product Grid -->
                <div class="product-grid">
                    <div class="product-card">
                        <div class="product-image">
                            <img src="https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Cotton Fabric">
                            <div class="product-badge">
                                <span class="badge badge-success">Verified Seller</span>
                            </div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">Premium Cotton Fabric</h3>
                            <p class="product-description">High-quality cotton fabric suitable for garment manufacturing</p>
                            <div class="product-meta">
                                <span class="product-price">₹450/meter</span>
                                <div class="product-rating">
                                    <i class="fas fa-star"></i>
                                    <span>4.8 (24 reviews)</span>
                                </div>
                            </div>
                            <div class="product-seller">
                                <span>by Kumar Textiles</span>
                                <span class="seller-location">Mumbai, Maharashtra</span>
                            </div>
                            <div class="product-actions">
                                <button class="btn btn-outline btn-sm">
                                    <i class="fas fa-envelope"></i>
                                    Send RFQ
                                </button>
                                <button class="btn btn-primary btn-sm">
                                    <i class="fas fa-shopping-cart"></i>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="product-card">
                        <div class="product-image">
                            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="LED Lights">
                            <div class="product-badge">
                                <span class="badge badge-info">New</span>
                            </div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">LED Light Fixtures</h3>
                            <p class="product-description">Energy-efficient LED lights for commercial and residential use</p>
                            <div class="product-meta">
                                <span class="product-price">₹1,200/piece</span>
                                <div class="product-rating">
                                    <i class="fas fa-star"></i>
                                    <span>4.6 (18 reviews)</span>
                                </div>
                            </div>
                            <div class="product-seller">
                                <span>by Bright Electronics</span>
                                <span class="seller-location">Pune, Maharashtra</span>
                            </div>
                            <div class="product-actions">
                                <button class="btn btn-outline btn-sm">
                                    <i class="fas fa-envelope"></i>
                                    Send RFQ
                                </button>
                                <button class="btn btn-primary btn-sm">
                                    <i class="fas fa-shopping-cart"></i>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="product-card">
                        <div class="product-image">
                            <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Organic Spices">
                            <div class="product-badge">
                                <span class="badge badge-warning">Limited Stock</span>
                            </div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">Organic Spice Mix</h3>
                            <p class="product-description">Premium quality organic spices for food processing industry</p>
                            <div class="product-meta">
                                <span class="product-price">₹850/kg</span>
                                <div class="product-rating">
                                    <i class="fas fa-star"></i>
                                    <span>4.9 (32 reviews)</span>
                                </div>
                            </div>
                            <div class="product-seller">
                                <span>by Spice Garden</span>
                                <span class="seller-location">Kochi, Kerala</span>
                            </div>
                            <div class="product-actions">
                                <button class="btn btn-outline btn-sm">
                                    <i class="fas fa-envelope"></i>
                                    Send RFQ
                                </button>
                                <button class="btn btn-primary btn-sm">
                                    <i class="fas fa-shopping-cart"></i>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Load More -->
                <div class="text-center mt-8">
                    <button class="btn btn-outline">
                        <i class="fas fa-plus"></i>
                        Load More Products
                    </button>
                </div>
            </div>
        `;
    },

    erp() {
        return `
            <div class="erp-page">
                    <!-- Enhanced ERP Header with Smart Features -->
                    <div class="erp-header">
                        <div class="header-main">
                            <div class="header-left">
                                <div class="title-section">
                                    <h1 class="page-title">
                                        <i class="fas fa-chart-line"></i>
                                        <span data-translate="erp_dashboard">ERP Dashboard</span>
                                    </h1>
                                    <p class="page-subtitle" data-translate="erp_subtitle">Manage your business operations efficiently</p>
                                </div>

                                <!-- Connection Status -->
                                <div class="connection-status">
                                    <div class="status-indicator online">
                                        <i class="fas fa-wifi"></i>
                                        <span data-translate="online">Online</span>
                                    </div>
                                    <div class="backup-status">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <span data-translate="last_backup">Last backup: 2 mins ago</span>
                                    </div>
                                </div>
                            </div>

                            <div class="header-actions">
                                <!-- Language Selector -->
                                <div class="language-selector">
                                    <button class="btn btn-outline" onclick="window.erpSystem?.toggleLanguage()">
                                        <i class="fas fa-language"></i>
                                        <span id="current-language">English</span>
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                </div>

                                <!-- Voice Assistant Toggle -->
                                <button class="btn btn-outline voice-assistant" onclick="window.erpSystem?.toggleVoiceAssistant()">
                                    <i class="fas fa-microphone"></i>
                                    <span data-translate="voice_guide">Voice Guide</span>
                                </button>

                                <!-- Daily Summary -->
                                <button class="btn btn-primary" onclick="window.erpSystem?.showDailySummary()">
                                    <i class="fas fa-chart-pie"></i>
                                    <span data-translate="daily_summary">Daily Summary</span>
                                </button>
                            </div>
                        </div>

                        <!-- Universal Smart Search -->
                        <div class="smart-search-container">
                            <div class="smart-search">
                                <div class="search-icon">
                                    <i class="fas fa-search"></i>
                                </div>
                                <input
                                    type="text"
                                    class="search-input"
                                    placeholder="Search anything... (Customer, Invoice, Item, etc.)"
                                    data-translate-placeholder="search_placeholder"
                                    onkeyup="window.erpSystem?.handleSmartSearch(this.value)"
                                    onfocus="window.erpSystem?.showSearchSuggestions()"
                                >
                                <div class="search-voice" onclick="window.erpSystem?.startVoiceSearch()">
                                    <i class="fas fa-microphone"></i>
                                </div>
                            </div>

                            <!-- Search Suggestions Dropdown -->
                            <div class="search-suggestions" id="search-suggestions" style="display: none;">
                                <div class="suggestion-category">
                                    <h4 data-translate="recent_searches">Recent Searches</h4>
                                    <div class="suggestion-item">
                                        <i class="fas fa-user"></i>
                                        <span>Customer Ramesh</span>
                                    </div>
                                    <div class="suggestion-item">
                                        <i class="fas fa-file-invoice"></i>
                                        <span>Invoice #INV-102</span>
                                    </div>
                                </div>

                                <div class="suggestion-category">
                                    <h4 data-translate="quick_actions">Quick Actions</h4>
                                    <div class="suggestion-item">
                                        <i class="fas fa-plus"></i>
                                        <span data-translate="create_invoice">Create New Invoice</span>
                                    </div>
                                    <div class="suggestion-item">
                                        <i class="fas fa-user-plus"></i>
                                        <span data-translate="add_customer">Add Customer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                <!-- Smart Tips Overlay -->
                <div class="smart-tips-overlay" id="smart-tips-overlay" style="display: none;">
                    <div class="tip-content">
                        <div class="tip-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <div class="tip-text">
                            <h4 id="tip-title">Smart Tip</h4>
                            <p id="tip-message">Did you know you can send invoices directly to WhatsApp?</p>
                        </div>
                        <div class="tip-actions">
                            <button class="btn btn-sm btn-outline" onclick="window.erpSystem?.dismissTip()">
                                <span data-translate="got_it">Got it</span>
                            </button>
                            <button class="btn btn-sm btn-primary" onclick="window.erpSystem?.showTipDemo()">
                                <span data-translate="show_me">Show me</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- ERP Modules Grid with Enhanced Features -->
                <div class="erp-modules-section">
                    <div class="section-header">
                        <h2 data-translate="business_modules">Business Modules</h2>
                        <div class="module-filters">
                            <button class="filter-btn active" data-filter="all">
                                <span data-translate="all">All</span>
                            </button>
                            <button class="filter-btn" data-filter="finance">
                                <span data-translate="finance">Finance</span>
                            </button>
                            <button class="filter-btn" data-filter="operations">
                                <span data-translate="operations">Operations</span>
                            </button>
                            <button class="filter-btn" data-filter="reports">
                                <span data-translate="reports">Reports</span>
                            </button>
                        </div>
                    </div>

                    <div class="erp-modules-grid">
                        <div class="erp-module-card" data-category="finance" data-tip="invoice_whatsapp" data-tip-id="erp-invoice-create">
                            <div class="module-status">
                                <span class="status-dot active"></span>
                                <span class="usage-count">156 this month</span>
                            </div>
                            <div class="card-content">
                                <div class="module-icon">
                                    <i class="fas fa-file-invoice"></i>
                                </div>
                                <h3 data-translate="invoicing">Invoicing</h3>
                                <p data-translate="invoicing_desc">Create and manage invoices with auto-GST calculations</p>
                                <div class="module-features">
                                    <span class="feature-tag">
                                        <i class="fas fa-whatsapp"></i>
                                        WhatsApp
                                    </span>
                                    <span class="feature-tag">
                                        <i class="fas fa-calculator"></i>
                                        Auto-GST
                                    </span>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-primary btn-sm" onclick="window.erpSystem?.openModule('invoicing')">
                                    <span data-translate="open_module">Open Module</span>
                                </button>
                            </div>
                        </div>

                        <div class="erp-module-card" data-category="finance" data-tip="payment_tracking" data-tip-id="erp-payment-tracking">
                            <div class="module-status">
                                <span class="status-dot active"></span>
                                <span class="usage-count">89 this month</span>
                            </div>
                            <div class="card-content">
                                <div class="module-icon">
                                    <i class="fas fa-calculator"></i>
                                </div>
                                <h3 data-translate="billing">Billing</h3>
                                <p data-translate="billing_desc">Track payments and manage billing cycles</p>
                                <div class="module-features">
                                    <span class="feature-tag">
                                        <i class="fas fa-history"></i>
                                        Payment History
                                    </span>
                                    <span class="feature-tag">
                                        <i class="fas fa-bell"></i>
                                        Reminders
                                    </span>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-primary btn-sm" onclick="window.erpSystem?.openModule('billing')">
                                    <span data-translate="open_module">Open Module</span>
                                </button>
                            </div>
                        </div>

                        <div class="erp-module-card" data-category="operations" data-tip="low_stock_alert">
                            <div class="module-status">
                                <span class="status-dot warning"></span>
                                <span class="usage-count">3 low stock items</span>
                            </div>
                            <div class="card-content">
                                <div class="module-icon">
                                    <i class="fas fa-boxes"></i>
                                </div>
                                <h3 data-translate="inventory">Inventory</h3>
                                <p data-translate="inventory_desc">Stock management and inventory tracking</p>
                                <div class="module-features">
                                    <span class="feature-tag">
                                        <i class="fas fa-exclamation-triangle"></i>
                                        Low Stock Alerts
                                    </span>
                                    <span class="feature-tag">
                                        <i class="fas fa-sync"></i>
                                        Auto-Reorder
                                    </span>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-primary btn-sm" onclick="window.erpSystem?.openModule('inventory')">
                                    <span data-translate="open_module">Open Module</span>
                                </button>
                            </div>
                        </div>

                        <div class="erp-module-card" data-category="finance" data-tip="profit_analysis">
                            <div class="module-status">
                                <span class="status-dot active"></span>
                                <span class="usage-count">Daily reports ready</span>
                            </div>
                            <div class="module-icon">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h3 data-translate="accounting">Accounting</h3>
                            <p data-translate="accounting_desc">Financial reports and accounting management</p>
                            <div class="module-features">
                                <span class="feature-tag">
                                    <i class="fas fa-chart-line"></i>
                                    Profit Analysis
                                </span>
                                <span class="feature-tag">
                                    <i class="fas fa-file-alt"></i>
                                    Auto Reports
                                </span>
                            </div>
                            <button class="btn btn-primary btn-sm" onclick="window.erpSystem?.openModule('accounting')">
                                <span data-translate="open_module">Open Module</span>
                            </button>
                        </div>

                        <div class="erp-module-card" data-category="finance" data-tip="gst_filing">
                            <div class="module-status">
                                <span class="status-dot pending"></span>
                                <span class="usage-count">GST due in 5 days</span>
                            </div>
                            <div class="module-icon">
                                <i class="fas fa-receipt"></i>
                            </div>
                            <h3 data-translate="tax_gst">Tax (GST)</h3>
                            <p data-translate="tax_desc">GST filing and tax compliance management</p>
                            <div class="module-features">
                                <span class="feature-tag">
                                    <i class="fas fa-calendar-check"></i>
                                    Auto Filing
                                </span>
                                <span class="feature-tag">
                                    <i class="fas fa-shield-alt"></i>
                                    Compliance
                                </span>
                            </div>
                            <button class="btn btn-primary btn-sm" onclick="window.erpSystem?.openModule('tax')">
                                <span data-translate="open_module">Open Module</span>
                            </button>
                        </div>

                        <div class="erp-module-card" data-category="reports" data-tip="export_reports">
                            <div class="module-status">
                                <span class="status-dot active"></span>
                                <span class="usage-count">12 reports generated</span>
                            </div>
                            <div class="module-icon">
                                <i class="fas fa-download"></i>
                            </div>
                            <h3 data-translate="reports">Reports</h3>
                            <p data-translate="reports_desc">Export reports in PDF/Excel format</p>
                            <div class="module-features">
                                <span class="feature-tag">
                                    <i class="fas fa-file-pdf"></i>
                                    PDF Export
                                </span>
                                <span class="feature-tag">
                                    <i class="fas fa-file-excel"></i>
                                    Excel Export
                                </span>
                            </div>
                            <button class="btn btn-primary btn-sm" onclick="window.erpSystem?.openModule('reports')">
                                <span data-translate="open_module">Open Module</span>
                            </button>
                        </div>

                    <div class="erp-module-card featured-module" onclick="window.erpSystem?.openBankReconciliation()">
                        <div class="module-icon bank-recon">
                            <i class="fas fa-university"></i>
                        </div>
                        <div class="module-badge">
                            <span class="badge badge-success">NEW</span>
                        </div>
                        <h3>Bank Reconciliation</h3>
                        <p>Auto-fetch bank transactions and match with ERP entries</p>
                        <div class="module-features">
                            <span class="feature-tag">API Integration</span>
                            <span class="feature-tag">Auto-Match</span>
                        </div>
                        <button class="btn btn-primary btn-sm">
                            <i class="fas fa-sync-alt"></i>
                            Open Module
                        </button>
                    </div>
                    </div>
                </div>

                <!-- Enhanced Financial Dashboard -->
                <div class="financial-dashboard">
                    <div class="dashboard-header">
                        <h2>
                            <i class="fas fa-chart-line"></i>
                            <span data-translate="financial_overview">Financial Overview</span>
                        </h2>
                        <div class="dashboard-actions">
                            <button class="btn btn-outline btn-sm" onclick="window.erpSystem?.exportFinancialReport()">
                                <i class="fas fa-download"></i>
                                <span data-translate="export">Export</span>
                            </button>
                            <button class="btn btn-primary btn-sm" onclick="window.erpSystem?.showDetailedAnalysis()">
                                <i class="fas fa-chart-pie"></i>
                                <span data-translate="detailed_view">Detailed View</span>
                            </button>
                        </div>
                    </div>

                    <div class="financial-stats-grid">
                        <div class="stat-card revenue">
                            <div class="stat-icon">
                                <i class="fas fa-arrow-up"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label" data-translate="total_revenue">Total Revenue</div>
                                <div class="stat-value">₹12,45,000</div>
                                <div class="stat-change positive">
                                    <i class="fas fa-arrow-up"></i>
                                    <span>+12.5% from last month</span>
                                </div>
                            </div>
                            <div class="stat-chart">
                                <div class="mini-chart revenue-chart"></div>
                            </div>
                        </div>

                        <div class="stat-card outstanding">
                            <div class="stat-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label" data-translate="outstanding">Outstanding</div>
                                <div class="stat-value">₹85,000</div>
                                <div class="stat-change neutral">
                                    <i class="fas fa-minus"></i>
                                    <span>3 pending payments</span>
                                </div>
                            </div>
                            <div class="stat-action">
                                <button class="btn btn-sm btn-warning" onclick="window.erpSystem?.showPendingPayments()">
                                    <span data-translate="follow_up">Follow Up</span>
                                </button>
                            </div>
                        </div>

                        <div class="stat-card expenses">
                            <div class="stat-icon">
                                <i class="fas fa-arrow-down"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label" data-translate="expenses">Expenses</div>
                                <div class="stat-value">₹3,20,000</div>
                                <div class="stat-change negative">
                                    <i class="fas fa-arrow-up"></i>
                                    <span>+8.2% from last month</span>
                                </div>
                            </div>
                            <div class="stat-chart">
                                <div class="mini-chart expense-chart"></div>
                            </div>
                        </div>

                        <div class="stat-card profit">
                            <div class="stat-icon">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-label" data-translate="net_profit">Net Profit</div>
                                <div class="stat-value">₹9,25,000</div>
                                <div class="stat-change positive">
                                    <i class="fas fa-arrow-up"></i>
                                    <span>+15.3% from last month</span>
                                </div>
                            </div>
                            <div class="stat-chart">
                                <div class="mini-chart profit-chart"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Today's Business Summary -->
                <div class="daily-summary-section">
                    <div class="summary-header">
                        <h3>
                            <i class="fas fa-calendar-day"></i>
                            <span data-translate="todays_summary">Today's Business Summary</span>
                        </h3>
                        <div class="summary-time">
                            <i class="fas fa-clock"></i>
                            <span id="current-time">Last updated: 2:30 PM</span>
                        </div>
                    </div>

                    <div class="summary-cards">
                        <div class="summary-card earnings">
                            <div class="summary-icon">
                                <i class="fas fa-rupee-sign"></i>
                            </div>
                            <div class="summary-content">
                                <div class="summary-amount">₹25,000</div>
                                <div class="summary-label" data-translate="earned_today">Earned Today</div>
                            </div>
                        </div>

                        <div class="summary-card pending">
                            <div class="summary-icon">
                                <i class="fas fa-hourglass-half"></i>
                            </div>
                            <div class="summary-content">
                                <div class="summary-amount">3</div>
                                <div class="summary-label" data-translate="payments_pending">Payments Pending</div>
                            </div>
                        </div>

                        <div class="summary-card alerts">
                            <div class="summary-icon">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="summary-content">
                                <div class="summary-amount">2</div>
                                <div class="summary-label" data-translate="low_stock_items">Low Stock Items</div>
                            </div>
                        </div>

                        <div class="summary-card orders">
                            <div class="summary-icon">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                            <div class="summary-content">
                                <div class="summary-amount">12</div>
                                <div class="summary-label" data-translate="new_orders">New Orders</div>
                            </div>
                        </div>
                    </div>

                    <!-- WhatsApp Summary Button -->
                    <div class="whatsapp-summary">
                        <button class="btn btn-success" onclick="window.erpSystem?.sendWhatsAppSummary()">
                            <i class="fab fa-whatsapp"></i>
                            <span data-translate="send_whatsapp_summary">Send Summary to WhatsApp</span>
                        </button>
                        <p class="summary-note" data-translate="auto_summary_note">
                            Auto-summary will be sent at 6 PM daily
                        </p>
                    </div>
                </div>
                </div>
            </div>
        `;
    },

    // Bank Reconciliation Module
    bankReconciliation() {
        return `
            <div class="bank-reconciliation-page">
                    <!-- Bank Reconciliation Header -->
                    <div class="bank-recon-header">
                        <div class="header-content">
                            <div class="header-left">
                                <h1 class="page-title">
                                    <i class="fas fa-university"></i>
                                    Bank Reconciliation
                                </h1>
                                <p class="page-subtitle">Auto-fetch bank transactions and match with ERP entries</p>
                            </div>
                            <div class="header-actions">
                                <button class="btn btn-outline" onclick="window.bankRecon?.connectBank()">
                                    <i class="fas fa-link"></i>
                                    Connect Bank
                                </button>
                                <button class="btn btn-primary" onclick="window.bankRecon?.fetchTransactions()">
                                    <i class="fas fa-sync-alt"></i>
                                    Fetch Transactions
                                </button>
                                <button class="btn btn-success" onclick="window.bankRecon?.autoReconcile()">
                                    <i class="fas fa-magic"></i>
                                    Auto Reconcile
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Bank Accounts Overview -->
                    <div class="bank-accounts-section">
                        <h3 class="section-title">Connected Bank Accounts</h3>
                        <div class="bank-accounts-grid">
                            <div class="bank-account-card">
                                <div class="bank-logo">
                                    <i class="fas fa-university"></i>
                                </div>
                                <div class="bank-info">
                                    <h4>HDFC Bank</h4>
                                    <p>Account: ****1234</p>
                                    <span class="connection-status connected">Connected</span>
                                </div>
                                <div class="bank-balance">
                                    <span class="balance-label">Current Balance</span>
                                    <span class="balance-amount">₹2,45,680</span>
                                </div>
                                <div class="last-sync">
                                    <i class="fas fa-clock"></i>
                                    <span>Last sync: 2 hours ago</span>
                                </div>
                            </div>

                            <div class="bank-account-card">
                                <div class="bank-logo">
                                    <i class="fas fa-university"></i>
                                </div>
                                <div class="bank-info">
                                    <h4>ICICI Bank</h4>
                                    <p>Account: ****5678</p>
                                    <span class="connection-status connected">Connected</span>
                                </div>
                                <div class="bank-balance">
                                    <span class="balance-label">Current Balance</span>
                                    <span class="balance-amount">₹1,85,420</span>
                                </div>
                                <div class="last-sync">
                                    <i class="fas fa-clock"></i>
                                    <span>Last sync: 1 hour ago</span>
                                </div>
                            </div>

                            <div class="bank-account-card add-account">
                                <div class="add-account-content">
                                    <i class="fas fa-plus-circle"></i>
                                    <h4>Add Bank Account</h4>
                                    <p>Connect more bank accounts for comprehensive reconciliation</p>
                                    <button class="btn btn-outline btn-sm">Add Account</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Reconciliation Dashboard -->
                    <div class="reconciliation-dashboard">
                        <div class="dashboard-stats">
                            <div class="stat-card matched">
                                <div class="stat-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-number">156</div>
                                    <div class="stat-label">Matched Transactions</div>
                                    <div class="stat-percentage">+12% this month</div>
                                </div>
                            </div>

                            <div class="stat-card unmatched">
                                <div class="stat-icon">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-number">8</div>
                                    <div class="stat-label">Unmatched Transactions</div>
                                    <div class="stat-percentage">Needs attention</div>
                                </div>
                            </div>

                            <div class="stat-card pending">
                                <div class="stat-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-number">23</div>
                                    <div class="stat-label">Pending Review</div>
                                    <div class="stat-percentage">Manual review required</div>
                                </div>
                            </div>

                            <div class="stat-card accuracy">
                                <div class="stat-icon">
                                    <i class="fas fa-bullseye"></i>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-number">95.2%</div>
                                    <div class="stat-label">Accuracy Rate</div>
                                    <div class="stat-percentage">Excellent performance</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Transaction Matching Interface -->
                    <div class="transaction-matching">
                        <div class="matching-header">
                            <h3>Transaction Matching</h3>
                            <div class="matching-filters">
                                <select class="form-select">
                                    <option>All Transactions</option>
                                    <option>Unmatched Only</option>
                                    <option>Matched Only</option>
                                    <option>Pending Review</option>
                                </select>
                                <input type="date" class="form-input" value="2024-12-01">
                                <input type="date" class="form-input" value="2024-12-31">
                                <button class="btn btn-outline">
                                    <i class="fas fa-filter"></i>
                                    Filter
                                </button>
                            </div>
                        </div>

                        <div class="matching-interface">
                            <div class="bank-transactions">
                                <h4>Bank Transactions</h4>
                                <div class="transaction-list">
                                    <div class="transaction-item unmatched">
                                        <div class="transaction-info">
                                            <div class="transaction-date">Dec 15, 2024</div>
                                            <div class="transaction-description">Payment from Kumar Textiles</div>
                                            <div class="transaction-amount credit">+₹45,000</div>
                                        </div>
                                        <div class="transaction-status">
                                            <span class="status-badge unmatched">Unmatched</span>
                                        </div>
                                    </div>

                                    <div class="transaction-item matched">
                                        <div class="transaction-info">
                                            <div class="transaction-date">Dec 14, 2024</div>
                                            <div class="transaction-description">Office Rent Payment</div>
                                            <div class="transaction-amount debit">-₹25,000</div>
                                        </div>
                                        <div class="transaction-status">
                                            <span class="status-badge matched">Matched</span>
                                        </div>
                                    </div>

                                    <div class="transaction-item pending">
                                        <div class="transaction-info">
                                            <div class="transaction-date">Dec 13, 2024</div>
                                            <div class="transaction-description">Supplier Payment - ABC Ltd</div>
                                            <div class="transaction-amount debit">-₹15,500</div>
                                        </div>
                                        <div class="transaction-status">
                                            <span class="status-badge pending">Pending</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="erp-entries">
                                <h4>ERP Entries</h4>
                                <div class="entry-list">
                                    <div class="entry-item">
                                        <div class="entry-info">
                                            <div class="entry-date">Dec 15, 2024</div>
                                            <div class="entry-description">Invoice #INV-001 - Kumar Textiles</div>
                                            <div class="entry-amount credit">+₹45,000</div>
                                        </div>
                                        <div class="entry-actions">
                                            <button class="btn btn-sm btn-success">
                                                <i class="fas fa-link"></i>
                                                Match
                                            </button>
                                        </div>
                                    </div>

                                    <div class="entry-item matched">
                                        <div class="entry-info">
                                            <div class="entry-date">Dec 14, 2024</div>
                                            <div class="entry-description">Expense #EXP-045 - Office Rent</div>
                                            <div class="entry-amount debit">-₹25,000</div>
                                        </div>
                                        <div class="entry-actions">
                                            <span class="matched-indicator">
                                                <i class="fas fa-check-circle"></i>
                                                Matched
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    crm() {
        return `
            <div class="crm-page">
                    <!-- Modern CRM Header with Glassmorphism -->
                    <div class="crm-hero-section">
                        <div class="hero-background">
                            <div class="floating-shapes">
                                <div class="shape shape-1"></div>
                                <div class="shape shape-2"></div>
                                <div class="shape shape-3"></div>
                                <div class="shape shape-4"></div>
                            </div>
                        </div>
                        <div class="hero-content">
                            <div class="hero-text">
                                <div class="hero-badge">
                                    <i class="fas fa-rocket"></i>
                                    <span>Advanced CRM System</span>
                                </div>
                                <h1 class="hero-title">
                                    <span class="gradient-text">Customer Relationship</span>
                                    <span class="gradient-text">Management</span>
                                </h1>
                                <p class="hero-subtitle">
                                    Comprehensive CRM solution designed specifically for MSME businesses
                                    <br>Manage contacts, track leads, and grow your business efficiently
                                </p>
                            </div>
                            <div class="hero-actions">
                                <button class="btn-modern btn-primary" onclick="window.crmSystem?.showQuickSearch()">
                                    <i class="fas fa-search"></i>
                                    <span>Quick Search</span>
                                    <div class="btn-glow"></div>
                                </button>
                                <button class="btn-modern btn-secondary" onclick="window.crmSystem?.addNewContact()">
                                    <i class="fas fa-user-plus"></i>
                                    <span>Add Contact</span>
                                    <div class="btn-glow"></div>
                                </button>
                                <button class="btn-modern btn-accent" onclick="window.crmSystem?.addNewLead()">
                                    <i class="fas fa-plus-circle"></i>
                                    <span>New Lead</span>
                                    <div class="btn-glow"></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Interactive CRM Dashboard Stats -->
                    <div class="stats-section">
                        <div class="section-header">
                            <h2 class="section-title">
                                <i class="fas fa-chart-bar"></i>
                                Dashboard Overview
                            </h2>
                            <div class="section-controls">
                                <select class="modern-select">
                                    <option>Last 30 Days</option>
                                    <option>Last Quarter</option>
                                    <option>This Year</option>
                                </select>
                                <button class="btn-icon" title="Refresh Data">
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                            </div>
                        </div>

                        <div class="uniform-stats-grid">
                            <!-- Contact Management Card -->
                            <div class="uniform-stat-card primary" data-stat="contacts">
                                <div class="card-header-uniform">
                                    <div class="icon-container primary">
                                        <i class="fas fa-address-book"></i>
                                    </div>
                                    <div class="card-menu">
                                        <button class="menu-btn">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-content-uniform">
                                    <div class="metric-value" data-target="1247">0</div>
                                    <div class="metric-label">Total Contacts</div>
                                    <div class="metric-trend positive">
                                        <i class="fas fa-trending-up"></i>
                                        <span>+12% this month</span>
                                    </div>
                                </div>
                                <div class="card-chart-uniform">
                                    <div class="chart-container">
                                        <div class="bar-chart">
                                            <div class="bar" style="height: 30%"></div>
                                            <div class="bar" style="height: 50%"></div>
                                            <div class="bar" style="height: 70%"></div>
                                            <div class="bar" style="height: 90%"></div>
                                            <div class="bar" style="height: 100%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Active Leads Card -->
                            <div class="uniform-stat-card success" data-stat="leads">
                                <div class="card-header-uniform">
                                    <div class="icon-container success">
                                        <i class="fas fa-chart-line"></i>
                                    </div>
                                    <div class="card-menu">
                                        <button class="menu-btn">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-content-uniform">
                                    <div class="metric-value" data-target="89">0</div>
                                    <div class="metric-label">Active Leads</div>
                                    <div class="metric-trend positive">
                                        <i class="fas fa-trending-up"></i>
                                        <span>+8 new today</span>
                                    </div>
                                </div>
                                <div class="card-chart-uniform">
                                    <div class="chart-container">
                                        <div class="circular-progress" data-percentage="70">
                                            <svg width="60" height="60">
                                                <circle cx="30" cy="30" r="25" stroke="#e5e7eb" stroke-width="4" fill="none"/>
                                                <circle cx="30" cy="30" r="25" stroke="#10b981" stroke-width="4" fill="none"
                                                        stroke-dasharray="157" stroke-dashoffset="47" class="progress-circle"/>
                                            </svg>
                                            <div class="progress-percentage">70%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Pipeline Value Card -->
                            <div class="uniform-stat-card warning" data-stat="pipeline">
                                <div class="card-header-uniform">
                                    <div class="icon-container warning">
                                        <i class="fas fa-funnel-dollar"></i>
                                    </div>
                                    <div class="card-menu">
                                        <button class="menu-btn">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-content-uniform">
                                    <div class="metric-value" data-target="24.5">₹0L</div>
                                    <div class="metric-label">Pipeline Value</div>
                                    <div class="metric-trend positive">
                                        <i class="fas fa-trending-up"></i>
                                        <span>+15% growth</span>
                                    </div>
                                </div>
                                <div class="card-chart-uniform">
                                    <div class="chart-container">
                                        <div class="line-chart">
                                            <svg width="80" height="40">
                                                <polyline points="0,35 20,28 40,20 60,12 80,5"
                                                          stroke="#f59e0b" stroke-width="3" fill="none" class="trend-line"/>
                                                <circle cx="80" cy="5" r="3" fill="#f59e0b"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Deals Closed Card -->
                            <div class="uniform-stat-card info" data-stat="deals">
                                <div class="card-header-uniform">
                                    <div class="icon-container info">
                                        <i class="fas fa-handshake"></i>
                                    </div>
                                    <div class="card-menu">
                                        <button class="menu-btn">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-content-uniform">
                                    <div class="metric-value" data-target="23">0</div>
                                    <div class="metric-label">Deals Closed</div>
                                    <div class="metric-trend positive">
                                        <i class="fas fa-trending-up"></i>
                                        <span>+4 this week</span>
                                    </div>
                                </div>
                                <div class="card-chart-uniform">
                                    <div class="chart-container">
                                        <div class="donut-chart">
                                            <svg width="60" height="60">
                                                <circle cx="30" cy="30" r="22" stroke="#e5e7eb" stroke-width="6" fill="none"/>
                                                <circle cx="30" cy="30" r="22" stroke="#3b82f6" stroke-width="6" fill="none"
                                                        stroke-dasharray="138" stroke-dashoffset="35" class="donut-progress"/>
                                            </svg>
                                            <div class="donut-center">75%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Open Tickets Card -->
                            <div class="uniform-stat-card danger" data-stat="tickets">
                                <div class="card-header-uniform">
                                    <div class="icon-container danger">
                                        <i class="fas fa-ticket-alt"></i>
                                    </div>
                                    <div class="card-menu">
                                        <button class="menu-btn">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-content-uniform">
                                    <div class="metric-value" data-target="12">0</div>
                                    <div class="metric-label">Open Tickets</div>
                                    <div class="metric-trend negative">
                                        <i class="fas fa-exclamation-triangle"></i>
                                        <span>3 urgent</span>
                                    </div>
                                </div>
                                <div class="card-chart-uniform">
                                    <div class="chart-container">
                                        <div class="alert-chart">
                                            <div class="alert-pulse"></div>
                                            <div class="alert-rings">
                                                <div class="ring ring-1"></div>
                                                <div class="ring ring-2"></div>
                                                <div class="ring ring-3"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Active Campaigns Card -->
                            <div class="uniform-stat-card secondary" data-stat="campaigns">
                                <div class="card-header-uniform">
                                    <div class="icon-container secondary">
                                        <i class="fas fa-bullhorn"></i>
                                    </div>
                                    <div class="card-menu">
                                        <button class="menu-btn">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-content-uniform">
                                    <div class="metric-value" data-target="5">0</div>
                                    <div class="metric-label">Active Campaigns</div>
                                    <div class="metric-trend neutral">
                                        <i class="fas fa-clock"></i>
                                        <span>2 launching soon</span>
                                    </div>
                                </div>
                                <div class="card-chart-uniform">
                                    <div class="chart-container">
                                        <div class="status-indicators">
                                            <div class="indicator active"></div>
                                            <div class="indicator active"></div>
                                            <div class="indicator active"></div>
                                            <div class="indicator pending"></div>
                                            <div class="indicator inactive"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modern CRM Navigation -->
                    <div class="crm-navigation">
                        <div class="nav-header">
                            <h3>CRM Modules</h3>
                            <div class="nav-search">
                                <i class="fas fa-search"></i>
                                <input type="text" placeholder="Search modules..." class="nav-search-input">
                            </div>
                        </div>

                        <div class="modern-tab-grid">
                            <div class="tab-card active" data-tab="contacts">
                                <div class="tab-card-header">
                                    <div class="tab-icon">
                                        <i class="fas fa-address-book"></i>
                                    </div>
                                    <div class="tab-badge">1,247</div>
                                </div>
                                <div class="tab-card-body">
                                    <h4>Contact Management</h4>
                                    <p>Manage all your business contacts and relationships</p>
                                    <div class="tab-features">
                                        <span class="feature-tag">Import/Export</span>
                                        <span class="feature-tag">Smart Search</span>
                                    </div>
                                </div>
                                <div class="tab-card-footer">
                                    <div class="tab-progress">
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: 85%"></div>
                                        </div>
                                        <span class="progress-text">85% Complete</span>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-card" data-tab="leads">
                                <div class="tab-card-header">
                                    <div class="tab-icon">
                                        <i class="fas fa-user-plus"></i>
                                    </div>
                                    <div class="tab-badge hot">89</div>
                                </div>
                                <div class="tab-card-body">
                                    <h4>Leads & Opportunities</h4>
                                    <p>Track and convert leads into customers</p>
                                    <div class="tab-features">
                                        <span class="feature-tag">Lead Scoring</span>
                                        <span class="feature-tag">Auto-Assignment</span>
                                    </div>
                                </div>
                                <div class="tab-card-footer">
                                    <div class="tab-stats">
                                        <div class="stat-item">
                                            <span class="stat-value">23%</span>
                                            <span class="stat-label">Conversion Rate</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-card" data-tab="pipeline">
                                <div class="tab-card-header">
                                    <div class="tab-icon">
                                        <i class="fas fa-chart-line"></i>
                                    </div>
                                    <div class="tab-badge success">₹24.5L</div>
                                </div>
                                <div class="tab-card-body">
                                    <h4>Sales Pipeline</h4>
                                    <p>Visualize and manage your sales process</p>
                                    <div class="tab-features">
                                        <span class="feature-tag">Drag & Drop</span>
                                        <span class="feature-tag">Forecasting</span>
                                    </div>
                                </div>
                                <div class="tab-card-footer">
                                    <div class="pipeline-preview">
                                        <div class="pipeline-stage" style="width: 25%"></div>
                                        <div class="pipeline-stage" style="width: 35%"></div>
                                        <div class="pipeline-stage" style="width: 20%"></div>
                                        <div class="pipeline-stage" style="width: 20%"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-card" data-tab="support">
                                <div class="tab-card-header">
                                    <div class="tab-icon">
                                        <i class="fas fa-headset"></i>
                                    </div>
                                    <div class="tab-badge urgent">12</div>
                                </div>
                                <div class="tab-card-body">
                                    <h4>Customer Support</h4>
                                    <p>Handle customer queries and support tickets</p>
                                    <div class="tab-features">
                                        <span class="feature-tag">Live Chat</span>
                                        <span class="feature-tag">SLA Tracking</span>
                                    </div>
                                </div>
                                <div class="tab-card-footer">
                                    <div class="support-status">
                                        <div class="status-indicator urgent"></div>
                                        <span>3 urgent tickets</span>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-card" data-tab="campaigns">
                                <div class="tab-card-header">
                                    <div class="tab-icon">
                                        <i class="fas fa-bullhorn"></i>
                                    </div>
                                    <div class="tab-badge info">5</div>
                                </div>
                                <div class="tab-card-body">
                                    <h4>Marketing Campaigns</h4>
                                    <p>Create and track marketing campaigns</p>
                                    <div class="tab-features">
                                        <span class="feature-tag">Email Marketing</span>
                                        <span class="feature-tag">Analytics</span>
                                    </div>
                                </div>
                                <div class="tab-card-footer">
                                    <div class="campaign-metrics">
                                        <span class="metric">24.5% Open Rate</span>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-card" data-tab="tasks">
                                <div class="tab-card-header">
                                    <div class="tab-icon">
                                        <i class="fas fa-tasks"></i>
                                    </div>
                                    <div class="tab-badge warning">23</div>
                                </div>
                                <div class="tab-card-body">
                                    <h4>Tasks & Activities</h4>
                                    <p>Manage tasks and track team activities</p>
                                    <div class="tab-features">
                                        <span class="feature-tag">Kanban Board</span>
                                        <span class="feature-tag">Time Tracking</span>
                                    </div>
                                </div>
                                <div class="tab-card-footer">
                                    <div class="task-progress">
                                        <div class="progress-circle-small">
                                            <span>89%</span>
                                        </div>
                                        <span>Completion Rate</span>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-card" data-tab="analytics">
                                <div class="tab-card-header">
                                    <div class="tab-icon">
                                        <i class="fas fa-chart-bar"></i>
                                    </div>
                                    <div class="tab-badge secondary">Reports</div>
                                </div>
                                <div class="tab-card-body">
                                    <h4>Analytics & Reports</h4>
                                    <p>Generate insights and detailed reports</p>
                                    <div class="tab-features">
                                        <span class="feature-tag">Real-time</span>
                                        <span class="feature-tag">Custom Reports</span>
                                    </div>
                                </div>
                                <div class="tab-card-footer">
                                    <div class="analytics-preview">
                                        <div class="chart-mini">
                                            <div class="bar" style="height: 30%"></div>
                                            <div class="bar" style="height: 60%"></div>
                                            <div class="bar" style="height: 90%"></div>
                                            <div class="bar" style="height: 45%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-card" data-tab="automation">
                                <div class="tab-card-header">
                                    <div class="tab-icon">
                                        <i class="fas fa-robot"></i>
                                    </div>
                                    <div class="tab-badge ai">AI</div>
                                </div>
                                <div class="tab-card-body">
                                    <h4>Automation & AI</h4>
                                    <p>Automate workflows and use AI insights</p>
                                    <div class="tab-features">
                                        <span class="feature-tag">Smart Workflows</span>
                                        <span class="feature-tag">AI Predictions</span>
                                    </div>
                                </div>
                                <div class="tab-card-footer">
                                    <div class="automation-status">
                                        <div class="ai-indicator">
                                            <div class="ai-pulse"></div>
                                        </div>
                                        <span>12 workflows active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tab Content -->
                    <div class="tab-content">
                        <!-- Contact Management Tab -->
                        <div class="tab-panel active" id="contacts-tab">
                            ${this.renderContactManagement()}
                        </div>

                        <!-- Leads & Opportunities Tab -->
                        <div class="tab-panel" id="leads-tab">
                            ${this.renderLeadsManagement()}
                        </div>

                        <!-- Sales Pipeline Tab -->
                        <div class="tab-panel" id="pipeline-tab">
                            ${this.renderSalesPipeline()}
                        </div>

                        <!-- Customer Support Tab -->
                        <div class="tab-panel" id="support-tab">
                            ${this.renderCustomerSupport()}
                        </div>

                        <!-- Marketing Campaigns Tab -->
                        <div class="tab-panel" id="campaigns-tab">
                            ${this.renderMarketingCampaigns()}
                        </div>

                        <!-- Tasks & Activities Tab -->
                        <div class="tab-panel" id="tasks-tab">
                            ${this.renderTasksActivities()}
                        </div>

                        <!-- Analytics & Reports Tab -->
                        <div class="tab-panel" id="analytics-tab">
                            ${this.renderAnalyticsReports()}
                        </div>

                        <!-- Automation Tab -->
                        <div class="tab-panel" id="automation-tab">
                            ${this.renderAutomation()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // CRM Module Functions
    renderContactManagement() {
        return `
            <div class="contact-management">
                <div class="module-header">
                    <h3>Contact Management</h3>
                    <div class="module-actions">
                        <div class="search-filter-bar">
                            <div class="search-box">
                                <i class="fas fa-search"></i>
                                <input type="text" placeholder="Search contacts..." class="form-input">
                            </div>
                            <select class="form-select">
                                <option>All Contacts</option>
                                <option>Customers</option>
                                <option>Prospects</option>
                                <option>Partners</option>
                            </select>
                            <button class="btn btn-outline">
                                <i class="fas fa-filter"></i>
                                Filters
                            </button>
                            <button class="btn btn-outline">
                                <i class="fas fa-download"></i>
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                <div class="contacts-grid">
                    <div class="contact-card">
                        <div class="contact-avatar">
                            <img src="https://via.placeholder.com/60" alt="Contact">
                            <div class="contact-status online"></div>
                        </div>
                        <div class="contact-info">
                            <h4>Rajesh Kumar</h4>
                            <p>CEO, Kumar Textiles</p>
                            <div class="contact-details">
                                <span><i class="fas fa-envelope"></i> rajesh@kumartextiles.com</span>
                                <span><i class="fas fa-phone"></i> +91 98765 43210</span>
                                <span><i class="fas fa-map-marker-alt"></i> Mumbai, Maharashtra</span>
                            </div>
                            <div class="contact-tags">
                                <span class="tag primary">VIP Customer</span>
                                <span class="tag success">Active</span>
                            </div>
                        </div>
                        <div class="contact-actions">
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-envelope"></i>
                            </button>
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-phone"></i>
                            </button>
                        </div>
                    </div>

                    <div class="contact-card">
                        <div class="contact-avatar">
                            <img src="https://via.placeholder.com/60" alt="Contact">
                            <div class="contact-status away"></div>
                        </div>
                        <div class="contact-info">
                            <h4>Priya Sharma</h4>
                            <p>Procurement Manager, Tech Solutions</p>
                            <div class="contact-details">
                                <span><i class="fas fa-envelope"></i> priya@techsolutions.com</span>
                                <span><i class="fas fa-phone"></i> +91 87654 32109</span>
                                <span><i class="fas fa-map-marker-alt"></i> Bangalore, Karnataka</span>
                            </div>
                            <div class="contact-tags">
                                <span class="tag warning">Hot Lead</span>
                                <span class="tag info">Follow-up</span>
                            </div>
                        </div>
                        <div class="contact-actions">
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-envelope"></i>
                            </button>
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-phone"></i>
                            </button>
                        </div>
                    </div>

                    <div class="contact-card">
                        <div class="contact-avatar">
                            <img src="https://via.placeholder.com/60" alt="Contact">
                            <div class="contact-status offline"></div>
                        </div>
                        <div class="contact-info">
                            <h4>Amit Patel</h4>
                            <p>Director, Patel Industries</p>
                            <div class="contact-details">
                                <span><i class="fas fa-envelope"></i> amit@patelindustries.com</span>
                                <span><i class="fas fa-phone"></i> +91 76543 21098</span>
                                <span><i class="fas fa-map-marker-alt"></i> Ahmedabad, Gujarat</span>
                            </div>
                            <div class="contact-tags">
                                <span class="tag secondary">Prospect</span>
                                <span class="tag danger">Cold</span>
                            </div>
                        </div>
                        <div class="contact-actions">
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-envelope"></i>
                            </button>
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-phone"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="pagination">
                    <button class="btn btn-outline btn-sm">Previous</button>
                    <span class="pagination-info">Showing 1-10 of 1,247 contacts</span>
                    <button class="btn btn-outline btn-sm">Next</button>
                </div>
            </div>
        `;
    },

    renderLeadsManagement() {
        return `
            <div class="leads-management">
                <div class="module-header">
                    <h3>Leads & Opportunities Management</h3>
                    <div class="module-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                            Add New Lead
                        </button>
                        <button class="btn btn-outline">
                            <i class="fas fa-upload"></i>
                            Import Leads
                        </button>
                    </div>
                </div>

                <div class="leads-overview">
                    <div class="lead-stats">
                        <div class="lead-stat">
                            <div class="stat-number">89</div>
                            <div class="stat-label">Total Leads</div>
                        </div>
                        <div class="lead-stat">
                            <div class="stat-number">34</div>
                            <div class="stat-label">Qualified</div>
                        </div>
                        <div class="lead-stat">
                            <div class="stat-number">23</div>
                            <div class="stat-label">In Progress</div>
                        </div>
                        <div class="lead-stat">
                            <div class="stat-number">15</div>
                            <div class="stat-label">Converted</div>
                        </div>
                    </div>
                </div>

                <div class="leads-table">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Lead Name</th>
                                <th>Company</th>
                                <th>Source</th>
                                <th>Score</th>
                                <th>Stage</th>
                                <th>Value</th>
                                <th>Assigned To</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="lead-info">
                                        <strong>Vikram Singh</strong>
                                        <small>vikram@newtech.com</small>
                                    </div>
                                </td>
                                <td>NewTech Solutions</td>
                                <td><span class="badge badge-info">Website</span></td>
                                <td>
                                    <div class="lead-score hot">
                                        <span>85</span>
                                        <small>Hot</small>
                                    </div>
                                </td>
                                <td><span class="badge badge-warning">Proposal</span></td>
                                <td>₹2,50,000</td>
                                <td>Rahul Sharma</td>
                                <td>
                                    <button class="btn btn-sm btn-outline">View</button>
                                    <button class="btn btn-sm btn-primary">Convert</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderSalesPipeline() {
        return `
            <div class="sales-pipeline">
                <div class="module-header">
                    <h3>Sales Pipeline Management</h3>
                    <div class="pipeline-controls">
                        <select class="form-select">
                            <option>All Pipelines</option>
                            <option>Q4 2024</option>
                            <option>Enterprise Deals</option>
                        </select>
                        <button class="btn btn-outline">
                            <i class="fas fa-chart-bar"></i>
                            Pipeline Report
                        </button>
                    </div>
                </div>

                <div class="pipeline-board">
                    <div class="pipeline-column">
                        <div class="column-header">
                            <h4>Prospects</h4>
                            <span class="column-count">12</span>
                            <span class="column-value">₹15.2L</span>
                        </div>
                        <div class="pipeline-cards">
                            <div class="pipeline-card">
                                <div class="card-header">
                                    <h5>Manufacturing Equipment Deal</h5>
                                    <span class="deal-value">₹5,00,000</span>
                                </div>
                                <div class="card-body">
                                    <p><strong>ABC Industries</strong></p>
                                    <p>Contact: Suresh Kumar</p>
                                    <div class="card-meta">
                                        <span class="probability">30%</span>
                                        <span class="close-date">Dec 15, 2024</span>
                                    </div>
                                </div>
                            </div>

                            <div class="pipeline-card">
                                <div class="card-header">
                                    <h5>Software License Renewal</h5>
                                    <span class="deal-value">₹2,50,000</span>
                                </div>
                                <div class="card-body">
                                    <p><strong>Tech Solutions Ltd</strong></p>
                                    <p>Contact: Priya Sharma</p>
                                    <div class="card-meta">
                                        <span class="probability">45%</span>
                                        <span class="close-date">Dec 20, 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pipeline-column">
                        <div class="column-header">
                            <h4>Qualified</h4>
                            <span class="column-count">8</span>
                            <span class="column-value">₹22.8L</span>
                        </div>
                        <div class="pipeline-cards">
                            <div class="pipeline-card">
                                <div class="card-header">
                                    <h5>ERP Implementation</h5>
                                    <span class="deal-value">₹12,00,000</span>
                                </div>
                                <div class="card-body">
                                    <p><strong>Global Textiles</strong></p>
                                    <p>Contact: Rajesh Gupta</p>
                                    <div class="card-meta">
                                        <span class="probability">65%</span>
                                        <span class="close-date">Jan 10, 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pipeline-column">
                        <div class="column-header">
                            <h4>Proposal</h4>
                            <span class="column-count">5</span>
                            <span class="column-value">₹18.5L</span>
                        </div>
                        <div class="pipeline-cards">
                            <div class="pipeline-card">
                                <div class="card-header">
                                    <h5>Digital Transformation</h5>
                                    <span class="deal-value">₹8,50,000</span>
                                </div>
                                <div class="card-body">
                                    <p><strong>Modern Industries</strong></p>
                                    <p>Contact: Amit Patel</p>
                                    <div class="card-meta">
                                        <span class="probability">80%</span>
                                        <span class="close-date">Dec 30, 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pipeline-column">
                        <div class="column-header">
                            <h4>Closed Won</h4>
                            <span class="column-count">3</span>
                            <span class="column-value">₹9.2L</span>
                        </div>
                        <div class="pipeline-cards">
                            <div class="pipeline-card won">
                                <div class="card-header">
                                    <h5>CRM Setup</h5>
                                    <span class="deal-value">₹3,50,000</span>
                                </div>
                                <div class="card-body">
                                    <p><strong>StartUp Inc</strong></p>
                                    <p>Contact: Neha Singh</p>
                                    <div class="card-meta">
                                        <span class="probability">100%</span>
                                        <span class="close-date">Dec 5, 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderCustomerSupport() {
        return `
            <div class="customer-support">
                <div class="module-header">
                    <h3>Customer Support Ticketing</h3>
                    <div class="support-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                            Create Ticket
                        </button>
                        <button class="btn btn-outline">
                            <i class="fas fa-headset"></i>
                            Live Chat
                        </button>
                    </div>
                </div>

                <div class="support-overview">
                    <div class="support-stats">
                        <div class="support-stat urgent">
                            <div class="stat-icon">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number">3</div>
                                <div class="stat-label">Urgent Tickets</div>
                            </div>
                        </div>

                        <div class="support-stat high">
                            <div class="stat-icon">
                                <i class="fas fa-arrow-up"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number">7</div>
                                <div class="stat-label">High Priority</div>
                            </div>
                        </div>

                        <div class="support-stat normal">
                            <div class="stat-icon">
                                <i class="fas fa-minus"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number">15</div>
                                <div class="stat-label">Normal Priority</div>
                            </div>
                        </div>

                        <div class="support-stat resolved">
                            <div class="stat-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number">89</div>
                                <div class="stat-label">Resolved Today</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tickets-list">
                    <div class="ticket-filters">
                        <button class="filter-btn active">All Tickets</button>
                        <button class="filter-btn">Open</button>
                        <button class="filter-btn">In Progress</button>
                        <button class="filter-btn">Pending</button>
                        <button class="filter-btn">Resolved</button>
                    </div>

                    <div class="tickets-table">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Subject</th>
                                    <th>Customer</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Assigned To</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="ticket-row urgent">
                                    <td>#TK-001</td>
                                    <td>Payment Gateway Integration Issue</td>
                                    <td>Kumar Textiles</td>
                                    <td><span class="priority-badge urgent">Urgent</span></td>
                                    <td><span class="status-badge open">Open</span></td>
                                    <td>Rahul Sharma</td>
                                    <td>2 hours ago</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">View</button>
                                        <button class="btn btn-sm btn-outline">Assign</button>
                                    </td>
                                </tr>

                                <tr class="ticket-row high">
                                    <td>#TK-002</td>
                                    <td>Software License Expiry</td>
                                    <td>Tech Solutions</td>
                                    <td><span class="priority-badge high">High</span></td>
                                    <td><span class="status-badge progress">In Progress</span></td>
                                    <td>Priya Patel</td>
                                    <td>5 hours ago</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">View</button>
                                        <button class="btn btn-sm btn-success">Resolve</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    renderMarketingCampaigns() {
        return `
            <div class="marketing-campaigns">
                <div class="module-header">
                    <h3>Marketing Campaign Tracking</h3>
                    <div class="campaign-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                            Create Campaign
                        </button>
                        <button class="btn btn-outline">
                            <i class="fas fa-chart-line"></i>
                            Campaign Analytics
                        </button>
                    </div>
                </div>

                <div class="campaigns-grid">
                    <div class="campaign-card active">
                        <div class="campaign-header">
                            <div class="campaign-status">
                                <span class="status-indicator active"></span>
                                <span class="status-text">Active</span>
                            </div>
                            <div class="campaign-type">
                                <span class="badge badge-info">Email</span>
                            </div>
                        </div>
                        <div class="campaign-content">
                            <h4>MSME Digital Transformation</h4>
                            <p>Promoting digital solutions for small businesses</p>
                            <div class="campaign-metrics">
                                <div class="metric">
                                    <span class="metric-value">2,450</span>
                                    <span class="metric-label">Sent</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">24.5%</span>
                                    <span class="metric-label">Open Rate</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">3.2%</span>
                                    <span class="metric-label">Click Rate</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">12</span>
                                    <span class="metric-label">Conversions</span>
                                </div>
                            </div>
                        </div>
                        <div class="campaign-actions">
                            <button class="btn btn-sm btn-outline">View Report</button>
                            <button class="btn btn-sm btn-primary">Edit</button>
                        </div>
                    </div>

                    <div class="campaign-card scheduled">
                        <div class="campaign-header">
                            <div class="campaign-status">
                                <span class="status-indicator scheduled"></span>
                                <span class="status-text">Scheduled</span>
                            </div>
                            <div class="campaign-type">
                                <span class="badge badge-warning">SMS</span>
                            </div>
                        </div>
                        <div class="campaign-content">
                            <h4>Year-End Special Offers</h4>
                            <p>Exclusive discounts for existing customers</p>
                            <div class="campaign-schedule">
                                <i class="fas fa-calendar"></i>
                                <span>Scheduled for Dec 25, 2024</span>
                            </div>
                        </div>
                        <div class="campaign-actions">
                            <button class="btn btn-sm btn-outline">Preview</button>
                            <button class="btn btn-sm btn-primary">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderTasksActivities() {
        return `
            <div class="tasks-activities">
                <div class="module-header">
                    <h3>Task & Activity Management</h3>
                    <div class="task-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                            Add Task
                        </button>
                        <button class="btn btn-outline">
                            <i class="fas fa-calendar"></i>
                            Calendar View
                        </button>
                    </div>
                </div>

                <div class="tasks-overview">
                    <div class="task-stats">
                        <div class="task-stat">
                            <div class="stat-number">23</div>
                            <div class="stat-label">Today's Tasks</div>
                        </div>
                        <div class="task-stat">
                            <div class="stat-number">8</div>
                            <div class="stat-label">Overdue</div>
                        </div>
                        <div class="task-stat">
                            <div class="stat-number">45</div>
                            <div class="stat-label">This Week</div>
                        </div>
                        <div class="task-stat">
                            <div class="stat-number">89%</div>
                            <div class="stat-label">Completion Rate</div>
                        </div>
                    </div>
                </div>

                <div class="tasks-board">
                    <div class="task-column">
                        <h4>To Do</h4>
                        <div class="task-list">
                            <div class="task-item high-priority">
                                <div class="task-header">
                                    <h5>Follow up with Kumar Textiles</h5>
                                    <span class="priority-badge high">High</span>
                                </div>
                                <p>Discuss ERP implementation timeline</p>
                                <div class="task-meta">
                                    <span class="due-date">Due: Today 3:00 PM</span>
                                    <span class="assignee">Assigned to: Rahul</span>
                                </div>
                            </div>

                            <div class="task-item normal-priority">
                                <div class="task-header">
                                    <h5>Prepare proposal for Tech Solutions</h5>
                                    <span class="priority-badge normal">Normal</span>
                                </div>
                                <p>Software licensing proposal</p>
                                <div class="task-meta">
                                    <span class="due-date">Due: Tomorrow</span>
                                    <span class="assignee">Assigned to: Priya</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="task-column">
                        <h4>In Progress</h4>
                        <div class="task-list">
                            <div class="task-item normal-priority">
                                <div class="task-header">
                                    <h5>Customer onboarding documentation</h5>
                                    <span class="priority-badge normal">Normal</span>
                                </div>
                                <p>Create onboarding guide for new customers</p>
                                <div class="task-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 60%"></div>
                                    </div>
                                    <span class="progress-text">60% Complete</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="task-column">
                        <h4>Completed</h4>
                        <div class="task-list">
                            <div class="task-item completed">
                                <div class="task-header">
                                    <h5>Monthly sales report</h5>
                                    <span class="completion-badge">✓ Completed</span>
                                </div>
                                <p>November 2024 sales analysis</p>
                                <div class="task-meta">
                                    <span class="completed-date">Completed: Dec 1, 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderAnalyticsReports() {
        return `
            <div class="analytics-reports">
                <div class="module-header">
                    <h3>Analytics & Reporting</h3>
                    <div class="analytics-actions">
                        <select class="form-select">
                            <option>Last 30 Days</option>
                            <option>Last Quarter</option>
                            <option>Last Year</option>
                        </select>
                        <button class="btn btn-outline">
                            <i class="fas fa-download"></i>
                            Export Report
                        </button>
                    </div>
                </div>

                <div class="analytics-dashboard">
                    <div class="analytics-grid">
                        <div class="analytics-card">
                            <h4>Sales Performance</h4>
                            <div class="chart-placeholder">
                                <i class="fas fa-chart-line"></i>
                                <p>Revenue trend over time</p>
                                <div class="chart-stats">
                                    <span class="trend-up">↗ 15% increase</span>
                                </div>
                            </div>
                        </div>

                        <div class="analytics-card">
                            <h4>Lead Conversion</h4>
                            <div class="chart-placeholder">
                                <i class="fas fa-chart-pie"></i>
                                <p>Conversion funnel analysis</p>
                                <div class="chart-stats">
                                    <span class="conversion-rate">23.5% conversion rate</span>
                                </div>
                            </div>
                        </div>

                        <div class="analytics-card">
                            <h4>Customer Satisfaction</h4>
                            <div class="chart-placeholder">
                                <i class="fas fa-chart-bar"></i>
                                <p>Support ticket resolution</p>
                                <div class="chart-stats">
                                    <span class="satisfaction-score">4.7/5 rating</span>
                                </div>
                            </div>
                        </div>

                        <div class="analytics-card">
                            <h4>Campaign Performance</h4>
                            <div class="chart-placeholder">
                                <i class="fas fa-chart-area"></i>
                                <p>Marketing ROI analysis</p>
                                <div class="chart-stats">
                                    <span class="roi">320% ROI</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="reports-section">
                        <h4>Quick Reports</h4>
                        <div class="reports-grid">
                            <div class="report-item">
                                <i class="fas fa-file-alt"></i>
                                <span>Sales Summary</span>
                                <button class="btn btn-sm btn-outline">Generate</button>
                            </div>
                            <div class="report-item">
                                <i class="fas fa-users"></i>
                                <span>Customer Report</span>
                                <button class="btn btn-sm btn-outline">Generate</button>
                            </div>
                            <div class="report-item">
                                <i class="fas fa-chart-line"></i>
                                <span>Pipeline Analysis</span>
                                <button class="btn btn-sm btn-outline">Generate</button>
                            </div>
                            <div class="report-item">
                                <i class="fas fa-bullhorn"></i>
                                <span>Campaign Report</span>
                                <button class="btn btn-sm btn-outline">Generate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderAutomation() {
        return `
            <div class="automation">
                <div class="module-header">
                    <h3>Workflow Automation</h3>
                    <div class="automation-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                            Create Workflow
                        </button>
                        <button class="btn btn-outline">
                            <i class="fas fa-cogs"></i>
                            Automation Settings
                        </button>
                    </div>
                </div>

                <div class="automation-overview">
                    <div class="automation-stats">
                        <div class="automation-stat">
                            <div class="stat-number">12</div>
                            <div class="stat-label">Active Workflows</div>
                        </div>
                        <div class="automation-stat">
                            <div class="stat-number">1,247</div>
                            <div class="stat-label">Tasks Automated</div>
                        </div>
                        <div class="automation-stat">
                            <div class="stat-number">85%</div>
                            <div class="stat-label">Success Rate</div>
                        </div>
                        <div class="automation-stat">
                            <div class="stat-number">24h</div>
                            <div class="stat-label">Time Saved</div>
                        </div>
                    </div>
                </div>

                <div class="workflows-list">
                    <div class="workflow-item active">
                        <div class="workflow-header">
                            <div class="workflow-info">
                                <h4>Lead Nurturing Sequence</h4>
                                <p>Automated email sequence for new leads</p>
                            </div>
                            <div class="workflow-status">
                                <span class="status-badge active">Active</span>
                                <div class="workflow-toggle">
                                    <input type="checkbox" checked>
                                </div>
                            </div>
                        </div>
                        <div class="workflow-stats">
                            <span>Triggered: 45 times this month</span>
                            <span>Success Rate: 92%</span>
                        </div>
                    </div>

                    <div class="workflow-item active">
                        <div class="workflow-header">
                            <div class="workflow-info">
                                <h4>Support Ticket Assignment</h4>
                                <p>Auto-assign tickets based on priority and expertise</p>
                            </div>
                            <div class="workflow-status">
                                <span class="status-badge active">Active</span>
                                <div class="workflow-toggle">
                                    <input type="checkbox" checked>
                                </div>
                            </div>
                        </div>
                        <div class="workflow-stats">
                            <span>Triggered: 123 times this month</span>
                            <span>Success Rate: 98%</span>
                        </div>
                    </div>

                    <div class="workflow-item inactive">
                        <div class="workflow-header">
                            <div class="workflow-info">
                                <h4>Customer Onboarding</h4>
                                <p>Welcome sequence for new customers</p>
                            </div>
                            <div class="workflow-status">
                                <span class="status-badge inactive">Inactive</span>
                                <div class="workflow-toggle">
                                    <input type="checkbox">
                                </div>
                            </div>
                        </div>
                        <div class="workflow-stats">
                            <span>Last triggered: 2 weeks ago</span>
                            <span>Success Rate: 87%</span>
                        </div>
                    </div>
                </div>

                <div class="integration-section">
                    <h4>Integrations</h4>
                    <div class="integrations-grid">
                        <div class="integration-item connected">
                            <i class="fas fa-envelope"></i>
                            <span>Email Marketing</span>
                            <span class="connection-status connected">Connected</span>
                        </div>
                        <div class="integration-item connected">
                            <i class="fas fa-calendar"></i>
                            <span>Calendar Sync</span>
                            <span class="connection-status connected">Connected</span>
                        </div>
                        <div class="integration-item disconnected">
                            <i class="fas fa-phone"></i>
                            <span>VoIP System</span>
                            <span class="connection-status disconnected">Not Connected</span>
                        </div>
                        <div class="integration-item connected">
                            <i class="fas fa-chart-bar"></i>
                            <span>Analytics Platform</span>
                            <span class="connection-status connected">Connected</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    schemes() {
        return `
            <div class="schemes-page">
                <div class="page-header mb-8">
                    <h1 class="page-title">Government Schemes</h1>
                    <p class="page-subtitle">Discover and apply for MSME schemes and subsidies</p>
                </div>

                <!-- Personalized Recommendations -->
                <div class="card mb-8" data-tip-id="schemes-eligibility-check">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-star"></i>
                            Recommended for You
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="schemes-grid">
                            <div class="scheme-card featured" data-tip-id="schemes-application-status">
                                <div class="scheme-badge">
                                    <span class="badge badge-success">Highly Eligible</span>
                                </div>
                                <h3>Technology Upgradation Fund Scheme</h3>
                                <p>Financial assistance for technology upgradation in textile industry</p>
                                <div class="scheme-details">
                                    <div class="scheme-amount">Up to ₹1 Crore</div>
                                    <div class="scheme-deadline">Deadline: 30 days</div>
                                </div>
                                <button class="btn btn-primary">Apply Now</button>
                            </div>

                            <div class="scheme-card">
                                <div class="scheme-badge">
                                    <span class="badge badge-info">New</span>
                                </div>
                                <h3>Export Promotion Scheme</h3>
                                <p>Support for market development and export promotion</p>
                                <div class="scheme-details">
                                    <div class="scheme-amount">Up to ₹50 Lakh</div>
                                    <div class="scheme-deadline">Deadline: 45 days</div>
                                </div>
                                <button class="btn btn-outline">Learn More</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- All Schemes -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-list"></i>
                            All Available Schemes
                        </h2>
                        <div class="scheme-filters">
                            <select class="form-select">
                                <option>All Categories</option>
                                <option>Technology</option>
                                <option>Export</option>
                                <option>Credit</option>
                            </select>
                            <select class="form-select">
                                <option>All States</option>
                                <option>Central</option>
                                <option>Maharashtra</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="schemes-list">
                            <div class="scheme-item">
                                <div class="scheme-info">
                                    <h4>Credit Guarantee Fund Scheme</h4>
                                    <p>Collateral-free loans for MSMEs</p>
                                    <div class="scheme-meta">
                                        <span class="scheme-type">Central Scheme</span>
                                        <span class="scheme-amount">Up to ₹2 Crore</span>
                                    </div>
                                </div>
                                <div class="scheme-actions">
                                    <span class="badge badge-warning">Eligible</span>
                                    <button class="btn btn-outline btn-sm">View Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `;
    },

    businessScore() {
        const portal = window.msmePortal;
        const userData = portal?.userData || { businessScore: 78 };

        return `
            <div class="business-score-page">
                <div class="page-header mb-8">
                    <h1 class="page-title">Business Score</h1>
                    <p class="page-subtitle">Track your business creditworthiness and growth</p>
                </div>

                <!-- Business Score Card -->
                <div class="card mb-8">
                    <div class="card-body">
                        <div class="score-display">
                            <div class="score-circle">
                                <div class="score-value">${userData.businessScore}</div>
                                <div class="score-label">Business Score</div>
                            </div>
                            <div class="score-info">
                                <h3>Good Credit Standing</h3>
                                <p>Your business shows strong financial health and compliance record.</p>
                                <div class="score-factors">
                                    <div class="factor">
                                        <i class="fas fa-check-circle text-success"></i>
                                        <span>Regular GST Filing</span>
                                    </div>
                                    <div class="factor">
                                        <i class="fas fa-check-circle text-success"></i>
                                        <span>Good Transaction History</span>
                                    </div>
                                    <div class="factor">
                                        <i class="fas fa-check-circle text-success"></i>
                                        <span>Positive Customer Reviews</span>
                                    </div>
                                </div>
                                <button class="btn btn-primary mt-4">
                                    <i class="fas fa-download"></i>
                                    Request Loan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Score Breakdown -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-pie"></i>
                            Score Breakdown
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="score-breakdown">
                            <div class="breakdown-item">
                                <div class="breakdown-label">Financial Health</div>
                                <div class="breakdown-bar">
                                    <div class="progress">
                                        <div class="progress-bar" style="width: 85%"></div>
                                    </div>
                                </div>
                                <div class="breakdown-score">85/100</div>
                            </div>
                            <div class="breakdown-item">
                                <div class="breakdown-label">Compliance Record</div>
                                <div class="breakdown-bar">
                                    <div class="progress">
                                        <div class="progress-bar" style="width: 92%"></div>
                                    </div>
                                </div>
                                <div class="breakdown-score">92/100</div>
                            </div>
                            <div class="breakdown-item">
                                <div class="breakdown-label">Digital Activity</div>
                                <div class="breakdown-bar">
                                    <div class="progress">
                                        <div class="progress-bar" style="width: 78%"></div>
                                    </div>
                                </div>
                                <div class="breakdown-score">78/100</div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `;
    },

    learning() {
        return `
            <div class="learning-page">
                <div class="page-header mb-8">
                    <h1 class="page-title">Learning Hub</h1>
                    <p class="page-subtitle">Enhance your business skills and knowledge</p>
                </div>

                <!-- Learning Categories -->
                <div class="learning-categories mb-8">
                    <div class="category-card">
                        <div class="category-icon">
                            <i class="fas fa-play-circle"></i>
                        </div>
                        <h3>Video Tutorials</h3>
                        <p>Step-by-step video guides</p>
                        <span class="category-count">24 videos</span>
                    </div>

                    <div class="category-card">
                        <div class="category-icon">
                            <i class="fas fa-book"></i>
                        </div>
                        <h3>Text Guides</h3>
                        <p>Comprehensive written tutorials</p>
                        <span class="category-count">18 guides</span>
                    </div>

                    <div class="category-card">
                        <div class="category-icon">
                            <i class="fas fa-question-circle"></i>
                        </div>
                        <h3>FAQ</h3>
                        <p>Frequently asked questions</p>
                        <span class="category-count">45 questions</span>
                    </div>
                </div>

                <!-- Featured Content -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-star"></i>
                            Featured Learning Content
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="learning-content">
                            <div class="content-item">
                                <div class="content-thumbnail">
                                    <i class="fas fa-play"></i>
                                </div>
                                <div class="content-info">
                                    <h4>Getting Started with MSME Portal</h4>
                                    <p>Complete onboarding guide for new users</p>
                                    <div class="content-meta">
                                        <span class="content-duration">15 min</span>
                                        <span class="content-type">Video</span>
                                    </div>
                                </div>
                                <button class="btn btn-primary btn-sm">Watch Now</button>
                            </div>

                            <div class="content-item">
                                <div class="content-thumbnail">
                                    <i class="fas fa-file-alt"></i>
                                </div>
                                <div class="content-info">
                                    <h4>GST Filing Made Easy</h4>
                                    <p>Step-by-step guide to GST compliance</p>
                                    <div class="content-meta">
                                        <span class="content-duration">10 min read</span>
                                        <span class="content-type">Guide</span>
                                    </div>
                                </div>
                                <button class="btn btn-outline btn-sm">Read Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <!-- Dashboard Footer Section -->
                <div class="dashboard-footer">
                    <div class="footer-content">
                        <!-- Business Performance Summary -->
                        <div class="footer-section">
                            <h3>📊 Today's Performance</h3>
                            <div class="performance-grid">
                                <div class="performance-item">
                                    <div class="perf-icon">
                                        <i class="fas fa-rupee-sign"></i>
                                    </div>
                                    <div class="perf-data">
                                        <span class="perf-value">₹45,000</span>
                                        <span class="perf-label">Revenue</span>
                                    </div>
                                </div>
                                <div class="performance-item">
                                    <div class="perf-icon">
                                        <i class="fas fa-shopping-cart"></i>
                                    </div>
                                    <div class="perf-data">
                                        <span class="perf-value">23</span>
                                        <span class="perf-label">Orders</span>
                                    </div>
                                </div>
                                <div class="performance-item">
                                    <div class="perf-icon">
                                        <i class="fas fa-users"></i>
                                    </div>
                                    <div class="perf-data">
                                        <span class="perf-value">8</span>
                                        <span class="perf-label">New Customers</span>
                                    </div>
                                </div>
                                <div class="performance-item">
                                    <div class="perf-icon">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div class="perf-data">
                                        <span class="perf-value">5</span>
                                        <span class="perf-label">Pending Tasks</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Links -->
                        <div class="footer-section">
                            <h3>🔗 Quick Links</h3>
                            <div class="quick-links-grid">
                                <a href="#" class="quick-link" onclick="window.msmePortal?.navigateToPage('erp')">
                                    <i class="fas fa-calculator"></i>
                                    <span>ERP System</span>
                                </a>
                                <a href="#" class="quick-link" onclick="window.msmePortal?.navigateToPage('marketplace')">
                                    <i class="fas fa-store"></i>
                                    <span>Marketplace</span>
                                </a>
                                <a href="#" class="quick-link" onclick="window.msmePortal?.navigateToPage('schemes')">
                                    <i class="fas fa-gift"></i>
                                    <span>Schemes</span>
                                </a>
                                <a href="#" class="quick-link" onclick="window.msmePortal?.navigateToPage('support')">
                                    <i class="fas fa-headset"></i>
                                    <span>Support</span>
                                </a>
                            </div>
                        </div>

                        <!-- Business Tips -->
                        <div class="footer-section">
                            <h3>💡 Business Tips</h3>
                            <div class="tips-container">
                                <div class="tip-item">
                                    <div class="tip-icon">
                                        <i class="fas fa-lightbulb"></i>
                                    </div>
                                    <div class="tip-content">
                                        <h4>Optimize Cash Flow</h4>
                                        <p>Send payment reminders 3 days before due date to improve collection rates.</p>
                                    </div>
                                </div>
                                <div class="tip-item">
                                    <div class="tip-icon">
                                        <i class="fas fa-chart-line"></i>
                                    </div>
                                    <div class="tip-content">
                                        <h4>Track Key Metrics</h4>
                                        <p>Monitor your profit margins weekly to identify trends and opportunities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Bottom -->
                    <div class="footer-bottom">
                        <div class="footer-info">
                            <div class="portal-branding">
                                <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&auto=format&q=80" alt="MSME Portal" class="portal-logo">
                                <div class="branding-text">
                                    <span class="portal-name">MSME Business Portal</span>
                                    <span class="portal-tagline">Empowering Small Businesses</span>
                                </div>
                            </div>
                            <div class="footer-stats">
                                <span class="stat-item">
                                    <i class="fas fa-users"></i>
                                    50,000+ MSMEs
                                </span>
                                <span class="stat-item">
                                    <i class="fas fa-handshake"></i>
                                    Government Verified
                                </span>
                                <span class="stat-item">
                                    <i class="fas fa-shield-alt"></i>
                                    100% Secure
                                </span>
                            </div>
                        </div>
                        <div class="footer-actions">
                            <button class="footer-btn" onclick="window.erpSystem?.exportFinancialReport()">
                                <i class="fas fa-download"></i>
                                Export Report
                            </button>
                            <button class="footer-btn primary" onclick="window.erpSystem?.showDailySummary()">
                                <i class="fas fa-chart-pie"></i>
                                Daily Summary
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

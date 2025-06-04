// Personal Finance Tracker - JavaScript Implementation
class FinanceTracker {
    constructor() {
        this.data = {
            transactions: JSON.parse(localStorage.getItem('transactions')) || [],
            accounts: JSON.parse(localStorage.getItem('accounts')) || [],
            reminders: JSON.parse(localStorage.getItem('reminders')) || [],
            plannedExpenses: JSON.parse(localStorage.getItem('plannedExpenses')) || [],
            incomeIdeas: JSON.parse(localStorage.getItem('incomeIdeas')) || [],
            transfers: JSON.parse(localStorage.getItem('transfers')) || [],
            budgetCategories: JSON.parse(localStorage.getItem('budgetCategories')) || [],
            frequentItems: JSON.parse(localStorage.getItem('frequentItems')) || {}
        };
        
        this.currentFilter = 'all';
        this.selectedBankAccountId = null;
        this.charts = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.updateDashboard();
        this.renderTransactions();
        this.renderAccounts();
        this.renderReminders();
        this.renderPlannedExpenses();
        this.renderIncomeIdeas();
        this.renderTransferHistoryList();
        this.setDefaultDates();
        this.loadDemoData();
        this.checkReminders();
        this.renderBudgetCategories();
        this.renderInsights();
        this.populateInsightsMonthFilter();
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = link.getAttribute('data-tab');
                this.switchTab(targetTab);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    switchTab(tabName) {
        const modules = document.querySelectorAll('.module');
        modules.forEach(module => {
            module.classList.remove('active');
        });
        
        const targetModule = document.getElementById(tabName);
        if (targetModule) {
            targetModule.classList.add('active');
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Income form
        document.getElementById('income-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addIncome();
        });

        // Expense form
        document.getElementById('expense-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });

        // Account form
        document.getElementById('account-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addAccount();
        });

        // Reminder form
        document.getElementById('reminder-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addReminder();
        });

        // Planned expense form
        document.getElementById('planned-expense-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addPlannedExpense();
        });

        // Income idea form
        document.getElementById('income-idea-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addIncomeIdea();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.setFilter(filter);
            });
        });

        // Modal triggers
        document.getElementById('add-account').addEventListener('click', () => {
            this.openModal('account-modal');
        });

        document.getElementById('add-reminder').addEventListener('click', () => {
            this.openModal('reminder-modal');
        });

        // CSV import
        document.getElementById('csv-import').addEventListener('change', (e) => {
            this.handleCSVImport(e);
        });

        // Modal overlay click to close
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') {
                this.closeModal();
            }
        });

        // Edit transaction form
        document.getElementById('edit-transaction-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateTransaction();
        });

        // Edit account form
        document.getElementById('edit-account-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateAccount();
        });

        // Delete buttons
        document.getElementById('delete-transaction').addEventListener('click', () => {
            this.deleteTransaction();
        });

        document.getElementById('delete-account').addEventListener('click', () => {
            this.deleteAccount();
        });

        // Data management buttons
        document.getElementById('export-data').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('clear-all-data').addEventListener('click', () => {
            this.confirmClearAllData();
        });

        // Confirm action button
        document.getElementById('confirm-action').addEventListener('click', () => {
            if (this.confirmCallback) {
                this.confirmCallback();
                this.closeModal();
                this.confirmCallback = null;
            }
        });

        // Transfer money functionality
        document.getElementById('transfer-money').addEventListener('click', () => {
            this.openTransferModal();
        });

        document.getElementById('transfer-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.transferMoney();
        });

        // Update transfer info when accounts change
        document.getElementById('transfer-from').addEventListener('change', () => {
            this.updateTransferInfo();
        });

        document.getElementById('transfer-to').addEventListener('change', () => {
            this.updateTransferInfo();
        });

        document.getElementById('transfer-amount').addEventListener('input', () => {
            this.updateTransferInfo();
        });

        // Payment method change listener for bank account selection
        document.getElementById('bank-accounts-list').addEventListener('click', (e) => {
            const bankOption = e.target.closest('.bank-account-option');
            if (bankOption && !bankOption.classList.contains('insufficient-funds')) {
                const accountId = parseInt(bankOption.dataset.accountId);
                if (accountId) {
                    console.log('Bank account clicked via delegation:', accountId);
                    this.selectBankAccount(accountId);
                }
            }
        });

        // Budget management
        document.getElementById('add-budget-category').addEventListener('click', () => {
            this.openModal('budget-category-modal');
        });

        document.getElementById('budget-category-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBudgetCategory();
        });

        // Insights month filter
        document.getElementById('insights-month').addEventListener('change', (e) => {
            this.updateInsights(e.target.value);
        });

        // Expense amount change listener to update bank account availability
        document.getElementById('expense-amount').addEventListener('input', () => {
            const paymentMethod = document.getElementById('payment-method').value;
            if (paymentMethod === 'online') {
                this.renderBankAccountSelection();
            }
        });

        // Payment method change listener for bank account selection
        document.getElementById('payment-method').addEventListener('change', (e) => {
            this.handlePaymentMethodChange(e.target.value);
        });
    }

    // Set default dates to today
    setDefaultDates() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('income-date').value = today;
        document.getElementById('expense-date').value = today;
    }

    // Income Management
    addIncome() {
        const source = document.getElementById('income-source').value;
        const amount = parseFloat(document.getElementById('income-amount').value);
        const date = document.getElementById('income-date').value;

        if (!source || !amount || !date) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        const income = {
            id: Date.now(),
            type: 'income',
            source,
            amount,
            date,
            timestamp: new Date().toISOString()
        };

        this.data.transactions.push(income);
        this.saveData();
        this.updateDashboard();
        this.renderTransactions();
        this.clearForm('income-form');
        this.showMessage('Income added successfully!', 'success');
    }

    // Expense Management
    addExpense() {
        const category = document.getElementById('expense-category').value;
        const item = document.getElementById('expense-item').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const date = document.getElementById('expense-date').value;
        const paymentMethod = document.getElementById('payment-method').value;

        if (!category || !item || !amount || !date || !paymentMethod) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        // Check if online payment and bank account is selected
        if (paymentMethod === 'online') {
            if (!this.selectedBankAccountId) {
                this.showMessage('Please select a bank account for online payment', 'error');
                return;
            }

            const selectedAccount = this.data.accounts.find(acc => acc.id === this.selectedBankAccountId);
            if (!selectedAccount) {
                this.showMessage('Selected bank account not found', 'error');
                return;
            }

            if (amount > selectedAccount.balance) {
                this.showMessage('Insufficient funds in selected bank account', 'error');
                return;
            }

            // Deduct amount from bank account
            selectedAccount.balance -= amount;
            selectedAccount.lastModified = new Date().toISOString();
        }

        const expense = {
            id: Date.now(),
            type: 'expense',
            category,
            item,
            amount,
            date,
            paymentMethod,
            bankAccountId: paymentMethod === 'online' ? this.selectedBankAccountId : null,
            bankAccountName: paymentMethod === 'online' ? this.data.accounts.find(acc => acc.id === this.selectedBankAccountId).name : null,
            timestamp: new Date().toISOString()
        };

        this.data.transactions.push(expense);
        this.saveData();
        this.updateDashboard();
        this.renderTransactions();
        this.renderAccounts(); // Update accounts display to show new balances
        this.clearForm('expense-form');
        
        // Reset bank selection
        this.selectedBankAccountId = null;
        document.getElementById('bank-selection-row').style.display = 'none';
        
        this.showMessage('Expense added successfully!', 'success');
    }

    // Dashboard Updates
    updateDashboard() {
        const totalIncome = this.calculateTotalIncome();
        const totalExpenses = this.calculateTotalExpenses();
        const currentBalance = totalIncome - totalExpenses;

        document.getElementById('total-income').textContent = this.formatCurrency(totalIncome);
        document.getElementById('total-spending').textContent = this.formatCurrency(totalExpenses);
        document.getElementById('current-balance').textContent = this.formatCurrency(currentBalance);

        // Update progress bar (assuming a monthly budget)
        const monthlyBudget = totalIncome > 0 ? totalIncome : 1000; // Default budget
        const spentPercentage = Math.min((totalExpenses / monthlyBudget) * 100, 100);
        
        document.getElementById('progress-fill').style.width = `${spentPercentage}%`;
        document.getElementById('progress-text').textContent = `${spentPercentage.toFixed(1)}% of budget used`;

        // Update net worth
        const netWorth = this.calculateNetWorth();
        document.getElementById('net-worth').textContent = this.formatCurrency(netWorth);
    }

    calculateTotalIncome() {
        return this.data.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
    }

    calculateTotalExpenses() {
        return this.data.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
    }

    calculateNetWorth() {
        const accountsTotal = this.data.accounts.reduce((sum, acc) => sum + acc.balance, 0);
        const transactionsBalance = this.calculateTotalIncome() - this.calculateTotalExpenses();
        return accountsTotal + transactionsBalance;
    }

    // Transactions Rendering
    renderTransactions() {
        const container = document.getElementById('transactions-list');
        let transactions = [...this.data.transactions];

        // Apply filter
        if (this.currentFilter !== 'all') {
            transactions = transactions.filter(t => t.type === this.currentFilter);
        }

        // Sort by date (newest first)
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (transactions.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No transactions found. Add your first transaction above!</p>';
            return;
        }

        container.innerHTML = transactions.map(transaction => this.createTransactionHTML(transaction)).join('');
    }

    createTransactionHTML(transaction) {
        const isIncome = transaction.type === 'income';
        const icon = isIncome ? '💰' : this.getCategoryIcon(transaction.category);
        const amountClass = isIncome ? 'income' : 'expense';
        const amountPrefix = isIncome ? '+' : '-';

        // Build payment method display
        let paymentMethodDisplay = transaction.paymentMethod || 'N/A';
        if (transaction.paymentMethod === 'online' && transaction.bankAccountName) {
            paymentMethodDisplay = `Online Payment (${transaction.bankAccountName})`;
        }

        return `
            <div class="transaction-item ${transaction.type} slide-in">
                <div class="transaction-info">
                    <div class="transaction-title">
                        ${icon} ${isIncome ? transaction.source : transaction.item}
                    </div>
                    <div class="transaction-details">
                        ${isIncome ? 'Income' : transaction.category} • ${this.formatDate(transaction.date)} • ${paymentMethodDisplay}
                    </div>
                </div>
                <div class="transaction-amount ${amountClass}">
                    ${amountPrefix}${this.formatCurrency(transaction.amount)}
                </div>
                <div class="transaction-actions">
                    <button class="edit-btn" onclick="financeTracker.editTransaction(${transaction.id})" title="Edit Transaction">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `;
    }

    getCategoryIcon(category) {
        const icons = {
            food: '🍕',
            transport: '🚗',
            education: '📚',
            entertainment: '🎬',
            shopping: '🛍️',
            utilities: '⚡',
            other: '💸'
        };
        return icons[category] || '💸';
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderTransactions();
    }

    // Account Management
    addAccount() {
        const name = document.getElementById('account-name').value;
        const type = document.getElementById('account-type').value;
        const balance = parseFloat(document.getElementById('account-balance').value);

        if (!name || !type || isNaN(balance)) {
            this.showMessage('Please fill in all fields correctly', 'error');
            return;
        }

        const account = {
            id: Date.now(),
            name,
            type,
            balance,
            createdAt: new Date().toISOString()
        };

        this.data.accounts.push(account);
        this.saveData();
        this.renderAccounts();
        this.updateDashboard();
        this.clearForm('account-form');
        this.closeModal();
        this.showMessage('Account added successfully!', 'success');
    }

    renderAccounts() {
        const container = document.getElementById('accounts-grid');
        
        if (this.data.accounts.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem; grid-column: 1/-1;">No accounts added yet. Click "Add Account" to get started!</p>';
            return;
        }

        container.innerHTML = this.data.accounts.map(account => this.createAccountHTML(account)).join('');
    }

    createAccountHTML(account) {
        const typeIcons = {
            checking: '🏦',
            savings: '💰',
            cash: '💵',
            crypto: '₿',
            investment: '📈'
        };

        return `
            <div class="account-card slide-in">
                <div class="account-header">
                    <div class="account-name">${typeIcons[account.type] || '🏦'} ${account.name}</div>
                    <span class="account-type">${account.type}</span>
                </div>
                <div class="account-balance">${this.formatCurrency(account.balance)}</div>
                <div class="account-actions">
                    <button class="edit-btn" onclick="financeTracker.editAccount(${account.id})" title="Edit Account">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Reminders Management
    addReminder() {
        const title = document.getElementById('reminder-title').value;
        const amount = parseFloat(document.getElementById('reminder-amount').value);
        const date = document.getElementById('reminder-date').value;
        const priority = document.getElementById('reminder-priority').value;

        if (!title || !amount || !date || !priority) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        const reminder = {
            id: Date.now(),
            title,
            amount,
            date,
            priority,
            createdAt: new Date().toISOString()
        };

        this.data.reminders.push(reminder);
        this.saveData();
        this.renderReminders();
        this.clearForm('reminder-form');
        this.closeModal();
        this.showMessage('Reminder added successfully!', 'success');
    }

    renderReminders() {
        const container = document.getElementById('reminders-list');
        
        if (this.data.reminders.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">No reminders set. Click "Add Reminder" to create one!</p>';
            return;
        }

        // Sort by date and priority
        const sortedReminders = [...this.data.reminders].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });

        container.innerHTML = sortedReminders.map(reminder => this.createReminderHTML(reminder)).join('');
    }

    createReminderHTML(reminder) {
        const priorityIcons = {
            low: '🔵',
            medium: '🟡',
            high: '🔴'
        };

        const daysUntil = this.getDaysUntilDate(reminder.date);
        const urgencyText = daysUntil <= 0 ? 'Due now!' : daysUntil <= 3 ? `Due in ${daysUntil} days` : this.formatDate(reminder.date);

        return `
            <div class="reminder-item ${reminder.priority} slide-in">
                <div class="reminder-header">
                    <div class="reminder-title">${priorityIcons[reminder.priority]} ${reminder.title}</div>
                    <div class="reminder-amount">${this.formatCurrency(reminder.amount)}</div>
                </div>
                <div class="reminder-date">${urgencyText}</div>
            </div>
        `;
    }

    // Planning Management
    addPlannedExpense() {
        const item = document.getElementById('planned-item').value;
        const cost = parseFloat(document.getElementById('planned-cost').value);
        const date = document.getElementById('planned-date').value;
        const category = document.getElementById('planned-category').value;

        if (!item || !cost || !date || !category) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        const plannedExpense = {
            id: Date.now(),
            item,
            cost,
            date,
            category,
            createdAt: new Date().toISOString()
        };

        this.data.plannedExpenses.push(plannedExpense);
        this.saveData();
        this.renderPlannedExpenses();
        this.clearForm('planned-expense-form');
        this.showMessage('Planned expense added successfully!', 'success');
    }

    renderPlannedExpenses() {
        const container = document.getElementById('planned-expenses-list');
        
        if (this.data.plannedExpenses.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">No planned expenses yet. Add one above!</p>';
            return;
        }

        // Sort by date
        const sortedExpenses = [...this.data.plannedExpenses].sort((a, b) => new Date(a.date) - new Date(b.date));

        container.innerHTML = sortedExpenses.map(expense => this.createPlannedExpenseHTML(expense)).join('');
    }

    createPlannedExpenseHTML(expense) {
        const categoryIcons = {
            travel: '✈️',
            gadgets: '📱',
            education: '🎓',
            clothing: '👕',
            other: '📦'
        };

        return `
            <div class="planned-item slide-in">
                <div class="item-header">
                    <div class="item-title">${categoryIcons[expense.category]} ${expense.item}</div>
                    <div class="item-amount">${this.formatCurrency(expense.cost)}</div>
                </div>
                <div class="item-details">
                    <span>${expense.category}</span>
                    <span>${this.formatDate(expense.date)}</span>
                </div>
            </div>
        `;
    }

    addIncomeIdea() {
        const idea = document.getElementById('income-idea').value;
        const amount = parseFloat(document.getElementById('expected-amount').value);
        const date = document.getElementById('expected-date').value;
        const confidence = document.getElementById('confidence-level').value;

        if (!idea || !amount || !date || !confidence) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        const incomeIdea = {
            id: Date.now(),
            idea,
            amount,
            date,
            confidence: parseInt(confidence),
            createdAt: new Date().toISOString()
        };

        this.data.incomeIdeas.push(incomeIdea);
        this.saveData();
        this.renderIncomeIdeas();
        this.clearForm('income-idea-form');
        this.showMessage('Income idea added successfully!', 'success');
    }

    renderIncomeIdeas() {
        const container = document.getElementById('income-ideas-list');
        
        if (this.data.incomeIdeas.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">No income ideas yet. Add one above!</p>';
            return;
        }

        // Sort by confidence and date
        const sortedIdeas = [...this.data.incomeIdeas].sort((a, b) => {
            return b.confidence - a.confidence || new Date(a.date) - new Date(b.date);
        });

        container.innerHTML = sortedIdeas.map(idea => this.createIncomeIdeaHTML(idea)).join('');
    }

    createIncomeIdeaHTML(idea) {
        return `
            <div class="income-idea-item slide-in">
                <div class="item-header">
                    <div class="item-title">💡 ${idea.idea}</div>
                    <div class="item-amount">${this.formatCurrency(idea.amount)}</div>
                </div>
                <div class="item-details">
                    <span>${this.formatDate(idea.date)}</span>
                    <span class="confidence-badge confidence-${idea.confidence}">${idea.confidence}% confident</span>
                </div>
            </div>
        `;
    }

    // Modal Management
    openModal(modalId) {
        const overlay = document.getElementById('modal-overlay');
        const modal = document.getElementById(modalId);
        
        // Hide all modals first
        document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
        
        // Show target modal
        modal.style.display = 'block';
        overlay.classList.add('active');
    }

    closeModal() {
        document.getElementById('modal-overlay').classList.remove('active');
    }

    // CSV Import
    handleCSVImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                const lines = csv.split('\n');
                const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
                
                let imported = 0;
                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',');
                    if (values.length < 3) continue;

                    // Simple CSV format: date, description, amount, type
                    const date = values[0]?.trim();
                    const description = values[1]?.trim();
                    const amount = parseFloat(values[2]?.trim());
                    const type = values[3]?.trim().toLowerCase();

                    if (date && description && amount && (type === 'income' || type === 'expense')) {
                        const transaction = {
                            id: Date.now() + i,
                            type,
                            [type === 'income' ? 'source' : 'item']: description,
                            amount: Math.abs(amount),
                            date,
                            category: type === 'expense' ? 'other' : undefined,
                            paymentMethod: type === 'expense' ? 'imported' : undefined,
                            timestamp: new Date().toISOString()
                        };

                        this.data.transactions.push(transaction);
                        imported++;
                    }
                }

                this.saveData();
                this.updateDashboard();
                this.renderTransactions();
                this.showMessage(`Successfully imported ${imported} transactions!`, 'success');
            } catch (error) {
                this.showMessage('Error importing CSV file', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Utility Functions
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    getDaysUntilDate(dateString) {
        const today = new Date();
        const targetDate = new Date(dateString);
        const diffTime = targetDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    clearForm(formId) {
        document.getElementById(formId).reset();
        this.setDefaultDates();
        
        // Reset expense button text if clearing expense form
        if (formId === 'expense-form') {
            const expenseButton = document.querySelector('#expense-form .btn-expense');
            expenseButton.innerHTML = '<i class="fas fa-plus"></i> Add Expense';
            expenseButton.style.background = '';
            expenseButton.style.transform = '';
            this.selectedBankAccountId = null;
        }
    }

    showMessage(text, type) {
        // Create message element
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;

        // Insert at top of main content
        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(message, mainContent.firstChild);

        // Remove after 3 seconds
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    saveData() {
        localStorage.setItem('transactions', JSON.stringify(this.data.transactions));
        localStorage.setItem('accounts', JSON.stringify(this.data.accounts));
        localStorage.setItem('reminders', JSON.stringify(this.data.reminders));
        localStorage.setItem('plannedExpenses', JSON.stringify(this.data.plannedExpenses));
        localStorage.setItem('incomeIdeas', JSON.stringify(this.data.incomeIdeas));
        localStorage.setItem('transfers', JSON.stringify(this.data.transfers));
        localStorage.setItem('budgetCategories', JSON.stringify(this.data.budgetCategories));
        localStorage.setItem('frequentItems', JSON.stringify(this.data.frequentItems));
    }

    // Load demo data for first-time users
    loadDemoData() {
        if (this.data.transactions.length === 0 && this.data.accounts.length === 0) {
            const demoTransactions = [
                {
                    id: 1,
                    type: 'income',
                    source: 'Part-time Job',
                    amount: 800,
                    date: '2024-01-01',
                    timestamp: new Date().toISOString()
                },
                {
                    id: 2,
                    type: 'expense',
                    category: 'food',
                    item: 'Groceries',
                    amount: 120,
                    date: '2024-01-02',
                    paymentMethod: 'card',
                    timestamp: new Date().toISOString()
                },
                {
                    id: 3,
                    type: 'expense',
                    category: 'education',
                    item: 'Textbooks',
                    amount: 200,
                    date: '2024-01-03',
                    paymentMethod: 'card',
                    timestamp: new Date().toISOString()
                }
            ];

            const demoAccounts = [
                {
                    id: 1,
                    name: 'Student Checking',
                    type: 'checking',
                    balance: 500,
                    createdAt: new Date().toISOString()
                }
            ];

            const demoReminders = [
                {
                    id: 1,
                    title: 'Rent Payment',
                    amount: 600,
                    date: '2024-02-01',
                    priority: 'high',
                    createdAt: new Date().toISOString()
                }
            ];

            this.data.transactions = demoTransactions;
            this.data.accounts = demoAccounts;
            this.data.reminders = demoReminders;
            
            this.saveData();
            this.updateDashboard();
            this.renderTransactions();
            this.renderAccounts();
            this.renderReminders();
        }
    }

    // Edit Transaction Functions
    editTransaction(id) {
        const transaction = this.data.transactions.find(t => t.id === id);
        if (!transaction) return;

        // Populate edit form
        document.getElementById('edit-transaction-id').value = transaction.id;
        document.getElementById('edit-transaction-title').value = 
            transaction.type === 'income' ? transaction.source : transaction.item;
        document.getElementById('edit-transaction-amount').value = transaction.amount;
        document.getElementById('edit-transaction-date').value = transaction.date;
        
        // Show/hide category based on transaction type
        const categorySelect = document.getElementById('edit-transaction-category');
        if (transaction.type === 'expense') {
            categorySelect.value = transaction.category;
            categorySelect.style.display = 'block';
        } else {
            categorySelect.style.display = 'none';
        }

        this.openModal('edit-transaction-modal');
    }

    updateTransaction() {
        const id = parseInt(document.getElementById('edit-transaction-id').value);
        const title = document.getElementById('edit-transaction-title').value;
        const amount = parseFloat(document.getElementById('edit-transaction-amount').value);
        const date = document.getElementById('edit-transaction-date').value;
        const category = document.getElementById('edit-transaction-category').value;

        if (!title || !amount || !date) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }

        const transactionIndex = this.data.transactions.findIndex(t => t.id === id);
        if (transactionIndex === -1) return;

        const transaction = this.data.transactions[transactionIndex];
        
        // Update transaction
        if (transaction.type === 'income') {
            transaction.source = title;
        } else {
            transaction.item = title;
            transaction.category = category || 'other';
        }
        
        transaction.amount = amount;
        transaction.date = date;
        transaction.lastModified = new Date().toISOString();

        this.saveData();
        this.updateDashboard();
        this.renderTransactions();
        this.closeModal();
        this.showMessage('Transaction updated successfully!', 'success');
    }

    deleteTransaction() {
        const id = parseInt(document.getElementById('edit-transaction-id').value);
        this.confirmAction(
            'Are you sure you want to delete this transaction? This action cannot be undone.',
            () => {
                this.data.transactions = this.data.transactions.filter(t => t.id !== id);
                this.saveData();
                this.updateDashboard();
                this.renderTransactions();
                this.showMessage('Transaction deleted successfully!', 'success');
            }
        );
    }

    // Edit Account Functions
    editAccount(id) {
        const account = this.data.accounts.find(a => a.id === id);
        if (!account) return;

        // Populate edit form
        document.getElementById('edit-account-id').value = account.id;
        document.getElementById('edit-account-name').value = account.name;
        document.getElementById('edit-account-type').value = account.type;
        document.getElementById('edit-account-balance').value = account.balance;

        this.openModal('edit-account-modal');
    }

    updateAccount() {
        const id = parseInt(document.getElementById('edit-account-id').value);
        const name = document.getElementById('edit-account-name').value;
        const type = document.getElementById('edit-account-type').value;
        const balance = parseFloat(document.getElementById('edit-account-balance').value);

        if (!name || !type || isNaN(balance)) {
            this.showMessage('Please fill in all fields correctly', 'error');
            return;
        }

        const accountIndex = this.data.accounts.findIndex(a => a.id === id);
        if (accountIndex === -1) return;

        // Update account
        this.data.accounts[accountIndex] = {
            ...this.data.accounts[accountIndex],
            name,
            type,
            balance,
            lastModified: new Date().toISOString()
        };

        this.saveData();
        this.renderAccounts();
        this.updateDashboard();
        this.closeModal();
        this.showMessage('Account updated successfully!', 'success');
    }

    deleteAccount() {
        const id = parseInt(document.getElementById('edit-account-id').value);
        const account = this.data.accounts.find(a => a.id === id);
        
        this.confirmAction(
            `Are you sure you want to delete the account "${account.name}"? This action cannot be undone.`,
            () => {
                this.data.accounts = this.data.accounts.filter(a => a.id !== id);
                this.saveData();
                this.renderAccounts();
                this.updateDashboard();
                this.showMessage('Account deleted successfully!', 'success');
            }
        );
    }

    // Data Management Functions
    exportData() {
        const dataToExport = {
            exported: new Date().toISOString(),
            version: '1.0',
            data: this.data
        };

        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `finance-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showMessage('Data exported successfully!', 'success');
    }

    confirmClearAllData() {
        this.confirmAction(
            'Are you sure you want to clear ALL data? This will delete all transactions, accounts, reminders, planned expenses, and income ideas. This action cannot be undone!',
            () => {
                this.clearAllData();
            }
        );
    }

    clearAllData() {
        // Clear all data
        this.data = {
            transactions: [],
            accounts: [],
            reminders: [],
            plannedExpenses: [],
            incomeIdeas: [],
            transfers: [],
            budgetCategories: [],
            frequentItems: {}
        };

        // Clear localStorage
        localStorage.removeItem('transactions');
        localStorage.removeItem('accounts');
        localStorage.removeItem('reminders');
        localStorage.removeItem('plannedExpenses');
        localStorage.removeItem('incomeIdeas');
        localStorage.removeItem('transfers');
        localStorage.removeItem('budgetCategories');
        localStorage.removeItem('frequentItems');

        // Re-render everything
        this.updateDashboard();
        this.renderTransactions();
        this.renderAccounts();
        this.renderReminders();
        this.renderPlannedExpenses();
        this.renderIncomeIdeas();

        this.showMessage('All data cleared successfully!', 'success');
    }

    // Confirmation Modal
    confirmAction(message, callback) {
        document.getElementById('confirm-message').textContent = message;
        this.confirmCallback = callback;
        this.openModal('confirm-modal');
    }

    // Enhanced Data Display
    getDataStorageInfo() {
        const storageUsed = JSON.stringify(this.data).length;
        const storageUsedKB = (storageUsed / 1024).toFixed(2);
        
        return {
            transactions: this.data.transactions.length,
            accounts: this.data.accounts.length,
            reminders: this.data.reminders.length,
            plannedExpenses: this.data.plannedExpenses.length,
            incomeIdeas: this.data.incomeIdeas.length,
            transfers: this.data.transfers.length,
            storageUsed: `${storageUsedKB} KB`,
            location: 'Browser localStorage'
        };
    }

    // Transfer Money Functions
    openTransferModal() {
        if (this.data.accounts.length < 2) {
            this.showMessage('You need at least 2 accounts to make transfers', 'error');
            return;
        }

        // Populate account dropdowns
        this.populateAccountDropdowns();
        
        // Clear form
        document.getElementById('transfer-form').reset();
        document.getElementById('transfer-info').style.display = 'none';
        
        this.openModal('transfer-modal');
    }

    populateAccountDropdowns() {
        const fromSelect = document.getElementById('transfer-from');
        const toSelect = document.getElementById('transfer-to');
        
        // Clear existing options (except first)
        fromSelect.innerHTML = '<option value="">Select source account</option>';
        toSelect.innerHTML = '<option value="">Select destination account</option>';
        
        // Add accounts to dropdowns
        this.data.accounts.forEach(account => {
            const option = `<option value="${account.id}">${account.name} (${this.formatCurrency(account.balance)})</option>`;
            fromSelect.innerHTML += option;
            toSelect.innerHTML += option;
        });
    }

    updateTransferInfo() {
        const fromId = parseInt(document.getElementById('transfer-from').value);
        const toId = parseInt(document.getElementById('transfer-to').value);
        const amount = parseFloat(document.getElementById('transfer-amount').value) || 0;
        
        const transferInfo = document.getElementById('transfer-info');
        
        if (!fromId || !toId) {
            transferInfo.style.display = 'none';
            return;
        }

        if (fromId === toId) {
            transferInfo.style.display = 'none';
            this.showMessage('Cannot transfer to the same account', 'error');
            return;
        }

        const fromAccount = this.data.accounts.find(a => a.id === fromId);
        const toAccount = this.data.accounts.find(a => a.id === toId);
        
        if (!fromAccount || !toAccount) {
            transferInfo.style.display = 'none';
            return;
        }

        // Update info display
        document.getElementById('from-account-info').textContent = `${fromAccount.name} (${fromAccount.type})`;
        document.getElementById('to-account-info').textContent = `${toAccount.name} (${toAccount.type})`;
        
        const availableBalance = document.getElementById('available-balance');
        availableBalance.textContent = this.formatCurrency(fromAccount.balance);
        
        // Check if sufficient funds
        if (amount > fromAccount.balance) {
            availableBalance.classList.add('insufficient-funds');
        } else {
            availableBalance.classList.remove('insufficient-funds');
        }
        
        transferInfo.style.display = 'block';
    }

    transferMoney() {
        const fromId = parseInt(document.getElementById('transfer-from').value);
        const toId = parseInt(document.getElementById('transfer-to').value);
        const amount = parseFloat(document.getElementById('transfer-amount').value);
        const description = document.getElementById('transfer-description').value || 'Transfer';

        // Validation
        if (!fromId || !toId || !amount) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }

        if (fromId === toId) {
            this.showMessage('Cannot transfer to the same account', 'error');
            return;
        }

        if (amount <= 0) {
            this.showMessage('Transfer amount must be greater than 0', 'error');
            return;
        }

        const fromAccount = this.data.accounts.find(a => a.id === fromId);
        const toAccount = this.data.accounts.find(a => a.id === toId);

        if (!fromAccount || !toAccount) {
            this.showMessage('Invalid account selection', 'error');
            return;
        }

        if (amount > fromAccount.balance) {
            this.showMessage('Insufficient funds in source account', 'error');
            return;
        }

        // Execute transfer
        this.confirmAction(
            `Transfer ${this.formatCurrency(amount)} from ${fromAccount.name} to ${toAccount.name}?`,
            () => {
                this.executeTransfer(fromAccount, toAccount, amount, description);
            }
        );
    }

    executeTransfer(fromAccount, toAccount, amount, description) {
        // Update account balances
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        fromAccount.lastModified = new Date().toISOString();
        toAccount.lastModified = new Date().toISOString();

        // Create transfer record
        const transfer = {
            id: Date.now(),
            fromAccountId: fromAccount.id,
            toAccountId: toAccount.id,
            fromAccountName: fromAccount.name,
            toAccountName: toAccount.name,
            amount: amount,
            description: description,
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString()
        };

        this.data.transfers.push(transfer);

        // Save data and update UI
        this.saveData();
        this.renderAccounts();
        this.updateDashboard();
        this.closeModal();
        
        this.showMessage(
            `Successfully transferred ${this.formatCurrency(amount)} from ${fromAccount.name} to ${toAccount.name}`,
            'success'
        );

        // Update transfer history display
        this.renderTransferHistoryList();
    }

    // Get transfer history for display
    getTransferHistory() {
        return this.data.transfers
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 10); // Show last 10 transfers
    }

    renderTransferHistoryList() {
        const container = document.getElementById('transfer-history-list');
        const transferHistoryHtml = this.renderTransferHistory();
        container.innerHTML = transferHistoryHtml;
    }

    renderTransferHistory() {
        const transfers = this.getTransferHistory();
        if (transfers.length === 0) {
            return '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">No transfers yet</p>';
        }

        return transfers.map(transfer => `
            <div class="transfer-item slide-in">
                <div class="transfer-header">
                    <div class="transfer-accounts">
                        🔄 ${transfer.fromAccountName} → ${transfer.toAccountName}
                    </div>
                    <div class="transfer-amount">${this.formatCurrency(transfer.amount)}</div>
                </div>
                <div class="transfer-details">
                    <span>${transfer.description}</span>
                    <span>${this.formatDate(transfer.date)}</span>
                </div>
            </div>
        `).join('');
    }

    // Payment method change handler
    handlePaymentMethodChange(value) {
        console.log('Payment method changed to:', value);
        const bankSelectionRow = document.getElementById('bank-selection-row');
        const bankAccountsDisplay = document.getElementById('bank-accounts-display');
        const expenseBankAccount = document.getElementById('expense-bank-account');
        const expenseButton = document.querySelector('#expense-form .btn-expense');
        
        if (value === 'online') {
            console.log('Showing bank selection interface');
            // Show bank selection interface
            bankSelectionRow.style.display = 'block';
            bankAccountsDisplay.style.display = 'block';
            expenseBankAccount.style.display = 'none';
            expenseBankAccount.required = false;
            
            // Fetch and display bank accounts
            this.renderBankAccountSelection();
        } else {
            console.log('Hiding bank selection interface');
            // Hide bank selection interface
            bankSelectionRow.style.display = 'none';
            bankAccountsDisplay.style.display = 'none';
            expenseBankAccount.style.display = 'none';
            expenseBankAccount.required = false;
            this.selectedBankAccountId = null;
            
            // Reset button text and styling
            expenseButton.innerHTML = '<i class="fas fa-plus"></i> Add Expense';
            expenseButton.style.background = '';
            expenseButton.style.transform = '';
        }
    }

    // Render bank accounts for selection
    renderBankAccountSelection() {
        const bankAccountsList = document.getElementById('bank-accounts-list');
        
        if (this.data.accounts.length === 0) {
            bankAccountsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">No bank accounts found. Please add a bank account first.</p>';
            return;
        }

        const bankAccounts = this.data.accounts.filter(account => 
            account.type === 'checking' || account.type === 'savings'
        );

        if (bankAccounts.length === 0) {
            bankAccountsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">No checking or savings accounts found. Please add a bank account first.</p>';
            return;
        }

        bankAccountsList.innerHTML = bankAccounts.map(account => {
            const expenseAmount = parseFloat(document.getElementById('expense-amount').value) || 0;
            const isInsufficientFunds = expenseAmount > account.balance;
            
            return `
                <div class="bank-account-option ${isInsufficientFunds ? 'insufficient-funds' : ''}" 
                     data-account-id="${account.id}"
                     id="bank-account-${account.id}">
                    <div class="bank-account-name">${account.name}</div>
                    <div class="bank-account-type">${account.type}</div>
                    <div class="bank-account-balance">${this.formatCurrency(account.balance)}</div>
                    ${isInsufficientFunds ? '<small style="color: var(--danger-color);">Insufficient funds</small>' : ''}
                </div>
            `;
        }).join('');

        // Add click event listeners after rendering
        bankAccounts.forEach(account => {
            const element = document.getElementById(`bank-account-${account.id}`);
            if (element && !element.classList.contains('insufficient-funds')) {
                element.addEventListener('click', () => {
                    this.selectBankAccount(account.id);
                });
                element.style.cursor = 'pointer';
            }
        });
    }

    // Select bank account
    selectBankAccount(accountId) {
        console.log('selectBankAccount called with ID:', accountId);
        
        const account = this.data.accounts.find(acc => acc.id === accountId);
        if (!account) {
            console.error('Account not found for ID:', accountId);
            return;
        }
        
        const expenseAmount = parseFloat(document.getElementById('expense-amount').value) || 0;
        console.log('Expense amount:', expenseAmount, 'Account balance:', account.balance);
        
        if (expenseAmount > account.balance) {
            this.showMessage('Insufficient funds in selected account', 'error');
            return;
        }

        // Remove previous selection with animation
        document.querySelectorAll('.bank-account-option').forEach(option => {
            option.classList.remove('selected');
            option.style.animation = '';
        });

        // Add selection to clicked account with emphasis
        const selectedOption = document.getElementById(`bank-account-${accountId}`);
        if (!selectedOption) {
            console.error('Selected option element not found for ID:', accountId);
            return;
        }
        
        selectedOption.classList.add('selected');
        
        // Add a pulse animation to make selection obvious
        selectedOption.style.animation = 'selectionPulse 0.6s ease-out';
        
        this.selectedBankAccountId = accountId;
        console.log('Selected bank account ID set to:', this.selectedBankAccountId);
        
        // Show confirmation message with account details
        this.showMessage(`✓ Selected ${account.name} (${this.formatCurrency(account.balance)} available)`, 'success');
        
        // Update the expense form button to show selected account
        const expenseButton = document.querySelector('#expense-form .btn-expense');
        if (expenseButton) {
            expenseButton.innerHTML = `<i class="fas fa-check"></i> Add Expense from ${account.name}`;
            expenseButton.style.background = 'var(--success-color)';
            expenseButton.style.transform = 'scale(1.02)';
            
            // Reset button animation after a moment
            setTimeout(() => {
                expenseButton.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // Budget management
    renderBudgetCategories() {
        const container = document.getElementById('budget-categories-grid');
        
        if (this.data.budgetCategories.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem; grid-column: 1/-1;">No budget categories set. Click "Add Category" to create your first budget!</p>';
            this.updateBudgetSummary();
            return;
        }

        container.innerHTML = this.data.budgetCategories.map(category => this.createBudgetCategoryHTML(category)).join('');
        this.updateBudgetSummary();
    }

    createBudgetCategoryHTML(category) {
        const typeIcons = {
            rent: '🏠',
            groceries: '🛒',
            utilities: '⚡',
            transport: '🚗',
            subscriptions: '📱',
            'eating-out': '🍕',
            miscellaneous: '📦',
            custom: '✏️'
        };

        // Calculate spent amount for this category
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
        const categorySpent = this.calculateCategorySpent(category.type, currentMonth);
        const percentage = category.amount > 0 ? Math.min((categorySpent / category.amount) * 100, 100) : 0;
        const remaining = category.amount - categorySpent;
        const isOverBudget = categorySpent > category.amount;

        return `
            <div class="budget-category-card slide-in">
                <div class="budget-category-header">
                    <div class="budget-category-name">
                        ${typeIcons[category.type] || '📦'} ${category.name}
                    </div>
                    <div class="budget-category-amount">${this.formatCurrency(category.amount)}</div>
                </div>
                <div class="budget-progress">
                    <div class="budget-progress-bar">
                        <div class="budget-progress-fill ${isOverBudget ? 'over-budget' : ''}" 
                             style="width: ${percentage}%"></div>
                    </div>
                    <div class="budget-stats">
                        <span>Spent: ${this.formatCurrency(categorySpent)}</span>
                        <span class="${remaining < 0 ? 'over-budget' : ''}">
                            ${remaining < 0 ? 'Over by: ' + this.formatCurrency(Math.abs(remaining)) : 'Remaining: ' + this.formatCurrency(remaining)}
                        </span>
                    </div>
                </div>
                <div class="budget-actions">
                    <button class="btn btn-secondary btn-sm" onclick="financeTracker.editBudgetCategory(${category.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="financeTracker.deleteBudgetCategory(${category.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }

    calculateCategorySpent(categoryType, month) {
        const categoryMapping = {
            'rent': ['utilities'],
            'groceries': ['food'],
            'utilities': ['utilities'],
            'transport': ['transport'],
            'subscriptions': ['utilities'],
            'eating-out': ['food'],
            'miscellaneous': ['other'],
            'custom': ['other']
        };

        const expenseCategories = categoryMapping[categoryType] || [categoryType];
        
        return this.data.transactions
            .filter(t => 
                t.type === 'expense' && 
                t.date.startsWith(month) &&
                expenseCategories.includes(t.category)
            )
            .reduce((sum, t) => sum + t.amount, 0);
    }

    updateBudgetSummary() {
        const totalBudget = this.data.budgetCategories.reduce((sum, cat) => sum + cat.amount, 0);
        const currentMonth = new Date().toISOString().slice(0, 7);
        const totalSpent = this.data.budgetCategories.reduce((sum, cat) => 
            sum + this.calculateCategorySpent(cat.type, currentMonth), 0);
        const remaining = totalBudget - totalSpent;
        const percentage = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

        document.getElementById('total-budget').textContent = this.formatCurrency(totalBudget);
        document.getElementById('total-spent-budget').textContent = this.formatCurrency(totalSpent);
        document.getElementById('budget-remaining').textContent = this.formatCurrency(remaining);
        
        const progressFill = document.getElementById('overall-budget-progress');
        const progressText = document.getElementById('overall-budget-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${percentage.toFixed(1)}% of budget used`;
            
            if (percentage > 100) {
                progressFill.classList.add('over-budget');
            } else {
                progressFill.classList.remove('over-budget');
            }
        }
    }

    addBudgetCategory() {
        const name = document.getElementById('budget-category-name').value;
        const type = document.getElementById('budget-category-type').value;
        const amount = parseFloat(document.getElementById('budget-category-amount').value);

        if (!name || !type || isNaN(amount)) {
            this.showMessage('Please fill in all fields correctly', 'error');
            return;
        }

        const category = {
            id: Date.now(),
            name,
            type,
            amount,
            createdAt: new Date().toISOString()
        };

        this.data.budgetCategories.push(category);
        this.saveData();
        this.renderBudgetCategories();
        this.clearForm('budget-category-form');
        this.closeModal();
        this.showMessage('Budget category added successfully!', 'success');
    }

    editBudgetCategory(id) {
        const category = this.data.budgetCategories.find(c => c.id === id);
        if (!category) return;

        // Pre-fill form
        document.getElementById('budget-category-name').value = category.name;
        document.getElementById('budget-category-type').value = category.type;
        document.getElementById('budget-category-amount').value = category.amount;

        // Store ID for updating
        this.editingBudgetId = id;
        this.openModal('budget-category-modal');
        
        // Change form submit to update
        const form = document.getElementById('budget-category-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            this.updateBudgetCategory();
        };
    }

    updateBudgetCategory() {
        const name = document.getElementById('budget-category-name').value;
        const type = document.getElementById('budget-category-type').value;
        const amount = parseFloat(document.getElementById('budget-category-amount').value);

        if (!name || !type || isNaN(amount)) {
            this.showMessage('Please fill in all fields correctly', 'error');
            return;
        }

        const categoryIndex = this.data.budgetCategories.findIndex(c => c.id === this.editingBudgetId);
        if (categoryIndex === -1) return;

        this.data.budgetCategories[categoryIndex] = {
            ...this.data.budgetCategories[categoryIndex],
            name,
            type,
            amount,
            lastModified: new Date().toISOString()
        };

        this.saveData();
        this.renderBudgetCategories();
        this.closeModal();
        this.showMessage('Budget category updated successfully!', 'success');
        
        // Reset form handler
        const form = document.getElementById('budget-category-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            this.addBudgetCategory();
        };
        this.editingBudgetId = null;
    }

    deleteBudgetCategory(id) {
        const category = this.data.budgetCategories.find(c => c.id === id);
        if (!category) return;

        this.confirmAction(
            `Are you sure you want to delete the budget category "${category.name}"? This action cannot be undone.`,
            () => {
                this.data.budgetCategories = this.data.budgetCategories.filter(c => c.id !== id);
                this.saveData();
                this.renderBudgetCategories();
                this.showMessage('Budget category deleted successfully!', 'success');
            }
        );
    }

    // Insights month filter
    updateInsights(selectedMonth) {
        this.updateInsightsMetrics(selectedMonth);
        this.createSpendingChart();
        this.createTrendChart();
    }

    renderInsights() {
        this.updateInsightsMetrics();
        this.createSpendingChart();
        this.createTrendChart();
        this.renderUpcomingItems();
        this.renderSmartSuggestions();
    }

    populateInsightsMonthFilter() {
        const select = document.getElementById('insights-month');
        const months = this.getAvailableMonths();
        
        select.innerHTML = '<option value="current">Current Month</option>';
        months.forEach(month => {
            if (month !== new Date().toISOString().slice(0, 7)) {
                const date = new Date(month + '-01');
                const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                select.innerHTML += `<option value="${month}">${monthName}</option>`;
            }
        });
    }

    getAvailableMonths() {
        const months = new Set();
        this.data.transactions.forEach(t => {
            months.add(t.date.slice(0, 7));
        });
        return Array.from(months).sort().reverse();
    }

    updateInsightsMetrics(selectedMonth = 'current') {
        const month = selectedMonth === 'current' ? new Date().toISOString().slice(0, 7) : selectedMonth;
        
        const monthlyTransactions = this.data.transactions.filter(t => t.date.startsWith(month));
        const income = monthlyTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expenses = monthlyTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        const savings = income - expenses;
        
        const totalBudget = this.data.budgetCategories.reduce((sum, cat) => sum + cat.amount, 0);
        const budgetUtilization = totalBudget > 0 ? (expenses / totalBudget) * 100 : 0;

        document.getElementById('insights-income').textContent = this.formatCurrency(income);
        document.getElementById('insights-expenses').textContent = this.formatCurrency(expenses);
        document.getElementById('insights-savings').textContent = this.formatCurrency(savings);
        document.getElementById('insights-budget-util').textContent = `${budgetUtilization.toFixed(1)}%`;
        
        // Update metric card colors based on values
        const savingsCard = document.querySelector('.savings-metric .metric-value');
        if (savingsCard) {
            savingsCard.style.color = savings >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
        }
        
        const budgetCard = document.querySelector('.budget-metric .metric-value');
        if (budgetCard) {
            budgetCard.style.color = budgetUtilization <= 100 ? 'var(--success-color)' : 'var(--danger-color)';
        }
    }

    createSpendingChart() {
        const ctx = document.getElementById('spending-chart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.charts.spending) {
            this.charts.spending.destroy();
        }

        const currentMonth = new Date().toISOString().slice(0, 7);
        const monthlyExpenses = this.data.transactions.filter(t => 
            t.type === 'expense' && t.date.startsWith(currentMonth)
        );

        const categorySpending = {};
        monthlyExpenses.forEach(t => {
            categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
        });

        const categoryIcons = {
            food: '🍕 Food',
            transport: '🚗 Transport',
            education: '📚 Education',
            entertainment: '🎬 Entertainment',
            shopping: '🛍️ Shopping',
            utilities: '⚡ Utilities',
            other: '💸 Other'
        };

        const labels = Object.keys(categorySpending).map(cat => categoryIcons[cat] || cat);
        const data = Object.values(categorySpending);
        const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
            '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
        ];

        this.charts.spending = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, data.length),
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = this.formatCurrency(context.raw);
                                const percentage = ((context.raw / data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                                return `${context.label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    createTrendChart() {
        const ctx = document.getElementById('trend-chart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.charts.trend) {
            this.charts.trend.destroy();
        }

        const months = this.getAvailableMonths().slice(0, 6).reverse(); // Last 6 months
        const incomeData = [];
        const expenseData = [];

        months.forEach(month => {
            const monthlyTransactions = this.data.transactions.filter(t => t.date.startsWith(month));
            const income = monthlyTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
            const expenses = monthlyTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
            
            incomeData.push(income);
            expenseData.push(expenses);
        });

        const labels = months.map(month => {
            const date = new Date(month + '-01');
            return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        });

        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Income',
                        data: incomeData,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'Expenses',
                        data: expenseData,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${this.formatCurrency(context.raw)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => this.formatCurrency(value)
                        }
                    }
                }
            }
        });
    }

    renderUpcomingItems() {
        const container = document.getElementById('upcoming-items');
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const upcomingReminders = this.data.reminders.filter(r => {
            const reminderDate = new Date(r.date);
            return reminderDate >= now && reminderDate <= nextWeek;
        });

        const upcomingPlanned = this.data.plannedExpenses.filter(p => {
            const plannedDate = new Date(p.date);
            return plannedDate >= now && plannedDate <= nextWeek;
        });

        const allUpcoming = [
            ...upcomingReminders.map(r => ({ ...r, type: 'reminder' })),
            ...upcomingPlanned.map(p => ({ ...p, type: 'planned', amount: p.cost }))
        ].sort((a, b) => new Date(a.date) - new Date(b.date));

        if (allUpcoming.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">No upcoming items in the next 7 days.</p>';
            return;
        }

        container.innerHTML = allUpcoming.map(item => {
            const daysUntil = Math.ceil((new Date(item.date) - now) / (1000 * 60 * 60 * 24));
            const urgencyClass = daysUntil <= 1 ? 'urgent' : daysUntil <= 3 ? 'warning' : '';
            const icon = item.type === 'reminder' ? '⏰' : '📅';
            const title = item.type === 'reminder' ? item.title : item.item;

            return `
                <div class="upcoming-item ${urgencyClass}">
                    <div class="item-header">
                        <div class="item-title">${icon} ${title}</div>
                        <div class="item-amount">${this.formatCurrency(item.amount)}</div>
                    </div>
                    <div class="item-details">
                        ${daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`} • ${this.formatDate(item.date)}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderSmartSuggestions() {
        const container = document.getElementById('smart-suggestions');
        const suggestions = this.generateSmartSuggestions();

        if (suggestions.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">No suggestions available yet. Add more transactions to get personalized insights!</p>';
            return;
        }

        container.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item">
                <div class="item-header">
                    <div class="item-title">${suggestion.icon} ${suggestion.title}</div>
                </div>
                <div class="item-details">${suggestion.description}</div>
            </div>
        `).join('');
    }

    generateSmartSuggestions() {
        const suggestions = [];
        const currentMonth = new Date().toISOString().slice(0, 7);
        const monthlyExpenses = this.data.transactions.filter(t => 
            t.type === 'expense' && t.date.startsWith(currentMonth)
        );

        // Frequent categories
        const categoryFrequency = {};
        this.data.transactions.filter(t => t.type === 'expense').forEach(t => {
            categoryFrequency[t.category] = (categoryFrequency[t.category] || 0) + 1;
        });

        const topCategories = Object.entries(categoryFrequency)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([category]) => category);

        if (topCategories.length > 0) {
            suggestions.push({
                icon: '📊',
                title: 'Top Spending Categories',
                description: `You spend most on: ${topCategories.join(', ')}. Consider setting budgets for these categories.`
            });
        }

        // Budget warnings
        this.data.budgetCategories.forEach(category => {
            const spent = this.calculateCategorySpent(category.type, currentMonth);
            const percentage = (spent / category.amount) * 100;
            
            if (percentage > 80) {
                suggestions.push({
                    icon: '⚠️',
                    title: `${category.name} Budget Alert`,
                    description: `You've used ${percentage.toFixed(0)}% of your ${category.name} budget. Consider reducing spending in this category.`
                });
            }
        });

        // Savings opportunity
        const totalIncome = this.data.transactions.filter(t => t.type === 'income' && t.date.startsWith(currentMonth))
            .reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = monthlyExpenses.reduce((sum, t) => sum + t.amount, 0);
        const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

        if (savingsRate < 20 && totalIncome > 0) {
            suggestions.push({
                icon: '💰',
                title: 'Improve Savings Rate',
                description: `Your current savings rate is ${savingsRate.toFixed(1)}%. Try to save at least 20% of your income for better financial health.`
            });
        }

        return suggestions;
    }
}

// Global modal close function
function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.financeTracker = new FinanceTracker();
});

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close modals
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Quick navigation with number keys
    if (e.altKey) {
        switch(e.key) {
            case '1':
                document.querySelector('[data-tab="monthly"]').click();
                break;
            case '2':
                document.querySelector('[data-tab="accounts"]').click();
                break;
            case '3':
                document.querySelector('[data-tab="planning"]').click();
                break;
        }
    }
}); 
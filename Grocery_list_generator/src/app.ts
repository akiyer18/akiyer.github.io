import { dishDatabase } from './data/dishDatabase';
import { StorageManager } from './utils/storage';
import { DishCard, SelectedDishCard } from './components/DishCard';
import { GroceryItem, ReminderTile } from './components/GroceryItem';
import { 
    Dish, 
    GroceryItem as GroceryItemType, 
    SelectedDish, 
    Frequency
} from './types';

export class GroceryApp {
    private selectedDishes: SelectedDish[] = [];
    private groceryItems: GroceryItemType[] = [];
    private customDishes: Dish[] = [];
    private currentPage: string = 'dishes';
    private currentFilter: string = 'all';

    constructor() {
        this.loadData();
        this.setupEventListeners();
        this.setupNavigation();
        this.updateAllViews();
    }

    private loadData(): void {
        this.groceryItems = StorageManager.getGroceryItems();
        this.customDishes = StorageManager.getCustomDishes();
    }

    private setupNavigation(): void {
        const navTabs = document.querySelectorAll('.nav-tab');
        const pages = document.querySelectorAll('.page');

        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const page = target.dataset.page;
                if (!page) return;

                // Update active states
                navTabs.forEach(t => t.classList.remove('active'));
                pages.forEach(p => p.classList.remove('active'));
                
                target.classList.add('active');
                document.getElementById(`${page}-page`)?.classList.add('active');
                
                this.currentPage = page;
                this.updateCurrentPageView();
            });
        });
    }

    private setupEventListeners(): void {
        this.setupDishesPageListeners();
        this.setupManualPageListeners();
        this.setupRemindersPageListeners();
    }

    private setupDishesPageListeners(): void {
        // Search functionality
        const searchInput = document.getElementById('dish-search') as HTMLInputElement;
        const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;
        
        const performSearch = () => {
            const query = searchInput.value.trim();
            this.searchAndDisplayDishes(query);
        };

        searchInput.addEventListener('input', performSearch);
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        // Add to grocery list button
        const addToGroceryBtn = document.getElementById('add-to-grocery') as HTMLButtonElement;
        addToGroceryBtn.addEventListener('click', () => {
            this.addSelectedDishesToGroceryList();
        });

        // Add new dish modal
        this.setupAddDishModal();
    }

    private setupManualPageListeners(): void {
        // Manual add form
        const form = document.getElementById('manual-add-form') as HTMLFormElement;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addManualGroceryItem();
        });

        // Frequency filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const frequency = target.dataset.frequency;
                if (!frequency) return;

                filterBtns.forEach(b => b.classList.remove('active'));
                target.classList.add('active');
                
                this.currentFilter = frequency;
                this.updateGroceryListView();
            });
        });
    }

    private setupRemindersPageListeners(): void {
        // Sort reminders
        const sortSelect = document.getElementById('sort-reminders') as HTMLSelectElement;
        sortSelect.addEventListener('change', () => {
            this.updateRemindersView();
        });

        // Show frequent items toggle
        const showFrequentToggle = document.getElementById('show-frequent') as HTMLInputElement;
        showFrequentToggle.addEventListener('change', () => {
            this.updateFrequentItemsView();
        });
    }

    private setupAddDishModal(): void {
        const modal = document.getElementById('add-dish-modal') as HTMLElement;
        const closeBtn = modal.querySelector('.close') as HTMLElement;
        const cancelBtn = document.getElementById('cancel-dish') as HTMLButtonElement;
        const form = document.getElementById('add-dish-form') as HTMLFormElement;
        const addIngredientBtn = document.getElementById('add-ingredient') as HTMLButtonElement;

        // Show modal when no results found
        const showModal = () => {
            modal.style.display = 'block';
        };

        // Hide modal
        const hideModal = () => {
            modal.style.display = 'none';
            form.reset();
            this.resetIngredientInputs();
        };

        closeBtn.addEventListener('click', hideModal);
        cancelBtn.addEventListener('click', hideModal);
        
        // Click outside modal to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });

        // Add ingredient functionality
        addIngredientBtn.addEventListener('click', () => {
            this.addIngredientInput();
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveNewDish();
            hideModal();
        });

        // Show modal button in search results
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('btn-add-new-dish')) {
                showModal();
            }
        });
    }

    private searchAndDisplayDishes(query: string): void {
        const searchResults = document.getElementById('search-results') as HTMLElement;
        
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }

        // Search in both database and custom dishes
        const allDishes = [...dishDatabase, ...this.customDishes];
        const results = allDishes.filter(dish => 
            dish.name.toLowerCase().includes(query.toLowerCase()) ||
            dish.cuisine.toLowerCase().includes(query.toLowerCase()) ||
            dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase()))
        );

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <p>No dishes found for "${query}"</p>
                    <button class="btn-add-new-dish btn-primary">+ Add New Dish</button>
                </div>
            `;
        } else {
            searchResults.innerHTML = '';
            results.forEach(dish => {
                const dishCard = new DishCard(dish, (selectedDish) => {
                    this.selectDish(selectedDish);
                });
                searchResults.appendChild(dishCard.render());
            });
        }
    }

    private selectDish(dish: Dish): void {
        const existing = this.selectedDishes.find(sd => sd.dish.id === dish.id);
        if (existing) return; // Already selected

        this.selectedDishes.push({
            dish,
            ingredients: [...dish.ingredients],
            isEdited: false
        });

        this.updateSelectedDishesView();
        this.updateGroceryPreview();
    }

    private updateSelectedDishesView(): void {
        const container = document.getElementById('selected-dishes') as HTMLElement;
        container.innerHTML = '';

        if (this.selectedDishes.length === 0) {
            container.innerHTML = '<p class="no-selected">No dishes selected. Search and select dishes to build your grocery list.</p>';
            return;
        }

        container.innerHTML = '<h3>Selected Dishes</h3>';
        this.selectedDishes.forEach(selectedDish => {
            const dishCard = new SelectedDishCard(
                selectedDish,
                (dishId) => this.editDishIngredients(dishId),
                (dishId) => this.removeDish(dishId)
            );
            container.appendChild(dishCard.render());
        });
    }

    private updateGroceryPreview(): void {
        const previewItems = document.getElementById('preview-items') as HTMLElement;
        const addBtn = document.getElementById('add-to-grocery') as HTMLButtonElement;

        if (this.selectedDishes.length === 0) {
            previewItems.innerHTML = '<p>Select dishes to preview ingredients</p>';
            addBtn.disabled = true;
            return;
        }

        // Collect all ingredients
        const allIngredients = new Set<string>();
        this.selectedDishes.forEach(selectedDish => {
            selectedDish.ingredients.forEach(ingredient => {
                allIngredients.add(ingredient);
            });
        });

        previewItems.innerHTML = `
            <ul class="preview-list">
                ${Array.from(allIngredients).map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        `;
        addBtn.disabled = false;
    }

    private editDishIngredients(dishId: string): void {
        const selectedDish = this.selectedDishes.find(sd => sd.dish.id === dishId);
        if (!selectedDish) return;

        const newIngredients = prompt(
            'Edit ingredients (comma-separated):',
            selectedDish.ingredients.join(', ')
        );

        if (newIngredients !== null) {
            selectedDish.ingredients = newIngredients.split(',').map(ing => ing.trim()).filter(ing => ing);
            selectedDish.isEdited = true;
            this.updateSelectedDishesView();
            this.updateGroceryPreview();
        }
    }

    private removeDish(dishId: string): void {
        this.selectedDishes = this.selectedDishes.filter(sd => sd.dish.id !== dishId);
        this.updateSelectedDishesView();
        this.updateGroceryPreview();
    }

    private addSelectedDishesToGroceryList(): void {
        const allIngredients = new Set<string>();
        this.selectedDishes.forEach(selectedDish => {
            selectedDish.ingredients.forEach(ingredient => {
                allIngredients.add(ingredient);
            });
        });

        // Add each ingredient as a grocery item
        Array.from(allIngredients).forEach(ingredient => {
            const newItem: GroceryItemType = {
                id: Date.now().toString() + Math.random(),
                name: ingredient,
                frequency: 'weekly',
                purchased: false,
                dateAdded: new Date(),
                purchaseCount: 0,
                dueDate: StorageManager.calculateDueDate('weekly')
            };
            this.groceryItems.push(newItem);
            StorageManager.updateFrequentItem(ingredient);
        });

        // Clear selected dishes
        this.selectedDishes = [];
        this.saveGroceryItems();
        this.updateSelectedDishesView();
        this.updateGroceryPreview();
        
        // Show success message
        alert(`Added ${allIngredients.size} ingredients to your grocery list!`);
    }

    private addManualGroceryItem(): void {
        const itemInput = document.getElementById('manual-item') as HTMLInputElement;
        const quantityInput = document.getElementById('manual-quantity') as HTMLInputElement;
        const notesInput = document.getElementById('manual-notes') as HTMLInputElement;
        const frequencySelect = document.getElementById('manual-frequency') as HTMLSelectElement;

        const newItem: GroceryItemType = {
            id: Date.now().toString(),
            name: itemInput.value.trim(),
            quantity: quantityInput.value.trim() || undefined,
            notes: notesInput.value.trim() || undefined,
            frequency: frequencySelect.value as Frequency,
            purchased: false,
            dateAdded: new Date(),
            purchaseCount: 0,
            dueDate: StorageManager.calculateDueDate(frequencySelect.value)
        };

        this.groceryItems.push(newItem);
        StorageManager.updateFrequentItem(newItem.name);
        this.saveGroceryItems();
        
        // Reset form
        (document.getElementById('manual-add-form') as HTMLFormElement).reset();
        
        this.updateGroceryListView();
    }

    private updateGroceryListView(): void {
        const container = document.getElementById('grocery-list') as HTMLElement;
        
        let filteredItems = this.groceryItems;
        if (this.currentFilter !== 'all') {
            filteredItems = this.groceryItems.filter(item => item.frequency === this.currentFilter);
        }

        if (filteredItems.length === 0) {
            container.innerHTML = '<p class="no-items">No grocery items found.</p>';
            return;
        }

        container.innerHTML = '';
        filteredItems.forEach(item => {
            const groceryItem = new GroceryItem(
                item,
                (id) => this.toggleGroceryItem(id),
                (id) => this.deleteGroceryItem(id)
            );
            container.appendChild(groceryItem.render());
        });
    }

    private toggleGroceryItem(id: string): void {
        const item = this.groceryItems.find(item => item.id === id);
        if (!item) return;

        item.purchased = !item.purchased;
        if (item.purchased) {
            item.lastPurchased = new Date();
            item.purchaseCount++;
            item.dueDate = StorageManager.calculateDueDate(item.frequency, item.lastPurchased);
            StorageManager.updateFrequentItem(item.name);
        }

        this.saveGroceryItems();
        this.updateCurrentPageView();
    }

    private deleteGroceryItem(id: string): void {
        this.groceryItems = this.groceryItems.filter(item => item.id !== id);
        this.saveGroceryItems();
        this.updateCurrentPageView();
    }

    private updateRemindersView(): void {
        const container = document.getElementById('upcoming-groceries') as HTMLElement;
        const sortSelect = document.getElementById('sort-reminders') as HTMLSelectElement;
        
        // Get items that need to be purchased soon
        const upcomingItems = this.groceryItems.filter(item => 
            !item.purchased && item.dueDate
        );

        // Sort items
        if (sortSelect.value === 'date') {
            upcomingItems.sort((a, b) => (a.dueDate?.getTime() || 0) - (b.dueDate?.getTime() || 0));
        } else {
            const frequencyOrder = { daily: 1, weekly: 2, biweekly: 3, monthly: 4 };
            upcomingItems.sort((a, b) => frequencyOrder[a.frequency] - frequencyOrder[b.frequency]);
        }

        if (upcomingItems.length === 0) {
            container.innerHTML = '<p class="no-reminders">No upcoming groceries! 🎉</p>';
            return;
        }

        container.innerHTML = '';
        upcomingItems.forEach(item => {
            const reminderTile = new ReminderTile(item, (id) => {
                // Navigate to manual page and highlight item
                this.navigateToItem(id);
            });
            container.appendChild(reminderTile.render());
        });
    }

    private updateFrequentItemsView(): void {
        const container = document.getElementById('frequent-items') as HTMLElement;
        const showToggle = document.getElementById('show-frequent') as HTMLInputElement;
        
        if (!showToggle.checked) {
            container.style.display = 'none';
            return;
        }
        
        container.style.display = 'block';
        const frequentItems = StorageManager.getFrequentItems()
            .sort((a, b) => b.count - a.count)
            .slice(0, 10); // Top 10

        if (frequentItems.length === 0) {
            container.innerHTML = '<p>No frequent items yet. Start adding groceries!</p>';
            return;
        }

        container.innerHTML = `
            <div class="frequent-items-grid">
                ${frequentItems.map(item => `
                    <div class="frequent-item">
                        <span class="frequent-name">${item.name}</span>
                        <span class="frequent-count">${item.count}x</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    private updateHistoryView(): void {
        const container = document.getElementById('grocery-history') as HTMLElement;
        const history = StorageManager.getPurchaseHistory()
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 20); // Last 20 entries

        if (history.length === 0) {
            container.innerHTML = '<p>No purchase history yet.</p>';
            return;
        }

        container.innerHTML = `
            <div class="history-list">
                ${history.map(entry => `
                    <div class="history-entry">
                        <div class="history-date">${entry.date.toLocaleDateString()}</div>
                        <div class="history-items">${entry.items.join(', ')}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    private navigateToItem(id: string): void {
        // Switch to manual page
        const manualTab = document.querySelector('[data-page="manual"]') as HTMLElement;
        manualTab.click();
        
        // Highlight the item
        setTimeout(() => {
            const itemElement = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
            if (itemElement) {
                itemElement.scrollIntoView({ behavior: 'smooth' });
                itemElement.classList.add('highlighted');
                setTimeout(() => itemElement.classList.remove('highlighted'), 2000);
            }
        }, 100);
    }

    private addIngredientInput(): void {
        const container = document.getElementById('new-ingredients') as HTMLElement;
        const newInput = document.createElement('div');
        newInput.className = 'ingredient-input';
        newInput.innerHTML = `
            <input type="text" placeholder="Ingredient" required />
            <button type="button" class="remove-ingredient">×</button>
        `;

        // Add remove functionality
        newInput.querySelector('.remove-ingredient')?.addEventListener('click', () => {
            newInput.remove();
        });

        container.appendChild(newInput);
    }

    private resetIngredientInputs(): void {
        const container = document.getElementById('new-ingredients') as HTMLElement;
        container.innerHTML = `
            <div class="ingredient-input">
                <input type="text" placeholder="Ingredient" required />
                <button type="button" class="remove-ingredient">×</button>
            </div>
        `;
    }

    private saveNewDish(): void {
        const nameInput = document.getElementById('new-dish-name') as HTMLInputElement;
        const ingredientInputs = document.querySelectorAll('#new-ingredients input[type="text"]') as NodeListOf<HTMLInputElement>;
        
        const ingredients = Array.from(ingredientInputs)
            .map(input => input.value.trim())
            .filter(value => value);

        if (!nameInput.value.trim() || ingredients.length === 0) {
            alert('Please enter dish name and at least one ingredient.');
            return;
        }

        const newDish: Dish = {
            id: 'custom-' + Date.now(),
            name: nameInput.value.trim(),
            cuisine: 'Custom',
            ingredients
        };

        this.customDishes.push(newDish);
        StorageManager.saveCustomDishes(this.customDishes);
        
        // Auto-select the new dish
        this.selectDish(newDish);
        
        alert('Dish added successfully!');
    }

    private saveGroceryItems(): void {
        StorageManager.saveGroceryItems(this.groceryItems);
    }

    private updateCurrentPageView(): void {
        switch (this.currentPage) {
            case 'dishes':
                this.updateSelectedDishesView();
                this.updateGroceryPreview();
                break;
            case 'manual':
                this.updateGroceryListView();
                break;
            case 'reminders':
                this.updateRemindersView();
                this.updateFrequentItemsView();
                this.updateHistoryView();
                break;
        }
    }

    private updateAllViews(): void {
        this.updateSelectedDishesView();
        this.updateGroceryPreview();
        this.updateGroceryListView();
        this.updateRemindersView();
        this.updateFrequentItemsView();
        this.updateHistoryView();
    }
}

export function initializeApp(): void {
    new GroceryApp();
} 
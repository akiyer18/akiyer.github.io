// Meal Decider JavaScript - Static Version with Database Integration

class MealDecider {
    constructor() {
        this.recipes = [];
        this.ingredients = [];
        this.selectedRecipes = [];
        this.init();
    }

    init() {
        this.loadData();
        this.renderIngredientChecklist();
        this.renderRecipeList();
    }

    // Load data from localStorage
    loadData() {
        // Load recipes
        const savedRecipes = localStorage.getItem('mealDeciderRecipes');
        this.recipes = savedRecipes ? JSON.parse(savedRecipes) : this.getDefaultRecipes();

        // Load ingredients from grocery app if available
        const groceryItems = localStorage.getItem('groceryItems');
        if (groceryItems) {
            const items = JSON.parse(groceryItems);
            this.ingredients = [...new Set([
                ...this.extractIngredientsFromRecipes(),
                ...items.map(item => item.name.toLowerCase())
            ])];
        } else {
            this.ingredients = this.extractIngredientsFromRecipes();
        }

        // Load selected recipes
        this.selectedRecipes = JSON.parse(localStorage.getItem('selectedMealRecipes') || '[]');
    }

    // Save data to localStorage
    saveRecipes() {
        localStorage.setItem('mealDeciderRecipes', JSON.stringify(this.recipes));
    }

    saveSelectedRecipes() {
        localStorage.setItem('selectedMealRecipes', JSON.stringify(this.selectedRecipes));
    }

    // Extract unique ingredients from all recipes
    extractIngredientsFromRecipes() {
        const allIngredients = new Set();
        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                allIngredients.add(ingredient.toLowerCase().trim());
            });
        });
        return Array.from(allIngredients).sort();
    }

    // Default recipes
    getDefaultRecipes() {
        return [
            {
                id: 1,
                name: "Spaghetti Aglio e Olio",
                ingredients: ["spaghetti", "garlic", "olive oil", "red pepper flakes", "parsley"],
                time: 15,
                category: "dinner"
            },
            {
                id: 2,
                name: "Greek Salad",
                ingredients: ["tomato", "cucumber", "red onion", "feta cheese", "olives", "olive oil"],
                time: 10,
                category: "lunch"
            },
            {
                id: 3,
                name: "Scrambled Eggs",
                ingredients: ["eggs", "butter", "milk", "salt", "pepper"],
                time: 5,
                category: "breakfast"
            },
            {
                id: 4,
                name: "Chicken Stir Fry",
                ingredients: ["chicken breast", "bell pepper", "onion", "soy sauce", "garlic", "ginger"],
                time: 20,
                category: "dinner"
            },
            {
                id: 5,
                name: "Avocado Toast",
                ingredients: ["bread", "avocado", "lime", "salt", "pepper"],
                time: 5,
                category: "breakfast"
            },
            {
                id: 6,
                name: "Tomato Soup",
                ingredients: ["tomato", "onion", "garlic", "vegetable broth", "cream"],
                time: 25,
                category: "lunch"
            }
        ];
    }

    // Render ingredient checklist
    renderIngredientChecklist() {
        const container = document.getElementById('ingredient-checklist');
        if (!container) return;

        container.innerHTML = this.ingredients.map(ingredient => `
            <div class="ingredient-item">
                <input type="checkbox" id="ingredient-${ingredient}" value="${ingredient}">
                <label for="ingredient-${ingredient}">${this.capitalizeFirst(ingredient)}</label>
            </div>
        `).join('');
    }

    // Find recipes based on available ingredients
    findRecipes() {
        const selectedIngredients = Array.from(document.querySelectorAll('#ingredient-checklist input:checked'))
            .map(input => input.value);
        const maxTime = parseInt(document.getElementById('max-time').value);
        const category = document.getElementById('category').value;

        if (selectedIngredients.length === 0) {
            this.showMessage('Please select at least one ingredient!', 'warning');
            return;
        }

        const matchedRecipes = this.recipes
            .filter(recipe => {
                // Filter by time
                if (recipe.time > maxTime) return false;
                
                // Filter by category
                if (category && recipe.category !== category) return false;
                
                return true;
            })
            .map(recipe => {
                // Calculate match score
                const matchingIngredients = recipe.ingredients.filter(ingredient => 
                    selectedIngredients.includes(ingredient.toLowerCase())
                );
                const matchScore = (matchingIngredients.length / recipe.ingredients.length) * 100;
                
                return {
                    ...recipe,
                    matchingIngredients,
                    matchScore: Math.round(matchScore)
                };
            })
            .filter(recipe => recipe.matchScore > 0)
            .sort((a, b) => b.matchScore - a.matchScore);

        this.renderRecipeResults(matchedRecipes);
    }

    // Render recipe search results
    renderRecipeResults(recipes) {
        const container = document.getElementById('recipe-results');
        if (!container) return;

        if (recipes.length === 0) {
            container.innerHTML = `
                <div class="card">
                    <h3>No matching recipes found</h3>
                    <p>Try adjusting your ingredient selection or increasing the cooking time.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = recipes.map(recipe => `
            <div class="recipe-card">
                <h3>${recipe.name}</h3>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.time} min</span>
                    <span><i class="fas fa-tag"></i> ${this.capitalizeFirst(recipe.category)}</span>
                    <span class="match-score">
                        <i class="fas fa-star"></i> ${recipe.matchScore}% match
                    </span>
                </div>
                <div class="recipe-ingredients">
                    <h4>Ingredients:</h4>
                    ${recipe.ingredients.map(ingredient => {
                        const isAvailable = recipe.matchingIngredients.includes(ingredient);
                        return `<span class="ingredient-tag" style="${isAvailable ? 'background: #10B981; color: white;' : ''}">${ingredient}</span>`;
                    }).join('')}
                </div>
                <button class="btn btn-secondary" onclick="mealDecider.selectRecipe(${recipe.id})">
                    <i class="fas fa-plus"></i> Add to Meal Plan
                </button>
            </div>
        `).join('');
    }

    // Add new recipe
    addRecipe(event) {
        event.preventDefault();
        
        const name = document.getElementById('recipe-name').value.trim();
        const ingredientsText = document.getElementById('recipe-ingredients').value.trim();
        const time = parseInt(document.getElementById('recipe-time').value);
        const category = document.getElementById('recipe-category').value;

        if (!name || !ingredientsText || !time || !category) {
            this.showMessage('Please fill in all fields!', 'error');
            return;
        }

        const ingredients = ingredientsText.split(',').map(i => i.trim().toLowerCase());
        const newRecipe = {
            id: Date.now(),
            name,
            ingredients,
            time,
            category
        };

        this.recipes.push(newRecipe);
        this.saveRecipes();
        
        // Update ingredients list
        this.ingredients = this.extractIngredientsFromRecipes();
        this.renderIngredientChecklist();
        this.renderRecipeList();

        // Clear form
        event.target.reset();
        
        this.showMessage('Recipe added successfully!', 'success');
    }

    // Select recipe for meal planning
    selectRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe && !this.selectedRecipes.find(r => r.id === recipeId)) {
            this.selectedRecipes.push(recipe);
            this.saveSelectedRecipes();
            this.showMessage(`${recipe.name} added to meal plan!`, 'success');
            this.renderSelectedRecipes();
        }
    }

    // Remove recipe from meal plan
    removeSelectedRecipe(recipeId) {
        this.selectedRecipes = this.selectedRecipes.filter(r => r.id !== recipeId);
        this.saveSelectedRecipes();
        this.renderSelectedRecipes();
        this.showMessage('Recipe removed from meal plan', 'info');
    }

    // Render selected recipes
    renderSelectedRecipes() {
        const container = document.getElementById('selected-recipes');
        if (!container) return;

        if (this.selectedRecipes.length === 0) {
            container.innerHTML = '<p>No recipes selected for this week.</p>';
            return;
        }

        container.innerHTML = this.selectedRecipes.map(recipe => `
            <div class="recipe-card">
                <h4>${recipe.name}</h4>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.time} min</span>
                    <span><i class="fas fa-tag"></i> ${this.capitalizeFirst(recipe.category)}</span>
                </div>
                <button class="btn btn-secondary" onclick="mealDecider.removeSelectedRecipe(${recipe.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `).join('');
    }

    // Generate grocery list from selected recipes
    generateGroceryList() {
        if (this.selectedRecipes.length === 0) {
            this.showMessage('Please select some recipes first!', 'warning');
            return;
        }

        // Collect all ingredients
        const allIngredients = {};
        this.selectedRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                allIngredients[ingredient] = (allIngredients[ingredient] || 0) + 1;
            });
        });

        // Convert to grocery list format
        const groceryItems = Object.keys(allIngredients).map(ingredient => ({
            id: Date.now() + Math.random(),
            name: this.capitalizeFirst(ingredient),
            category: this.categorizeIngredient(ingredient),
            checked: false,
            quantity: allIngredients[ingredient]
        }));

        // Save to grocery app storage
        const existingItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
        const mergedItems = [...existingItems];

        groceryItems.forEach(newItem => {
            const existing = mergedItems.find(item => 
                item.name.toLowerCase() === newItem.name.toLowerCase()
            );
            if (existing) {
                existing.quantity = (existing.quantity || 1) + newItem.quantity;
            } else {
                mergedItems.push(newItem);
            }
        });

        localStorage.setItem('groceryItems', JSON.stringify(mergedItems));
        
        this.showMessage(`Added ${groceryItems.length} ingredients to grocery list!`, 'success');
    }

    // Categorize ingredient for grocery list
    categorizeIngredient(ingredient) {
        const categories = {
            'Produce': ['tomato', 'onion', 'garlic', 'bell pepper', 'cucumber', 'avocado', 'lime', 'parsley'],
            'Dairy': ['milk', 'butter', 'feta cheese', 'cream', 'eggs'],
            'Pantry': ['spaghetti', 'olive oil', 'salt', 'pepper', 'red pepper flakes', 'soy sauce'],
            'Meat': ['chicken breast', 'beef', 'pork'],
            'Bakery': ['bread'],
            'Other': []
        };

        for (const [category, items] of Object.entries(categories)) {
            if (items.includes(ingredient.toLowerCase())) {
                return category;
            }
        }
        return 'Other';
    }

    // Render all recipes for management
    renderRecipeList() {
        const container = document.getElementById('recipe-list');
        if (!container) return;

        if (this.recipes.length === 0) {
            container.innerHTML = '<p>No recipes available. Add some recipes to get started!</p>';
            return;
        }

        container.innerHTML = this.recipes.map(recipe => `
            <div class="recipe-card">
                <h3>${recipe.name}</h3>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.time} min</span>
                    <span><i class="fas fa-tag"></i> ${this.capitalizeFirst(recipe.category)}</span>
                </div>
                <div class="recipe-ingredients">
                    <h4>Ingredients:</h4>
                    ${recipe.ingredients.map(ingredient => 
                        `<span class="ingredient-tag">${ingredient}</span>`
                    ).join('')}
                </div>
                <div style="margin-top: 1rem;">
                    <button class="btn btn-secondary" onclick="mealDecider.selectRecipe(${recipe.id})">
                        <i class="fas fa-plus"></i> Add to Plan
                    </button>
                    <button class="btn" style="background: #EF4444; margin-left: 0.5rem;" onclick="mealDecider.deleteRecipe(${recipe.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Delete recipe
    deleteRecipe(recipeId) {
        if (confirm('Are you sure you want to delete this recipe?')) {
            this.recipes = this.recipes.filter(r => r.id !== recipeId);
            this.saveRecipes();
            this.renderRecipeList();
            this.showMessage('Recipe deleted', 'info');
        }
    }

    // Open grocery app
    openGroceryApp() {
        window.open('../Grocery_list_generator/', '_blank');
    }

    // Utility functions
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    showMessage(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#06B6D4'
        };

        toast.style.background = colors[type] || colors.info;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked nav tab
    event.target.classList.add('active');

    // Render content based on tab
    if (tabName === 'connect') {
        mealDecider.renderSelectedRecipes();
    }
}

// Global functions for HTML onclick events
function findRecipes() {
    mealDecider.findRecipes();
}

function addRecipe(event) {
    mealDecider.addRecipe(event);
}

function generateGroceryList() {
    mealDecider.generateGroceryList();
}

function openGroceryApp() {
    mealDecider.openGroceryApp();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the app
const mealDecider = new MealDecider(); 
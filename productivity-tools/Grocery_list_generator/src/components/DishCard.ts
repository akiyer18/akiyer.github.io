import { Dish, SelectedDish } from '../types';

export class DishCard {
    private dish: Dish;
    private onSelect: (dish: Dish) => void;

    constructor(dish: Dish, onSelect: (dish: Dish) => void) {
        this.dish = dish;
        this.onSelect = onSelect;
    }

    render(): HTMLElement {
        const cardElement = document.createElement('div');
        cardElement.className = 'dish-card';
        cardElement.innerHTML = `
            <div class="dish-header">
                <h3 class="dish-name">${this.dish.name}</h3>
                <span class="dish-cuisine">${this.dish.cuisine}</span>
            </div>
            <div class="dish-ingredients">
                <strong>Ingredients:</strong>
                <ul class="ingredients-list">
                    ${this.dish.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            <button class="btn-select" data-dish-id="${this.dish.id}">Select Dish</button>
        `;

        // Add click handler for select button
        const selectBtn = cardElement.querySelector('.btn-select') as HTMLButtonElement;
        selectBtn.addEventListener('click', () => {
            this.onSelect(this.dish);
        });

        return cardElement;
    }
}

export class SelectedDishCard {
    private selectedDish: SelectedDish;
    private onEdit: (dishId: string) => void;
    private onRemove: (dishId: string) => void;

    constructor(
        selectedDish: SelectedDish, 
        onEdit: (dishId: string) => void,
        onRemove: (dishId: string) => void
    ) {
        this.selectedDish = selectedDish;
        this.onEdit = onEdit;
        this.onRemove = onRemove;
    }

    render(): HTMLElement {
        const cardElement = document.createElement('div');
        cardElement.className = 'selected-dish-card';
        cardElement.innerHTML = `
            <div class="selected-dish-header">
                <h4 class="dish-name">${this.selectedDish.dish.name}</h4>
                <div class="dish-actions">
                    <button class="btn-edit" data-dish-id="${this.selectedDish.dish.id}">✏️ Edit</button>
                    <button class="btn-remove" data-dish-id="${this.selectedDish.dish.id}">🗑️ Remove</button>
                </div>
            </div>
            <div class="selected-ingredients">
                ${this.selectedDish.isEdited ? '<span class="edited-badge">🔧 Modified</span>' : ''}
                <ul class="ingredients-list">
                    ${this.selectedDish.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        `;

        // Add event listeners
        const editBtn = cardElement.querySelector('.btn-edit') as HTMLButtonElement;
        const removeBtn = cardElement.querySelector('.btn-remove') as HTMLButtonElement;

        editBtn.addEventListener('click', () => {
            this.onEdit(this.selectedDish.dish.id);
        });

        removeBtn.addEventListener('click', () => {
            this.onRemove(this.selectedDish.dish.id);
        });

        return cardElement;
    }

    update(selectedDish: SelectedDish): void {
        this.selectedDish = selectedDish;
        // Re-render the component
        const newElement = this.render();
        // This would typically be handled by a parent component
    }
} 
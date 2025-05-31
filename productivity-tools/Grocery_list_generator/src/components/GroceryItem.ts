import { GroceryItem as GroceryItemType } from '../types';

export class GroceryItem {
    private item: GroceryItemType;
    private onToggle: (id: string) => void;
    private onDelete: (id: string) => void;

    constructor(
        item: GroceryItemType,
        onToggle: (id: string) => void,
        onDelete: (id: string) => void
    ) {
        this.item = item;
        this.onToggle = onToggle;
        this.onDelete = onDelete;
    }

    render(): HTMLElement {
        const itemElement = document.createElement('div');
        itemElement.className = `grocery-item ${this.item.purchased ? 'purchased' : ''}`;
        
        const dueDateInfo = this.item.dueDate ? this.formatDueDate(this.item.dueDate) : '';
        const isOverdue = this.item.dueDate && this.item.dueDate < new Date() && !this.item.purchased;
        
        itemElement.innerHTML = `
            <div class="item-content">
                <label class="item-checkbox">
                    <input type="checkbox" ${this.item.purchased ? 'checked' : ''} />
                    <span class="checkmark"></span>
                </label>
                <div class="item-details">
                    <div class="item-main">
                        <span class="item-name">${this.item.name}</span>
                        ${this.item.quantity ? `<span class="item-quantity">(${this.item.quantity})</span>` : ''}
                        <span class="item-frequency frequency-${this.item.frequency}">${this.item.frequency}</span>
                    </div>
                    ${this.item.notes ? `<div class="item-notes">${this.item.notes}</div>` : ''}
                    ${dueDateInfo ? `<div class="item-due-date ${isOverdue ? 'overdue' : ''}">${dueDateInfo}</div>` : ''}
                </div>
                <button class="btn-delete" data-id="${this.item.id}">🗑️</button>
            </div>
        `;

        // Add event listeners
        const checkbox = itemElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
        const deleteBtn = itemElement.querySelector('.btn-delete') as HTMLButtonElement;

        checkbox.addEventListener('change', () => {
            this.onToggle(this.item.id);
        });

        deleteBtn.addEventListener('click', () => {
            this.onDelete(this.item.id);
        });

        return itemElement;
    }

    private formatDueDate(dueDate: Date): string {
        const now = new Date();
        const diffTime = dueDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return `Overdue by ${Math.abs(diffDays)} day(s)`;
        } else if (diffDays === 0) {
            return 'Due today';
        } else if (diffDays === 1) {
            return 'Due tomorrow';
        } else if (diffDays <= 7) {
            return `Due in ${diffDays} days`;
        } else {
            return `Due ${dueDate.toLocaleDateString()}`;
        }
    }

    update(item: GroceryItemType): void {
        this.item = item;
    }
}

export class ReminderTile {
    private item: GroceryItemType;
    private onClick: (id: string) => void;

    constructor(item: GroceryItemType, onClick: (id: string) => void) {
        this.item = item;
        this.onClick = onClick;
    }

    render(): HTMLElement {
        const tileElement = document.createElement('div');
        tileElement.className = 'reminder-tile';
        
        const isOverdue = this.item.dueDate && this.item.dueDate < new Date();
        const dueInfo = this.item.dueDate ? this.formatDueDate(this.item.dueDate) : '';
        
        if (isOverdue) {
            tileElement.classList.add('overdue');
        }

        tileElement.innerHTML = `
            <div class="reminder-content">
                <div class="reminder-header">
                    <span class="reminder-name">${this.item.name}</span>
                    <span class="reminder-frequency">${this.item.frequency}</span>
                </div>
                <div class="reminder-due">${dueInfo}</div>
                ${this.item.quantity ? `<div class="reminder-quantity">Qty: ${this.item.quantity}</div>` : ''}
                ${this.item.notes ? `<div class="reminder-notes">${this.item.notes}</div>` : ''}
            </div>
        `;

        tileElement.addEventListener('click', () => {
            this.onClick(this.item.id);
        });

        return tileElement;
    }

    private formatDueDate(dueDate: Date): string {
        const now = new Date();
        const diffTime = dueDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return `🚨 Overdue by ${Math.abs(diffDays)} day(s)`;
        } else if (diffDays === 0) {
            return '⚠️ Due today';
        } else if (diffDays === 1) {
            return '📅 Due tomorrow';
        } else if (diffDays <= 7) {
            return `📅 Due in ${diffDays} days`;
        } else {
            return `📅 Due ${dueDate.toLocaleDateString()}`;
        }
    }
} 
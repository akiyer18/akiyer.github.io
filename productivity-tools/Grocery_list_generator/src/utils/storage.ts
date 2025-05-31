import { GroceryItem, Dish, FrequentItem } from '../types';

const STORAGE_KEYS = {
    GROCERY_ITEMS: 'grocery-items',
    CUSTOM_DISHES: 'custom-dishes',
    FREQUENT_ITEMS: 'frequent-items',
    PURCHASE_HISTORY: 'purchase-history'
};

export class StorageManager {
    static getGroceryItems(): GroceryItem[] {
        const items = localStorage.getItem(STORAGE_KEYS.GROCERY_ITEMS);
        if (!items) return [];
        
        return JSON.parse(items).map((item: any) => ({
            ...item,
            dateAdded: new Date(item.dateAdded),
            lastPurchased: item.lastPurchased ? new Date(item.lastPurchased) : undefined,
            dueDate: item.dueDate ? new Date(item.dueDate) : undefined
        }));
    }

    static saveGroceryItems(items: GroceryItem[]): void {
        localStorage.setItem(STORAGE_KEYS.GROCERY_ITEMS, JSON.stringify(items));
    }

    static getCustomDishes(): Dish[] {
        const dishes = localStorage.getItem(STORAGE_KEYS.CUSTOM_DISHES);
        return dishes ? JSON.parse(dishes) : [];
    }

    static saveCustomDishes(dishes: Dish[]): void {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_DISHES, JSON.stringify(dishes));
    }

    static getFrequentItems(): FrequentItem[] {
        const items = localStorage.getItem(STORAGE_KEYS.FREQUENT_ITEMS);
        if (!items) return [];
        
        return JSON.parse(items).map((item: any) => ({
            ...item,
            lastUsed: new Date(item.lastUsed)
        }));
    }

    static saveFrequentItems(items: FrequentItem[]): void {
        localStorage.setItem(STORAGE_KEYS.FREQUENT_ITEMS, JSON.stringify(items));
    }

    static updateFrequentItem(itemName: string): void {
        const frequentItems = this.getFrequentItems();
        const existingIndex = frequentItems.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        
        if (existingIndex >= 0) {
            frequentItems[existingIndex].count++;
            frequentItems[existingIndex].lastUsed = new Date();
        } else {
            frequentItems.push({
                name: itemName,
                count: 1,
                lastUsed: new Date()
            });
        }
        
        this.saveFrequentItems(frequentItems);
    }

    static getPurchaseHistory(): any[] {
        const history = localStorage.getItem(STORAGE_KEYS.PURCHASE_HISTORY);
        if (!history) return [];
        
        return JSON.parse(history).map((entry: any) => ({
            ...entry,
            date: new Date(entry.date)
        }));
    }

    static addPurchaseHistory(items: string[]): void {
        const history = this.getPurchaseHistory();
        history.push({
            items,
            date: new Date(),
            id: Date.now().toString()
        });
        
        // Keep only last 50 entries
        if (history.length > 50) {
            history.splice(0, history.length - 50);
        }
        
        localStorage.setItem(STORAGE_KEYS.PURCHASE_HISTORY, JSON.stringify(history));
    }

    static calculateDueDate(frequency: string, lastPurchased?: Date): Date {
        const baseDate = lastPurchased || new Date();
        const dueDate = new Date(baseDate);
        
        switch (frequency) {
            case 'daily':
                dueDate.setDate(dueDate.getDate() + 1);
                break;
            case 'weekly':
                dueDate.setDate(dueDate.getDate() + 7);
                break;
            case 'biweekly':
                dueDate.setDate(dueDate.getDate() + 14);
                break;
            case 'monthly':
                dueDate.setMonth(dueDate.getMonth() + 1);
                break;
        }
        
        return dueDate;
    }
} 
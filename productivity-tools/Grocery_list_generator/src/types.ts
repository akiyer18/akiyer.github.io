export interface Dish {
    id: string;
    name: string;
    cuisine: string;
    ingredients: string[];
}

export interface GroceryItem {
    id: string;
    name: string;
    quantity?: string;
    notes?: string;
    frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    purchased: boolean;
    dateAdded: Date;
    lastPurchased?: Date;
    purchaseCount: number;
    dueDate?: Date;
}

export interface SelectedDish {
    dish: Dish;
    ingredients: string[];
    isEdited: boolean;
}

export type Frequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

export interface FrequentItem {
    name: string;
    count: number;
    lastUsed: Date;
} 
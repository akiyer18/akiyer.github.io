import { Dish } from '../types';

export const dishDatabase: Dish[] = [
    // Italian
    {
        id: 'pasta-carbonara',
        name: 'Pasta Carbonara',
        cuisine: 'Italian',
        ingredients: ['spaghetti', 'eggs', 'bacon', 'parmesan cheese', 'black pepper', 'garlic']
    },
    {
        id: 'margherita-pizza',
        name: 'Margherita Pizza',
        cuisine: 'Italian',
        ingredients: ['pizza dough', 'tomato sauce', 'mozzarella cheese', 'fresh basil', 'olive oil']
    },
    {
        id: 'lasagna',
        name: 'Lasagna',
        cuisine: 'Italian',
        ingredients: ['lasagna sheets', 'ground beef', 'onion', 'garlic', 'tomato sauce', 'ricotta cheese', 'mozzarella cheese', 'parmesan cheese']
    },

    // Indian
    {
        id: 'butter-chicken',
        name: 'Butter Chicken',
        cuisine: 'Indian',
        ingredients: ['chicken breast', 'butter', 'onion', 'garlic', 'ginger', 'tomatoes', 'heavy cream', 'garam masala', 'turmeric', 'basmati rice']
    },
    {
        id: 'dal-tadka',
        name: 'Dal Tadka',
        cuisine: 'Indian',
        ingredients: ['yellow lentils', 'onion', 'tomatoes', 'garlic', 'ginger', 'cumin seeds', 'turmeric', 'red chili powder', 'cilantro']
    },
    {
        id: 'biryani',
        name: 'Chicken Biryani',
        cuisine: 'Indian',
        ingredients: ['basmati rice', 'chicken', 'onions', 'yogurt', 'ginger-garlic paste', 'biryani masala', 'saffron', 'mint leaves', 'fried onions']
    },

    // Mexican
    {
        id: 'tacos',
        name: 'Chicken Tacos',
        cuisine: 'Mexican',
        ingredients: ['chicken breast', 'taco shells', 'lettuce', 'tomatoes', 'cheese', 'sour cream', 'onion', 'lime', 'cilantro']
    },
    {
        id: 'guacamole',
        name: 'Guacamole',
        cuisine: 'Mexican',
        ingredients: ['avocados', 'lime juice', 'onion', 'tomatoes', 'garlic', 'jalapeño', 'cilantro', 'salt']
    },
    {
        id: 'quesadilla',
        name: 'Cheese Quesadilla',
        cuisine: 'Mexican',
        ingredients: ['flour tortillas', 'cheese', 'bell peppers', 'onions', 'chicken', 'salsa', 'sour cream']
    },

    // Chinese
    {
        id: 'fried-rice',
        name: 'Chicken Fried Rice',
        cuisine: 'Chinese',
        ingredients: ['rice', 'chicken', 'eggs', 'vegetables', 'soy sauce', 'garlic', 'ginger', 'green onions', 'sesame oil']
    },
    {
        id: 'sweet-sour-chicken',
        name: 'Sweet and Sour Chicken',
        cuisine: 'Chinese',
        ingredients: ['chicken breast', 'bell peppers', 'pineapple', 'onion', 'vinegar', 'sugar', 'ketchup', 'soy sauce', 'cornstarch']
    },
    {
        id: 'lo-mein',
        name: 'Vegetable Lo Mein',
        cuisine: 'Chinese',
        ingredients: ['lo mein noodles', 'mixed vegetables', 'soy sauce', 'sesame oil', 'garlic', 'ginger', 'green onions']
    },

    // American
    {
        id: 'burger',
        name: 'Classic Burger',
        cuisine: 'American',
        ingredients: ['ground beef', 'burger buns', 'lettuce', 'tomatoes', 'onion', 'pickles', 'cheese', 'ketchup', 'mustard']
    },
    {
        id: 'mac-cheese',
        name: 'Mac and Cheese',
        cuisine: 'American',
        ingredients: ['macaroni pasta', 'cheddar cheese', 'butter', 'milk', 'flour', 'breadcrumbs']
    },
    {
        id: 'grilled-chicken',
        name: 'Grilled Chicken Salad',
        cuisine: 'American',
        ingredients: ['chicken breast', 'mixed greens', 'tomatoes', 'cucumber', 'red onion', 'croutons', 'salad dressing']
    },

    // Thai
    {
        id: 'pad-thai',
        name: 'Pad Thai',
        cuisine: 'Thai',
        ingredients: ['rice noodles', 'shrimp', 'eggs', 'bean sprouts', 'peanuts', 'lime', 'fish sauce', 'sugar', 'tamarind paste']
    },
    {
        id: 'green-curry',
        name: 'Green Curry Chicken',
        cuisine: 'Thai',
        ingredients: ['chicken', 'green curry paste', 'coconut milk', 'thai basil', 'eggplant', 'bell peppers', 'fish sauce', 'jasmine rice']
    },

    // Mediterranean
    {
        id: 'greek-salad',
        name: 'Greek Salad',
        cuisine: 'Mediterranean',
        ingredients: ['tomatoes', 'cucumber', 'red onion', 'feta cheese', 'olives', 'olive oil', 'lemon juice', 'oregano']
    },
    {
        id: 'hummus',
        name: 'Hummus',
        cuisine: 'Mediterranean',
        ingredients: ['chickpeas', 'tahini', 'lemon juice', 'garlic', 'olive oil', 'cumin', 'paprika']
    }
];

export function searchDishes(query: string): Dish[] {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return dishDatabase.filter(dish => 
        dish.name.toLowerCase().includes(searchTerm) ||
        dish.cuisine.toLowerCase().includes(searchTerm) ||
        dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
    );
}

export function getDishById(id: string): Dish | undefined {
    return dishDatabase.find(dish => dish.id === id);
} 
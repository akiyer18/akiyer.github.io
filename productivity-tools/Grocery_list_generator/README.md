# 🛒 Grocery List Generator

A comprehensive, modern grocery list application with dish-based ingredient management, manual grocery tracking, and smart reminders. Built with TypeScript, Vite, and localStorage for persistent data storage.

## ✨ Features

### 🥘 Page 1: Dish-Based Grocery List Builder
- **Multi-cuisine dish database** with 20+ popular dishes from Italian, Indian, Mexican, Chinese, American, Thai, and Mediterranean cuisines
- **Smart search functionality** that searches by dish name, cuisine, or ingredients
- **Pre-filled ingredient lists** for each dish with option to edit
- **Add new custom dishes** with custom ingredient lists
- **Grocery list preview** that compiles all ingredients from selected dishes
- **One-click addition** to main grocery list

### 📝 Page 2: Manual Grocery List Manager
- **Add individual grocery items** with quantity, notes, and frequency
- **Frequency options**: Daily, Weekly, Biweekly, Monthly
- **Smart filtering** by frequency with color-coded badges
- **Checkbox system** to mark purchased items
- **Due date tracking** with overdue notifications
- **Delete functionality** for unwanted items

### 🔔 Page 3: Reminders + Grocery Patterns
- **Upcoming groceries** sorted by due date or frequency
- **Overdue item alerts** with visual indicators
- **Frequently bought items** tracking with usage counts
- **Purchase history** with timestamps
- **Smart patterns recognition** for better grocery planning
- **Toggle views** for frequently bought items

### 🧩 Additional Features
- **localStorage persistence** - no login required, data saved locally
- **Responsive design** - works perfectly on desktop, tablet, and mobile
- **Modern UI/UX** with smooth animations and beautiful gradients
- **Modular architecture** with reusable components
- **TypeScript** for type safety and better development experience

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd grocery-list-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   The application will open automatically at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 🎯 How to Use

### Getting Started with Dishes
1. **Search for a dish**: Use the search bar on the Dishes page
2. **Select dishes**: Click "Select Dish" on any dish card
3. **Edit ingredients**: Click the ✏️ button to modify ingredients if needed
4. **Preview**: See all ingredients compiled in the grocery preview
5. **Add to list**: Click "Add to Grocery List" to move ingredients to your main list

### Adding Manual Items
1. **Go to Manual page**: Click the 📝 Manual tab
2. **Fill the form**: Add item name, quantity (optional), notes (optional), and frequency
3. **Submit**: Click "Add Item" to add to your grocery list
4. **Filter**: Use frequency filters to view specific categories
5. **Mark as purchased**: Check the checkbox when you buy an item

### Managing Reminders
1. **View upcoming**: Check the 🔔 Reminders page for due items
2. **Sort options**: Sort by due date or frequency
3. **Track patterns**: See your most frequently bought items
4. **View history**: Check your purchase history at the bottom

### Adding Custom Dishes
1. **Search for non-existent dish**: If no results found, click "Add New Dish"
2. **Fill details**: Enter dish name and ingredients
3. **Add ingredients**: Use "+" button to add more ingredient fields
4. **Save**: The dish will be automatically selected and saved for future use

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DishCard.ts     # Dish display components
│   └── GroceryItem.ts  # Grocery item and reminder components
├── data/               # Data management
│   └── dishDatabase.ts # Multi-cuisine dish database
├── utils/              # Utility functions
│   └── storage.ts      # localStorage management
├── styles/             # CSS styles
│   └── main.css       # Main stylesheet
├── types.ts           # TypeScript type definitions
├── app.ts            # Main application logic
└── main.ts           # Application entry point
```

## 🛠️ Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Vanilla JS/TS** - No framework dependencies for simplicity
- **CSS3** - Modern styling with gradients and animations
- **localStorage** - Client-side data persistence
- **CSS Grid & Flexbox** - Responsive layout system

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+) - Full feature layout
- **Tablet** (768px-1199px) - Adapted grid layouts
- **Mobile** (320px-767px) - Single column layout with touch-friendly controls

## 🎨 UI/UX Features

- **Modern gradient themes** with smooth color transitions
- **Smooth animations** for page transitions and interactions
- **Hover effects** and visual feedback for all interactive elements
- **Color-coded frequency badges** for easy identification
- **Overdue alerts** with red highlighting
- **Modal dialogs** for adding custom dishes
- **Loading states** and smooth transitions

## 🔧 Customization

### Adding More Dishes
Edit `src/data/dishDatabase.ts` to add more dishes to the database:

```typescript
{
    id: 'unique-id',
    name: 'Dish Name',
    cuisine: 'Cuisine Type',
    ingredients: ['ingredient1', 'ingredient2', 'ingredient3']
}
```

### Styling
Modify `src/styles/main.css` to customize colors, fonts, and layouts.

### Functionality
Extend `src/app.ts` to add new features or modify existing behavior.

## 📊 Data Storage

All data is stored locally using `localStorage`:
- **Grocery items** with purchase history and frequency tracking
- **Custom dishes** created by users
- **Frequent items** with usage statistics
- **Purchase history** for pattern analysis

No server or external database required!

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- None currently! Please report any bugs you find.

## 🔮 Future Enhancements

- [ ] Import/export grocery lists
- [ ] Recipe scaling for different serving sizes
- [ ] Nutritional information integration
- [ ] Shopping list sharing
- [ ] Dark mode theme
- [ ] Voice input for adding items
- [ ] Barcode scanning integration
- [ ] Store location integration

---

**Enjoy your organized grocery shopping! 🛒✨** 
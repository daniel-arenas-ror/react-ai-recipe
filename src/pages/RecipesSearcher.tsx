import React, { useState, useEffect, useRef } from 'react';

const RecipesSearcher: React.FC = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef(null);

  const allIngredients = [
    'chicken', 'beef', 'pork', 'fish', 'shrimp', 'eggs', 'milk', 'cheese',
    'butter', 'flour', 'sugar', 'salt', 'pepper', 'onion', 'garlic', 'tomato',
    'potato', 'carrot', 'broccoli', 'spinach', 'rice', 'pasta', 'bread',
    'lemon', 'lime', 'apple', 'banana', 'orange', 'grapes', 'strawberries',
    'olive oil', 'soy sauce', 'vinegar', 'honey', 'mustard', 'ketchup',
    'oregano', 'basil', 'thyme', 'rosemary', 'cumin', 'paprika', 'chili powder'
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setIngredientInput(value);

    if (value.length > 1) { // Start suggesting after 1 character
      const filteredSuggestions = allIngredients.filter(
        (ingredient) =>
          ingredient.toLowerCase().includes(value.toLowerCase()) &&
          !ingredients.includes(ingredient.toLowerCase()) // Don't suggest already added ingredients
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleAddIngredient = (ingredientToAdd = ingredientInput) => {
    const trimmedInput = ingredientToAdd.trim();
    if (trimmedInput && !ingredients.includes(trimmedInput.toLowerCase())) {
      setIngredients([...ingredients, trimmedInput.toLowerCase()]);
      setIngredientInput('');
      setSuggestions([]); // Clear suggestions after adding
      setShowSuggestions(false); // Hide suggestions
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    handleAddIngredient(suggestion);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 font-sans text-gray-800 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8">
        <div className="relative flex flex-col sm:flex-row gap-4 mb-6" ref={inputRef}>
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
            placeholder="Add an ingredient (e.g., chicken, pasta, tomato)"
            value={ingredientInput}
            onChange={handleInputChange}
            onFocus={() => ingredientInput.length > 1 && setSuggestions(allIngredients.filter(ing => ing.toLowerCase().includes(ingredientInput.toLowerCase()) && !ingredients.includes(ing.toLowerCase())))}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddIngredient();
              }
            }}
          />

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full sm:w-[calc(100%-160px)] bg-white border border-gray-300 rounded-lg shadow-lg mt-1 top-full max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-3 cursor-pointer hover:bg-emerald-100 border-b border-gray-200 last:border-b-0"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipesSearcher;

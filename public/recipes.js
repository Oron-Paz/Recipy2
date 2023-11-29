// recipes.js (Frontend JavaScript)
document.getElementById('recipe-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(document.getElementById('recipe-form'));
  const newRecipe = {
    dishName: formData.get('dishName'),
    dishDescription: formData.get('dishDescription'),
    dishIngredients: formData.get('dishIngredients'),
    dishRecipe: formData.get('dishRecipe'),
  };

  // Send the new recipe to your Express.js API for storage
  fetch('/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRecipe),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle success (e.g., display the new recipe)
      displayRecipe(data);
    })
    .catch((error) => {
      // Handle error
      console.error('Error:', error);
    });
});

// Function to display a recipe
function displayRecipe(recipe) {
  const recipeList = document.getElementById('recipe-list');
  const recipeCard = document.createElement('div');
  recipeCard.innerHTML = `
    <h2>${recipe.dishName}</h2>
    <p>${recipe.dishDescription}</p>
    <p><strong>Ingredients:</strong> ${recipe.dishIngredients}</p>
    <p><strong>Recipe:</strong> ${recipe.dishRecipe}</p>
  `;
  recipeList.appendChild(recipeCard);
}

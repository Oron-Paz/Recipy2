// script.js

document.addEventListener("DOMContentLoaded", function() {
  const userInput = document.getElementById("userInput");
  const chatButton = document.getElementById("chatButton");
  const dishName = document.getElementById("dishName");
  const dishDescription = document.getElementById("dishDescription");
  const dishIngridients = document.getElementById("dishIngridients");
  const dishRecipe = document.getElementById("dishRecipe");


  chatButton.addEventListener("click", createRecipeFunc);
  userInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      createRecipeFunc();
    }
  });


  async function createRecipeFunc() {
    const userMessage = userInput.value;

    if (userMessage.trim() !== "") {
      // Clear previous responses
      dishName.innerHTML = "Processing...";
      try {
        const response = await fetch("/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userMessage }),
        });

        if (response.ok) {
          const data = await response.json();
          if(data.dishName==='undefined' ||data.dishDescription ==='undefined' || data.dishIngridients==='undefined' || dishRecipe==='undefined' ){
            dishName.innerHTML = "Please enter food ingridients or food related input"
          }
          else{
          dishName.innerHTML = data.dishName;
          dishDescription.innerHTML = data.dishDescription;
          dishIngridients.innerHTML = data.dishIngridients;
          dishRecipe.innerHTML = data.dishRecipe;
          }
        } else {
          dishName.innerHTML = "Error: Failed to fetch response";
        }
      } catch (error) {
        console.error("Error:", error);
        dishName.innerHTML = "Error: " + error.message;
      }
    }
  };
});

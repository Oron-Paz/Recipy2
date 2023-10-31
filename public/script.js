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



const userInput = document.getElementById('userInput');
const words = ['Whats in your fridge?', 'Name some ingridients:', 'What are you hungry for?', 'Whats your favorite combo?']; // Array of random words
const typeInterval = 70; // Interval between typing each character (in milliseconds)

let wordIndex = 0;
let charIndex = 0;
let animationTimeout;

function autoTypePlaceholder() {
    if (charIndex < words[wordIndex].length) {
        const currentPlaceholder = userInput.getAttribute('placeholder');
        userInput.setAttribute('placeholder', currentPlaceholder + words[wordIndex][charIndex]);
        charIndex++;
        animationTimeout = setTimeout(autoTypePlaceholder, typeInterval);
    } else {
        animationTimeout = setTimeout(erasePlaceholder, 1000); // Wait for 1 second before erasing
    }
}

function erasePlaceholder() {
    if (charIndex > 0) {
        const currentPlaceholder = userInput.getAttribute('placeholder');
        const newPlaceholder = currentPlaceholder.slice(0, -1);
        userInput.setAttribute('placeholder', newPlaceholder);
        charIndex--;
        animationTimeout = setTimeout(erasePlaceholder, typeInterval / 1.5);
    } else {
        wordIndex = (wordIndex + 1) % words.length; // Cycle through words
        animationTimeout = setTimeout(autoTypePlaceholder, 750);
    }
}

// Clear placeholder on input focus and stop animation
userInput.addEventListener('focus', function () {
    userInput.setAttribute('placeholder', '');
    clearTimeout(animationTimeout); // Stop the animation
});

// Resume animation on input blur (when focus is lost)
userInput.addEventListener('blur', function () {
    charIndex = 0;
    wordIndex = (wordIndex + 1) % words.length;
    autoTypePlaceholder(); // Resume the animation
});

// Start the auto-typing effect when the page loads
autoTypePlaceholder();
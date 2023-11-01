// script.js
//--------------------------------------------------------------------------------//
//THIS IS THE COMPLEX EXPRESS/OPENAI API STUFF IDK BUT IT WORKS SO DONT TOUCH UNLESS NEED//
//--------------------------------------------------------------------------------//

document.addEventListener("DOMContentLoaded", function() {
  const userInput = document.getElementById("userInput");
  const chatButton = document.getElementById("chatButton");
  const dishName = document.getElementById("dishName");
  const dishDescription = document.getElementById("dishDescription");
  const dishIngridients = document.getElementById("dishIngridients");
  const dishRecipe = document.getElementById("dishRecipe");


  chatButton.addEventListener("click", createRecipeFunc, );
  userInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      createRecipeFunc();
    }
  });


  async function createRecipeFunc() {
    const userMessage = userInput.value;
    if (userMessage.trim() !== "") {
      document.querySelector('.outputAI').classList.add('outputAIAfterCreation');
      // Clear previous responses
      dishName.classList.add('processingInput');
      dishName.innerHTML = "Processing";
      for (let i = 0; i < 3; i++) {
        const dots = document.createElement('span');
        dots.classList.add('dot');
        dots.textContent = '.';
        dishName.appendChild(dots);
    }
    dishName.textContent += `\t (this may take a minute or two)`
      try {
        const response = await fetch("/api/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userMessage }),
        });

        if (response.ok) {
          dishName.classList.remove('processingInput');
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
          dishName.classList.remove('processingInput');
          dishName.innerHTML = "Error: Failed to fetch response";
        }
      } catch (error) {
        console.error("Error:", error);
        dishName.innerHTML = "Error: " + error.message;
      }
    }
  };
});

//--------------------------------------------------------------------------------//
//Below is the autoTyper animation thing also dont touch cus it works :)
//--------------------------------------------------------------------------------//

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

//--------------------------------------------------------------------------------//
//Other cooky stuff
//--------------------------------------------------------------------------------//

//change the color of the navbar->
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 160) {
      navbar.classList.add('orange');
  } else {
      navbar.classList.remove('orange');
  }
});
// Prevent scrolling beyond the top of the website
  
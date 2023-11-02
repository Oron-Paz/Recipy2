window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 120) {
      navbar.classList.add('orange');
      console.log("YOU DID IT!");
  } else {
      navbar.classList.remove('orange');
  }
});
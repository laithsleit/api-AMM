function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
      } else {
          reveals[i].classList.remove("active");
      }
  }
}

window.addEventListener("scroll", reveal);

/// login buuton --- log out
document.addEventListener("DOMContentLoaded", function() {
  const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";
  const loginButton = document.getElementById('Login');

  if (isLoggedIn) {
      // If the user is logged in, change button text to "Logout" and set the click event
      loginButton.textContent = 'Logout';
      loginButton.href = '#';

      loginButton.addEventListener('click', function() {

          sessionStorage.removeItem("isLoggedin");

          window.location.href = '../login/signup.html';
      });
  } else {
      loginButton.textContent = 'Login';
      loginButton.href = '../login/signup.html';
  }
});


///////////////////////////////////////////////////////////

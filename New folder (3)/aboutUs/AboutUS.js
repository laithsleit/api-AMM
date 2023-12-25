document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";
    const loginButton = document.getElementById('Login');
  
    if (isLoggedIn) {
        // If the user is logged in, change button text to "Logout" and set the click event
        loginButton.textContent = 'Logout';
        loginButton.addEventListener('click', function() {
  
          sessionStorage.clear();
          window.location.href = '../login/signup.html';
          
        });
    } else {
        loginButton.textContent = 'Login';
        loginButton.href = "../login/signup.html";
    }
  });
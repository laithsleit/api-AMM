document.addEventListener("DOMContentLoaded", function() {
  const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";
  const loginButton = document.getElementById('Login');
  const profileLink = document.querySelector('.profile-link');

  if (isLoggedIn) {
    // If the user is logged in, change button text to "Logout" and set the click event
    loginButton.textContent = 'Logout';
    loginButton.addEventListener('click', function() {
      sessionStorage.clear();
      window.location.href = '../login/signup.html';
    });

    // Show the profile link
    profileLink.style.display = 'block';
  } else {
    loginButton.textContent = 'Login';
    loginButton.href = "../login/signup.html";

    // Hide the profile link
    profileLink.style.display = 'none';
  }
});
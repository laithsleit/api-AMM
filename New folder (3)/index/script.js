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


// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function reviewUsers() {
  fetch('http://localhost/api-AMM/api/Review/ReviewSelect.php', {
    method: 'GET',
  })
  .then(response => response.json()) // Parse the JSON from the response
  .then(data => {
    console.log(data);

    // Shuffle and slice the reviews to get only 4
    const shuffledReviews = shuffleArray(data.reviews).slice(0, 4);

    const reviewsList = document.querySelector('.review-container');
    reviewsList.innerHTML = "";

    // Iterate over only the first 4 (shuffled) reviews
    shuffledReviews.forEach(reviewData => {
      let reviewCard = document.createElement('div');
      reviewCard.className = "review-card";

      let ratingHTML = "";
      for (let j = 1; j <= reviewData.Rating; j++) {
        ratingHTML += `<input class="rating" type="radio" value="${j}" checked><label>&#9733;</label>`;
      }
      reviewCard.innerHTML = 
      `<div class="client_info">
          <div class="client_name">
            <h5>${reviewData.Username}</h5>
          </div>
        </div>
        <div class="rating">
          ${ratingHTML}
        </div>
        <p>About : "${reviewData.ProductName}"</p>
        <p>"${reviewData.ReviewText}"</p>
      </div>`;

      reviewsList.appendChild(reviewCard);
    });
  })
  .catch(error => {
    console.error('Error fetching the reviews:', error);
  });
}


reviewUsers();

///////////////////////////////////////////////////////////

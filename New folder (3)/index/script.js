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
      loginButton.addEventListener('click', function() {

        sessionStorage.clear();
        window.location.href = '../login/signup.html';
        
      });
  } else {
      loginButton.textContent = 'Login';
      loginButton.href = "../login/signup.html";
  }
});


async function reviewUsers() {
  const response = await fetch('http://localhost/api-AMM/api/Review/ReviewSelect.php', {
    method: 'GET',
  });
  const data = await response.json();
  console.log(data)

  const reviewsList = document.querySelector('.review-container');
  reviewsList.innerHTML = "";

  for (let i = 0; i < data.reviews.length; i++) {
    const reviewData = data.reviews[i];

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
      <p>About : "${reviewData.ProductName} "</p>
      <p>" ${reviewData.ReviewText} "</p>
    </div>`;

    reviewsList.appendChild(reviewCard);
  }

  return data;
}

reviewUsers();

///////////////////////////////////////////////////////////

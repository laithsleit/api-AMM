const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";

if (!isLoggedIn) {
    window.location.href = "../signup.html";
} 
const logoutLink = document.querySelector('.logout');
logoutLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    sessionStorage.removeItem("isLoggedin"); // Remove the isLoggedIn item from sessionStorage
    window.location.href = "../signup.html"; // Redirect to the signup (or login) page
});


const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i=> {
            i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
    });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
});

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if(window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if(searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

if(window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if(this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
    if(this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

// Function to fetch reviews from API
function fetchReviews() {
    return fetch('http://localhost/api-AMM/api/Review/ReviewSelect.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
            return [];
        });
}

// Function to generate star rating HTML
function generateStarRating(rating) {
    var starHTML = "";
    for (var i = 1; i <= 5; i++) {
        starHTML += `<span class="text-${i <= rating ? "warning" : "secondary"}">&#9733;</span>`;
    }
    return starHTML;
}

// Function to update the table with review data
function updateReviewsTable() {
    fetchReviews()
        .then(response => {
            const reviews = response.reviews;
            const tableBody = document.querySelector('.table-data tbody');
            tableBody.innerHTML = '';

            reviews.forEach(review => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>
                        <p>${review.Username}</p>
                    </td>
                    <td>${review.ProductName}</td>
                    <td>${review.ReviewText}</td>
                    <td>
                        <div id="ratingStars${review.ReviewID}" class="float-right">
                            ${generateStarRating(review.Rating)}
                        </div>
                    </td>
                    <td>
                        <a class="delete-review" href="#${review.ReviewID}" data-review-id="${review.ReviewID}">
                            <span class="pending status">
                                <i class='bx bxs-trash'></i>Delete
                            </span>
                        </a>
                    </td>
                `;
                tableBody.appendChild(newRow);
            });
        })
        .catch(error => {
            console.error('Error updating reviews table:', error);
        });
}


// Function to delete a review by ID
function deleteReview(reviewID) {
  // Add a confirmation dialog before deleting
  if (confirm('Are you sure you want to delete this review?')) {
      fetch(`http://localhost/api-AMM/api/Review/ReviewDelete.php?reviewID=${reviewID}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log('Review deleted successfully:', data.message);
          updateReviewsTable();
      })
      .catch(error => {
          console.error('Error deleting review:', error.message);
      });
  }
}

// Event listener for delete button clicks using event delegation
document.addEventListener('DOMContentLoaded', () => {
  updateReviewsTable();

  document.addEventListener('click', function (event) {
      if (event.target.matches('.delete-review') || event.target.closest('.delete-review')) {
          event.preventDefault(); // Prevent the default link behavior
          const reviewElement = event.target.closest('.delete-review');
          const reviewID = reviewElement.getAttribute('data-review-id');
          deleteReview(reviewID);
      }
  });
});


const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";

if (!isLoggedIn) {
    window.location.href = "../signup.html";
} 

document.addEventListener("DOMContentLoaded", function () {
    // Get the plus icon, close icon, and the popup form
    const addUserButton = document.getElementById("addUserButton");
    const closeUserForm = document.getElementById("closeUserForm");
    const userPopupForm = document.getElementById("userPopupForm");
    const overlay = document.getElementById("overlay");

    // Show the popup form when the plus icon is clicked
    addUserButton.addEventListener("click", function () {
        userPopupForm.classList.add("active");
        overlay.classList.add("active");
    });

    // Hide the popup form when the close icon is clicked
    closeUserForm.addEventListener("click", function () {
        userPopupForm.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Hide the popup form when the overlay is clicked
    overlay.addEventListener("click", function () {
        userPopupForm.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Prevent clicks inside the form from closing the form
    userPopupForm.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Handle form submission
    const createUserForm = document.getElementById("createUserForm");

    createUserForm.addEventListener("submit", function (event) {
        event.preventDefault();
        userPopupForm.classList.remove("active");
        overlay.classList.remove("active");
    });
    createUserForm.addEventListener("submit", function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the input values from the form
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;

        // Create a data object to send in the POST request
        const data = {
            Username: username,
            Password: password,
            Email: email
        };

        // Send a POST request using the Fetch API
        fetch('http://localhost/api-amm/api/user/insert.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            // Display the response message in an alert
            alert(data.message);
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            // Display an error message in case of a network issue or other error
            alert('An error occurred. Please try again.');
        });
    });
});



const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







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
})





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
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})
// Function to fetch data from the API
function fetchData() {
    fetch('http://localhost/api-AMM/api/user/select.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the parsed JSON data
            console.log('Data:', data);
            updateUsersTable(data);
        })
        .catch(error => {
            // Check if response is defined before accessing its properties
            const responseStatus = error.response ? error.response.status : 'N/A';
            console.error(`Error fetching users: ${error.message}`, 'Response status:', responseStatus);

            // If there's no response object, handle the error accordingly
            if (!error.response) {
                console.error('Network error or invalid JSON response.');
            }
        });
}

// Function to update the users table
// Function to update the users table
function updateUsersTable(users) {
    const tableBody = document.querySelector('.table-data tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Loop through users and add rows to the table
    users.forEach(user => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>
                <p>${user.Username}</p>
            </td>
            <td>${user.Email}</td>
            <td>
            <a class="delete-user" data-user-id="${user.UserID}">
                    <span class="pending status">
                        <i class='bx bxs-trash'></i>Delete
                    </span>
                </a>
            </td>
        `;

        // Append the new row to the table body
        tableBody.appendChild(newRow);
    });

    // Attach event listener to the delete user links
    const deleteLinks = document.querySelectorAll('.delete-user');
    deleteLinks.forEach(link => {
        link.addEventListener('click', function () {
            const userId = this.getAttribute('data-user-id');
            const confirmed = confirm('Are you sure you want to delete this user?');

            if (confirmed) {
                // User confirmed, send a request to delete the user
                deleteUser(userId);
            }
        });
    });
}

// Function to delete a user by ID
function deleteUser(userId) {
    fetch('http://localhost/api-AMM/api/user/delete.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserID: userId }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('User deleted successfully:', data.message);
            // Refresh the users table after deletion
            fetchData();
        })
        .catch(error => {
            console.error('Error deleting user:', error.message);
        });
}


// Fetch data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});








document.getElementById('searchInput').addEventListener('keyup', function (event) {
    // Get the value from the search input
    const searchQuery = event.target.value;

    // Make a Fetch API request to the endpoint with the search query
    fetch('http://localhost/api-AMM/api/searchUser/userSearch.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            searchInput: searchQuery, // Change to match the API input property
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data and update the UI
        updateUsersTable(data.users); // Change to match the API response property
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
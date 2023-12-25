document.addEventListener('DOMContentLoaded', function() {
    var userId = sessionStorage.getItem("UserID");

    if (!userId) {
        // Redirect to login or show error message
        userId=9
    }

    // Fetch and populate user data
    fetchUserData(userId);

    // Form submission event listener
    var form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitUpdatedUserData(userId);
    });
});

function fetchUserData(userId) {
    fetch('http://localhost/api-AMM/api/user/select.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserID: userId })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('username').value = data.username;
        document.getElementById('email').value = data.email;
        // Do not populate the password field
    })
    .catch(error => console.error('Error fetching user data:', error));
}

function submitUpdatedUserData(userId) {
    var updatedUserData = {
        UserID: userId,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.querySelector('[name="password"]').value,
    };

    fetch('http://localhost/api-AMM/api/user/update.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUserData)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}

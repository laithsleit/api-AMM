document.addEventListener("DOMContentLoaded", function() {
    // Validation flags
    let isUsernameValid = false;
    let isEmailValid = false;
    let isPasswordValid = false;
    let isLoginUsernameValid = false;
    let isLoginPasswordValid = false;

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    const signIn = document.getElementById("signin");
    signIn.addEventListener("click", (event) => {
        event.preventDefault();
    if (!isLoginUsernameValid || !isLoginPasswordValid) {
        alert("Your login details are incorrect or incomplete. Please ensure all fields are filled out correctly.");
        return;
    }

        var username = document.getElementById("Username1").value;
        var password = document.getElementById("password1").value;
        var user = {
            Username: username,
            Password: password
        };
        // console.log(user);

        fetch("http://localhost/api-AMM/api/login/login.php", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                if (data.success == true) {
                    console.log('Login successful');
                    sessionStorage.setItem("UserID", data.UserID);
                    sessionStorage.setItem("RoleID", data.RoleID);

                    if (data.RoleID == 2) {
                        window.location.href = "../index/index.html";
                        sessionStorage.setItem("isLoggedin", "true");
                    } else if (data.RoleID == 1) {
                        window.location.href = "../dashboard/index.html";
                        sessionStorage.setItem("isLoggedin", "true");
                    } else {
                        alert("Invalid Role");
                    }
                } else {
                    alert("Message:" + data.message);
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    });

    const signUp = document.getElementById("signup");
    signUp.addEventListener("click", (event) => {
        event.preventDefault();
        if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
          alert("Your signup details are incorrect or incomplete. Please ensure all fields are filled out correctly and meet the requirements.");
          return;
        }

        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var newUser = {
            Username: username,
            Email: email,
            Password: password
        };
        // console.log(newUser);

        fetch("http://localhost/api-AMM/api/login/signup.php", {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                if (data.success === true) {
                    console.log('Signup successful');
                    alert("Signup successful. You can now log in.");
                    window.location.reload();

                } else {
                    alert("Signup failed: " + data.message);
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    });

    // Validation logic
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const loginUsername = document.getElementById('Username1');
    const loginPassword = document.getElementById('password1');

    loginUsername.addEventListener('keyup', function () {
        validateLoginUsername(loginUsername.value);
    });
    
    loginPassword.addEventListener('keyup', function () {
        validateLoginPassword(loginPassword.value);
    });

    function validateLoginUsername(input) {
        const regex = /^(?=.*[A-Za-z]).{6,}$/;
        const message = "Username should be more than 6 letters, and least one uppercase letter.";
        displayValidationMessage('loginUsernameError', input, regex, message, 'isLoginUsernameValid');
    }

    function validateLoginPassword(input) {
        const regex = /^(?=.*[A-Za-z]).{6,}$/;
        const message = "Password must be at least 6 characters, and at least one uppercase letter, numbers.";
        displayValidationMessage('loginPasswordError', input, regex, message, 'isLoginPasswordValid');
    }

    username.addEventListener('keyup', function () {
        validateUsername(username.value);
    });

    email.addEventListener('keyup', function () {
        validateEmail(email.value);
    });

    password.addEventListener('keyup', function () {
        validatePassword(password.value);
    });

    function validateUsername(input) {
        const regex = /^(?=.*[A-Za-z]).{6,}$/;;
        const message = "Username must be at least 6 characters long and include at least one letter.";
        displayValidationMessage('usernameError', input, regex, message, 'isUsernameValid');
    }

    function validateEmail(input) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const message = "Inter a valid email Adress.";
        displayValidationMessage('emailError', input, regex, message, 'isEmailValid');
    }

    function validatePassword(input) {
        const regex = /^(?=.*[A-Za-z]).{6,}$/;
        const message = "Write at least 6 characters, and at least one uppercase letter";
        displayValidationMessage('passwordError', input, regex, message, 'isPasswordValid');
    }

    function displayValidationMessage(elementId, input, regex, message, validationFlag) {
        const errorElement = document.getElementById(elementId);
        if (!regex.test(input)) {
            errorElement.textContent = message; // Display the validation message
            // Set the appropriate flag to false based on validationFlag
            switch (validationFlag) {
                case 'isUsernameValid':
                    isUsernameValid = false;
                    break;
                case 'isEmailValid':
                    isEmailValid = false;
                    break;
                case 'isPasswordValid':
                    isPasswordValid = false;
                    break;
                case 'isLoginUsernameValid':
                    isLoginUsernameValid = false;
                    break;
                case 'isLoginPasswordValid':
                    isLoginPasswordValid = false;
                    break;
            }
        } else {
            errorElement.textContent = ''; // Clear the validation message
            // Set the appropriate flag to true based on validationFlag
            switch (validationFlag) {
                case 'isUsernameValid':
                    isUsernameValid = true;
                    break;
                case 'isEmailValid':
                    isEmailValid = true;
                    break;
                case 'isPasswordValid':
                    isPasswordValid = true;
                    break;
                case 'isLoginUsernameValid':
                    isLoginUsernameValid = true;
                    break;
                case 'isLoginPasswordValid':
                    isLoginPasswordValid = true;
                    break;
            }
        }
        // For debugging: log the current status of the flag
        console.log(`${validationFlag}:`, window[validationFlag]);
    }
    
});

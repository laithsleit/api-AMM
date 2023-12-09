document.addEventListener("DOMContentLoaded", function () {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    // Validation functions
    const validateUsername = (username) => {
        // Check if the username is not empty
        if (!username.trim()) {
            return false; // Username is empty
        }

        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        return alphanumericRegex.test(username);
    };
    

    const validateEmail = (email) => {
        // Regular expression for a simple email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    

    const validatePassword = (password) => {
       // Check if the password is not empty
        return password.length >= 6 && /[a-z]/.test(password) && /[A-Z]/.test(password);
    };

    const updateErrorMessage = (elementId, isValid, errorMessage) => {
        const errorElement = document.getElementById(elementId);
        const smallElement = errorElement.querySelector('small');

        if (isValid) {
            smallElement.textContent = '';
        } else {
            switch (elementId) {
                case "usernameRegex":
                case "Username1Regex":
                    smallElement.textContent = "Invalid username. Username should contain only alphanumeric characters and cannot be empty.";
                    break;
                case "emailRegex":
                    smallElement.textContent = "Invalid email. Please provide a valid email address.";
                    break;
                case "passwordRegex":
                case "password1Regex":
                    smallElement.textContent = "Invalid password. Password should be at least 6 characters long and must contain both uppercase and lowercase letters.";
                    break;
                default:
                    smallElement.textContent = errorMessage;
            }
        }
    };
    

    const signIn = document.getElementById("signin");
    signIn.addEventListener("click", (event) => {
        event.preventDefault();
        var username = document.getElementById("Username1").value;
        var password = document.getElementById("password1").value;
        console.log(username, password);

        // Validate username and password
        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);

        // Update error messages
        updateErrorMessage("Username1Regex", isUsernameValid, "Invalid username");
        updateErrorMessage("password1Regex", isPasswordValid, "Invalid password");

        if (isUsernameValid && isPasswordValid) {
            // Continue with login logic
            var user = { Username: username, Password: password };
            console.log(user);

            fetch("http://localhost/api-AMM/api/login/login.php", {
                method: "POST",
                body: JSON.stringify(user),
                headers: { "Content-Type": "application/json" }
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then((data) => {
                    if(data.success == true){
                        console.log('Login successful');
                        console.log('Role:', data.RoleID);
                        sessionStorage.setItem("UserID", data.UserID);
                        sessionStorage.setItem("RoleID", data.RoleID);
                        console.log('User ID:', data.UserID);
                    
                        if (data.RoleID == 2) {

                            window.location.href = "HOMa.html";
                            sessionStorage.setItem("isLoggedin", "true");
                        } else if (data.RoleID == 1){

                            window.location.href = "index.html";
                            sessionStorage.setItem("isLoggedin", "true");

                        } else {
                            alert("Invalid Role");
                        }

                    } else {
                        alert("Invalid username or password");   
                    }


                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        }
    });

    const signUp = document.getElementById("signup");
    signUp.addEventListener("click", (event) => {
        event.preventDefault();
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        console.log(username, email, password);

        // Validate username, email, and password
        const isUsernameValid = validateUsername(username);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        // Update error messages
        updateErrorMessage("usernameRegex", isUsernameValid, "Invalid username");
        updateErrorMessage("emailRegex", isEmailValid, "Invalid email");
        updateErrorMessage("passwordRegex", isPasswordValid, "Invalid password");

        if (isUsernameValid && isEmailValid && isPasswordValid) {
            // Continue with signup logic
            var newUser = { Username: username, Email: email, Password: password };
            console.log(newUser);

            fetch("http://localhost/api-AMM/api/login/signup.php", {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: { "Content-Type": "application/json" }
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
                        console.log('User ID:', data.UserID);
                        alert("Signup successful. You can now log in.");
                    } else {
                        alert("Signup failed: " + data.message);
                    }
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        }
    });
});

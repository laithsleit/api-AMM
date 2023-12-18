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

 




    const signIn = document.getElementById("signin");
    signIn.addEventListener("click", (event) => {
        event.preventDefault();
        var username = document.getElementById("Username1").value;
        var password = document.getElementById("password1").value;
        

        
        
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
                        // console.log('Role:', data.RoleID);
                        sessionStorage.setItem("UserID", data.UserID);
                        sessionStorage.setItem("RoleID", data.RoleID);
                        // console.log('User ID:', data.UserID);
                    
                        if (data.RoleID == 2) {

                            window.location.href = "../index/index.html";
                            sessionStorage.setItem("isLoggedin", "true");
                        } else if (data.RoleID == 1){

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
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        console.log(username, email, password);

    

        // Update error messages
        
    
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
        
    });
});

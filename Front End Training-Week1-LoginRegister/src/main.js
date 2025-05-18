const users = [];
function showLogin() {
    toggleForms("login");
}

function showRegister() {
    toggleForms("register");
}

function toggleForms(type) {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    if (type === "login") {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    } else {
        registerForm.style.display = "block";
        loginForm.style.display = "none";
    }
}

function validateEmptyFields(formElement) {
    const inputs = formElement.querySelectorAll("input[type='text'], input[type='password']");
    let isValid = true;

    hideAllErrors(formElement);

    inputs.forEach(input => {
        if (input.value.trim() === "") {
        showError(input);
        isValid = false;
        }
    });

    return isValid;
}



function showError(inputElement) {
    const parent = inputElement.closest(".input-box");
    const errorDiv = parent.querySelector(".error");
    if (errorDiv) {
        errorDiv.style.display = "block";
    }
    inputElement.classList.add("error-border");
}

function setErrorMessage(inputElement, message, isSecondary = false) {
    const parent = inputElement.closest(".input-box");
    const errorDiv = parent.querySelector(".error");
    if (errorDiv) {
        errorDiv.style.display = "block";
        errorDiv.querySelector("p").innerHTML = message;

        if (isSecondary) {
            errorDiv.classList.add("error-secondary");
        } else {
            errorDiv.classList.remove("error-secondary");
        }
    }
    inputElement.classList.add("error-border-2");
}

function hideAllErrors(formElement) {
    const errors = formElement.querySelectorAll(".error");
    errors.forEach(el => el.style.display = "none");

    const inputs = formElement.querySelectorAll("input");
    inputs.forEach(input => input.classList.remove("error-border"));
}

window.showLogin = showLogin;
window.showRegister = showRegister;

document.addEventListener("DOMContentLoaded", () => {
    toggleForms("register"); 

    // Register
    const registerForm = document.querySelector("#registerForm form");
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const valid = validateEmptyFields(registerForm);
        if (valid) {
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();
            const checkbox = document.getElementById("agree-to-all-terms");
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!emailValid) {
                setErrorMessage(document.getElementById("email"), "Invalid email format", true);
                return;
            }


            const passwordValid = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
            if (!passwordValid) {
                setErrorMessage(document.getElementById("password"), "Password needs to have a minimal of 8 characters, 1 uppercase and <br>1 symbol", true);
                return;
            }

            if (password !== confirmPassword) {
                setErrorMessage(document.getElementById("confirm-password"), "Passwords do not match", true);
                return;
            }

            if (!checkbox.checked) {
                alert("Please agree to all terms and conditions.");
                return;
            }

            //array find method
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                setErrorMessage(document.getElementById("email"), "Email already exists", true);
                return;
            }

            users.push({ name, email, password });

            console.log("List of users:");
            //array map method di console log
            users.map((user, index) => {
                console.log(`${index + 1}. ${user.name} - ${user.email}`); // 1. John Doe - johndoe@gmail
            });

            alert("Registration successful! Please log in.");
            showLogin();
        }
    });

    // Login
    const loginForm = document.querySelector("#loginForm form");
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const valid = validateEmptyFields(loginForm);
        if (valid) {
            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value.trim();

            //array find method
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                alert(`Login successful! Welcome aboard, Capt. ${user.name}`);
            } else {
                alert("Email or password is incorrect!");
            }
        }

    });
});

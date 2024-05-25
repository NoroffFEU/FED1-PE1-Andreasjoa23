document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorContainer = document.getElementById('error-container');
    const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let errors = [];

        if (!validateEmail(emailInput.value)) {
            errors.push('Please enter a valid stud.noroff.no email address.');
        }
        if (!validateUsername(usernameInput.value)) {
            errors.push('Username must be at least 6 characters long and can only contain letters, numbers, and underscores.');
        }
        if (passwordInput.value.length < 8) {
            errors.push('Password must be at least 8 characters long.');
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            errors.push('Passwords do not match.');
        }
        if (errors.length > 0) {
            errorContainer.innerHTML = '<ul>' + errors.map(error => `<li>${error}</li>`).join('') + '</ul>';
        } else {
            errorContainer.innerHTML = '';

            var formData = {
                name: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };
            
            fetch("https://v2.api.noroff.dev/auth/register", {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('success: ', data);
                redirectToLogin();
            })
            .catch((error) => {
                console.error('error: ', error);
            });
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@stud\.noroff\.no$/;
        return emailRegex.test(email);
    }

    function validateUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_]{6,}$/;
        return usernameRegex.test(username);
    }

    
    showPasswordCheckbox.addEventListener('change', function() {
        const passwordType = showPasswordCheckbox.checked ? 'text' : 'password';
        passwordInput.type = passwordType;
        confirmPasswordInput.type = passwordType;
    });
});
function redirectToLogin() {
    window.location.href = 'login.html';
}
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorContainer = document.getElementById('error-container');
    const notificationContainer = document.getElementById('notification-container');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let errors = [];

        if (!emailInput.value.trim()) {
            errors.push('Email is required.');
        }

        if (!passwordInput.value.trim()) {
            errors.push('Password is required.');
        }

        if (errors.length > 0) {
            errorContainer.innerHTML = '<ul>' + errors.map(error => `<li>${error}</li>`).join('') + '</ul>';
        } else {
            const formData = {
                email: emailInput.value,
                password: passwordInput.value
            };

            fetch("https://v2.api.noroff.dev/auth/login", {
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

                localStorage.setItem('token', data.token);

                notificationContainer.innerHTML = '<p>Login successful. Welcome!</p>';

                setTimeout(() => {
                    notificationContainer.innerHTML = '';
                }, 5000);

                //window.location.href = "../post/edit.html";
            })
            .catch((error) => {
                console.error('error: ', error);
                errorContainer.innerHTML = '<p>Invalid email or password.</p>';
            });
        }
    });
});

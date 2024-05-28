import { showLoader, hideLoader } from '../components/loader.mjs';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorContainer = document.getElementById('error-container');
    const notificationContainer = document.getElementById('notification-container');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        errorContainer.innerHTML = ''; 
        notificationContainer.innerHTML = ''; 

        const formData = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };

        if (!formData.email || !formData.password) {
            errorContainer.innerHTML = '<p>Email and password are required.</p>';
            return;
        }
        showLoader();
        try {
            const response = await fetch("https://v2.api.noroff.dev/auth/login", {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401) {
                    throw new Error(errorData.message || 'Incorrect email or password.');
                } else {
                    throw new Error(errorData.message || 'Network response was not ok');
                }
            }

            const data = await response.json();
            const accessToken = data.data.accessToken;
            const username = data.data.name;

            if (!accessToken) {
                throw new Error('Token not found in response');
            }

            const userInfo = {
                email: formData.email,
                username: username,
                accessToken: accessToken
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            window.location.href = '../index.html';

        } catch (error) {
            console.error('Error:', error);
            errorContainer.innerHTML = `<p>${error.message}</p>`;
        } finally {
            hideLoader();
        }
    });
});
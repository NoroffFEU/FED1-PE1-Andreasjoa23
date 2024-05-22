document.addEventListener('DOMContentLoaded', function() {
    const loginNavLink = document.querySelector('nav ul li a[href="/account/login.html"]');
    const registerNavLink = document.querySelector('nav ul li a[href="/account/register.html"]');

    function updateNavBar() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo && userInfo.accessToken) {
            loginNavLink.textContent = 'Logout';
            loginNavLink.href = '#';
            registerNavLink.textContent = 'Edit';
            registerNavLink.href = '/post/edit.html';

            loginNavLink.addEventListener('click', function(event) {
                event.preventDefault();
                logout();
            });
        } else {
            loginNavLink.textContent = 'Login';
            loginNavLink.href = '/account/login.html';
            registerNavLink.textContent = 'Register';
            registerNavLink.href = '/account/register.html';
        }
    }

    function logout() {
        localStorage.removeItem('userInfo');

        loginNavLink.textContent = 'Login';
        loginNavLink.href = '/account/login.html';
        registerNavLink.textContent = 'Register';
        registerNavLink.href = '/account/register.html';
    }

    updateNavBar();
});
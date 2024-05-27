document.addEventListener('DOMContentLoaded', function() {
    const loginNavLink = document.querySelector('nav ul li a[href="/account/login.html"]');
    const registerNavLink = document.querySelector('nav ul li a[href="/account/register.html"]');

    function updateNavBar() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo && userInfo.accessToken) {
            loginNavLink.textContent = 'Logout';
            registerNavLink.textContent = 'Create Post';
            registerNavLink.href = '/post/create.html';

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

    const logout = () => { 
        localStorage.removeItem('userInfo');
        if (window.location.pathname === '/index.html') { 
            window.location.href = '/index.html';
        } else {
            window.location.href = '/post/index.html';
        }
    };
    updateNavBar();
});
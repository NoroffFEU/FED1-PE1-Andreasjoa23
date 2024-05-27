document.addEventListener('DOMContentLoaded', function() {
    const loginNavLink = document.getElementById('loginLink');
    const registerNavLink = document.getElementById('registerLink');

    function updateNavBar() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo && userInfo.accessToken) {
            loginNavLink.textContent = 'Logout';
            registerNavLink.textContent = 'Create Post';
            registerNavLink.href = './post/create.html';

            loginNavLink.addEventListener('click', function(event) {
                event.preventDefault();
                logout();
            });

        } else {
            loginNavLink.textContent = 'Login';
            loginNavLink.href = './account/login.html';
            registerNavLink.textContent = 'Register';
            registerNavLink.href = './account/register.html';
        }
    }

    const logout = () => { 
        localStorage.removeItem('userInfo');
        (window.location.pathname !== '../index.html'); {
            window.location.href = '../index.html';
        }
    };
    updateNavBar();
});
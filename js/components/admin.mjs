function getPrefix() {
    const url = window.location.href;
    if (url.includes('github.io')) {
        return '/FED1-PE1-Andreasjoa23';
    }
    return '';
}

document.addEventListener('DOMContentLoaded', function() {
    const prefix = getPrefix();

    const loginNavLink = document.querySelector(`nav ul li a[href="${prefix}/account/login.html"]`);
    const registerNavLink = document.querySelector(`nav ul li a[href="${prefix}/account/register.html"]`);

    function updateNavBar() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (loginNavLink && registerNavLink) {
            if (userInfo && userInfo.accessToken) {
                loginNavLink.textContent = 'Logout';

                registerNavLink.textContent = 'Create Post';
                registerNavLink.href = `${prefix}/post/create.html`;

                loginNavLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    logout();
                });

            } else {
                loginNavLink.textContent = 'Login';
                loginNavLink.href = `${prefix}/account/login.html`;
                registerNavLink.textContent = 'Register';
                registerNavLink.href = `${prefix}/account/register.html`;
            }
        } else {
            console.error('One or both navigation links were not found in the DOM.');
        }
    }

    const logout = () => { 
        localStorage.removeItem('userInfo');
        if (window.location.pathname === `${prefix}/index.html`) { 
            window.location.href = `${prefix}/index.html`;
        } else {
            window.location.href = `${prefix}/post/index.html`;
        }
    };

    updateNavBar();
});

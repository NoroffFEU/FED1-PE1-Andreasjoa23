document.addEventListener('DOMContentLoaded', function() {
    const loginNavLink = document.getElementById('loginLink');
    const registerNavLink = document.getElementById('registerLink');
    const isFrontPage = !(window.location.pathname.includes("post")|| window.location.pathname.includes("account"));
    const preFix = isFrontPage? "" :"../"



    function updateNavBar() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo && userInfo.accessToken) {
            loginNavLink.textContent = 'Logout';
            registerNavLink.textContent = 'Create Post';
            registerNavLink.href = preFix + 'post/create.html';

            loginNavLink.addEventListener('click', function(event) {
                event.preventDefault();
                logout();
            });

        } else {
            loginNavLink.textContent = 'Login';
            loginNavLink.href = preFix + 'account/login.html';
            registerNavLink.textContent = 'Register';
            registerNavLink.href = preFix + 'account/register.html';
        }
    }

    const logout = () => { 
        localStorage.removeItem('userInfo');    
        window.location.href = preFix + 'index.html';
    };
    
    updateNavBar();
});
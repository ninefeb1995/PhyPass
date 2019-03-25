import history from '../../history';

export default class Auth {
    login = (location) => {
        let expiresAt = JSON.stringify((86400 * 1000) + new Date().getTime());
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('expiresAt', expiresAt);
        history.replace(location.path);
        document.location.reload(true); // Reload page to help external js function working after routing from login page to layout page.
    }

    logout = () => {
        localStorage.removeItem('loggedin');
        localStorage.removeItem('expiresAt');
        history.replace('/');
    }

    isAuthenticated = () => {
        let loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
        let expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
        return loggedIn && new Date().getTime() < expiresAt;
    }
}

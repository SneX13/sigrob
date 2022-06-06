/* When accessing protected resources, the HTTP request needs Authorization header.
The function checks Local Storage for user item. If there is a logged in user with JWT accessToken,
 HTTP Authorization header is returned. Otherwise, return an empty object.*/

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return {Authorization: 'Bearer ' + user.accessToken};
    } else {
        return {};
    }
}
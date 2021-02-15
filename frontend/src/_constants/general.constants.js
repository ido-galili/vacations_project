const domain = 'http://localhost:5000';

export const generalConstants = {
    VACATIONS_ENDPOINT: `${domain}/api/vacations`,
    CHECK_AUTHENTICATED: `${domain}/auth/checkToken`,
    REGISTER_ENDPOINT: `${domain}/auth/register`,
    LOGIN_ENDPOINT: `${domain}/auth/login`,
    AUTH_LOGIN_ENDPOINT: `${domain}/auth/`,
    AUTH_REGISTER_ENDPOINT: `${domain}/auth/register`,
    STATIC_ENDPOINT: `${domain}`,
};

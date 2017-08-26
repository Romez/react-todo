import LS from './localstorage';

export default class Auth {
    static isAuth() {
        return LS.get('auth') ? true : false;
    }

    static getAuth() {
        if (Auth.isAuth()) {
            return LS.get('auth');
        }
        return undefined;
    }

}

import config from './config';

export default class LS {
    static get(field) {
        if (LS.isExists()) {
            const data = JSON.parse(localStorage.getItem(config.localStorage.name));
            if (!field) {
                return data;
            } else if (data[field]) {
                return data[field];
            }
        }
        return undefined;
    }

    static set(field, data = {}) {
        let storage = LS.get();
        if (field) {
            if (!storage) {
                storage = {};
            }
            storage[field] = data;
        } else {
            storage = data;
        }
        localStorage.setItem(config.localStorage.name, JSON.stringify(storage));
    }

    static remove(field) {
        let storage = LS.get();
        if (field) {
            if (!storage) {
                storage = {};
            }
            delete storage[field];
        }
        localStorage.setItem(config.localStorage.name, JSON.stringify(storage));
    }

    static isExists() {
        return localStorage.getItem(config.localStorage.name) ? true : false;
    }
}

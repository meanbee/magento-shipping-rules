export default class Register
{
    constructor() {
        this.children = {};
    }

    remove(key) {
        let child = this.get(key);
        delete this.children[key];
        return child;
    }

    has(key) {
        return this.children.hasOwnProperty(key);
    }

    get(key) {
        return this.has(key) && this.children[key];
    }

    getAsOptions() {
        return Object.keys(this.children).map(key => {
            return (<option value={key}>{this.get(key).name()}</option>);
        });
    }
}
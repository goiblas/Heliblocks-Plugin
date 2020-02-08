class Store {
    constructor(initialValue = [], onSetStore = () => {}) {
        this._store = new Map(initialValue);
        this.onSetStore = onSetStore
    }
    has(key) {
        return this._store.has(String(key))
    }
    set(key, value) {
        this._store.set(String(key), value)
        this.onSetStore(this.toString());
    }
    get(key) {
        return this._store.get(String(key))
    }
    toString() {
        return JSON.stringify([...this._store])
    }
}

export default Store
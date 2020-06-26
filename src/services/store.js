class Store {
  constructor(initialValue = "[]", setStore = () => {}) {
    this._store = new Map(JSON.parse(initialValue));
    this.setStore = setStore;
  }
  has(key) {
    return this._store.has(key);
  }
  set(key, value) {
    this._store.set(key, value);
    this.setStore(this.toString());
  }
  get(key) {
    return this._store.get(key);
  }
  toString() {
    return JSON.stringify([...this._store]);
  }
}

export default Store;

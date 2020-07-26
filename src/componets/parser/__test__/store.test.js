import { Store } from "./../store";

describe("Store", () => {
  test("should save elements", () => {
    const store = new Store('[["foo", "first"]]');

    expect(store.has("foo")).toBe(true);
    expect(store.get("foo")).toBe("first");

    store.set(2, "second");
    expect(store.has(2)).toBe(true);
  });

  test("should save when onChange store", () => {
    const onSave = jest.fn(res => res);
    const store = new Store("[]", onSave);

    store.set("set", "name");

    expect(onSave.mock.calls.length).toBe(1);
    expect(onSave.mock.results[0].value).toBe('[["set","name"]]');
  });
});

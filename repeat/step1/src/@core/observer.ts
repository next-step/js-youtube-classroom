let currentObserver: Function | null = null;

export const observe = (fn: Function) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
}

export const observable = <T>(obj: T) => {
  if (!(obj instanceof Object)) return obj;

  Object.entries(obj).forEach(([key, value]) => {
    const observers = new Set<Function>();
    let _value = value;
    Object.defineProperty(obj, key, {
      get () {
        observers.add(currentObserver!);
        return _value;
      },
      set (newValue) {
        if (_value === newValue) return;
        if (JSON.stringify(_value) === JSON.stringify(newValue)) return;
        _value = newValue;
        observers.forEach(fn => fn && fn());
      }
    })
  });
  return obj;
}
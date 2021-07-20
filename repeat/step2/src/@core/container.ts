type Constructor = { new(...args: any[]): Object }
const constructors = new WeakMap<Constructor, Object | undefined>();
const clazzProperties = new WeakMap<Constructor, Constructor[]>();

export const container = {

  constructors: new WeakMap<Constructor, any>(),

  resolve <T>(constructor: any): T {
    const resolved: T = this.constructors.get(constructor);
    if (resolved) return resolved;

    const properties: Constructor[] = clazzProperties.get(constructor) || [];

    const instance = new constructor(
      ...properties.map(this.resolve.bind(this))!
    );

    this.constructors.set(constructor, instance);
    return instance as T;
  }

}

export function Injectable (constructor: Constructor) {
  constructors.set(constructor, clazzProperties.get(constructor));
}

export function Inject (singleton: Constructor) {
  return function (target: Constructor, propertyKey: string, index: number) {
    const properties = clazzProperties.get(target) || [];
    if (properties) {
      properties[index] = singleton;
    }
    clazzProperties.set(target, properties);
  }
}

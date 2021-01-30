export class FileExpressEvent<T> {
  private listeners: ((value: T) => Promise<void> | void)[] = [];

  addListener(listener: (value: T) => Promise<void> | void) {
    this.listeners.push(listener);
  }

  async emit(value: T) {
    const listenerFunction = this.listeners.map((listener) => listener(value));
    return Promise.all(listenerFunction);
  }

  removeListener(listener: (value: T) => Promise<void> | void) {
    const index = this.listeners.indexOf(listener);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }
}

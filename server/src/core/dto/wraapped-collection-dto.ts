export class WrappedCollection<Entity> {
  items: (Entity | [])[];

  constructor(items: (Entity | [])[]) {
    this.items = items;
  }
}

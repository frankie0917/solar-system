import { makeObservable, observable } from 'mobx';
import Victor from 'victor';

export class Vector extends Victor {
  constructor(x: number, y: number) {
    super(x, y);
    makeObservable(this, {
      x: observable,
      y: observable,
    });
  }
}

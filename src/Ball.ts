import { makeAutoObservable } from 'mobx';
import Victor from 'victor';
import { Vector } from './Vector';

export class Ball {
  constructor(
    public r: number,
    public pos: Vector,
    public acc: Vector,
    public vel: Vector,
    public fixed = true,
    public fill = '#000',
  ) {
    makeAutoObservable(this);
  }

  update() {
    if (this.fixed) return;
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    this.acc = new Vector(winW / 2, winH / 2).subtract(this.pos);
    this.vel.add(this.acc.multiplyScalar(0.0005));
    this.pos.add(this.vel);
  }
}

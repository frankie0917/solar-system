import { makeAutoObservable } from 'mobx';
import { Ball } from './Ball';

export class Store {
  constructor(public balls: Ball[]) {
    makeAutoObservable(this);
  }

  curBallIndex: number | null = null;

  addBall(ball: Ball) {
    this.balls.push(ball);
  }
}

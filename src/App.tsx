import React, { useEffect, useState } from 'react';
import Victor from 'victor';
import { observer } from 'mobx-react';
import { Store } from './Store';
import { Ball } from './Ball';
import { Vector } from './Vector';

const store = new Store([]);

function App() {
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

  const randomInt = (n = 10) =>
    Math.round(Math.random() * n) * (Math.round(Math.random()) ? 1 : -1);

  useEffect(() => {
    const gameLoop = () => {
      store.balls.forEach((ball) => ball.update());

      requestAnimationFrame(gameLoop);
    };

    store.addBall(
      new Ball(
        20,
        new Vector(winW / 2, winH / 2),
        new Vector(0, 0),
        new Vector(0, 0),
        true,
      ),
    );

    gameLoop();
  }, []);

  return (
    <div
      className="App"
      onClick={(e) => {
        store.addBall(
          new Ball(
            10,
            new Vector(e.clientX, e.clientY),
            new Vector(0, 0),
            new Vector(randomInt(), randomInt()),
            false,
            `#${randomColor()}`,
          ),
        );
      }}
    >
      <svg width={winW} height={winH}>
        {store.balls.map(({ pos: { x, y }, r, fill = '#000' }, i) => (
          <circle cx={x} cy={y} r={r} fill={fill} key={i} />
        ))}
      </svg>
    </div>
  );
}

export default observer(App);

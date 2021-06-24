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

  const [pressA, setPressA] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const curBall = store.curBallIndex ? store.balls[store.curBallIndex] : null;
  return (
    <div
      tabIndex={0}
      className="App"
      onKeyDown={(e) => {
        if (e.key === 'a') {
          setPressA(true);
        }
      }}
      onKeyUp={(e) => {
        if (e.key === 'a') {
          setPressA(false);
        }
      }}
      onMouseMove={(e) => {
        setMouse({ x: e.clientX, y: e.clientY });
      }}
      onClick={(e) => {
        if (pressA) {
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
          return;
        }

        if (store.curBallIndex !== null) {
          const curBall = store.balls[store.curBallIndex];
          curBall.vel = curBall.pos
            .clone()
            .subtract(new Vector(e.clientX, e.clientY))
            .multiplyScalar(0.1);
          curBall.fixed = false;
          store.curBallIndex = null;
        } else {
          store.addBall(
            new Ball(
              10,
              new Vector(e.clientX, e.clientY),
              new Vector(0, 0),
              new Vector(0, 0),
              true,
              `#${randomColor()}`,
            ),
          );

          store.curBallIndex = store.balls.length - 1;
        }
      }}
    >
      <svg width={winW} height={winH}>
        {store.balls.map(({ pos: { x, y }, r, fill = '#000' }, i) => (
          <circle cx={x} cy={y} r={r} fill={fill} key={i} />
        ))}
        {curBall && (
          <path
            d={`M ${mouse.x} ${mouse.y} L ${curBall.pos.x} ${curBall.pos.y} Z`}
            fill="transparent"
            strokeWidth={2}
            stroke="#444"
          />
        )}
      </svg>
    </div>
  );
}

export default observer(App);

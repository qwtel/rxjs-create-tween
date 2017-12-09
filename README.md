# RxJS Create Tween

[![Build Status](https://travis-ci.org/qwtel/rxjs-create-tween.svg?branch=master)](https://travis-ci.org/qwtel/rxjs-create-tween)

Creates an observable that emits samples from an easing function on every animation frame
for a fixed duration.

Supports arbitrary easing functions. Tested with the popular [`tween-functions`](https://www.npmjs.com/package/tween-functions) package.

## Example
```js
import { createTween } from 'rxjs-create-tween';
import { easeOutSine } from 'tween-functions';

click$
  .switchMap(() => {
    const startX   =   0; // px
    const endX     = 300; // px
    const duration = 250; // ms
    return createTween(easeOutSine, startX, endX, duration);
  })
  .subscribe({
    // emits a value on every animation frame
    next: (x) => {
      // guaranteed to start with `startX` and end with `endX`.
      el.style.transform = `translateX(${x})`;
    },
    // completes 1 frame after the last value was emitted
    complete: () => {
      el.style.transform = '';
      el.classList.add('completed');
    },
  });
```

## Source
```js
export function createTween(easingFunction, b, c, d, s) {
  return Observable.create((observer) => {
    let startTime;
    let id = requestAnimationFrame(function sample(time) {
      startTime = startTime || time;
      const t = time - startTime;
      if (t < d) {
        observer.next(easingFunction(t, b, c, d, s));
        id = requestAnimationFrame(sample);
      } else {
        observer.next(easingFunction(d, b, c, d, s));
        id = requestAnimationFrame(() => observer.complete());
      }
    });
    return () => { if (id) { cancelAnimationFrame(id); } };
  });
}
```

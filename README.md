# RxJS Create Tween

Creates an observable that emits samples from an easing function on every animation frame
for a duration `d` ms.

The first value will be emitted on the next animation frame,
and is the value of the easing function at `t = 0`.
The final value is guaranteed to be the easing function at `t = d`.
The observable completes one frame after the final value was emitted.

## Example
```js
// More easing function at
function easeOutSine(t, b, c, d) {
  return c * Math.sin(t/d * (Math.PI/2)) + b;
}

click$
  .switchMap(() => {
    const startX = 0; // px
    const diffX = 300; // px
    const duration = 250; // ms
    return createTween(easeOutSine, startX, diffX, duration);
  })
  .subscribe({
    next: (x) => {
      el.style.transform = `translateX(${x})`
    },
    complete: () => {
      el.style.transform = '';
      el.classList.add('opened');
    },
  });
```

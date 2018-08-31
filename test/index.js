/* eslint-env node, mocha */
/* eslint-disable arrow-body-style */

require("@babel/polyfill");

const { createTween } = require("../index.js");

const assert = require("assert");
const { Observable } = require("rxjs");
const { tap, toArray } = require("rxjs/operators");
const { linear, easeOutSine } = require("tween-functions");

require("./raf.js");

describe("RxJS Create Tween", () => {
  it("should exist", () => {
    assert(createTween);
  });

  it("should be of type Observable", () => {
    assert(createTween() instanceof Observable);
  });

  it("should complete", () => {
    return createTween(linear).toPromise();
  });

  describe("samples", () => {
    let samples;

    before(async () => {
      samples = await createTween(linear, 0, 1, 100)
        .pipe(toArray())
        .toPromise();
    });

    it("should exist", () => {
      assert(samples.length > 0);
    });

    it("should be within the range", () => {
      assert(samples.every(x => x >= 0 && x <= 100));
    });

    it("should start with 0", () => {
      assert.equal(samples[0], linear(0, 0, 1, 100));
    });

    it("should end with 1", () => {
      assert.equal(samples[samples.length - 1], linear(100, 0, 1, 100));
    });

    it("should be strictly increasing", () => {
      assert(
        samples.reduce(([cond, prevX], x) => [x > prevX && cond, x], [true, 0])
      );
    });
  });

  describe("tween observable", () => {
    let completed = false;
    const arr = [];

    before(() =>
      createTween(easeOutSine, 0, 1, 100)
        .pipe(
          tap({
            next: () => arr.push(Date.now()),
            complete: () => {
              completed = true;
              arr.push(Date.now());
            }
          })
        )
        .toPromise()
    );

    it("it should complete ", () => {
      assert(completed);
    });

    it("it should complete after the last value", () => {
      assert(arr[arr.length - 1] > arr[arr.length - 2]);
    });

    // FIXME: use performance independent polyfill for requestAnimationFrame!?
    // it('it should complete one frame after the last value', () => {
    //   const FPS = 60;
    //   const T = 1000 / FPS;
    //   assert(arr[arr.length - 1] > arr[arr.length - 2] + T);
    // });
  });
});

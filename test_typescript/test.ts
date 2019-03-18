import { createTween } from 'rxjs-create-tween';

const lifeUniverseAndEverything = (
    c: number,
    b: number,
    e: number,
    t: number,
) => 42;

const answer = createTween(lifeUniverseAndEverything, 1, 2, 3);
console.log(answer);

declare module "rxjs-create-tween" {
  import { Observable } from "rxjs";

  export type EasingFunction = (
    currentTime: number,
    beginValue: number,
    endValue: number,
    totalDuration: number,
    s?: number
  ) => number;

  export function createTween(
    easingFunction: EasingFunction,
    beginValue: number,
    endValue: number,
    totalDuration: number,
    s?: number
  ): Observable<number>;
}

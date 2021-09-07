import { from, of } from "rxjs";
import { concatMap, delay, exhaustMap, mergeMap, switchMap } from "rxjs/operators";

// MergeMap does not wait for the inner observable to emit a value before moving on the the next value from the source observable, so the result is what looks like an initial delay and then all values are emitted nearly simultaneously.

const mergeValues = from([
  { key: 1, source: "merge" },
  { key: 2, source: "merge" },
  { key: 3, source: "merge" },
  { key: 4, source: "merge" },
  { key: 5, source: "merge" },
  { key: 6, source: "merge" }
]);

const testMergeMap = mergeValues.pipe(
  mergeMap(value => of(value).pipe(delay(1000)))
);

testMergeMap.subscribe(console.log);

// ConcatMap waits for both the source and the inner observable to emit values before moving on the the next value from the source observable, so the result is that each value is emitted with a delay in between

const concatValues = from([
  { key: 1, source: "concat" },
  { key: 2, source: "concat" },
  { key: 3, source: "concat" },
  { key: 4, source: "concat" },
  { key: 5, source: "concat" },
  { key: 6, source: "concat" }
]);

const testConcatMap = concatValues.pipe(
  concatMap(value => of(value).pipe(delay(1000)))
);

testConcatMap.subscribe(console.log);

// SwitchMap ignores any previous values from the source observable when new values come in. Since new values are coming in faster than the inner observable can emit a value, only the last value will be returned.

const switchValues = from([
  { key: 1, source: "switch" },
  { key: 2, source: "switch" },
  { key: 3, source: "switch" },
  { key: 4, source: "switch" },
  { key: 5, source: "switch" },
  { key: 6, source: "switch" }
]);

const testSwitchMap = switchValues.pipe(
  switchMap(value => of(value).pipe(delay(1000)))
);

testSwitchMap.subscribe(console.log);

// Exhaust ignores any new values from the source observable until the inner observable emits a value. Since new values are coming in faster than the inner observable can emit a value, only the first value will be returned.

const exhaustValues = from([
  { key: 1, source: "exhaust" },
  { key: 2, source: "exhaust" },
  { key: 3, source: "exhaust" },
  { key: 4, source: "exhaust" },
  { key: 5, source: "exhaust" },
  { key: 6, source: "exhaust" }
]);

const testExhaustMap = exhaustValues.pipe(
  exhaustMap(value => of(value).pipe(delay(1000)))
);

testExhaustMap.subscribe(console.log);

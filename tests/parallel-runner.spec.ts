import { expect } from "chai";
import "mocha";
import { parallelRun } from "../src/parallel-runner";
import { ParallelResultType, IParellelResult } from "../src/types";

describe("parallel runner tests", () => {
  let maxCount = 5;
  let createdCount = 0;
  let finishedCount = 0;

  const promiseCreator = (): Promise<IParellelResult> => {
    let index = createdCount;
    createdCount++;

    if (index < maxCount) {
      return new Promise(resolve => {
        setTimeout(() => {
          finishedCount++;
          resolve({
            type: ParallelResultType.goOn
          });
        }, 100);
      });
    } else {
      return Promise.resolve({
        type: ParallelResultType.noMore
      });
    }
  };

  it("can parrallel promises when parallel degree < max count", async () => {
    maxCount = 5;
    createdCount = 0;
    finishedCount = 0;

    await parallelRun(promiseCreator, 2);
    expect(finishedCount).eq(maxCount);
  });

  it("can parrallel promises when parallel degree > max count", async () => {
    maxCount = 5;
    createdCount = 0;
    finishedCount = 0;

    await parallelRun(promiseCreator, 10);
    expect(finishedCount).eq(maxCount);
  });
});

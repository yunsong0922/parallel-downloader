import { ParallelResultType, IParellelResult } from "./types";

export function parallelRun(
  promiseCreator: () => Promise<IParellelResult>,
  parallelDegree: number
) {
  async function createNextPromise() {
    let result: IParellelResult = await promiseCreator();
    if (result.type === ParallelResultType.goOn) {
      return createNextPromise();
    }
  }

  let promiseList = [];
  for (let i = 0; i < parallelDegree; i++) {
    promiseList.push(createNextPromise());
  }

  return Promise.all(promiseList);
}

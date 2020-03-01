import { expect } from "chai";
import "mocha";
import { AsyncRunner } from "../src/async-runner";

describe("async runner file tests", () => {
  it("should check isEnd", async () => {
    let i = 0;
    await new AsyncRunner().start(() => {
      if (i == 0) {
        return true;
      }
      i++;
      return false;
    });
  });
});

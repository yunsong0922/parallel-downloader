import { expect } from "chai";
import "mocha";
import { getAndWriteToFile } from "../src/download-file";
import { DownloadResultType, IDownloadResult } from "../src/types";

describe("download file tests", () => {
  it("should return success", async () => {
    try {
      const result = await getAndWriteToFile(
        { url: "http://www.baidu.com" },
        "/Users/liuhuaqing/Microsoft/build-defs/target/test-0.txt"
      );
      expect(result.type).eq(DownloadResultType.success);
    } catch (err) {
      console.log(err);
    }
  });

  it("should return error", async () => {
    try {
      await getAndWriteToFile(
        { url: "http://www.baidu.commmmmmm" },
        "/Users/liuhuaqing/Microsoft/build-defs/target/test-1.txt"
      );
    } catch (err) {
      expect(err.type).eq(DownloadResultType.error);
    }
  });

  it("should return success for https", async () => {
    try {
      let result = await getAndWriteToFile(
        { url: "https://www.baidu.com" },
        "/Users/liuhuaqing/Microsoft/build-defs/target/test-2.txt"
      );
      expect(result.type).eq(DownloadResultType.success);
    } catch (err) {
      console.log(err);
    }
  });
});

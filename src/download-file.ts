import * as http from "http";
import * as fs from "fs";
import { DownloadResultType, IDownloadResult } from "./types";

export const getAndWriteToFile = (
  requestOptions: http.RequestOptions | string,
  filePath: string
): Promise<IDownloadResult> => {
  return new Promise((resolve, reject) => {
    let file = fs.createWriteStream(filePath);

    http
      .get(requestOptions, res => {
        res.pipe(file);
        file.on("finish", function() {
          file.close();
          resolve({
            type: DownloadResultType.success
          });
        });
      })
      .on("error", (err: Error) => {
        reject({
          type: DownloadResultType.error,
          error: err
        });
      })
      .on("timeout", () => {
        reject({
          type: DownloadResultType.timeout
        });
      })
  });
};

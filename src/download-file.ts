import * as request from "request";
import * as fs from "fs";
import { DownloadResultType, IDownloadResult } from "./types";

export const getAndWriteToFile = (
  options: request.OptionsWithUrl,
  filePath: string
): Promise<IDownloadResult> => {
  return new Promise((resolve, reject) => {
    request.get(
      options.url as string,
      options,
      (error: any, response: request.Response, body: any) => {
        if (error) {
          reject({
            type: DownloadResultType.error,
            error
          });
        } else {
          fs.writeFile(filePath, body, error => {
            if (error) {
              reject({
                type: DownloadResultType.error,
                error
              });
            }
            resolve({
              type: DownloadResultType.success
            });
          });
        }
      }
    );
  });
};

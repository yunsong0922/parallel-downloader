import * as path from "path";
import * as buildDefConfig from "../build-def-config.json";
import { ParallelResultType } from "./types";
import { downloadLogger } from "./download-logger";
import { parallelRun } from "./parallel-runner";
import { getAndWriteToFile } from "./download-file";

export async function downloadAllFiles() {
  let createdCount = 0;
  const dirPath = path.normalize(buildDefConfig.buildDefsPath);
  const allBuildDefCount = buildDefConfig.buildDefs.length;

  const createDownloadPromise = async () => {
    let index = createdCount;

    if (index < allBuildDefCount) {
      let filePath = path.join(dirPath, buildDefConfig.buildDefs[index].name);
      let requestOptions = buildDefConfig.buildDefs[index].url;
      createdCount++;

      downloadLogger.startDownload(buildDefConfig.buildDefs[index]);

      try {
        const result = await getAndWriteToFile(requestOptions, filePath);
        result.index = index;
        result.name = buildDefConfig.buildDefs[index].name;

        downloadLogger.downloadComplete(result);

        return {
          type: ParallelResultType.goOn
        };
      } catch (reason) {
        reason.index = index;
        reason.name = buildDefConfig.buildDefs[index].name;

        downloadLogger.downloadComplete(reason);

        return {
          type: ParallelResultType.goOn
        };
      }
    } else {
      return Promise.resolve({
        type: ParallelResultType.goOn
      });
    }
  };

  await parallelRun(createDownloadPromise, 10);
}

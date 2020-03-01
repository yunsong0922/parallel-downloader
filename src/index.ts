import { downloadAllFiles } from "./download-all-files";
import { AsyncRunner } from "./async-runner";

function startDownload() {
  const promise = downloadAllFiles();
  let isAllDownloaded = false;
  promise.then(() => {
    isAllDownloaded = true;
  });

  new AsyncRunner().start(() => {
    return isAllDownloaded == true;
  });
}

startDownload();
import { DownloadResultType, IDownloadResult, IBuildDef } from "./types";

enum LogType {
  info = "Info",
  error = "Error",
  warn = "Warn"
}

class DownloadResultLogger {
  log(message: string, type: LogType = LogType.info) {
    let finalMessage = `[${type}][${new Date().toLocaleString()}] ${message}`;
    switch (type) {
      case LogType.info:
        console.info(finalMessage);
        break;
      case LogType.error:
        console.error(finalMessage);
        break;
      case LogType.warn:
        console.warn(finalMessage);
        break;
      default:
        console.info(finalMessage);
    }
  }

  startDownload(buildDef: IBuildDef) {
    let message = `Start download build definition [${buildDef.name}]`;
    this.log(message);
  }

  downloadComplete(downloadResult: IDownloadResult) {
    if (downloadResult.type == DownloadResultType.success) {
      let message = `Finish download build definition [${downloadResult.name}]`;
      this.log(message);
    }

    if (downloadResult.type == DownloadResultType.error) {
      let message = `Error download build definition [${downloadResult.name}]`;
      this.log(message, LogType.error);
      this.log(JSON.stringify(downloadResult.error), LogType.error);
    }

    if (downloadResult.type == DownloadResultType.timeout) {
      let message = `Timeout download build definition [${downloadResult.name}]`;
      this.log(message, LogType.error);
    }
  }
}

export const downloadLogger = new DownloadResultLogger();

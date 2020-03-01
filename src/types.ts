export enum DownloadResultType {
  success = "success",
  error = "error",
  timeout = "timeout"
}

export interface IDownloadResult {
  type: DownloadResultType;
  index?: number;
  name?: string;
  error?: Error;
}

export interface IBuildDef {
  name: string;
  id: string;
  url?: string;
}

export enum ParallelResultType {
  goOn,
  noMore
}
export interface IParellelResult {
  type: ParallelResultType;
}

export class AsyncRunner {
  async start(isEnd: () => boolean) {
    while (true) {
      if (isEnd()) {
        break;
      } else {
        await this.sleep(200);
      }
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
}

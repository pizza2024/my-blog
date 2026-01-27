'use client';
let requestCount = 0;
const waitingQueue: Array<() => void> = [];
const maxRequestCount = 3;
const sendRequest = (params: {
  args: RequestInfo | URL;
  index?: number;
  onSuccess: (res: Response) => void;
  onError: (err: any) => void;
  beforeSend?: () => void;
}) => {
  if (requestCount >= maxRequestCount) {
    return new Promise<void>((resolve) => {
      waitingQueue.push(() => {
        resolve(sendRequest(params) as unknown as void);
      });
    });
  }
  requestCount++;
  if (params.beforeSend) {
    params.beforeSend();
  }
  // 模拟请求延迟
  const p = new Promise((resolve, reject) => {
    console.log(`Starting request ${params.index || 0}`);
    const is4or5 = (params.index || 0) === 4 || (params.index || 0) === 5;
    setTimeout(
      () => {
        resolve({
          data: 'mock data',
          success: true,
        });
      },
      is4or5 ? 3000 : 6000
    );
  })
    .then((res) => {
      requestCount--;
      params.onSuccess(res as Response);
      const next = waitingQueue.shift();
      if (next) next();
    })
    .catch((err) => {
      requestCount--;
      params.onError(err);
      const next = waitingQueue.shift();
      if (next) next();
    });
  return p;
  // const response = originFetch(params.args)
  //   .then((res) => {
  //     requestCount--;
  //     params.onSuccess(res);
  //   })
  //   .catch((err) => {
  //     requestCount--;
  //     params.onError(err);
  //   });
  // return response;
};
export default { sendRequest, requestCount };


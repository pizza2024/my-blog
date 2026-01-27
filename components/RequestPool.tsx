'use client';
import defaultRequestPool from '@/lib/requestPool';
import { useState } from 'react';

export default function RequestPool() {

  const [requestPoolCount, setRequestPoolCount] = useState(defaultRequestPool.requestCount);
  // useEffect(() => {
  //   setRequestPoolCount(requestPoolCount);
  //   for (let i = 0; i < 10; i++) {
  //     sendRequest({
  //       args: 'http://localhost:4000/mock-api/test-request-pool',
  //       onSuccess: (res) => {
  //         console.log('Request succeeded:', res);
  //         setRequestPoolCount(requestCount);
  //       },
  //       onError: (err) => {
  //         console.error('Request failed:', err);
  //         setRequestPoolCount(requestCount);
  //       },
  //     });
  //   }
  // }, []);
  const startTenRequests = () => {
    for (let i = 0; i < 10; i++) {
      defaultRequestPool.sendRequest({
        args: 'http://localhost:4000/mock-api/test-request-pool',
        index: i,
        onSuccess: (res) => {
          console.log(`Request ${i} succeeded`);
          setRequestPoolCount(defaultRequestPool.requestCount);
        },
        onError: (err) => {
          console.error(`Request ${i} failed`);
          setRequestPoolCount(defaultRequestPool.requestCount);
        },
        beforeSend: () => {
          setRequestPoolCount(defaultRequestPool.requestCount);
        },
      });
    }
  };
  return (
    <div className="p-4 border border-blue-500 rounded-2xl flex flex-col gap-4">
      <div>Current Request Count: {requestPoolCount}</div>
      <button
        className="border border-amber-500 p-1 rounded-md cursor-pointer"
        onClick={() => {
          startTenRequests();
        }}
      >
        start 10 requests
      </button>
    </div>
  );
}
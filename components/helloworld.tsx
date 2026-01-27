'use client';
import Child from "./Child";
import Parent from "./Parent";

export default function Helloworld() {
  return (
    <div className="border border-red-500 p-10 bg-gray-500">
      <Parent>
        <Child/>
      </Parent>
    </div>
  );
}

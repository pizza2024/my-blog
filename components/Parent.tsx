'use client';
import { useEffect, useState, type PropsWithChildren } from "react";
import Child from "./Child";

export default function Parent(props: PropsWithChildren & {name?: string}) {
  useEffect(() => {
console.log('effect 1')
return () => {
  console.log('remove effect 1')
}
  }, [])
  useEffect(() => {
console.log('effect 2')
return () => {
  console.log('remove effect 2')
}
  }, [])
  useEffect(() => {
console.log('effect 3')
return () => {
  console.log('remove effect 3')
}
  }, [])
  
  return <div className="border border-amber-500 p-4 rounded-md flex flex-col gap-2">
    <div className="border border-red-500 p-2">Parent</div>
    {/* <button onClick={() => {
      setText(null)
    }}>click</button> */}
    <Child name="hello" />
    {/* <div className="border border-red-500 p-2">{props.children}</div> */}
  </div>
}
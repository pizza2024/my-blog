'use client';
import { useEffect } from "react"

export default function Child(props: {name?: string}) {
  
  const {name} = props;
  useEffect(() => {
    console.log('child effect 1')
    return() => {console.log('remove child effect 1')}
  }, [])
  useEffect(() => {
    console.log('child effect 2')
    return () => {
      console.log('remove child effect 2')
    }
  }, [name])
  return <div className="border p-4 rounded-md">Child</div>
}
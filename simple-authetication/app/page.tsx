"use client";
import { useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
  const { data } = useSession();
  console.log("hello", data?.user)
  return (
    <div>
      Hello
    </div>
  )
}

export default Page

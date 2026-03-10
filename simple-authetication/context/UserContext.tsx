"use client"

import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}
type userContextType = {
  user: userType | null,

  setUser: (user: userType) => void
}
type userType = {
  name: string,
  email: string,
  image?: string,
  id: string
}
export const userContextData = React.createContext<userContextType | undefined>(undefined);
const UserContext = ({ children }: Props) => {
  const [user, setUser] = useState<userType | null>(null)
  const session = useSession();
  const data = {
    user, setUser
  }
  useEffect(() => {
    const fetchdData = async () => {
      try {
        const res = await axios.get("/api/user")
        console.log("data from ", res)
        setUser(res.data.user)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchdData();
  }, [session])
  return (
    <userContextData.Provider value={data}>
      {children}
    </userContextData.Provider>
  )
}

export default UserContext

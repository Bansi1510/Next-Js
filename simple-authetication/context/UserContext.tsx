import axios from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}
type userContextType = {
  user: userType,
  setUser: (user: userType) => void
}
type userType = {
  name: string,
  email: string,
  image?: string,
  id: string
}
const userContextData = React.createContext<userContextType | undefined>(undefined);
const UserContext = ({ children }: Props) => {
  const [user, setUser] = useState<userType>()
  useEffect(() => {
    const fetchdData = async () => {
      try {
        const res = await axios.get("/api/user")
        setUser(res.data.user)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchdData();
  }, [])
  return (
    
  )
}

export default UserContext

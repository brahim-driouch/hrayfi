"use client"

import useAuth from "@/auth/client"


const UserInfo =  () => {
    const {auth,isLoading }=  useAuth()

    if(isLoading) return<div>loading</div>
    console.log(auth)
  return (
    <div>UserInfo</div>
  )
}

export default UserInfo
import { fetchAllUsers } from '@/lib/actions/user.actions'
import React from 'react'

const page = async () => {
  const users=await fetchAllUsers();
  return (
    <div>
      {users.map((item,index)=>{
        return(
         <div className="flex gap-2" key={index}>
          <h1>{item.name}</h1>
          <h1>{item.email}</h1>
          <h1>{item.collegename}</h1>
          <h1>{item.branch}</h1>
          <h1>{item.year}</h1>
         </div>
        )
      })}
    </div>
  )
}

export default page

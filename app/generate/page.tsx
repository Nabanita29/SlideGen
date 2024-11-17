import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'
import { redirect } from 'next/navigation'
import GenerateFrom from '@/components/GenerateFrom';

const Page = async() => {
  //Check for users if no user redirect them to the auth page

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if(!user || !user.id){
    redirect("/auth-callback") 
  }
    
  return <GenerateFrom></GenerateFrom>


}

export default Page
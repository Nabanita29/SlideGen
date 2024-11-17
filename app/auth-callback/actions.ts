"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { db } from "@/db";  

export async function CreateUserIfNull() {
 
    try {
      const { getUser } = getKindeServerSession();
    const user: KindeUser<object> | null = await getUser();

    // If user does not exist sucess is false (will check in database)
    if(!user){
      return { success: false };
    }

    // To check for existing user in database
    const existingUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    // If no exisitng user then create it in the database
    if(!existingUser && user.email){
      await db.user.create({
        data: {
          id: user.id,
          name: user.given_name + " " + user.family_name,
          email: user.email,
        },
      });

      return { success: true };
    }

    return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };  }

}

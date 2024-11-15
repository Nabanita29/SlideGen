"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export async function CreateUserIfNull() {
 
    const { getUser } = getKindeServerSession();
    const user: KindeUser<object> | null = await getUser();
  }

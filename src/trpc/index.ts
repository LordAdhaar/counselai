import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import {z} from "zod";
 
export const appRouter = router({
  authCallback: publicProcedure.query(async ()=>{
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || !user.email || !user.id) 
      throw new TRPCError({code:"UNAUTHORIZED"})

      // check if user in db or else create the user
    
    const dbUser = await db.user.findFirst({
      where:{
        id: user.id
      }
    })

    console.log(dbUser, 9999)
    
    if(!dbUser){

      await db.user.create({
        data: {
          id:user.id,
          email : user.email
        }
      })
    }

    return {success : true}
  }),

  getUserFiles: privateProcedure.query(async ({ctx})=>{
    const {userId} = ctx

    return await db.file.findMany({
      where:{
        userId
      }

    })
  }) ,

  deleteFile: privateProcedure.input(
    z.object({id:z.string()})
  ).mutation(async ({ctx, input}) => {
    const {userId} = ctx

    const file = await db.file.findFirst({
      where:{
        id : input.id,
        userId, 
      }
    })

    if(!file) throw new TRPCError({code:"NOT_FOUND"})

    await db.file.delete({
      where:{
        id:input.id,
      }
    })
  })
});
 
// Export type router type signature,
// NOT the router itself.
// 
export type AppRouter = typeof appRouter;
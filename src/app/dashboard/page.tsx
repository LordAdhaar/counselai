import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

export default async function DashboardPage(){
    
        const {getUser} =  getKindeServerSession();
        const user = await getUser();
        console.log(user?.email)
        
        if (!user || !user.id) redirect("/auth-callback?origin=dashboard")

        const dbUser = await db.user.findFirst({
            where:{
                id: user.id
            }
        })

        console.log("dbUser: ",dbUser )

        if (dbUser===null) redirect("/auth-callback?origin=dashboard")   

        return (
            <div>
                <div>
                    {user && user.email}
                </div>
                <Dashboard/>
                
            </div>
        )

}
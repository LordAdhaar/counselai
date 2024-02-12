import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

export default function Page(){
    const router = useRouter();
    
    const searchParams = useSearchParams();
    
    const origin = searchParams.get("origin");

    const {isSuccess, isLoading} = trpc.authCallback.useQuery()
    
    if (isSuccess){
        router.push(origin ? `/${origin}` : "/dashboard")
    }

}
import { request } from "@/utils/request";

export const code_receive = (data:{code:string}) => 
    request.get("code/receive", data);
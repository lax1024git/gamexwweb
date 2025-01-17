import { request } from "@/utils/request";

export const interlocution = (data) => 
    request.post("/news/list", data);

export const interlocution_detail = (data) => 
    request.post("/news/detail", data);
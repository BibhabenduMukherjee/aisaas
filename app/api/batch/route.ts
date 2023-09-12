import { NextResponse } from "next/server";
import axios from "axios";
export async function POST(request: Request){
const body = await request.json();
//console.log(body);

const req = {
    text:body.text
}
try{const response = await axios.post(" http://localhost:7002/batch/voicepack" , req);
//console.log(response.data)
return new NextResponse(response.data ,{status:200})
}catch(err){
    return new NextResponse("INTERNAL_ERROR" , {status : 404});
}

//return new NextResponse("ok")

}
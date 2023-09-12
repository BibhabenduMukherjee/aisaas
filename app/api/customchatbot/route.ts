import { NextResponse } from "next/server";
import axios from "axios";
export async function POST(request: Request){
   const {prompt} = await request.json();
   const header = {
      "X-API-Key" : "sk-biuv6246125git",
      }
   const req = {
      query : prompt
   }
   //console.log(prompt)
   try{
      const response = await axios.post("https://fastapi-ecru.vercel.app/qt" ,   req ,{headers:header})
      return new NextResponse(response.data.answer , {status:200})
   }catch(err){
      return new NextResponse("INTERNAL_ERROR" , {status:404})
     //console.log(err);
      
   }
 
  
  // return new NextResponse("In conclusion, Essential Mathematics for Machine Learning serves as an invaluable compass for navigating the complex terrain of machine learning through the lens of mathematics. This comprehensive resource not only demystifies intricate mathematical concepts but also empowers learners to harness them for practical machine learning applications. By offering a structured, accessible, and hands-on approach, the book equips readers with the essential toolkit needed to excel in this dynamic field. As machine learning continues to shape industries and drive innovation, this book stands as an essential guide, ensuring that mathematical proficiency becomes a cornerstone in the journey to becoming a proficient and insightful machine learning practitioner." , {status : 200})
}
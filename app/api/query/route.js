import { queryPDF } from "@/services/queryService";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const {question} = await req.json();
        if(!question?.trim()){
            return NextResponse.json(
                {error:"Queston is required"},
                {status:400}
            )
        }
       
    const result = await queryPDF(question)


        return NextResponse.json(result);
    } catch (error) {
        console.error(error);

    return NextResponse.json(
      { error: "failed to process query" },
      { status: 500 }
    );
    }
}
import { queryPDF } from "@/services/queryService";
import {NextRequest,NextResponse} from "next/server";

interface QueryRequest {
    question: string;

}

export async function POST(req:NextRequest) {
    try {
        const {question}: QueryRequest = await req.json();
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
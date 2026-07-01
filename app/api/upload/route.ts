import { runIngestPipeline } from "@/services/ingestService";
import { NextResponse, NextRequest } from "next/server";



export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file')


        if (!(file instanceof File)) {
            return NextResponse.json({
                error: 'No file provided'
            },
                {
                    status: 400
                })
        }
        if (!file.name.endsWith('.pdf')) {
            return NextResponse.json({ error: 'Invalid Media Type. Expected PDF.' }, { status: 415 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const pipelineSummary = await runIngestPipeline(buffer, file.name)

        console.log("uploaded sucessfully")
        return NextResponse.json({
            message: "Ingestion pipeline transaction completed successfully.",
            summary: pipelineSummary
        }, { status: 201 });

    } catch (error) {
        console.error("Critical execution breakdown at [POST /api/upload]:", error);

        if (error instanceof Error && error.message === "EMPTY_PDF_TEXT") {
            return NextResponse.json({ error: "The uploaded document contains zero extractable characters." }, { status: 422 });
        }

        return NextResponse.json({ error: "Internal processing engine exception." }, { status: 500 });
    }
}
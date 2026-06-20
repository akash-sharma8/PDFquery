// lib/pdfParser.js
import pdf from 'pdf-parse';


export async function parsePdfBuffer(buffer) {
    const pdfData = await pdf(buffer);
    if (!pdfData.text || pdfData.text.trim().length === 0) {
        throw new Error("EMPTY_PDF_TEXT");
    }
    return pdfData.text;
}
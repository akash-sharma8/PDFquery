

export async function createChunks(text, size){
    const chunks = [];
    for(let i =0 ; i<text.length; i+=size){
        chunks.push(text.slice(i,i+size))
    }

    return chunks;
}
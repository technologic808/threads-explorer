import { lambdaClient } from "../api/lambdaClient.js";
import { InvokeCommand } from "@aws-sdk/client-lambda";

const COLLECTIONS = [
    { "code": "tssf", "name": "thread_details_telegram_first_file_complete" },
    { "code": "wdsng", "name": "thread_details_manager_run_whatsapp_4k_1106_full" },
    { "code": "wdsnd", "name": "thread_details_desi_special_needs_dads_4k_1106_full" },
    { "code": "wennp", "name": "thread_details_edison_n_nearby_parents_4k_1106_full" },
    { "code": "wndaa", "name": "thread_details_nj_desi_all_ages_4k_1106_full" },
    { "code": "spr", "name": "thread_details_s_p_r" }
];

async function fetchThreads(collectionCode) {
    const collection = COLLECTIONS.find(c => c.code === collectionCode);
    const params = {
        FunctionName: "threadsDocumentDbQuery",
        Payload: JSON.stringify({
            "readRequest": {
                "collectionName": collection.name
            }
        }),
    };
    try {
        const responseData = await lambdaClient.send(new InvokeCommand(params));

        // Access payload directly as blob
        const arrayBuffer = responseData.Payload;
        const uint8Array = new Uint8Array(arrayBuffer);
        const textDecoder = new TextDecoder();
        const text = textDecoder.decode(uint8Array);

        // Parse JSON string to object
        const threadsResponse = JSON.parse(text);

        // Access data from JSON object
        const threads = threadsResponse.body;

        console.log("🟢 Data Fetch Success : ", threads.length)

        return threads;
    } catch (err) {
        console.log("Error", err);
    }
}

export { fetchThreads, COLLECTIONS }
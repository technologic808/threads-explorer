import { lambdaClient } from "./lambdaClient.js";
import { InvokeCommand } from "@aws-sdk/client-lambda";

async function fetchUserDashboard(collectionNameUrl) {
    const functionName = 'threads-explorer-fetch-users-dashboard';
    const decoded_collection_name = decodeURIComponent(collectionNameUrl).trim();

    console.log("Fetching user dashboard for collection : ", decoded_collection_name);
    const params = {
        FunctionName: functionName,
        Payload: JSON.stringify({
            "readRequest": {
                "groupName": "SavingPrivateRansingh" // TODO: Replace with decoded_collection_name once pipeline is fixed
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

export { fetchUserDashboard }
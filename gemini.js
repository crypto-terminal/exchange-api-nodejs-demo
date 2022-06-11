import fetch from "node-fetch";
import crypto from "crypto";

const BASE_URL = "https://api.gemini.com";

const PATHS = {
    USER_ACCOUNT: "/v1/account",
};

const API_KEY = process.env.GEMINI_API_KEY;
const API_SECRET = process.env.GEMINI_API_SECRET;

const FULL_ENDPOINT = BASE_URL + PATHS.USER_ACCOUNT;


const nonce = String(Math.floor(Date.now() / 1000) * 1000);
const payload = {
    request: "/v1/account",
    account: "primary",
    nonce,
};


const base64payload = Buffer.from(JSON.stringify(payload)).toString("base64");
const signature = crypto.createHmac("sha384", API_SECRET).update(base64payload).digest("hex");
const headers = {
    "Content-Type": "text/plain",
    "Content-Length": "0",
    "X-GEMINI-APIKEY": API_KEY,
    "X-GEMINI-PAYLOAD": base64payload,
    "X-GEMINI-SIGNATURE": signature,
    "Cache-Control": "no-cache",
};

export const gemini = async () => {
    const response = await fetch(FULL_ENDPOINT, {
        method: "POST",
        headers,
    });
    const json = await response.json();
    console.log("json :>> ", json);
};

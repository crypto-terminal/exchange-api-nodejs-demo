import fetch from "node-fetch";
// import crypto from "crypto";
import cryptoJs from 'crypto-js';

const BASE_URL = "https://api.binance.us";

const PATHS = {
    USER_ACCOUNT: "/api/v3/account",
    USER_STATUS: "/wapi/v3/accountStatus.html"
}

const API_KEY = process.env.BINANCE_US_API_KEY
const API_SECRET = process.env.BINANCE_US_API_SECRET

const timestamp = Date.now()

// const signature = crypto
//       .createHmac('sha256', API_SECRET)
//       .update(new URLSearchParams({ timestamp }).toString())
//       .digest('hex')

const signature = cryptoJs.HmacSHA256(new URLSearchParams({ timestamp }).toString(), API_SECRET)

const query = new URLSearchParams({ timestamp, signature }).toString()

export const binance_us = async () => {
    const response = await fetch(`${BASE_URL}${PATHS.USER_ACCOUNT}?${query}`, {
        method: 'GET',
        headers: {
            "X-MBX-APIKEY": API_KEY,
        }
    })
    const json = await response.json();
    console.log('json :>> ', json);
}

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

const makeQueryString = q =>
  q
    ? `${Object.keys(q)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(q[k])}`)
        .join('&')}`
    : ''


const timestamp = Date.now()

// const signature = crypto
//       .createHmac('sha256', API_SECRET)
//       .update(makeQueryString({ timestamp }))
//       .digest('hex')

const signature = cryptoJs.HmacSHA256(makeQueryString({ timestamp }), API_SECRET)

const query = makeQueryString({timestamp, signature})

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

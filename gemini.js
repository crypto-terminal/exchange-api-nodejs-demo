import fetch from "node-fetch";
import crypto from "crypto";

const BASE_URL = "https://api.gemini.com";

const PATHS = {
    ACCOUNT_INFO: "/v1/account",
    ACCOUNT_BALANCES: "/v1/balances",
    ACCOUNT_BALANCES_USD: "/v1/notionalbalances/usd",
};

const API_KEY = process.env.GEMINI_API_KEY;
const API_SECRET = process.env.GEMINI_API_SECRET;

const getNonce = () => String(Math.floor(Date.now() / 1000) * 1000);

const getHeaders = (path) => {
    const nonce = getNonce();
    const payload = {
        request: path,
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

    return headers;
};

export const gemini = async () => {
    // const accountInfoPromise = fetch(BASE_URL + PATHS.ACCOUNT_INFO, {
    //     method: "POST",
    //     headers: getHeaders(PATHS.ACCOUNT_INFO),
    // });

    const accountBalancesPromise = fetch(BASE_URL + PATHS.ACCOUNT_BALANCES, {
        method: "POST",
        headers: getHeaders(PATHS.ACCOUNT_BALANCES),
    });

    const accountBalancesUSDPromise = fetch(BASE_URL + PATHS.ACCOUNT_BALANCES_USD, {
        method: "POST",
        headers: getHeaders(PATHS.ACCOUNT_BALANCES_USD),
    });

    const [accountBalancesResponse, accountBalancesUSDResponse] = await Promise.all([
        accountBalancesPromise,
        accountBalancesUSDPromise,
    ]);

    // const accountInfo = await accountInfoResponse.json();
    const accountBalances = await accountBalancesResponse.json();
    const accountBalancesUSD = await accountBalancesUSDResponse.json();
    // console.log("accountInfo :>> ", accountInfo);
    console.log("accountBalances :>> ", accountBalances);
    console.log("accountBalancesUSD :>> ", accountBalancesUSD);
};;

// account info: 
// {
//     account: {
//       accountName: 'Primary',
//       shortName: 'primary',
//       type: 'exchange',
//       created: '1646241859514',
//       verificationToken: 'jwt-token'
//     },
//     users: [
//       {
//         name: 'John Doe',
//         lastSignIn: '2022-06-11T17:14:52.549Z',
//         status: 'Active',
//         countryCode: 'US',
//         isVerified: true
//       }
//     ],
//     memo_reference_code: 'some-string'
//   }


// accountBalances :>>  [
//     {
//       type: 'exchange',
//       currency: 'SOL',
//       amount: '2.732824',
//       available: '2.732824',
//       availableForWithdrawal: '0'
//     }
//   ]
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

// json: >>
// {
//     makerCommission: 10,
//     takerCommission: 10,
//     buyerCommission: 0,
//     sellerCommission: 0,
//     canTrade: true,
//     canWithdraw: true,
//     canDeposit: true,
//     updateTime: 1652935614759,
//     accountType: 'SPOT',
//     balances: [
//       { asset: 'BTC', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ETH', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'USD', free: '0.0000', locked: '0.0000' },
//       { asset: 'XRP', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'USDT', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'BCH', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'LTC', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ADA', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'XLM', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'BAT', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ETC', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ZRX', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'BNB', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'LINK', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'REP', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'RVN', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'DASH', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ZEC', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ALGO', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'IOTA', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'BUSD', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'DOGE', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'WAVES', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ATOM', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'NEO', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'VET', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'QTUM', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'NANO', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'EOS', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ICX', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ENJ', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ONT', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ZIL', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'USDC', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'XTZ', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'HBAR', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'OMG', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'MATIC', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ONE', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'VTHO', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'KNC', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'COMP', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'REN', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'MANA', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'HNT', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'MKR', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'DAI', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'BAND', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'STORJ', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'SOL', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'UNI', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'EGLD', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'PAXG', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'OXT', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ZEN', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'FIL', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'AAVE', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'GRT', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'SUSHI', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'AMP', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ANKR', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'SHIB', free: '0.00', locked: '0.00' },
//       { asset: 'CRV', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'AVAX', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'AXS', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'DOT', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'CTSI', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'YFI', free: '0.00000000', locked: '0.00000000' },
//       { asset: '1INCH', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'FTM', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'NEAR', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'LRC', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'KSHIB', free: '0.0000', locked: '0.0000' },
//       { asset: 'LPT', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'SLP', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'POLY', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'NMR', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ANT', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'AUDIO', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'GALA', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'CHZ', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'ENS', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'OGN', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'XNO', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'TLM', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'SNX', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'APE', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'REQ', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'WBTC', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'VOXEL', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'TRX', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'FLOW', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'FLUX', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'BICO', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'SPELL', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'COTI', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'API3', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'CELR', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'IMX', free: '0.00000000', locked: '0.00000000' },
//       { asset: 'JASMY', free: '0.00000000', locked: '0.00000000' },
//       ... 11 more items
//     ],
//     permissions: [ 'SPOT' ]
//   }

import 'dotenv/config'
import { binance_us } from './binance_us.js';
import { gemini } from "./gemini.js";

const exMaps = {
    binance_us,
    gemini,
};

const args = process.argv;

const ex = args[2]

const fn = exMaps[ex]

if(fn === undefined) {
    throw new Error("Please pass a correct exchange name")
}

fn();
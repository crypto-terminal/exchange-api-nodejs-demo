import 'dotenv/config'
import { binance_us } from './binance_us.js';

const exMaps = {
    binance_us
}

const args = process.argv;

const ex = args[2]

const fn = exMaps[ex]

fn();
const TIMEFRAMES = ["5min", "15min", "1h", "4h", "1day"];

const DEFAULT_SYMBOL = "EUR/USD";
const CANDLE_COUNT = 250;

function number(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function closes(candles) {
  return candles.map((c) => number(c.close)).filter((v) => v !== null);
}

function highs(candles) {
  return candles.map((c) => number(c.high)).filter((v) => v !== null);
}

function lows(candles) {
  return candles.map((c) => number(c.low)).filter((v) => v !== null);
}

function ema(values, period) {
  if (values.length < period) return [];

  const multiplier = 2 / (period + 1);
  const result = [];

  let previous =
    values.slice(0, period).reduce((sum, value) => sum + value, 0) / period;

  result.push(previous);

  for (let i = period; i < values.length; i++) {
    previous =
      (values[i] - previous) * multiplier + previous;

    result.push(previous);
  }

  return result;
}

function sma(values, period) {
  if (values.length < period) return [];

  const result = [];

  for (let i = period - 1; i < values.length; i++) {
    const section = values.slice(i - period + 1, i + 1);

    result.push(
      section.reduce((sum, value) => sum + value, 0) / period
    );
  }

  return result;
}

function calculateRSI(values, period = 14) {
  if (values.length <= period) return null;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = values[i] - values[i - 1];

    if (change >= 0) gains += change;
    else losses += Math.abs(change);
  }

  let averageGain = gains / period;
  let averageLoss = losses / period;

  for (let i = period + 1; i < values.length; i++) {
    const change = values[i] - values[i - 1];

    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? Math.abs(change) : 0;

    averageGain =
      (averageGain * (period - 1) + gain) / period;

    averageLoss =
      (averageLoss * (period - 1) + loss) / period;
  }

  if (averageLoss === 0) return 100;

  const rs = averageGain / averageLoss;

  return 100 - 100 / (1 + rs);
}

function calculateMACD(values) {
  const fast = ema(values, 12);
  const slow = ema(values, 26);

  if (!fast.length || !slow.length) {
    return {
      macd: null,
      signal: null,
      histogram: null,
    };
  }

  const macdSeries = [];

  for (let i = 0; i < values.length; i++) {
    const fastIndex = i - 12 + 1;
    const slowIndex = i - 26 + 1;

    if (fastIndex >= 0 && slowIndex >= 0) {
      macdSeries.push(
        fast[fastIndex] - slow[slowIndex]
      );
    }
  }

  const signalSeries = ema(macdSeries, 9);

  const macd = macdSeries[macdSeries.length - 1];

  const signal =
    signalSeries.length
      ? signalSeries[signalSeries.length - 1]
      : null;

  return {
    macd,
    signal,
    histogram:
      signal !== null ? macd - signal : null,
  };
}

function calculateATR(candles, period = 14) {
  if (candles.length <= period) return null;

  const trueRanges = [];

  for (let i = 1; i < candles.length; i++) {
    const high = number(candles[i].high);
    const low = number(candles[i].low);
    const previousClose = number(candles[i - 1].close);

    if (
      high === null ||
      low === null ||
      previousClose === null
    ) {
      continue;
    }

    const range1 = high - low;
    const range2 = Math.abs(high - previousClose);
    const range3 = Math.abs(low - previousClose);

    trueRanges.push(
      Math.max(range1, range2, range3)
    );
  }

  if (trueRanges.length < period) return null;

  let atr =
    trueRanges
      .slice(0, period)
      .reduce((sum, value) => sum + value, 0) / period;

  for (let i = period; i < trueRanges.length; i++) {
    atr =
      (atr * (period - 1) + trueRanges[i]) / period;
  }

  return atr;
}

function calculateBollingerBands(values, period = 20, multiplier = 2) {
  if (values.length < period) return null;

  const recent = values.slice(-period);

  const middle =
    recent.reduce((sum, value) => sum + value, 0) / period;

  const variance =
    recent.reduce(
      (sum, value) => sum + Math.pow(value - middle, 2),
      0
    ) / period;

  const standardDeviation = Math.sqrt(variance);

  return {
    middle,
    upper: middle + multiplier * standardDeviation,
    lower: middle - multiplier * standardDeviation,
  };
}

function calculateADX(candles, period = 14) {
  if (candles.length <= period + 1) return null;

  const tr = [];
  const plusDM = [];
  const minusDM = [];

  for (let i = 1; i < candles.length; i++) {
    const currentHigh = number(candles[i].high);
    const currentLow = number(candles[i].low);

    const previousHigh = number(candles[i - 1].high);
    const previousLow = number(candles[i - 1].low);
    const previousClose = number(candles[i - 1].close);

    if (
      currentHigh === null ||
      currentLow === null ||
      previousHigh === null ||
      previousLow === null ||
      previousClose === null
    ) {
      continue;
    }

    const highMove = currentHigh - previousHigh;
    const lowMove = previousLow - currentLow;

    const trueRange = Math.max(
      currentHigh - currentLow,
      Math.abs(currentHigh - previousClose),
      Math.abs(currentLow - previousClose)
    );

    tr.push(trueRange);

    plusDM.push(
      highMove > lowMove && highMove > 0 ? highMove : 0
    );

    minusDM.push(
      lowMove > highMove && lowMove > 0 ? lowMove : 0
    );
  }

  if (tr.length < period * 2) return null;

  let atr =
    tr.slice(0, period).reduce((a, b) => a + b, 0);

  let plus =
    plusDM.slice(0, period).reduce((a, b) => a + b, 0);

  let minus =
    minusDM.slice(0, period).reduce((a, b) => a + b, 0);

  const dx = [];
  let latestPlusDI = 0;
  let latestMinusDI = 0;

  for (let i = period; i < tr.length; i++) {
    atr = atr - atr / period + tr[i];
    plus = plus - plus / period + plusDM[i];
    minus = minus - minus / period + minusDM[i];

    if (atr === 0) continue;

    const plusDI = (plus / atr) * 100;
    const minusDI = (minus / atr) * 100;

    latestPlusDI = plusDI;
    latestMinusDI = minusDI;

    const denominator = plusDI + minusDI;

    if (denominator === 0) {
      dx.push(0);
    } else {
      dx.push(
        (Math.abs(plusDI - minusDI) / denominator) * 100
      );
    }
  }

  if (dx.length < period) return null;

  let adx =
    dx.slice(0, period).reduce((a, b) => a + b, 0) / period;

  for (let i = period; i < dx.length; i++) {
    adx =
      (adx * (period - 1) + dx[i]) / period;
  }

  return {
    adx,
    plusDI: latestPlusDI,
    minusDI: latestMinusDI,
  };
}

function calculateStructure(candles) {
  if (candles.length < 20) {
    return {
      direction: "NEUTRAL",
      support: null,
      resistance: null,
    };
  }

  const recent = candles.slice(-20);

  const recentHighs = highs(recent);
  const recentLows = lows(recent);

  const support = Math.min(...recentLows);
  const resistance = Math.max(...recentHighs);

  const midpoint = Math.floor(recent.length / 2);

  const firstHalf = recent.slice(0, midpoint);
  const secondHalf = recent.slice(midpoint);

  const firstHigh = Math.max(...highs(firstHalf));
  const secondHigh = Math.max(...highs(secondHalf));

  const firstLow = Math.min(...lows(firstHalf));
  const secondLow = Math.min(...lows(secondHalf));

  let direction = "NEUTRAL";

  if (
    secondHigh > firstHigh &&
    secondLow > firstLow
  ) {
    direction = "BULLISH";
  } else if (
    secondHigh < firstHigh &&
    secondLow < firstLow
  ) {
    direction = "BEARISH";
  }

  return {
    direction,
    support,
    resistance,
  };
}

function analyzeTimeframe(candles) {
  const values = closes(candles);

  if (values.length < 200) {
    throw new Error(
      "Not enough candle data for full analysis."
    );
  }

  const price = values[values.length - 1];

  const ema9Series = ema(values, 9);
  const ema20Series = ema(values, 20);
  const ema50Series = ema(values, 50);
  const ema100Series = ema(values, 100);
  const ema200Series = ema(values, 200);

  const ema9 = ema9Series.at(-1);
  const ema20 = ema20Series.at(-1);
  const ema50 = ema50Series.at(-1);
  const ema100 = ema100Series.at(-1);
  const ema200 = ema200Series.at(-1);

  const rsi = calculateRSI(values, 14);
  const macd = calculateMACD(values);
  const atr = calculateATR(candles, 14);
  const bollinger = calculateBollingerBands(values, 20, 2);
  const adx = calculateADX(candles, 14);
  const structure = calculateStructure(candles);

  let buyScore = 0;
  let sellScore = 0;

  const confirmations = [];
  const warnings = [];

  // EMA trend alignment
  if (
    ema9 > ema20 &&
    ema20 > ema50 &&
    ema50 > ema100 &&
    ema100 > ema200
  ) {
    buyScore += 18;
    confirmations.push("Strong bullish EMA alignment");
  } else if (
    ema9 < ema20 &&
    ema20 < ema50 &&
    ema50 < ema100 &&
    ema100 < ema200
  ) {
    sellScore += 18;
    confirmations.push("Strong bearish EMA alignment");
  } else {
    warnings.push("EMA alignment is mixed");
  }

  // Price vs EMA 200
  if (price > ema200) {
    buyScore += 8;
    confirmations.push("Price above EMA 200");
  } else if (price < ema200) {
    sellScore += 8;
    confirmations.push("Price below EMA 200");
  }

  // RSI
  if (rsi >= 52 && rsi <= 70) {
    buyScore += 10;
    confirmations.push("Bullish RSI momentum");
  } else if (rsi <= 48 && rsi >= 30) {
    sellScore += 10;
    confirmations.push("Bearish RSI momentum");
  } else if (rsi > 70) {
    warnings.push("RSI is overbought");
  } else if (rsi < 30) {
    warnings.push("RSI is oversold");
  }

  // MACD
  if (
    macd.macd !== null &&
    macd.signal !== null &&
    macd.histogram !== null
  ) {
    if (
      macd.macd > macd.signal &&
      macd.histogram > 0
    ) {
      buyScore += 12;
      confirmations.push("Bullish MACD");
    } else if (
      macd.macd < macd.signal &&
      macd.histogram < 0
    ) {
      sellScore += 12;
      confirmations.push("Bearish MACD");
    } else {
      warnings.push("MACD confirmation is mixed");
    }
  }

  // ADX + DI
  if (adx) {
    if (adx.adx >= 20) {
      if (adx.plusDI > adx.minusDI) {
        buyScore += 12;
        confirmations.push("ADX trend strength supports buyers");
      } else if (adx.minusDI > adx.plusDI) {
        sellScore += 12;
        confirmations.push("ADX trend strength supports sellers");
      }
    } else {
      warnings.push("ADX indicates a weak trend");
    }
  }

  // Market structure
  if (structure.direction === "BULLISH") {
    buyScore += 12;
    confirmations.push("Bullish market structure");
  } else if (structure.direction === "BEARISH") {
    sellScore += 12;
    confirmations.push("Bearish market structure");
  } else {
    warnings.push("Market structure is neutral");
  }

  // Bollinger Bands
  if (bollinger) {
    if (
      price > bollinger.middle &&
      price < bollinger.upper
    ) {
      buyScore += 6;
    } else if (
      price < bollinger.middle &&
      price > bollinger.lower
    ) {
      sellScore += 6;
    }
  }

  // Support / resistance warning
  if (structure.resistance !== null && atr) {
    const distanceToResistance =
      structure.resistance - price;

    if (
      distanceToResistance >= 0 &&
      distanceToResistance < atr
    ) {
      warnings.push(
        "Price is close to recent resistance"
      );

      buyScore = Math.max(0, buyScore - 5);
    }
  }

  if (structure.support !== null && atr) {
    const distanceToSupport =
      price - structure.support;

    if (
      distanceToSupport >= 0 &&
      distanceToSupport < atr
    ) {
      warnings.push(
        "Price is close to recent support"
      );

      sellScore = Math.max(0, sellScore - 5);
    }
  }

  const totalDirectionalScore =
    buyScore + sellScore;

  let signal = "WAIT";

  if (
    totalDirectionalScore > 0 &&
    buyScore > sellScore &&
    buyScore >= 45
  ) {
    signal = "BUY";
  } else if (
    totalDirectionalScore > 0 &&
    sellScore > buyScore &&
    sellScore >= 45
  ) {
    signal = "SELL";
  }

  return {
    signal,
    buyScore,
    sellScore,
    price,
    indicators: {
      ema9,
      ema20,
      ema50,
      ema100,
      ema200,
      rsi,
      macd,
      adx,
      atr,
      bollinger,
    },
    structure,
    confirmations,
    warnings,
  };
}

function calculateProbabilities(results) {
  const buySignals = results.filter(
    (r) => r.signal === "BUY"
  ).length;

  const sellSignals = results.filter(
    (r) => r.signal === "SELL"
  ).length;

  const waitSignals = results.filter(
    (r) => r.signal === "WAIT"
  ).length;

  const total = results.length;

  const buyStrength =
    results.reduce((sum, r) => sum + r.buyScore, 0);

  const sellStrength =
    results.reduce((sum, r) => sum + r.sellScore, 0);

  const directionalTotal =
    buyStrength + sellStrength;

  let buyProbability;
  let sellProbability;

  if (directionalTotal === 0) {
    buyProbability = 20;
    sellProbability = 20;
  } else {
    buyProbability = Math.round(
      (buyStrength / directionalTotal) * 80
    );

    sellProbability = 80 - buyProbability;
  }

  let waitProbability = 20;

  const agreement =
    Math.max(buySignals, sellSignals) / total;

  if (agreement >= 0.8) {
    waitProbability = 10;
  } else if (agreement <= 0.4) {
    waitProbability = 35;
  }

  const directionalPool = 100 - waitProbability;

  if (directionalTotal > 0) {
    buyProbability = Math.round(
      (buyStrength / directionalTotal) *
        directionalPool

# Bet-Brew

Bet-Brew is an npm package that provides a suite of utilities designed to aid bettors in various betting and trading strategies.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [API Documentation](#api-documentation)
    -   [BetBrewClass](#betbrewclass)
    -   [BrewResult](#brewresult)
    -   [Input Types](#input-types)

## Installation

```bash
npm install bet-brew
```

## Usage

Import the main class and use its methods. Below are example usages for a few methods:

```typescript
import { betBrew } from 'bet-brew';

const brew = betBrew();

// Example usage of calculateEV
const evResult = brew.calculateEV({
    stakedAmount: 100,
    oddsTaken: 2.0,
    startingPrice: 1.9,
});

console.log('Expected Value:', evResult);

// Example usage of calculateROI
const roiResult = brew.calculateROI({
    stakedAmount: 100,
    oddsTaken: 2.0,
    startingPrice: 1.9,
});

console.log('Return on Investment:', roiResult);

// Example usage of calculateBookmakerMargin
const marginResult = brew.calculateBookmakerMargin({
    allOdds: [1.9, 2.1, 3.0],
});

console.log('Bookmaker Margin:', marginResult);

// Example usage of calculateAdjustedProbability
const adjustedProbResult = brew.calculateAdjustedProbability({
    startingPrice: 1.9,
    allOdds: [1.9, 2.1, 3.0],
});

console.log('Adjusted Probability:', adjustedProbResult);

// Example usage of calculateAdjustedEV
const adjustedEVResult = brew.calculateAdjustedEV({
    stakedAmount: 100,
    oddsTaken: 2.0,
    startingPrice: 1.9,
    allOdds: [1.9, 2.1, 3.0],
});

console.log('Adjusted Expected Value:', adjustedEVResult);

// Example usage of calculateAdjustedROI
const adjustedROIResult = brew.calculateAdjustedROI({
    stakedAmount: 100,
    oddsTaken: 2.0,
    startingPrice: 1.9,
    allOdds: [1.9, 2.1, 3.0],
});

console.log('Adjusted Return on Investment:', adjustedROIResult);
```

## API Documentation

### `BetBrewClass`

Core class containing methods for various betting utilities.

#### Methods

-   **`calculateEV(input: EVInput)`**: Calculates the Expected Value (EV) of a bet.
-   **`calculateROI(input: ROIInput)`**: Calculates the Return on Investment (ROI) of a bet.
-   **`calculateBookmakerMargin(input: BookmakerMarginInput)`**: Calculates the margin of a bookmaker based on provided odds.
-   **`calculateAdjustedProbability(input: AdjustedProbabilityInput)`**: Calculates the adjusted probability accounting for the bookmaker's margin.
-   **`calculateAdjustedEV(input: AdjustedEVInput)`**: Calculates the adjusted Expected Value (EV) of a bet.
-   **`calculateAdjustedROI(input: AdjustedROIInput)`**: Calculates the adjusted Return on Investment (ROI) of a bet.
-   **`calculatePnL(input: PnlInput)`**: Calculates profit and total return of a bet.
-   **`decimalToFractional(decimalOdds: number)`**: Converts decimal odds to fractional format.
-   **`fractionalToDecimal(fraction: string)`**: Converts fractional odds to decimal format.
-   **`decimalToMoneyline(decimalOdds: number)`**: Converts decimal odds to moneyline format.
-   **`moneylineToDecimal(moneyline: number)`**: Converts moneyline odds to decimal format.


### Input Types

#### `EVInput`

Used for calculating the Expected Value (EV) of a bet.

-   `stakedAmount`: The amount of money staked on the bet. (Type: `number`)
-   `oddsTaken`: The odds that were taken when the bet was placed. (Type: `number`)
-   `startingPrice`: The starting price or odds of the bet. (Type: `number`)

#### `ROIInput`

Used for calculating the Return on Investment (ROI) of a bet. Extends from `EVInput`.

#### `BookmakerMarginInput`

Used for calculating the margin of a bookmaker based on provided odds.

-   `allOdds`: An array of all odds that are being considered. (Type: `number[]`)

#### `AdjustedProbabilityInput`

Used for calculating the adjusted probability, accounting for the bookmaker's margin.

-   `startingPrice`: The starting price or odds of the bet. (Type: `number`)
-   `allOdds`: An array of all odds that are being considered. (Type: `number[]`)

#### `AdjustedEVInput`

Used for calculating the adjusted Expected Value (EV) of a bet.

-   Inherits fields from both `EVInput` and `BookmakerMarginInput`.

#### `AdjustedROIInput`

Used for calculating the adjusted Return on Investment (ROI) of a bet.

-   Inherits all fields from `AdjustedEVInput`.

#### `PnlInput`

Used for calculating the profit and total return of a bet.

-   `oddsTaken`: The odds that were taken when the bet was placed. (Type: `number`)
-   `stakedAmount`: The amount of money staked on the bet. (Type: `number`)

### BrewResult

Interface outlining the results of calculations:

-   `margin`: Bookmaker's margin in percentage. (Type: `number`)
-   `rawEV`: Raw Expected Value of a bet. (Type: `number`)
-   `rawROI`: Raw Return on Investment of a bet in percentage. (Type: `number`)
-   `adjustedEV`: Adjusted Expected Value of a bet. (Type: `number`)
-   `adjustedROI`: Adjusted Return on Investment of a bet in percentage. (Type: `number`)

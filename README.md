# BetBrew

BetBrew provides a suite of utilities designed to aid bettors in various betting and trading strategies.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [BetBrewClass](#betbrewclass)
  - [BrewResult](#brewresult)
- [License](#license)

## Installation

```bash
npm install betbrew
```

## Usage

Import the main class and use its methods:

```typescript
import { betBrew } from 'betbrew';

const brew = betBrew();

const result = brew.calculateCLV(2.10, 2.00);
console.log(result); 
```

## API Documentation

### `BetBrewClass`

Core class containing methods for various betting utilities.

#### Methods

- **`calculateEV(stakedAmount, oddsTaken, startingPrice)`**
  
  Calculates the Expected Value (EV) of a bet.

- **`calculateROI(stakedAmount, oddsTaken, startingPrice)`**
  
  Calculates the Return on Investment (ROI) of a bet.

- **`calculateBookmakerMargin(allOdds)`**
  
  Calculates the margin of a bookmaker based on provided odds.

- **`calculateAdjustedProbability(startingPrice, allOdds)`**
  
  Calculates the adjusted probability accounting for the bookmaker's margin.

- **`calculateAdjustedEV(stakedAmount, oddsTaken, startingPrice, allOdds)`**
  
  Calculates the adjusted Expected Value (EV) of a bet.

- **`calculateAdjustedROI(stakedAmount, oddsTaken, startingPrice, allOdds)`**
  
  Calculates the adjusted Return on Investment (ROI) of a bet.

- **`decimalToFractional(decimalOdds)`**
  
  Converts decimal odds to fractional format.

- **`fractionalToDecimal(fraction)`**
  
  Converts fractional odds to decimal format.

- **`decimalToMoneyline(decimalOdds)`**
  
  Converts decimal odds to moneyline format.

- **`moneylineToDecimal(moneyline)`**
  
  Converts moneyline odds to decimal format.

- **`calculateCLV(betOdds, closingOdds)`**
  
  Calculates the Closing Line Value (CLV).

### `BrewResult`

Interface outlining the results of calculations.

Fields:

- `margin`: Bookmaker's margin in percentage.
- `rawEV`: Raw Expected Value of a bet.
- `rawROI`: Raw Return on Investment of a bet in percentage.
- `adjustedEV`: Adjusted Expected Value of a bet.
- `adjustedROI`: Adjusted Return on Investment of a bet in percentage.

## License

[MIT](LICENSE)

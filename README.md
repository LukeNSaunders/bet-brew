
```markdown
# BetBrew

BetBrew provides a suite of utilities designed to aid bettors in various betting and trading strategies.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [BetBrewClass](#betbrewclass)
  - [BrewResult](#brewresult)
  - [Input Types](#input-types)
- [License](#license)

## Installation

```bash
npm install bet-brew
```

## Usage

Import the main class and use its methods. Below are example usages for a few methods:

```typescript
import { betBrew } from 'betbrew';

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

// More examples...
```

## API Documentation

### `BetBrewClass`

Core class containing methods for various betting utilities.

#### Methods

- **`calculateEV(input: EVInput)`**: Calculates the Expected Value (EV) of a bet.
- **`calculateROI(input: ROIInput)`**: Calculates the Return on Investment (ROI) of a bet.
- More methods...

### `BrewResult`

Interface outlining the results of calculations:

- `margin`: Bookmaker's margin in percentage.
- `rawEV`: Raw Expected Value of a bet.
- More fields...

### Input Types

Detailed descriptions and fields for input types (`EVInput`, `ROIInput`, and more) should be provided.

## License

[MIT](LICENSE)
```

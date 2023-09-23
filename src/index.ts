interface BrewResult {
    margin: number;
    rawEV: number;
    rawROI: number;
    adjustedEV: number;
    adjustedROI: number;
}

class BetBrewClass {
    private validateNumber(input: number, name: string, shouldBePositive: boolean = false): void {
        if (typeof input !== 'number' || isNaN(input)) {
            throw new TypeError(`${name} must be a valid number.`);
        }
        if (shouldBePositive && input <= 0) {
            throw new RangeError(`${name} must be greater than 0.`);
        }
    }

    private validateArray(input: any[], name: string): void {
        if (!Array.isArray(input)) {
            throw new TypeError(`${name} must be an array.`);
        }
    }

    public calculateEV(stakedAmount: number, oddsTaken: number, startingPrice: number): number {
        this.validateNumber(stakedAmount, 'stakedAmount', true);
        this.validateNumber(oddsTaken, 'oddsTaken', true);
        this.validateNumber(startingPrice, 'startingPrice', true);

        const impliedProbabilitySP: number = 1 / startingPrice;
        return stakedAmount * (impliedProbabilitySP * (oddsTaken - 1) - (1 - impliedProbabilitySP));
    }

    public calculateROI(stakedAmount: number, oddsTaken: number, startingPrice: number): number {
        const ev: number = this.calculateEV(stakedAmount, oddsTaken, startingPrice);
        return (ev / stakedAmount) * 100;
    }

    public calculateBookmakerMargin(allOdds: number[]): number {
        this.validateArray(allOdds, 'allOdds');

        let totalImpliedProbability: number = 0;
        for (let odds of allOdds) {
            this.validateNumber(odds, 'odds in allOdds array', true);
            totalImpliedProbability += (1 / odds) * 100;
        }
        return totalImpliedProbability - 100;
    }

    public calculateAdjustedProbability(startingPrice: number, allOdds: number[]): number {
        this.validateNumber(startingPrice, 'startingPrice', true);
        this.validateArray(allOdds, 'allOdds');

        const margin: number = this.calculateBookmakerMargin(allOdds);
        const rawProbability: number = 1 / startingPrice;
        return rawProbability * (100 / (100 + margin));
    }

    public calculateAdjustedEV(stakedAmount: number, oddsTaken: number, startingPrice: number, allOdds: number[]): number {
        this.validateNumber(stakedAmount, 'stakedAmount', true);
        this.validateNumber(oddsTaken, 'oddsTaken', true);
        this.validateNumber(startingPrice, 'startingPrice', true);
        this.validateArray(allOdds, 'allOdds');

        const adjustedProbability: number = this.calculateAdjustedProbability(startingPrice, allOdds);
        return stakedAmount * (adjustedProbability * (oddsTaken - 1) - (1 - adjustedProbability));
    }

    public calculateAdjustedROI(stakedAmount: number, oddsTaken: number, startingPrice: number, allOdds: number[]): number {
        const adjustedEv: number = this.calculateAdjustedEV(stakedAmount, oddsTaken, startingPrice, allOdds);
        return (adjustedEv / stakedAmount) * 100;
    }

    public decimalToFractional(decimalOdds: number): string {
        this.validateNumber(decimalOdds, 'decimalOdds', true);
        const numerator = decimalOdds - 1;
        const denominator = 1;
        // Simplification can be added here for cleaner fractions
        return `${numerator}/${denominator}`;
    }

    public fractionalToDecimal(fraction: string): number {
        const [numerator, denominator] = fraction.split('/').map(Number);
        return numerator / denominator + 1;
    }

    public decimalToMoneyline(decimalOdds: number): number {
        this.validateNumber(decimalOdds, 'decimalOdds', true);
        if (decimalOdds >= 2) {
            return +(decimalOdds - 1) * 100;
        } else {
            return -100 / (decimalOdds - 1);
        }
    }

    public moneylineToDecimal(moneyline: number): number {
        this.validateNumber(moneyline, 'moneyline');
        if (moneyline > 0) {
            return moneyline / 100 + 1;
        } else {
            return 1 - 100 / moneyline;
        }
    }
    public calculateCLV(betOdds: number, closingOdds: number): number {
        this.validateNumber(betOdds, 'betOdds', true);
        this.validateNumber(closingOdds, 'closingOdds', true);

        return (betOdds / closingOdds - 1) * 100;
    }
}

const betBrew = () => {
    return new BetBrewClass();
};

const calculator = betBrew().decimalToFractional(2.5);

console.log(calculator);


const clvValue = betBrew().calculateCLV(2.10, 2.00); 
console.log(clvValue); 

export { betBrew, BrewResult };

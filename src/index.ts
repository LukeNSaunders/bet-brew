import { EVInput, ROIInput, BookmakerMarginInput, AdjustedEVInput, AdjustedProbabilityInput, AdjustedROIInput, PnlInput } from './types/type.betBrew';

class BetBrewClass {
    private validateNumber(input: number, name: string, shouldBePositive: boolean = false): void {
        if (typeof input !== 'number' || isNaN(input)) {
            throw new TypeError(`${name} must be a valid number.`);
        }
        if (shouldBePositive && input <= 0) {
            throw new RangeError(`${name} must be greater than 0.`);
        }
    }

    private validateString(input: string, name: string): void {
        if (typeof input !== 'string' || input.trim() === '') {
            throw new TypeError(`${name} must be a valid non-empty string.`);
        }
    }
    private validateArray(input: any[], name: string): void {
        if (!Array.isArray(input)) {
            throw new TypeError(`${name} must be an array.`);
        }
    }

    public calculateEV(input: EVInput): number {
        this.validateNumber(input.stakedAmount, 'stakedAmount', true);
        this.validateNumber(input.oddsTaken, 'oddsTaken', true);
        this.validateNumber(input.startingPrice, 'startingPrice', true);

        const impliedProbabilitySP: number = 1 / input.startingPrice;
        return input.stakedAmount * (impliedProbabilitySP * (input.oddsTaken - 1) - (1 - impliedProbabilitySP));
    }

    public calculateROI(input: ROIInput): number {
        const ev: number = this.calculateEV(input);
        return (ev / input.stakedAmount) * 100;
    }

    public calculateBookmakerMargin(input: BookmakerMarginInput): number {
        this.validateArray(input.allOdds, 'allOdds');

        let totalImpliedProbability: number = 0;
        for (let odds of input.allOdds) {
            this.validateNumber(odds, 'odds in allOdds array', true);
            totalImpliedProbability += (1 / odds) * 100;
        }
        return totalImpliedProbability - 100;
    }

    public calculateAdjustedProbability(input: AdjustedProbabilityInput): number {
        this.validateNumber(input.startingPrice, 'startingPrice', true);
        this.validateArray(input.allOdds, 'allOdds');

        const margin: number = this.calculateBookmakerMargin(input);
        const rawProbability: number = 1 / input.startingPrice;
        return rawProbability * (100 / (100 + margin));
    }

    public calculateAdjustedEV(input: AdjustedEVInput): number {
        this.validateNumber(input.stakedAmount, 'stakedAmount', true);
        this.validateNumber(input.oddsTaken, 'oddsTaken', true);
        this.validateNumber(input.startingPrice, 'startingPrice', true);
        this.validateArray(input.allOdds, 'allOdds');

        const adjustedProbability: number = this.calculateAdjustedProbability(input);
        return input.stakedAmount * (adjustedProbability * (input.oddsTaken - 1) - (1 - adjustedProbability));
    }

    public calculateAdjustedROI(input: AdjustedROIInput): number {
        const adjustedEv: number = this.calculateAdjustedEV(input);
        return (adjustedEv / input.stakedAmount) * 100;
    }

    public calculatePnL(input: PnlInput): any {
        this.validateNumber(input.oddsTaken, 'odds');
        this.validateNumber(input.stakedAmount, 'staked amount');

        const profit = input.oddsTaken * input.stakedAmount - input.stakedAmount;
        const totalReturn = input.oddsTaken * input.stakedAmount;

        return {
            profit: profit,
            totalReturn: totalReturn,
        };
    }

    public decimalToFractional(decimalOdds: number): string {
        this.validateNumber(decimalOdds, 'decimalOdds', true);
        const numerator = decimalOdds - 1;
        const denominator = 1;
        return `${numerator}/${denominator}`;
    }

    public fractionalToDecimal(fraction: string): number {
        this.validateString(fraction, 'fractional odds');
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
}

const betBrew = () => {
    return new BetBrewClass();
};

export { betBrew };

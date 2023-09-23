import { BrewResult, EVInput, ROIInput, BookmakerMarginInput, AdjustedEVInput, AdjustedProbabilityInput, AdjustedROIInput } from './types/type.betBrew';

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
}

const betBrew = () => {
    return new BetBrewClass();
};

export { betBrew, BrewResult, EVInput, ROIInput, AdjustedEVInput, AdjustedProbabilityInput, AdjustedROIInput, BookmakerMarginInput };

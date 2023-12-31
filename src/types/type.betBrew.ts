interface BrewResult {
    margin: number;
    rawEV: number;
    rawROI: number;
    adjustedEV: number;
    adjustedROI: number;
}

interface EVInput {
    stakedAmount: number;
    oddsTaken: number;
    startingPrice: number;
}

interface PnlInput {
    oddsTaken: number;
    stakedAmount: number;
}

interface KellyBetInput {
    oddsTaken: number;
    probability: number;
    bankroll: number;
}

interface ROIInput extends EVInput {}

interface BookmakerMarginInput {
    allOdds: number[];
}

interface AdjustedProbabilityInput extends BookmakerMarginInput {
    startingPrice: number;
}

interface AdjustedEVInput extends EVInput, BookmakerMarginInput {}

interface AdjustedROIInput extends AdjustedEVInput {}

export { BrewResult, EVInput, ROIInput, BookmakerMarginInput, AdjustedProbabilityInput, AdjustedEVInput, AdjustedROIInput, PnlInput, KellyBetInput };

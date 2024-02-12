import React from "react";

export default function Results({ list }: { list: number[] }) {
    let highest: number | string = Math.max(...list),
        lowest: number | string = Math.min(...list),
        difference: number | string = 0;
    const validateNumbers = (n: any) => {
        return n instanceof Number;
    };
    if (!isFinite(highest) || !isFinite(lowest)) {
        highest = "-";
        lowest = "-";
        difference = "-";
    } else {
        difference = highest - lowest;
    }

    return (
        <div className="results">
            <div className="results__card">
                <h2 className="results__card__value">{highest}</h2>
                <p className="results__card__descp">Highest Value</p>
            </div>
            <div className="results__card">
                <h2 className="results__card__value">{difference}</h2>
                <p className="results__card__descp">Difference</p>
            </div>
            <div className="results__card">
                <h2 className="results__card__value">{lowest}</h2>
                <p className="results__card__descp">Lowest Value</p>
            </div>
        </div>
    );
}

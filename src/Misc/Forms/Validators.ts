// ======================= VALIDATOR FUNCTIONS
export function ValidateChars(input: string, regex: RegExp) {
    /*LOOKUP: checking if theres a match works just fine...but if i use test,
     it has some weird bugs, like logging the value says true, but ends up returning 
     false...or having a valid input returning true then false on every call
    console.log(input.match(regex) ? true : false);
    console.log(regex.test(input));
     */
    return input.match(regex) ? true : false;
}

// ======================= VALIDATOR CONDITIONS
//NOTE: checked with https://regex101.com/
//IMPROVE: This doesnt allow negative numbers
export const VALIDATE_CSV_NUMBERS_ONLY = /^\d+(,\d+)*$/g;

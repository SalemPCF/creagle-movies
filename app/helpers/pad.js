export const padNum = (num, size = 2) => {
    // Get the number as a string
    let padded = `${num}`;

    while (padded.length < size) {
        // Add a 0 to the start of the string.
        padded = `0${padded}`;
    }

    return padded;
};

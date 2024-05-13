export function isValidLocation(location) {
    // Regular expression patterns
    const zipCodePattern = /^\d{5}(-\d{4})?$/;
    const cityPattern = /^[a-zA-Z\s]+$/;

    return zipCodePattern.test(location) || cityPattern.test(location);
}
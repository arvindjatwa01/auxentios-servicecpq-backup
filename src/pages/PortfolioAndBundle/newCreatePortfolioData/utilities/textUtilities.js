export const isEmpty = (str) => {
    if (!str || str === "" || str === null || str === undefined || str === 0 || str === "string") {
        return true;
    }
    return false;
}

export const isEmptySelect = (str) => {
    if (!str || str === "" || str === null || str === undefined || str === 0 || str === "string" || str === "EMPTY") {
        return true;
    }
    return false;
}
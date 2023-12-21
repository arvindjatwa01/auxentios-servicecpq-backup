// text utility for empty input 
export const inputIsEmpty = (str) => {
    if (!str || str === "" || str === null || str === undefined || str === 0) {
        return true;
    }
    return false;
}

// view mode values validation check 
export const isEmpty = (str) => {
    if (!str || str === "" || str === null || str === undefined || str === 0 || str === "string") {
        return true;
    }
    return false;
}

// check data values for select input 
export const isEmptySelect = (str) => {
    if (!str || str === "" || str === null || str === undefined || str === 0 || str === "string" || str === "EMPTY") {
        return true;
    }
    return false;
}
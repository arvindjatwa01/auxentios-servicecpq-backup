export const isEmptyData = (str) => {
    if (str === "" || str === null || str === undefined || str === 0 || str === "string") {
        return true;
    }
    return false
}

export const isEmptySelectData = (str) => {
    console.log("str ======= ", str);
    if (str === "" || str === null || str === undefined || str === 0 || str === "string" || str === "EMPTY") {
        return true;
    }
    return false;
}
import { toast } from "react-toastify";

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

// Error Toast Message
export const errorToastMessage = (message) => (
    toast("😐" + message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
)

// Toast Success Message
export const successToastMessage = (message) => (
    toast("👏" + message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
)
import { toast } from "react-toastify";

// toast for error Message
export const errorMessage = (message) => (
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

// toast for Success Message
export const successMessage = (message) => (
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
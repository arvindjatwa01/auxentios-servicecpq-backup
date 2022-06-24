import React from 'react';
import {toast} from "react-toastify";
interface props{
    status:number;
    message:string
}
export const ToastMessageHandler:React.FC<props> = ({status,message}:props) => {

    return(
        <React.Fragment>
            {status === 200 && toast.success(message, {
                toastId:status,
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })}
            {status === 400 && toast.error(message, {
                toastId:1,
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })}
        </React.Fragment>
    )
}
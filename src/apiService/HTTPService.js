import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Environment from "../config/environment";
import Cookies from "js-cookie";
import "./AxiosInterceptor";
// const accessToken = Cookies.get("accessToken");
const accessToken = localStorage.getItem('access_token')

export function HttpService<T>(
    method: AxiosRequestConfig["method"],
    path: string,
    data?: any,
): Promise<T[] | null> {
    const options: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        method: method,
        url: path,
        data: data,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
    };
    return axios(options)
        .then((response: AxiosResponse<T>) => {
            return response;
        })
        .catch((err: any) => {
            if (err.response) {
                return err.response;
            }
            return "Error";
        });
}

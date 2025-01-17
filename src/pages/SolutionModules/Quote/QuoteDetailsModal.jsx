import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

// import jsPDF from "jspdf";

import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";

import Moment from "react-moment";
import { Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { callPostApi } from "services/ApiCaller";
import { HTML_TO_PDF_GENERATER_URL } from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";

const QuoteDetailsModal = ({
    show,
    hideModal,
    handleSnack,
    quoteItemsMaster = [],
    customerData,
    quoteDetails,
    quoteType,
    priceEstimates = [],
}) => {
    console.log("quoteItemsMaster :::: ", quoteItemsMaster);
    const [taxAmount, setTaxAmount] = useState(null);
    const [discounAmt, setDiscounAmt] = useState(null);

    useEffect(() => {
        if (show) {
            if (priceEstimates.length !== 0) {
                const taxes = priceEstimates.find(
                    (obj) => obj.priceSummaryType === "TAX"
                );
                if (taxes) {
                    setTaxAmount(taxes.price);
                    setDiscounAmt(taxes.fixedDiscount);
                }
            }
        }
    }, [show]);
    const generateHTML = () => {
        // const doc = new jsPDF();
        const pdfContent = `<html>
    <head>
      <title>Downloaded PDF</title>
    </head>
    <body>
    <div style="background-color: #ffffff;">
    <div class="card"
        style="border: 1px solid #872ff7; border-radius:0.625rem !important; ;box-shadow:6px 11px 41px -28px #a99de7 !important;margin:1rem !important;">
        <div
            style="display:flex;justify-content:space-between !important;align-items:center;margin-left:0.5rem !important;margin-right:0;margin-top:1rem !important;margin-bottom:1rem !important;">
            <div class="px-2" style="padding-left:0.5rem !important;padding-right:0.5rem !important">
                <h3 class="mb-0" style="margin-bottom:0; font-family: inherit;
                font-weight: 500;
                line-height: 1.2;
                color: #222222; font-size: 1.5rem; margin-top: 0;">Tenant_ Partner_2</h3>
                <p class="mb-0 w-50" style="margin-bottom:0;width:50% !important; margin-top: 0;">NA</p>
                <p class="mb-0" style="margin-bottom:0; margin-top: 0;">9876543211</p>
            </div>
            <div
                style="background:#872ff7 !important;color:white !important;padding-left:1.5rem !important;padding-right:1.5rem !important;display:flex;align-items:center;border-radius:10px 0px 0px 10px">
                <h2 style="margin-top:0.25rem !important; margin-bottom:0.25rem !important; font-size: 1.875rem; font-family: inherit;
                font-weight: 500;
                ">Quote</h2>
            </div>
        </div>
        <div class="modal-body" style="position: relative;
        flex: 1 1 auto;
        padding: 1rem;">
            <h4 style="font-size: 1.125rem; margin-bottom: 0.5rem; margin-top: 0;
            font-family: inherit;
            font-weight: 500;
            line-height: 1.2;
            color: #222222;">Account:</h4>
            <div style="display:flex;justify-content:space-between !important;align-items:center">
                <h6 class="m-0" style="margin:0; font-weight: 400; font-size: 0.875rem;">Tenant_ Partner_2</h6>
                <p style="margin-bottom:0; margin-top: 0;text-align:right !important">Invoice Number. #QT000168
                </p>
            </div>
            <div style="display:flex;justify-content:space-between !important;align-items:center">
                <h6 class="m-0" style="margin:0; font-weight: 400; font-size: 0.875rem; width:50% !important;">NA</h6>
                <p style="margin-bottom:0; margin-top: 0;text-align:right !important">January 16, 2024
                </p>
            </div>
            <div style="display:flex;justify-content:space-between !important;align-items:center">
                <h6 class="m-0" style="margin:0; font-weight: 400; font-size: 0.875rem;">9876543211</h6>
                <p style="margin-bottom:0; margin-top: 0;text-align:right !important">Validity - N/A
                </p>
            </div>
            <div style="display: block;
            width: 100%;
            overflow-x: auto;">
                <table
                    style="padding-left: 0.5rem !important; padding-right: 0.5rem !important;margin-bottom: 1.5rem !important; margin-top: 1.5rem !important; width: 100%; background-color: transparent; border-collapse: collapse;">
                    <thead>
                        <tr class="text-black" style="color: #000000 !important;
                        font-weight: 500; border-bottom:2px solid black;">
                            <th style="border-bottom: none;
                            border-top: none;
                            vertical-align: middle;border: 0;padding: 0.75rem;text-align: inherit;">ITEM DESCRIPTION
                            </th>
                            <th style="border-bottom: none;
                            border-top: none;
                            vertical-align: middle;border: 0;padding: 0.75rem;text-align: inherit;">PRICE</th>
                            <th style="border-bottom: none;
                            border-top: none;
                            vertical-align: middle;border: 0;padding: 0.75rem;text-align: inherit;">QTY</th>
                            <th style="border-bottom: none;
                            border-top: none;
                            vertical-align: middle;border: 0;padding: 0.75rem;text-align: inherit;">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 2px solid black; padding-bottom: 0;">
                            <td
                                style="border-color: #f3f3f3; line-height: 1.2;
                            vertical-align: middle; border: 0;  padding: 0.75rem; padding-bottom: 0 !important; margin-bottom: 0 !important;">
                                <div>
                                    <h4 class="mb-0" style="margin-bottom: 0 !important; font-size: 1.125rem; font-family: inherit;
                                    font-weight: 500;
                                    line-height: 1.2;
                                    color: #222222; margin-top: 0;">
                                        Soluion-0412-RTF-Item_ZMR</h4>
                                    <ul class="px-2 mb-1"
                                        style="padding-left: 0.5rem !important;padding-right: 0.5rem !important;argin-bottom: 0.25rem !important;padding: 0;margin-top: 0;">
                                        <li style="list-style: none;">Soluion-0412-RTE-Item_ZMR Description</li>
                                    </ul>
                                </div>
                            </td>
                            <td style="border-color: #f3f3f3;  line-height: 1.2;
                            vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
    font-weight: 500;padding-bottom: 0 !important;    margin-bottom: 0 !important;">
                                $25096.8</td>
                            <td style="border-color: #f3f3f3;  line-height: 1.2;
                            vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
    font-weight: 500;padding-bottom: 0 !important;    margin-bottom: 0 !important;">
                                1</td>
                            <td style="border-color: #f3f3f3;  line-height: 1.2;
                            vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
    font-weight: 500;padding-bottom: 0 !important;    margin-bottom: 0 !important;">
                                $25096.8</td>
                        </tr>
                        <tr
                            style="margin-bottom: 0 !important; margin-top: 1rem !important; padding-top: 1rem !important; padding-bottom: 0 !important;">
                            <td
                                style="border-color: #f3f3f3;    line-height: 1.2;
                            vertical-align: middle;border: 0;    padding: 0.75rem;padding-top: 1rem !important; padding-bottom: 0 !important; margin-bottom: 0 !important;">
                            </td>
                            <td colspan="2" style="border-color: #f3f3f3;  line-height: 1.2;
                            vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
    font-weight: 600;padding-bottom: 0 !important;  padding-top: 0 !important;  margin-bottom: 0 !important;">Total
                            </td>
                            <td style="border-color: #f3f3f3;  line-height: 1.2;
    vertical-align: middle; border: 0; padding: 0.75rem;   padding-top: 0 !important;  color: #000000 !important;
font-weight: 600;padding-bottom: 0 !important;    margin-bottom: 0 !important;">$2028000</td>
                        </tr>
                        <tr
                            style="margin-bottom: 0 !important;padding-top: 1rem !important; padding-bottom: 0 !important;">
                            <td
                                style="border-color: #f3f3f3;    line-height: 1.2;
                            vertical-align: middle;border: 0;    padding: 0.75rem;padding-top: 1rem !important; padding-bottom: 0 !important; margin-bottom: 0 !important;">
                            </td>
                            <td colspan="2" style="border-color: #f3f3f3;  line-height: 1.2;
                            vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
    font-weight: 600;padding-bottom: 0 !important;  padding-top: 0 !important;  margin-bottom: 0 !important;">Tax
                            </td>
                            <td style="border-color: #f3f3f3;  line-height: 1.2;
    vertical-align: middle; border: 0; padding: 0.75rem;   padding-top: 0 !important;  color: #000000 !important;
font-weight: 600;padding-bottom: 0 !important;    margin-bottom: 0 !important;">-</td>
                        </tr>
                        <tr
                            style="margin-bottom: 0 !important;padding-top: 1rem !important; padding-bottom: 0 !important;">
                            <td
                                style="border-color: #f3f3f3;    line-height: 1.2;
                            vertical-align: middle;border: 0;    padding: 0.75rem;padding-top: 1rem !important; padding-bottom: 0 !important; margin-bottom: 0 !important;">
                            </td>
                            <td colspan="2" style="border-color: #f3f3f3;  line-height: 1.2;
                            vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
    font-weight: 600;padding-bottom: 0 !important;  padding-top: 0 !important;  margin-bottom: 0 !important;">Discount
                            </td>
                            <td style="border-color: #f3f3f3;  line-height: 1.2;
    vertical-align: middle; border: 0; padding: 0.75rem;   padding-top: 0 !important;  color: #000000 !important;
font-weight: 600;padding-bottom: 0 !important;    margin-bottom: 0 !important;">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h4 style="font-size: 1.125rem;margin-bottom: 0.5rem;
            font-family: inherit;
            font-weight: 600;
            line-height: 1.2;
            color: #222222;margin-top: 0;">Payment Method:</h4>
            <h5 style="margin-bottom: 0 !important; font-weight: 600;
            font-style: normal;font-size: 1rem;line-height: 1.2;
    color: #222222; margin-top: 0;">Central Bank</h5>
            <h5 style="margin-bottom: 0 !important; font-weight: 600;
            font-style: normal;font-size: 1rem;line-height: 1.2;
    color: #222222; margin-top: 0;">Samira Hadid</h5>
            <h5 style="margin-bottom: 0 !important; font-weight: 600;
            font-style: normal;font-size: 1rem;line-height: 1.2;
    color: #222222; margin-top: 0;">123-456-7890</h5>
            <div
                style="display: flex !important;justify-content: space-between !important;align-items: center !important;    margin-top: 1rem !important;border-bottom: 2px solid black;">
                <div>
                    <h4 style="margin-bottom: 0 !important; font-size: 1.125rem; font-family: inherit;
                    font-weight: 500;
                    line-height: 1.2;
                    color: #222222;margin-top: 0;">Term and Conditions:</h4>
                    <p style="margin-bottom: 0 !important; margin-top: 0;">Lorem ipsum dolor sit</p>
                </div>
                <div>
                    <h4 style="margin-bottom: 0 !important; font-size: 1.125rem; font-family: inherit;
                    font-weight: 600;
                    line-height: 1.2;
                    color: #222222;margin-top: 0 !important;">Ashok Mohanty</h4>
                    <h6 style="font-weight: 400;font-size: 0.875rem; margin-bottom: 0.5rem;
                    font-family: inherit;line-height: 1.2;
    color: #222222; margin-top: 0;">Manager</h6>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
      </html>`;

        const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quote Preview</title>
    
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    
        <!-- Bootstrap 5 CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <style>
            body {
                background: rgb(204, 204, 204);
            }
    
            page {
                background: white;
                display: block;
                margin: 0 auto;
                margin-bottom: 0.5cm;
                box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
            }
    
            page[size="A4"] {
                width: 21cm;
                height: 29.7cm;
                padding: 1px;
            }
    
            @media print {
    
                body,
                page {
                    background: white;
                    margin: 0;
                    box-shadow: 0;
                }
            }
    
            .container {
                background-color: #ffffff;
                /* margin-top: 1.50rem !important;
                margin-bottom: 1.50rem !important; */
            }
    
            .card {
                border: 1px solid #872ff7;
                border-radius: 0.625rem !important;
                box-shadow: 6px 11px 41px -28px #a99de7 !important;
                margin: 1rem !important;
                /* margin-top: 2rem !important;
                margin-bottom: 2rem !important; */
            }
    
            .bg-primary {
                background: #872ff7 !important;
            }
        </style>
    </head>
    
    <body>
        <page size="A4">
            <div class="container">
                <div class="card">
                    <div class="d-flex justify-content-between align-items-center ml-2 mr-0 mt-3 mb-3">
                        <div class="px-2">
                            <h3 class="mb-0" style="font-size: 1.5rem !important;">SYNYCS PROPERTIES LLP</h3>
                            <p class="mb-0 w-50">NA</p>
                            <p class="mb-0">9876543211</p>
                        </div>
                        <div class="bg-primary text-white px-4 d-flex align-items-center "
                            style="border-radius:10px 0px 0px 10px">
                            <h2 class="my-1">Quote</h2>
                        </div>
                    </div>
                    <div class="modal-body" style="position: relative;
            flex: 1 1 auto;
            padding: 1rem;">
                        <h4 class="">Account:</h4>
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="m-0">SYNYCS PROPERTIES LLP</h6>
                            <p class="mb-0 text-right">
                                Invoice Number. #QT000185
                            </p>
                        </div>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <h6 class="m-0 my-1 w-50">
                                Australia
                            </h6>
                            <p class="mb-0 text-right">
                                <Moment format="MMMM DD, YYYY">January 16, 2024</Moment>
                            </p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="m-0">987654321</h6>
                            <p class="mb-0 text-right">
                                Validity - N/A
                            </p>
                        </div>
                        <div style="display: block;width: 100%; overflow-x: auto;">
                            <table
                                style="padding-left: 0.5rem !important; padding-right: 0.5rem !important;margin-bottom: 1.5rem !important; margin-top: 1.5rem !important; width: 100%; background-color: transparent; border-collapse: collapse;">
                                <thead>
                                    <tr class="text-black" style="color: #000000 !important;
                            font-weight: 500; border-bottom:2px solid black;">
                                        <th style="border-bottom: none;
                                border-top: none;
                                vertical-align: middle;border: 0;padding: 0.75rem;text-align: inherit;">ITEM DESCRIPTION
                                        </th>
                                        <th style="border-bottom: none;
                                border-top: none;
                                vertical-align: middle;border: 0;padding: 0.75rem;text-align: inherit;">PRICE</th>
                                        <th style="border-bottom: none;
                                border-top: none;
                                vertical-align: middle;border: 0;padding: 0.75rem;text-align: inherit;">QTY</th>
                                        <th style="border-bottom: none;
                                border-top: none;
                                vertical-align: middle;border: 0;padding: 0.75rem;text-align: inherit;">TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="border-bottom: 2px solid black; padding-bottom: 0;">
                                        <td
                                            style="border-color: #f3f3f3; line-height: 1.2;
                                vertical-align: middle; border: 0;  padding: 0.75rem; padding-bottom: 0 !important; margin-bottom: 0 !important;">
                                            <div>
                                                <h4 class="mb-0" style="margin-bottom: 0 !important; font-size: 1.125rem; font-family: inherit;
                                        font-weight: 500;
                                        line-height: 1.2;
                                        color: #222222; margin-top: 0;">
                                                    Soluion-0412-RTF-Item_ZMR</h4>
                                                <ul class="px-2 mb-1"
                                                    style="padding-left: 0.5rem !important;padding-right: 0.5rem !important;argin-bottom: 0.25rem !important;padding: 0;margin-top: 0;">
                                                    <li style="list-style: none;">Soluion-0412-RTE-Item_ZMR Description</li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td style="border-color: #f3f3f3;  line-height: 1.2;
                                vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
        font-weight: 500;padding-bottom: 0 !important;    margin-bottom: 0 !important;">
                                            $25096.8</td>
                                        <td style="border-color: #f3f3f3;  line-height: 1.2;
                                vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
        font-weight: 500;padding-bottom: 0 !important;    margin-bottom: 0 !important;">
                                            1</td>
                                        <td style="border-color: #f3f3f3;  line-height: 1.2;
                                vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
        font-weight: 500;padding-bottom: 0 !important;    margin-bottom: 0 !important;">
                                            $25096.8</td>
                                    </tr>
                                    <tr
                                        style="margin-bottom: 0 !important; margin-top: 1rem !important; padding-top: 1rem !important; padding-bottom: 0 !important;">
                                        <td
                                            style="border-color: #f3f3f3;    line-height: 1.2;
                                vertical-align: middle;border: 0;    padding: 0.75rem;padding-top: 1rem !important; padding-bottom: 0 !important; margin-bottom: 0 !important;">
                                        </td>
                                        <td colspan="2" style="border-color: #f3f3f3;  line-height: 1.2;
                                vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
        font-weight: 600;padding-bottom: 0 !important;  padding-top: 0 !important;  margin-bottom: 0 !important;">Sub Total
                                        </td>
                                        <td style="border-color: #f3f3f3;  line-height: 1.2;
        vertical-align: middle; border: 0; padding: 0.75rem;   padding-top: 0 !important;  color: #000000 !important;
    font-weight: 600;padding-bottom: 0 !important;    margin-bottom: 0 !important;">$2028000</td>
                                    </tr>
                                    <tr
                                        style="margin-bottom: 0 !important;padding-top: 1rem !important; padding-bottom: 0 !important;">
                                        <td
                                            style="border-color: #f3f3f3;    line-height: 1.2;
                                vertical-align: middle;border: 0;    padding: 0.75rem;padding-top: 1rem !important; padding-bottom: 0 !important; margin-bottom: 0 !important;">
                                        </td>
                                        <td colspan="2" style="border-color: #f3f3f3;  line-height: 1.2;
                                vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
        font-weight: 600;padding-bottom: 0 !important;  padding-top: 0 !important;  margin-bottom: 0 !important;">Tax
                                        </td>
                                        <td style="border-color: #f3f3f3;  line-height: 1.2;
        vertical-align: middle; border: 0; padding: 0.75rem;   padding-top: 0 !important;  color: #000000 !important;
    font-weight: 600;padding-bottom: 0 !important;    margin-bottom: 0 !important;">-</td>
                                    </tr>
                                    <tr
                                        style="margin-bottom: 0 !important;padding-top: 1rem !important; padding-bottom: 0 !important;">
                                        <td
                                            style="border-color: #f3f3f3;    line-height: 1.2;
                                vertical-align: middle;border: 0;    padding: 0.75rem;padding-top: 1rem !important; padding-bottom: 0 !important; margin-bottom: 0 !important;">
                                        </td>
                                        <td colspan="2"
                                            style="border-color: #f3f3f3;  line-height: 1.2;
                                vertical-align: middle; border: 0; padding: 0.75rem;     color: #000000 !important;
        font-weight: 600;padding-bottom: 0 !important;  padding-top: 0 !important;  margin-bottom: 0 !important; border-bottom: 2px solid black !important;">
                                            Discount
                                        </td>
                                        <td
                                            style="border-color: #f3f3f3;  line-height: 1.2;
        vertical-align: middle; border: 0; padding: 0.75rem;   padding-top: 0 !important;  color: #000000 !important;
    font-weight: 600;padding-bottom: 0 !important;    margin-bottom: 0 !important; border-bottom: 2px solid black !important;">
                                            -</td>
                                    </tr>
                                    <tr
                                        style="margin-bottom: 0 !important;padding-top: 1rem !important; padding-bottom: 0 !important;">
                                        <td
                                            style="border-color: #f3f3f3;    line-height: 1.2;
                                vertical-align: middle;border: 0;    padding: 0.75rem;padding-top: 1rem !important; padding-bottom: 0 !important; margin-bottom: 0 !important;">
                                        </td>
                                        <td colspan="2" style="border-color: #f3f3f3;  line-height: 1.2;
                                vertical-align: middle; border: 0; padding: 0.75rem; color: #000000 !important;
        font-weight: 600;padding-bottom: 0 !important;  padding-top: 0 !important;  margin-bottom: 0 !important;">Total
                                        </td>
                                        <td style="border-color: #f3f3f3;  line-height: 1.2;
        vertical-align: middle; border: 0; padding: 0.75rem;   padding-top: 0 !important;  color: #000000 !important;
    font-weight: 600;padding-bottom: 0 !important;    margin-bottom: 0 !important;">$2028000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h4 style="font-size: 1.125rem;margin-bottom: 0.5rem;
                        font-family: inherit;
                        font-weight: 600;
                        line-height: 1.2;
                        color: #222222;margin-top: 0;">Payment Method:</h4>
                        <h5 style="margin-bottom: 0 !important; font-weight: 600;
                        font-style: normal;font-size: 1rem;line-height: 1.2;
                color: #222222; margin-top: 0;">Central Bank</h5>
                        <h5 style="margin-bottom: 0 !important; font-weight: 600;
                        font-style: normal;font-size: 1rem;line-height: 1.2;
                color: #222222; margin-top: 0;">Samira Hadid</h5>
                        <h5 style="margin-bottom: 0 !important; font-weight: 600;
                        font-style: normal;font-size: 1rem;line-height: 1.2;
                color: #222222; margin-top: 0;">123-456-7890</h5>
                        <div
                            style="display: flex !important;justify-content: space-between !important;align-items: center !important;    margin-top: 1rem !important;border-bottom: 2px solid black;">
                            <div>
                                <h4 style="margin-bottom: 0 !important; font-size: 1.125rem; font-family: inherit;
                                font-weight: 500;
                                line-height: 1.2;
                                color: #222222;margin-top: 0;">Term and Conditions:</h4>
                                <p style="margin-bottom: 0 !important; margin-top: 0;">Lorem ipsum dolor sit</p>
                            </div>
                            <div>
                                <h4 style="margin-bottom: 0 !important; font-size: 1.125rem; font-family: inherit;
                                font-weight: 600;
                                line-height: 1.2;
                                color: #222222;margin-top: 0 !important;">Ashok Mohanty</h4>
                                <h6 style="font-weight: 400;font-size: 0.875rem; margin-bottom: 0.5rem;
                                font-family: inherit;line-height: 1.2;
                color: #222222; margin-top: 0;">Manager</h6>
                            </div>
                        </div>
                    </div>
                </div>
        </page>
    
        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
    
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"></script>
    
    </body>
    
    </html>`;

        // Create a Blob from the HTML content
        // const blob = new Blob([pdfContent], { type: "text/html" });
        const blob = new Blob([htmlContent], { type: "text/html" });

        // Generate a URL for the Blob
        const url = URL.createObjectURL(blob);

        callPostApi(null, HTML_TO_PDF_GENERATER_URL, url, (response) => {
            if (response.status === API_SUCCESS) {
                console.log("object");
            }
        });

        // Open the URL in a new tab (optional)
        window.open(url, "_blank");

        // Cleanup by revoking the URL after some time (optional)
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 10000);

        // // doc.setFontSize(12);
        // // doc.html(pdfContent, {
        //   callback: () => {
        //     // Save the PDF as a Blob
        //     const pdfBlob = doc.output("blob");

        //     // Create a URL for the Blob
        //     const pdfUrl = URL.createObjectURL(pdfBlob);

        //     // Create a temporary anchor element
        //     const a = document.createElement("a");
        //     a.href = pdfUrl;
        //     a.download = "dynamic-pdf.pdf";

        //     // Append the anchor to the body and trigger the download
        //     document.body.appendChild(a);
        //     a.click();

        //     // Clean up by removing the anchor from the body and revoking the URL
        //     document.body.removeChild(a);
        //     URL.revokeObjectURL(pdfUrl);
        //   },
        // // });
    };
    return (
        <Modal show={show} onHide={hideModal} size="md" id="print-content">
            <div
                className="card border mx-3 my-3"
                style={{ borderColor: "#872ff7 !important" }}
            >
                <div className="d-flex justify-content-between align-items-center ml-2 mr-0 mt-3 mb-3">
                    <div className="px-2">
                        <h3 className="mb-0">{customerData?.customerName}</h3>
                        <p className="mb-0 w-50">
                            {customerData?.customerAddress || "NA"}
                        </p>
                        <p className="mb-0">
                            {customerData?.contactPhone || "NA"}
                        </p>
                    </div>
                    <div
                        className="bg-primary text-white px-4 d-flex align-items-center "
                        style={{ borderRadius: "10px 0px 0px 10px" }}
                    >
                        <h2 className="my-1">Quote</h2>
                    </div>
                </div>
                <Modal.Body>
                    <h4>Account:</h4>
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="m-0">
                            {customerData?.customerName || "NA"}
                        </h6>
                        <p className="mb-0 text-right">
                            Invoice Number. #{quoteDetails?.quoteName}
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-baseline">
                        <h6 className="m-0 my-1 w-50">
                            {customerData?.customerAddress || "NA"}
                        </h6>
                        <p className="mb-0 text-right">
                            <Moment format="MMMM DD, YYYY">
                                {quoteDetails?.quoteDate}
                            </Moment>
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="m-0">
                            {customerData?.contactPhone || "NA"}
                        </h6>
                        <p className="mb-0 text-right">
                            Validity - {quoteDetails?.validity?.value || "N/A"}
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                        <div></div>
                        {/* <div className="align-content-end align-items-end"></div> */}
                    </div>
                    <Table responsive borderless className="px-2 my-4">
                        <thead>
                            <tr
                                className="text-black"
                                style={{ borderBottom: "2px solid black" }}
                            >
                                <th>ITEM DESCRIPTION</th>
                                <th>PRICE</th>
                                <th>QTY</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quoteItemsMaster.length !== 0 &&
                                quoteItemsMaster.map((quote, i) => (
                                    <tr
                                        className="pb-0"
                                        style={{
                                            borderBottom: "2px solid black",
                                        }}
                                    >
                                        <td className="mb-0 pb-0">
                                            <div>
                                                <h5 className="mb-0">
                                                    {quoteType ===
                                                    "SPARE_PARTS_QUOTE"
                                                        ? `${quote?.partNumber}-${quote?.partType}`
                                                        : quoteType ===
                                                          "REPAIR_QUOTE"
                                                        ? `${quote?.component}-${quote?.jobDescription}`
                                                        : quote?.itemName}
                                                </h5>
                                                <ul className="px-2 mb-1">
                                                    <li>
                                                        {quote?.description}
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td className="mb-0 pb-0 text-black">
                                            $
                                            {quoteType === "SPARE_PARTS_QUOTE"
                                                ? (quote?.listPrice &&
                                                      (quote?.listPrice).toFixed(
                                                          2
                                                      )) ||
                                                  0.0
                                                : quoteType === "REPAIR_QUOTE"
                                                ? (quote?.totalPrice &&
                                                      (quote?.totalPrice).toFixed(
                                                          2
                                                      )) ||
                                                  0.0
                                                : (
                                                      quote?.netPrice &&
                                                      quote?.netPrice
                                                  ).toFixed(2) || 0.0}
                                        </td>
                                        <td className="mb-0 pb-0 text-black">
                                            1
                                        </td>
                                        <td className="mb-0 pb-0 text-black">
                                            $
                                            {(quote?.totalPrice &&
                                                (quote?.totalPrice).toFixed(
                                                    2
                                                )) ||
                                                0.0}
                                        </td>
                                    </tr>
                                ))}
                            <tr className="pb-0 mb-0 pb-0 pt-3">
                                <td className="mb-0 pb-0 pt-3"></td>
                                <td
                                    className="mb-0 pb-0 pt-3 text-black"
                                    colSpan={2}
                                >
                                    Sub Total
                                </td>
                                <td className="mb-0 pb-0 pt-3 text-black">
                                    $
                                    {quoteItemsMaster
                                        .reduce(
                                            (total, item) =>
                                                total + item.totalPrice,
                                            0
                                        )
                                        .toFixed(2) || 0.0}
                                </td>
                            </tr>
                            <tr className="mb-0 pb-0 py-0">
                                <td className="mb-0 py-0"></td>
                                <td
                                    className="mb-0 py-1 text-black"
                                    colSpan={2}
                                >
                                    Tax
                                </td>
                                <td className="text-black py-0">
                                    {taxAmount || "-"}
                                </td>
                            </tr>
                            <tr className="mb-0 pb-0 py-2">
                                <td className="mb-0 py-0"></td>
                                <td
                                    className="mb-0 text-black py-0"
                                    colSpan={2}
                                    style={{ borderBottom: "2px solid black" }}
                                >
                                    Discount
                                </td>
                                <td
                                    className="mb-0 text-black py-0"
                                    style={{ borderBottom: "2px solid black" }}
                                >
                                    {discounAmt || "-"}
                                </td>
                            </tr>
                            <tr className="mb-0 pb-0 py-0">
                                <td className="mb-0"></td>
                                <td className="mb-0 text-black" colSpan={2}>
                                    Total
                                </td>
                                <td className="mb-0 text-black">
                                    $
                                    {quoteItemsMaster
                                        .reduce(
                                            (total, item) =>
                                                total + item.totalPrice,
                                            0
                                        )
                                        .toFixed(2) || 0.0}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <h4>Payment Method:</h4>
                    <h5 className="mb-0">Central Bank</h5>
                    <h5 className="mb-0">Samira Hadid</h5>
                    <h5 className="mb-0">123-456-7890</h5>

                    <div
                        className="d-flex justify-content-between align-items-center mt-3 mb-0"
                        style={{ borderBottom: "2px solid black" }}
                    >
                        <div>
                            <h4 className="mb-0">Term and Conditions:</h4>
                            <p className="mb-0">Lorem ipsum dolor sit</p>
                        </div>
                        <div>
                            <h4 className="mb-0">Ashok Mohanty</h4>
                            <h6>Manager</h6>
                        </div>
                    </div>
                </Modal.Body>
            </div>
            <div className="d-flex justify-content-end mt-0 py-2 align-items-center bg-dark mx-0">
                <button className="btn bg-success mx-1">Accept</button>
                <button className="btn bg-danger mx-1">Reject</button>
                <button className="btn bg-warning mx-1">
                    Request for Revison
                </button>
                <span className="cursor mx-3" onClick={generateHTML}>
                    <SaveAltOutlinedIcon className="text-white " />
                </span>
            </div>

            {/* <div dangerouslySetInnerHTML={{ __html: pdfContent }} /> */}
        </Modal>
    );
};

export default QuoteDetailsModal;

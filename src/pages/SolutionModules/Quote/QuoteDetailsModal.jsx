import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";

import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";

import Moment from "react-moment";
import { Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const QuoteDetailsModal = ({
  show,
  hideModal,
  handleSnack,
  quoteItemsMaster = [],
  customerData,
  quoteDetails,
  recordData,
}) => {
  console.log("customerData ::::: ", customerData);

  const [htmlContent, setHtmlContent] = useState("");

  const generateHTML = () => {
//     const content = document.getElementById("print-content");
//     const newWindow = window.open("", "_blank");

//     newWindow.document.write(`
//     <html>
//       <head>
//         <title>Print</title>
//         <style>
//           @page {
//             size: A4;
//           }
//           body {
//             font-family: Arial, sans-serif;
//             padding: 20px;
//           }
//         </style>
//       </head>
//       <body>
//         ${content.innerHTML}
//       </body>
//     </html>
//   `);
//     newWindow.document.close();
//     newWindow.print();

    // JSX content that you want to convert to HTM
    const jsxContent = (
      <div style={{ background: "#ffffff" }}>
        <div
          className="card border mx-3 my-3"
          style={{
            borderColor: "1px solid #872ff7 !important",
            borderRadius: "0.625rem !important",
            boxShadow: "6px 11px 41px -28px #a99de7 !important",
            // marginLeft: "1rem !important",
            // marginRight: "1rem !important",
            margin: "1rem !important",
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center ml-2 mr-0 mt-3 mb-3"
            style={{
              display: "flex",
              justifyContent: "space-between !important",
              alignItems: "center",
              marginLeft: "0.5rem !important",
              marginRight: 0,
              marginTop: "1rem !important",
              marginBottom: "1rem !important",
            }}
          >
            <div
              className="px-2"
              style={{
                paddingLeft: "0.5rem !important",
                paddingRight: "0.5rem !important",
              }}
            >
              <h3 className="mb-0" style={{ marginBottom: 0 }}>
                {customerData?.customerName}
              </h3>
              <p
                className="mb-0 w-50"
                style={{ marginBottom: 0, width: "50% !important" }}
              >
                {customerData?.customerAddress || "NA"}
              </p>
              <p className="mb-0" style={{ marginBottom: 0 }}>
                {customerData?.contactPhone || "NA"}
              </p>
            </div>
            <div
              className="bg-primary text-white px-4 d-flex align-items-center "
              style={{
                background: "#872ff7 !important",
                color: "white",
                paddingLeft: "1.5rem !important",
                paddingRight: "1.5rem !important",
                display: "flex",
                alignItems: "center",
                borderRadius: "10px 0px 0px 10px",
              }}
            >
              <h2
                className="my-1"
                style={{
                  marginTop: "0.25rem !important",
                  marginTop: "0.25rem !important",
                }}
              >
                Quote
              </h2>
            </div>
          </div>
          <Modal.Body>
            <h4>Account:</h4>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                display: "flex",
                justifyContent: "space-between !important",
                alignItems: "center",
              }}
            >
              <h6 className="m-0" style={{ margin: 0 }}>
                {customerData?.customerName || "NA"}
              </h6>
              <p
                className="mb-0 text-right"
                style={{ marginBottom: 0, textAlign: "right !important" }}
              >
                Invoice Number. #{quoteDetails?.quoteName}
              </p>
            </div>
            <div
              className="d-flex justify-content-between align-items-baseline"
              style={{
                display: "flex",
                justifyContent: "space-between !important",
                alignItems: "baseline !important",
              }}
            >
              <h6
                className="m-0 my-1 w-50"
                style={{
                  margin: 0,
                  marginTop: "0.25rem !important",
                  marginBottom: "0.25rem !important",
                  width: "50% !important",
                }}
              >
                {customerData?.customerAddress || "NA"}
              </h6>
              <p
                className="mb-0 text-right"
                style={{ marginBottom: 0, textAlign: "right !important" }}
              >
                <Moment format="MMMM DD, YYYY">
                  {quoteDetails?.quoteDate}
                </Moment>
              </p>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                display: "flex",
                justifyContent: "space-between !important",
                alignItems: "center",
              }}
            >
              <h6 className="m-0" style={{ margin: 0 }}>
                {customerData?.contactPhone || "NA"}
              </h6>
              <p
                className="mb-0 text-right"
                style={{ marginBottom: 0, textAlign: "right !important" }}
              >
                Validity - {quoteDetails?.validity?.value || "N/A"}
              </p>
            </div>
            <Table
              responsive
              borderless
              className="px-2 my-4"
              style={{
                paddingLeft: "0.50rem !important",
                paddingRight: "0.50rem !important",
                marginTop: "1.50rem !important",
                display: "block !important",
                width: "100% !important",
                overflowX: "auto !important",
                backgroundColor: "transparent",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  className="text-black"
                  style={{ borderBottom: "2px solid black", color: "black" }}
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
                        paddingBottom: 0,
                      }}
                    >
                      <td
                        className="mb-0 pb-0"
                        style={{ marginBottom: 0, paddingBottom: 0 }}
                      >
                        <div>
                          <h4 className="mb-0" style={{ marginBottom: 0 }}>
                            {quote?.itemName}
                          </h4>
                          <ul
                            className="px-2 mb-1"
                            style={{
                              paddingLeft: "0.50rem !important",
                              paddingRight: "0.50rem !important",
                              marginBottom: "0.25rem !important",
                            }}
                          >
                            <li>{quote?.description}</li>
                          </ul>
                        </div>
                      </td>
                      <td
                        className="mb-0 pb-0 text-black"
                        style={{
                          marginBottom: 0,
                          paddingBottom: 0,
                          color: "black",
                        }}
                      >
                        ${quote?.netPrice}
                      </td>
                      <td
                        className="mb-0 pb-0 text-black"
                        style={{
                          marginBottom: 0,
                          paddingBottom: 0,
                          color: "black",
                        }}
                      >
                        1
                      </td>
                      <td
                        className="mb-0 pb-0 text-black"
                        style={{
                          marginBottom: 0,
                          paddingBottom: 0,
                          color: "black",
                        }}
                      >
                        ${quote?.totalPrice}
                      </td>
                    </tr>
                  ))}
                <tr
                  className="pb-0 mb-0 pt-3"
                  style={{
                    marginBottom: 0,
                    paddingBottom: 0,
                    paddingTop: "1rem !important",
                  }}
                >
                  <td
                    className="mb-0 pb-0 pt-3"
                    style={{
                      marginBottom: 0,
                      paddingBottom: 0,
                      paddingTop: "1rem !important",
                    }}
                  ></td>
                  <td
                    className="mb-0 pb-0 pt-3 text-black"
                    style={{
                      marginBottom: 0,
                      paddingBottom: 0,
                      paddingTop: "1rem !important",
                      color: "black",
                    }}
                    colSpan={2}
                  >
                    Total
                  </td>
                  <td
                    className="mb-0 pb-0 pt-3 text-black"
                    style={{
                      marginBottom: 0,
                      paddingBottom: 0,
                      paddingTop: "1rem !important",
                      color: "black",
                    }}
                  >
                    $
                    {quoteItemsMaster.reduce(
                      (total, item) => total + item.totalPrice,
                      0
                    )}
                  </td>
                </tr>
                <tr
                  className="mb-0 pb-0 py-0"
                  style={{
                    marginBottom: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                >
                  <td
                    className="mb-0 py-0"
                    style={{
                      marginBottom: 0,
                      paddingBottom: 0,
                      paddingTop: 0,
                    }}
                  ></td>
                  <td
                    className="mb-0 py-1 text-black"
                    style={{
                      marginBottom: 0,
                      paddingBottom: "1rem !important",
                      paddingTop: "1rem !important",
                      color: "black",
                    }}
                    colSpan={2}
                  >
                    Tax
                  </td>
                  <td
                    className="text-black py-0"
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      color: "black",
                    }}
                  >
                    -
                  </td>
                </tr>
                <tr
                  className="mb-0 py-2"
                  style={{
                    marginBottom: 0,
                    paddingBottom: "1rem !important",
                    paddingTop: "1rem !important",
                  }}
                >
                  <td
                    className="mb-0 py-0"
                    style={{
                      marginBottom: 0,
                      paddingBottom: "1rem !important",
                      paddingTop: "1rem !important",
                    }}
                  ></td>
                  <td
                    className="mb-0 text-black py-0"
                    style={{
                      marginBottom: 0,
                      paddingBottom: 0,
                      paddingTop: "1rem !important",
                      color: "black",
                      borderBottom: "2px solid black",
                    }}
                    colSpan={2}
                  >
                    Discount
                  </td>
                  <td
                    className="mb-0 text-black py-0"
                    style={{
                      marginBottom: 0,
                      paddingBottom: 0,
                      paddingTop: 0,
                      color: "black",
                      borderBottom: "2px solid black",
                    }}
                  >
                    -
                  </td>
                </tr>
                <tr
                  className="mb-0 py-0"
                  style={{
                    marginBottom: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                >
                  <td
                    className="mb-0"
                    style={{
                      marginBottom: 0,
                    }}
                  ></td>
                  <td
                    className="mb-0 text-black"
                    style={{
                      marginBottom: 0,
                      color: "black",
                    }}
                    colSpan={2}
                  >
                    Sub Total
                  </td>
                  <td
                    className="mb-0 text-black"
                    style={{
                      marginBottom: 0,
                      color: "black",
                    }}
                  >
                    $
                    {quoteItemsMaster.reduce(
                      (total, item) => total + item.totalPrice,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
            <h4>Payment Method:</h4>
            <h5
              className="mb-0"
              style={{
                marginBottom: 0,
              }}
            >
              Central Bank
            </h5>
            <h5
              className="mb-0"
              style={{
                marginBottom: 0,
              }}
            >
              Samira Hadid
            </h5>
            <h5
              className="mb-0"
              style={{
                marginBottom: 0,
              }}
            >
              123-456-7890
            </h5>

            <div
              className="d-flex justify-content-between align-items-center mt-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid black",
                marginTop: "1rem !important",
              }}
            >
              <div>
                <h4
                  className="mb-0"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  Term and Conditions:
                </h4>
                <p
                  className="mb-0"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  Lorem ipsum dolor sit
                </p>
              </div>
              <div>
                <h4
                  className="mb-0"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  Ashok Mohanty
                </h4>
                <h6>Manager</h6>
              </div>
            </div>
          </Modal.Body>
        </div>
      </div>
    );

    // Convert JSX to string (HTML)
    const htmlString = ReactDOMServer.renderToStaticMarkup(jsxContent);
    setHtmlContent(htmlString);

    // Create a Blob from the HTML string
    const blob = new Blob([htmlString], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // Trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            <p className="mb-0 w-50">{customerData?.customerAddress || "NA"}</p>
            <p className="mb-0">{customerData?.contactPhone || "NA"}</p>
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
            <h6 className="m-0">{customerData?.customerName || "NA"}</h6>
            <p className="mb-0 text-right">
              Invoice Number. #{quoteDetails?.quoteName}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-baseline">
            <h6 className="m-0 my-1 w-50">
              {customerData?.customerAddress || "NA"}
            </h6>
            <p className="mb-0 text-right">
              <Moment format="MMMM DD, YYYY">{quoteDetails?.quoteDate}</Moment>
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="m-0">{customerData?.contactPhone || "NA"}</h6>
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
                    style={{ borderBottom: "2px solid black" }}
                  >
                    <td className="mb-0 pb-0">
                      <div>
                        <h4 className="mb-0">{quote?.itemName}</h4>
                        <ul className="px-2 mb-1">
                          <li>{quote?.description}</li>
                        </ul>
                      </div>
                    </td>
                    <td className="mb-0 pb-0 text-black">${quote?.netPrice}</td>
                    <td className="mb-0 pb-0 text-black">1</td>
                    <td className="mb-0 pb-0 text-black">
                      ${quote?.totalPrice}
                    </td>
                  </tr>
                ))}
              {/* <tr className="pb-0" style={{ borderBottom: "2px solid black" }}>
              <td className="mb-0 pb-0">
                <div>
                  <h4 className="mb-0">Web Design</h4>
                  <ul className="px-2 mb-1">
                    <li>Lorem ipsum dolor sit amet consectetur.</li>
                  </ul>
                </div>
              </td>
              <td className="mb-0 pb-0 text-black">$1000</td>
              <td className="mb-0 pb-0 text-black">1</td>
              <td className="mb-0 pb-0 text-black">$1000</td>
            </tr>
            <tr className="pb-0" style={{ borderBottom: "2px solid black" }}>
              <td className="mb-0 pb-0">
                <div>
                  <h4 className="mb-0">Branding Design</h4>
                  <ul className="px-2 mb-1">
                    <li>Lorem ipsum dolor sit amet consectetur.</li>
                  </ul>
                </div>
              </td>
              <td className="mb-0 pb-0 text-black">$1000</td>
              <td className="mb-0 pb-0 text-black">1</td>
              <td className="mb-0 pb-0 text-black">$1000</td>
            </tr> */}
              <tr className="pb-0 mb-0 pb-0 pt-3">
                <td className="mb-0 pb-0 pt-3"></td>
                <td className="mb-0 pb-0 pt-3 text-black" colSpan={2}>
                  Total
                </td>
                <td className="mb-0 pb-0 pt-3 text-black">
                  $
                  {quoteItemsMaster.reduce(
                    (total, item) => total + item.totalPrice,
                    0
                  )}
                </td>
              </tr>
              <tr className="mb-0 pb-0 py-0">
                <td className="mb-0 py-0"></td>
                <td className="mb-0 py-1 text-black" colSpan={2}>
                  Tax
                </td>
                <td className="text-black py-0">-</td>
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
                  -
                </td>
              </tr>
              <tr className="mb-0 pb-0 py-0">
                <td className="mb-0"></td>
                <td className="mb-0 text-black" colSpan={2}>
                  Sub Total
                </td>
                <td className="mb-0 text-black">
                  $
                  {quoteItemsMaster.reduce(
                    (total, item) => total + item.totalPrice,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
          <h4>Payment Method:</h4>
          <h5 className="mb-0">Central Bank</h5>
          <h5 className="mb-0">Samira Hadid</h5>
          <h5 className="mb-0">123-456-7890</h5>

          <div
            className="d-flex justify-content-between align-items-center mt-3"
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
          <div className="d-flex justify-content-end mt-2 align-items-center ">
            <button className="btn bg-success mx-1">Accept</button>
            <button className="btn bg-danger mx-1">Reject</button>
            <button className="btn bg-warning mx-1">Request for Revison</button>
            <span className="cursor" onClick={generateHTML}>
              <SaveAltOutlinedIcon className="text-primary " />
            </span>
          </div>
        </Modal.Body>
      </div>

      {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
    </Modal>
  );
};

export default QuoteDetailsModal;

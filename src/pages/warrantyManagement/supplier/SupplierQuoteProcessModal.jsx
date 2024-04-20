import React from "react";

import { Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const SupplierQuoteProcessModal = ({ show, hideModal, handleSnack }) => {
  return (
    <Modal show={show} onHide={hideModal} size="md">
      <div className="d-flex justify-content-between align-items-center ml-2 mr-0 mt-3">
        <div className="px-2">
          <h3 className="mb-0">Giggling Platypus co.</h3>
          <p className="mb-0">123, Anywehere st., Any City</p>
          <p className="mb-0">123-456-7890</p>
        </div>
        <div
          className="bg-primary text-white px-4 d-flex align-items-center "
          style={{ borderRadius: "10px 0px 0px 10px" }}
        >
          <h2 className="my-1">Quote</h2>
        </div>
      </div>
      <Modal.Body>
        <h4>BILL TO:</h4>
        <div className="d-flex justify-content-between align-items-center ">
          <div>
            <h6 className="m-0">Murad Nagar</h6>
            <h6 className="m-0">123, Anywehere st., Any City</h6>
            <h6 className="m-0">+123-456-7890</h6>
          </div>
          <div className="align-content-end align-items-end">
            <p className="mb-0">Invoice Number. #1234</p>
            <p className="mb-0">March 23, 2024</p>
            <p className="mb-0">Due Date June 16, 2024</p>
          </div>
        </div>
        <Table responsive borderless className="px-2">
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
            </tr>
            <tr className="pb-0" style={{ borderBottom: "2px solid black" }}>
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
            </tr>
            <tr className="pb-0 mb-0 py-0">
              <td className="mb-0"></td>
              <td className="mb-0 text-black" colSpan={2}>
                Total
              </td>
              <td className="mb-0 text-black">$4800</td>
            </tr>
            <tr className="mb-0 pb-0 py-0">
              <td className="mb-0"></td>
              <td className="mb-0 text-black" colSpan={2}>
                Tax
              </td>
              <td className="text-black">-</td>
            </tr>
            <tr className="mb-0 pb-0 py-2">
              <td className="mb-0"></td>
              <td
                className="mb-0 text-black"
                colSpan={2}
                style={{ borderBottom: "2px solid black" }}
              >
                Discount
              </td>
              <td className="mb-0 text-black" style={{ borderBottom: "2px solid black" }}>
                -
              </td>
            </tr>
            <tr className="mb-0 pb-0 py-0">
              <td className="mb-0"></td>
              <td className="mb-0 text-black" colSpan={2}>
                Sub Total
              </td>
              <td className="mb-0 text-black">$4800</td>
            </tr>
          </tbody>
        </Table>
        <h4>Payment Method:</h4>
        <h5 className="mb-0">Central Bank</h5>
        <h5 className="mb-0">Samira Hadid</h5>
        <h5 className="mb-0">123-456-7890</h5>

        <div className="d-flex justify-content-between align-items-center mt-3">
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
    </Modal>
  );
};

export default SupplierQuoteProcessModal;

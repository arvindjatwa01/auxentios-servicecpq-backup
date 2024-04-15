import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { Card, Divider, List, ListItem, ListItemText } from "@mui/material";

import { Modal } from "react-bootstrap";

export default function ProductSummary(props) {
  const { show, handleClose, portfolio, addItem } = props;
  return (
    <Modal
      className="tablerowmodal "
      style={{ padding: "auto", margin: "auto" }}
      show={show}
      onHide={() => handleClose()}
      size="sm"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body className="">
        <div class="p-3 bg-white">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <a href="#" className="btn bg-primary text-white">
                Portfolio
              </a>
            </div>
            <h5 className="text-light mt-3">{portfolio?.name}</h5>
          </div>
          <hr />
          <h5 className=" mt-3">Summary</h5>
          <Card>
            <List dense={true}>
              <ListItem>
                <ListItemText>Support Plan </ListItemText>
                <span className="font-weight-500">
                  {portfolio?.supportLevel}
                </span>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>Spare Parts Price </ListItemText>
                <span className="font-weight-500">
                  {portfolio?.portfolioPrice?.sparePartsPrice}
                </span>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>Labor Price</ListItemText>
                <span className="font-weight-500">
                  {portfolio?.portfolioPrice?.labourPrice}
                </span>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>Misc Price</ListItemText>
                <span className="font-weight-500">
                  {portfolio?.portfolioPrice?.miscPrice}
                </span>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>Service Price</ListItemText>
                <span className="font-weight-500">
                  {portfolio?.portfolioPrice?.servicePrice}
                </span>
              </ListItem>
            </List>
          </Card>
        </div>
        <div class="modal-footer justify-content-between bg-primary border-radius-10 m-2">
          <div>
            <b className="text-white">
              $ {portfolio?.portfolioPrice?.totalPrice}
            </b>
          </div>
          <div>
            <div className="text-right">
              <button
                className="service-button bg-white"
                onClick={() => addItem(portfolio.portfolioId)}
              >
                <AddShoppingCartIcon
                  className="font-size-30 text-primary"
                  size="large"
                ></AddShoppingCartIcon>
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

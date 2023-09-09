import React from "react";
import { Modal } from "react-bootstrap";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import Select from "react-select";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const NotesAddEdit = ({ show, hideModal }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState("1");

  return (
    <Modal size="md" show={show} onHide={hideModal} centered>
      <Modal.Header>
        <Modal.Title>
          Add Notes
          <span className="ml-2">
            <EditOutlinedIcon className="text-primary" />
          </span>
          <span className="ml-2">
            <ShareOutlinedIcon className="text-primary" />
          </span>
          <span className="ml-2">
            <RefreshOutlinedIcon className="text-primary" />
          </span>
          <span className="ml-2">
            <SaveAltOutlinedIcon className="text-primary" />
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mt-3">
          <div className="col-lg-4 col-md-4 col-sm-4 master-input-fields">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Note For
              </label>
              <Select className="text-primary" placeholder="Internal" />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 master-input-fields">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Note Type
              </label>
              <Select className="text-primary" placeholder="Instructions" />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 master-input-fields">
            <div className="form-group">
              <label
                className="text-light-dark font-size-12 font-weight-500"
                htmlFor="exampleInputEmail1"
              >
                Date
              </label>
              <div className="d-flex align-items-center date-box w-100">
                <div className="form-group w-100">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      variant="inline"
                      format="dd/MM/yyyy"
                      className="border-light-blue form-controldate border-radius-10 border"
                      label=""
                      name="preparedOn"
                      //   value={priceDetails.priceDate}
                      //   onChange={(e) =>
                      //     setPriceDetails({
                      //       ...priceDetails,
                      //       priceDate: e,
                      //     })
                      //   }
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Box className="mt-3" sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="External" value="1" />
                <Tab label="Internal" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" className="px-0">
              <div className="border-blue p-3 border-radius-10">
                <div className="bg-grey p-2 border-radius-10">
                  <h6 className="text-black font-weight-600">Term 1</h6>
                  <p className="mt-2 mb-0">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem. Quisque rutrum. Aenean imperdiet.
                    Etiam ultricies nisi vel augue. Curabitur ullamcorper
                    ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
                    tempus, tellus eget condimentum rhoncus, sem quam semper
                    libero, sit amet adipiscing sem neque sed ipsum. Nam quam
                    nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
                    Maecenas nec odio et ante tincidunt tempus. Donec vitae
                    sapien ut libero venenatis faucibus. Nullam quis ante. Etiam
                    sit amet orci eget eros faucibus tincidunt. Duis leo. Sed
                    fringilla mauris sit amet nibh. Donec sodales sagittis
                    magna.
                  </p>
                </div>
                <div className="bg-grey p-2 border-radius-10 mt-2">
                  <h6 className="text-black font-weight-600">Term 2</h6>
                  <p className="mt-2 mb-0">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem. Quisque rutrum. Aenean imperdiet.
                    Etiam ultricies nisi vel augue. Curabitur ullamcorper
                    ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
                    tempus, tellus eget condimentum rhoncus, sem quam semper
                    libero, sit amet adipiscing sem neque sed ipsum. Nam quam
                    nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
                    Maecenas nec odio et ante tincidunt tempus. Donec vitae
                    sapien ut libero venenatis faucibus. Nullam quis ante. Etiam
                    sit amet orci eget eros faucibus tincidunt. Duis leo. Sed
                    fringilla mauris sit amet nibh. Donec sodales sagittis
                    magna.
                  </p>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2" className="px-0">
              <div className="border-blue p-3 border-radius-10">
                <div className="bg-grey p-2 border-radius-10">
                  <div className="d-flex align-items-center">
                    <div className="notes-circle mr-2">A</div>
                    <div className="d-block">
                      <p className="text-black font-size-14 mb-0">Abc</p>
                      <p className="font-size-10 mb-0">3:14 pm Jan 24 2023</p>
                    </div>
                  </div>
                  <p className="mt-2 mb-0">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem. Quisque rutrum. Aenean imperdiet.
                    Etiam ultricies nisi vel augue. Curabitur ullamcorper
                    ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
                    tempus, tellus eget condimentum rhoncus, sem quam semper
                    libero, sit amet adipiscing sem neque sed ipsum. Nam quam
                    nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
                    Maecenas nec odio et ante tincidunt tempus. Donec vitae
                    sapien ut libero venenatis faucibus. Nullam quis ante. Etiam
                    sit amet orci eget eros faucibus tincidunt. Duis leo. Sed
                    fringilla mauris sit amet nibh. Donec sodales sagittis
                    magna.
                  </p>
                </div>
                <div className="bg-grey p-2 border-radius-10 mt-2">
                  <div className="d-flex align-items-center">
                    <div className="notes-circle mr-2">S</div>
                    <div className="d-block">
                      <p className="text-black font-size-14 mb-0">Sty</p>
                      <p className="font-size-10 mb-0">3:25 pm Jan 24 2023</p>
                    </div>
                  </div>
                  <p className="mt-2 mb-0">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem. Quisque rutrum. Aenean imperdiet.
                    Etiam ultricies nisi vel augue. Curabitur ullamcorper
                    ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
                    tempus, tellus eget condimentum rhoncus, sem quam semper
                    libero, sit amet adipiscing sem neque sed ipsum. Nam quam
                    nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
                    Maecenas nec odio et ante tincidunt tempus. Donec vitae
                    sapien ut libero venenatis faucibus. Nullam quis ante. Etiam
                    sit amet orci eget eros faucibus tincidunt. Duis leo. Sed
                    fringilla mauris sit amet nibh. Donec sodales sagittis
                    magna.
                  </p>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
        <div className="d-flex align-items-center justify-content-end">
          <button type="button" className="btn bg-white border-blue mr-3">
            Cancel
          </button>
          <button type="button" className="btn bg-primary text-white">
            Save
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NotesAddEdit;

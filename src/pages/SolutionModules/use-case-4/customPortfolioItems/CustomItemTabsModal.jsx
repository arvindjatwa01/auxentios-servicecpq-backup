import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import CustomItemAddEdit from "./CustomItemAddEdit";
import ComponentCodeAddEdit from "./ComponentCodeAddEdit";
import CustomItemPriceCalculator from "./CustomItemPriceCalculator";

const CustomItemTabsModal = (props) => {
  const { show, hideModal } = props;

  const [activeTab, setActiveTab] = useState(1);
  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <Box sx={{ typography: "body1" }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                className="custom-tabs-div"
                onChange={(e, tabIndex) => setActiveTab(tabIndex)}
                // onChange={(e, newValue) => { portfolioItemDataEditable && setTabs(newValue) }}
              >
                <Tab label="Portfolio Item" value={1} />
                <Tab
                  label="Service/Bundle"
                  value={2}
                  // disabled={!bundleServiceNeed}
                />
                <Tab label="Component Data" value={3} />
                <Tab label="Price Calculator" value={4} />
                <Tab label="Review" value={5} />
              </TabList>
            </Box>
            <TabPanel value={activeTab}>
              {activeTab === 1 && <CustomItemAddEdit />}
              {activeTab === 3 && <ComponentCodeAddEdit />}
              {activeTab === 4 && <CustomItemPriceCalculator />}

              {/* Tab {activeTab} */}
            </TabPanel>
          </TabContext>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default CustomItemTabsModal;

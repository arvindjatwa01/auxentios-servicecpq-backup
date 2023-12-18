import { Fragment, useState } from "react";
import Propensity from "./Propensity";
import {
  Card,
  Grid,
  Typography,
  Box
} from "@mui/material";
import GapToEntitlement from "./GapToEntitlement";
import SparepartSegment from "./SparepartSegment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faChartLine,
  faChartPie,
  faClock,
  faDollarSign,
  faPercent,
  faWrench,

} from "@fortawesome/free-solid-svg-icons";
import ServiceRecommend from "./ServiceRecommend";
import JobhourRecommend from "./JobhourRecommend";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import DiscountGuidance from "./DiscountGuidance";
import MarginRecommendation from "./MarginRecommendation";

export default function Insights(props) {
  const [insightType, setInsightType] = useState("");
  const insightTypes = [
    {
      type: 'propensity', label: 'Propensity To Buy', icon: <FontAwesomeIcon className="font-size-18 text-white" icon={faChartLine} />
    },
    { type: 'entitlement', label: 'Gap To Entitlement', icon: <FontAwesomeIcon className="font-size-18 text-white" icon={faChartBar} /> },
    { type: 'product-segment', label: 'Product Segment', icon: <FontAwesomeIcon className="font-size-18 text-white" icon={faChartPie} /> },
    { type: 'job-hr-recommend', label: 'Job Hour Recommendation', icon: <FontAwesomeIcon className="font-size-18 text-white" icon={faClock} /> },
    { type: 'service-recommend', label: 'Service Recommendation', icon: <FontAwesomeIcon className="font-size-18 text-white" icon={faWrench} /> },
    { type: 'margin', label: 'Margin Recommendation', icon: <FontAwesomeIcon className="font-size-18 text-white" icon={faDollarSign} /> },
    { type: 'discount', label: 'Discount Guidance', icon: <FontAwesomeIcon className="font-size-18 text-white" icon={faPercent} /> },
  ]
  const handleChange = (value) => {
    setInsightType(value);
  };
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  return (
    <Fragment>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid mt-3">
          <Grid container columnSpacing={3}>
            {insightTypes.map(insight =>
              <Grid item container lg={3} md={4} xs={6}>
                <Card
                  sx={{ borderRadius: 5, padding: 1, marginBlock: 2, display: "flex", width: "100%", cursor: 'pointer', backgroundColor: insight.type === insightType ? "#872ff715" : "", border: insight.type === insightType ? "2px solid #872ff785" : "" }}
                  variant="outlined"
                  onClick={() => handleChange(insight.type)}

                >
                  <Grid container >
                    <Grid item xs={2}>
                      <Card sx={{ borderRadius: 4, padding: 2, display: 'flex', justifyContent: 'center', backgroundColor: '#872ff7' }} variant="outlined">
                        {insight.icon}
                      </Card>
                    </Grid>
                    <Grid item container xs={10} alignItems={'center'} sx={{ paddingLeft: 2 }}>
                      <Box>
                        <Typography fontSize={'0.9rem'}>{insight.label}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )}
          </Grid>
          {insightType === 'propensity' && <Propensity handleSnack={handleSnack} />}
          {insightType === 'entitlement' && <GapToEntitlement handleSnack={handleSnack} />}
          {insightType === 'product-segment' && <SparepartSegment handleSnack={handleSnack} />}
          {insightType === 'service-recommend' && <ServiceRecommend handleSnack={handleSnack} />}
          {insightType === 'job-hr-recommend' && <JobhourRecommend handleSnack={handleSnack} />}
          {insightType === 'discount' && <DiscountGuidance handleSnack={handleSnack} />}
          {insightType === 'margin' && <MarginRecommendation handleSnack={handleSnack} />}
        </div>
      </div>
    </Fragment>
  );
}

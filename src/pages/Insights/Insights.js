import { useState } from "react";
import Propensity from "./Propensity";
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import GapToEntitlement from "./GapToEntitlement";
import SparepartSegment from "./SparepartSegment";

export default function Insights(props) {
  const [insightType, setInsightType] = useState("propensity");

  const handleChange = (event) => {
    setInsightType(event.target.value);
  };
  return (
    <div className="content-body" style={{ minHeight: "884px" }}>
      <div class="container-fluid mt-3">
        <Grid container>
          <Grid item container md={5} xs={12}>
            <Card
              sx={{ padding: 2, marginBlock: 2, display: "flex", width: "100%" }}
            >
              <Typography variant="h6" sx={{ mr: 10 }}>
                Insight
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
                {/* <InputLabel id="demo-select-small-label">Insights</InputLabel> */}
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={insightType}
                  // label="Insights"
                  onChange={handleChange}
                  sx={{ minWidth: 300, paddingLeft: 2 }}
                >
                  <MenuItem value={"propensity"}>Propensity To Buy</MenuItem>
                  <MenuItem value={"entitlement"}>Gap To Entitlement</MenuItem>
                  <MenuItem value={"spare-parts-segment"}>
                    Parts Segmentation
                  </MenuItem>
                  <MenuItem value={"job-recommendation"}>
                    Job Hour Recommendation
                  </MenuItem>
                  <MenuItem value={"service-recommendation"}>
                    Service Recommendation
                  </MenuItem>
                </Select>
              </FormControl>
            </Card>
          </Grid>
        </Grid>
        {insightType === 'propensity' && <Propensity />}
        {insightType === 'entitlement' && <GapToEntitlement />}
        {insightType === 'spare-parts-segment' && <SparepartSegment />}

      </div>
    </div>
  );
}

import { useState } from "react";
import Propensity from "./Propensity";
import {
  Card,
  FormControl,
  Grid,
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
        <Grid container columnSpacing={1}>
          <Grid item container md={4} xs={12} >
            <Card
              sx={{ padding: 2, marginBlock: 2, display: "flex", width: "100%" }}
            >
              <Grid container>
                <Grid item xs={3}>
                  <Typography fontSize={18} fontWeight='500'>
                    Insight
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <FormControl sx={{ m: 1, minWidth: 270, ml: 5 }} size="small">
                    {/* <InputLabel id="demo-select-small-label">Insights</InputLabel> */}
                    <Select
                      value={insightType}
                      // label="Insights"
                      onChange={handleChange}
                      sx={{ minWidth: 300, paddingLeft: 2, fontSize: 14 }}

                    >
                      <MenuItem value={"propensity"}>Propensity To Buy</MenuItem>
                      <MenuItem value={"entitlement"}>Gap To Entitlement</MenuItem>
                      <MenuItem value={"spare-parts-segment"}>
                        Product Segment
                      </MenuItem>
                      <MenuItem value={"job-recommendation"}>
                        Job Hour Recommendation
                      </MenuItem>
                      <MenuItem value={"service-recommendation"}>
                        Service Recommendation
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item container md={8} xs={12}>
            <Card
              sx={{ padding: 2, marginBlock: 2, display: "flex", width: "100%" }}
            >

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

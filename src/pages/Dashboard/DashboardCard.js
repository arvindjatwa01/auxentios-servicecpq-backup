import { Card, Grid, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MuiMenuComponent } from "pages/Operational";
import React from "react";
import { useHistory } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { TinyArea } from "@ant-design/plots";

const PREFIX = "DashboardCard";

const classes = {
  cardTheme: `${PREFIX}-cardTheme`,
};

const StyledCard = styled(Card)(({ theme, props }) => ({
  [`&.${classes.cardTheme}`]: {
    backgroundColor: props.mainColor,
    color: "#000",
    overflow: "hidden",
    position: "relative",
    borderRadius: 10,
  },
}));

const DashboardCard = (props) => {
  let history = useHistory();

  const routeToPath = () => {
    history.push(props.link);
  };

  return (
    <StyledCard
      elevation={6}
      props={props}
      style={{
        paddingBlock: props.size === "big" ? 40 : 10,
        paddingInline: 40,
        minHeight: 350,
      }}
      className={classes.cardTheme}
      onClick={routeToPath}
    >
      {/* <CardHeader title={props.title}/> */}
      <Grid container alignItems="flex-start">
        <Grid item xs={12}>
          <Grid container alignItems="center">
            <Grid container item xs={12} sx={{ paddingBlock: 1, minHeight:40 }}>
              <Typography
                style={{
                  fontSize: props.size === "big" ? "1rem" : "0.125rem",
                  marginBlock: 5,
                }}
              >
                {props.firstCategory}
              </Typography>
              <Typography
                style={{
                  fontSize: props.size === "big" ? "1.5rem" : "0.125rem",
                  fontWeight: 500,
                  marginInline: 10,
                }}
              >
                {props.firstValue}
              </Typography>
            </Grid>

            <Grid container item xs={12} sx={{ paddingBlock: 1,  minHeight: props.secCategory? 40: 50 }}>
              <Typography
                style={{
                  fontSize: props.size === "big" ? "1rem" : "0.125rem",
                  marginBlock: 5,
                }}
              >
                {props.secCategory}
              </Typography>
              <Typography
                style={{
                  fontSize: props.size === "big" ? "1.5rem" : "0.125rem",
                  fontWeight: 500,
                  marginInline: 10,
                  //   marginTop: 1.75,
                  //   marginBottom: 0.85,
                }}
              >
                {props.secValue}
              </Typography>
            </Grid>
            
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: 1.25, marginTop: 10 }}>
          <Typography
            style={{
              fontSize: props.size === "big" ? "0.8rem" : "0.6rem",
              fontWeight: 300,
              color: props.textColor,
            }}
          >
            <span
              style={{
                border: "1px solid",
                borderRadius: 10,
                paddingInline: 4,
                paddingBlock: 2,
                marginInline: 4,
                fontWeight: 600,
              }}
            >
              {console.log(props.difference)}
              {props.difference?.indexOf("-") !== -1 ? (
                <ArrowDownwardIcon />
              ) : (
                <ArrowUpwardIcon />
              )}{" "}
              {props.difference?.indexOf("-") !== -1
                ? props.difference?.substring(1, props.difference.length) + "%"
                : props.difference + "%"}
            </span>
            {props.title}
          </Typography>
        </Grid>
        <Grid container item xs={12} style={{ marginTop: 10 }}>
          <DemoTinyArea />
        </Grid>
      </Grid>
    </StyledCard>
  );
};

const DemoTinyArea = () => {
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340,
  ];
  const config = {
    //   strokeColor: "#00000",
    //   autoFit: false,
    data,
    smooth: true,
    //   color: "#f2f2f2",
    //   areaStyle: {
    //     fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    //     fillOpacity: 0.7,
    //     stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
    //   },
    color: "#fff",
    areaStyle: {
      fillOpacity: 0.7,
    },
  };
  return <TinyArea {...config} style={{ height: 100, width: "100%" }} />;
};

export default DashboardCard;

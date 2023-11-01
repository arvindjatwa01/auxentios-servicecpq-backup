import { Autocomplete, Card, Chip, Divider, Grid, List, ListItem, Stack, TextField, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { Fragment, useState } from "react";
import { jobCodeSearch } from "services/searchServices";
import { getComponentCodeSuggetions } from "services";

export default function JobhourRecommend(props) {
    const [selectedCategory, setSelectedCategory] = useState("service")
    const [selectedSubService, setSelectedSubService] = useState("")
    const [family, setFamily] = useState([]);
    const [model, setModel] = useState([]);
    const [prefix, setPrefix] = useState([]);
    const [jobCode, setJobCode] = useState("");
    const [componentCode, setComponentCode] = useState("");
    const [searchJobCodeResults, setSearchJobCodeResults] = useState([]);
    const [searchCompCodeResults, setSearchCompCodeResults] = useState([]);


    const handleSelectCategory = (e) => {
        console.log(e)
        setSelectedCategory(e)
    }
    const handleSelectSubService = (e) => {
        setSelectedSubService(e)
    }
    function getStyle(component) {
        return (
            {
                mr: 1,
                my: 1,
                backgroundColor: selectedSubService === component || selectedCategory === component ? '#872FF7' : '#FFF',
                color: selectedSubService === component || selectedCategory === component ? '#FFFFFF' : "",
                "&:hover": {
                    color: '#000'
                }
            }
        )
    }
    // Search Job Code
    const handleJobCodeSearch = async (searchText) => {
        setSearchJobCodeResults([]);
        if (searchText) {
            await jobCodeSearch("description~" + searchText)
                .then((result) => {
                    if (result && result.length > 0) {
                        setSearchJobCodeResults(result);
                        // setNoOptionsJobCode(false);
                    } else {
                        // setNoOptionsJobCode(true);
                    }
                })
                .catch((e) => {
                    //   handleSnack("error", "Error occurred while searching the customer!");
                });
        }
    };
    // Search component code
    const handleComponentCodeSearch = async (searchText) => {
        setSearchCompCodeResults([]);
        // segmentData.componentCode = searchText;
        if (searchText) {
            await getComponentCodeSuggetions("description~" + searchText)
                .then((result) => {
                    if (result && result.length > 0) {
                        setSearchCompCodeResults(result);
                        // setNoOptionsCompCode(false);
                    }
                })
                .catch((e) => {
                    //   handleSnack("error", "Error occurred while searching the component!");
                });
        }
    };
    // Select the comp code from search result
    const handleCompCodeSelect = (type, currentItem) => {
        console.log(type, currentItem)
        setComponentCode(currentItem);
        setSearchCompCodeResults([]);
    };
    // Select the job code from search result
    const handleJobCodeSelect = (type, currentItem) => {
        setJobCode(currentItem);
        setSearchCompCodeResults([]);
    };
    function JobHour() {
        return (
            <Card sx={{ padding: 2, width: "80%", mx: 'auto' }} variant='outlined'>
                <Card variant='outlined'>
                    {jobCode?.jobCode && componentCode.componentCode ?
                        <List>
                            <ListItem sx={{ justifyContent: 'center' }}>Average hours to  {jobCode?.description} the {componentCode?.description}</ListItem>
                            <Divider />
                            <ListItem sx={{ justifyContent: 'center' }}>
                                <Typography variant="h4" color={'#872ff7'} sx={{ mx: 2 }} fontWeight={'600'}>100 Hrs </Typography>
                                average for similar Jobs
                            </ListItem>
                            <Divider />
                            <ListItem sx={{ justifyContent: 'center' }}>
                                <Typography variant="h6" color={'#00000060'} sx={{ mx: 2 }}>Low<br />End</Typography>
                                <Typography variant="h5" fontWeight={500} sx={{ mx: 2 }}>20 Hrs - 200 Hrs</Typography>
                                <Typography variant="h6" color={'#00000060'} sx={{ mx: 2 }}>High<br />End</Typography>
                            </ListItem>
                        </List> : <Typography sx={{ margin: 'auto', padding: 2, textAlign: 'center' }}>Please Select the filters!</Typography>}
                </Card>
            </Card>
        );
    }


    return (
        <div>
            <Grid
                container
                sx={{
                    width: "100%",
                    backgroundColor: "#f3eafe",
                    borderRadius: 5,
                    marginBlock: 3,
                    padding: 2,
                }}
            >
                <Card sx={{ width: "100%", padding: 3 }}>
                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <Chip variant="outlined"
                                label="Service Attributes"
                                size="small"
                                onClick={e => handleSelectCategory("service")}
                                sx={() => getStyle("service")}
                            // icon={selectedCategory === "service" ? <CheckIcon color={"#fff"} /> : <></>}
                            />
                            {selectedCategory === "service" &&
                                <Fragment><KeyboardArrowDownIcon />
                                    <Chip variant="outlined"
                                        label="Family"
                                        size="small"
                                        // deleteIcon={<KeyboardArrowDownIcon />}
                                        onClick={e => handleSelectSubService("family")}
                                        // onDelete={e => handleSelectSubService("family")}
                                        sx={() => getStyle("family")}
                                    />
                                    <Chip variant="outlined"
                                        label="Model"
                                        size="small"
                                        // deleteIcon={<KeyboardArrowDownIcon />}
                                        onClick={e => handleSelectSubService("model")}
                                        sx={() => getStyle("model")}
                                    />
                                    <Chip variant="outlined"
                                        label="Prefix"
                                        size="small"
                                        // deleteIcon={<KeyboardArrowDownIcon />}
                                        onClick={e => handleSelectSubService("prefix")}
                                        sx={() => getStyle("prefix")}
                                    /></Fragment>}
                        </Grid>
                        <Grid item xs={1} md={1}>
                            <Divider orientation="vertical" sx={{ mx: 1 }} />
                        </Grid>

                        <Grid item xs={12} md={7}>

                            <Grid item container xs={12} >
                                <Grid item container xs={12} md={12} justifyContent={'center'} sx={{ my: 2 }}>
                                    <Autocomplete
                                        size={'small'}
                                        options={searchJobCodeResults}
                                        getOptionLabel={(option) => option.description}
                                        renderInput={(params) => (
                                            <TextField {...params} size={'small'} label="Job Code" onChange={e => handleJobCodeSearch(e.target.value)}
                                            />
                                        )}
                                        sx={{ width: '38%', mr: 3 }}
                                        filterOptions={(x) => x}
                                        onChange={handleJobCodeSelect}
                                    />
                                    <Autocomplete
                                        size={'small'}
                                        options={searchCompCodeResults}
                                        getOptionLabel={(option) => option.description}
                                        renderInput={(params) => (
                                            <TextField {...params} sx={{ fontSize: 13 }} label="Component Code" onChange={e => handleComponentCodeSearch(e.target.value)} />
                                        )}
                                        onChange={handleCompCodeSelect}
                                        sx={{ width: '38%' }}
                                        filterOptions={(x) => x}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ my: 2 }}>
                                    <JobHour />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Card>
            </Grid >
        </div >
    )
}


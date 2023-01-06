import React, { useState } from 'react'
import Select from "react-select";
import { Link } from "react-router-dom"
import $ from "jquery";
import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSearchCoverageForFamily, getSearchQueryCoverage, itemSearch, itemSearchSuggestion, getSearchCustomPortfolio, portfolioSearch } from "../../services/index"
import { useEffect } from 'react';


const SolutionQuerySearchComp = (props) => {
    const [count, setCount] = useState(1)
    const [searchFor, setSearchFor] = useState(0);
    const [querySearchSelector, setQuerySearchSelector] = useState([
        {
            id: 0,
            selectFamily: "",
            selectOperator: "",
            inputSearch: "",
            selectOptions: [],
            selectedOption: "",
            itemType: { label: '', value: '' },
            itemTypeOperator: ""
        },
    ]);

    const options = [
        { label: "Make", value: "make" },
        { label: "Model", value: "model" },
        { label: "Prefix", value: "prefix" },
        { label: "Family", value: "family" }]

    const handleItemType = (e, id) => {
        let tempArray = [...querySearchSelector];
        let obj = tempArray[id];
        obj.itemType = e;
        tempArray[id] = obj;
        console.log("tempArray : ", tempArray)
        setQuerySearchSelector(tempArray);
    }
    const handleitemTypeOperator = (e, id) => {
        let tempArray = [...querySearchSelector];
        let obj = tempArray[id];
        obj.itemTypeOperator = e;
        tempArray[id] = obj;
        setQuerySearchSelector(tempArray);
    }

    const handleOperator = (e, id) => {
        let tempArray = [...querySearchSelector];
        let obj = tempArray[id];
        obj.selectOperator = e;
        tempArray[id] = obj;
        setQuerySearchSelector([...tempArray]);
    };
    const handleFamily = (e, id) => {
        let tempArray = [...querySearchSelector];
        let obj = tempArray[id];
        obj.selectFamily = e;
        obj.inputSearch = "";
        obj.selectOptions = [];
        tempArray[id] = obj;
        setQuerySearchSelector([...tempArray]);
    };
    const handleInputSearch = (e, id) => {
        let tempArray = [...querySearchSelector];
        let obj = tempArray[id];

        if (props.compoFlag === "coverage") {
            getSearchCoverageForFamily(tempArray[id].selectFamily.value, e.target.value)
                .then((res) => {
                    obj.selectOptions = res;
                    tempArray[id] = obj;
                    setQuerySearchSelector([...tempArray]);
                    $(`.scrollbar-${id}`).css("display", "block");
                })
                .catch((err) => {
                    console.log("err in api call", err);
                });
            obj.inputSearch = e.target.value;
        } else if (props.compoFlag === "solutionTempItemSearch") {
            var SearchResArr = [];
            getSearchCustomPortfolio(`${tempArray[id].selectFamily.value}~${e.target.value}`)
                .then((res) => {
                    if (tempArray[id].selectFamily.value === "make") {
                        for (let i = 0; i < res.length; i++) {
                            for (let j = 0; j < res[i].customCoverages.length; j++) {
                                SearchResArr.push(res[i].customCoverages[j].make)
                            }
                        }

                    } else if (tempArray[id].selectFamily.value == "family") {
                        for (let i = 0; i < res.length; i++) {
                            for (let j = 0; j < res[i].customCoverages.length; j++) {
                                SearchResArr.push(res[i].customCoverages[j].family)
                            }
                        }
                    } else if (tempArray[id].selectFamily.value == "modelNo") {
                        for (let i = 0; i < res.length; i++) {
                            for (let j = 0; j < res[i].customCoverages.length; j++) {
                                SearchResArr.push(res[i].customCoverages[j].modelNo)
                            }
                        }
                    } else if (tempArray[id].selectFamily.value == "serialNumberPrefix") {
                        for (let i = 0; i < res.length; i++) {
                            for (let j = 0; j < res[i].customCoverages.length; j++) {
                                SearchResArr.push(res[i].customCoverages[j].serialNumberPrefix)
                            }
                        }
                    } else if (tempArray[id].selectFamily.value == "name") {
                        for (let i = 0; i < res.length; i++) {
                            SearchResArr.push(res[i].name)
                        }
                    } else if (tempArray[id].selectFamily.value == "description") {
                        for (let i = 0; i < res.length; i++) {
                            SearchResArr.push(res[i].description)
                        }
                    }
                    obj.selectOptions = SearchResArr;
                    tempArray[id] = obj;
                    setQuerySearchSelector([...tempArray]);
                    $(`.scrollbar-${id}`).css("display", "block");
                    console.log("search Query Result :", res)

                }).catch((err) => {
                    console.log("error in getSearchQueryCoverage", err)
                })
            obj.inputSearch = e.target.value;
            setQuerySearchSelector([...tempArray]);
        }
        else if (props.compoFlag === "itemSearch" || props.compoFlag === "bundleSearch" || props.compoFlag === "portfolioTempItemSearch") {

            if (props.compoFlag === "portfolioTempItemSearch") {
                var SearchResArr = [];
                portfolioSearch(`${tempArray[id].selectFamily.value}~${e.target.value}`)
                    .then((res) => {
                        if (tempArray[id].selectFamily.value === "make") {
                            for (let i = 0; i < res.data.length; i++) {
                                for (let j = 0; j < res.data[i].coverages.length; j++) {
                                    SearchResArr.push(res.data[i].coverages[j].make)
                                }
                            }

                        } else if (tempArray[id].selectFamily.value == "family") {
                            for (let i = 0; i < res.data.length; i++) {
                                for (let j = 0; j < res.data[i].coverages.length; j++) {
                                    SearchResArr.push(res.data[i].coverages[j].family)
                                }
                            }
                        } else if (tempArray[id].selectFamily.value == "modelNo") {
                            for (let i = 0; i < res.data.length; i++) {
                                for (let j = 0; j < res.data[i].coverages.length; j++) {
                                    SearchResArr.push(res.data[i].coverages[j].modelNo)
                                }
                            }
                        } else if (tempArray[id].selectFamily.value == "serialNumberPrefix") {
                            for (let i = 0; i < res.data.length; i++) {
                                for (let j = 0; j < res.data[i].coverages.length; j++) {
                                    SearchResArr.push(res.data[i].coverages[j].serialNumberPrefix)
                                }
                            }
                        } else if (tempArray[id].selectFamily.value == "name") {
                            for (let i = 0; i < res.data.length; i++) {
                                SearchResArr.push(res.data[i].name)
                            }
                        } else if (tempArray[id].selectFamily.value == "description") {
                            for (let i = 0; i < res.data.length; i++) {
                                SearchResArr.push(res.data[i].description)
                            }
                        }
                        obj.selectOptions = SearchResArr;
                        tempArray[id] = obj;
                        setQuerySearchSelector([...tempArray]);
                        $(`.scrollbar-${id}`).css("display", "block");
                    })
                    .catch((err) => {
                        console.log("err in api call", err);
                    });
            }
            // itemSearchSuggestion(tempArray[id].selectFamily.value, e.target.value)
            //   .then((res) => {
            //     // obj.selectOptions = [...res];
            //     tempArray[id] = obj;
            //     setQuerySearchSelector([...tempArray]);
            //     $(`.scrollbar-${id}`).css("display", "block");
            //   })
            //   .catch((err) => {
            //     alert(err)
            //     console.log("err in api call", err);
            //     return
            //   });
            obj.inputSearch = e.target.value;
            setQuerySearchSelector([...tempArray]);

        }

    };

    const handleSearchListClick = (e, currentItem, obj1, id) => {
        let tempArray = [...querySearchSelector];
        let obj = tempArray[id];
        obj.inputSearch = currentItem;
        obj.selectedOption = currentItem;
        tempArray[id] = obj;
        setQuerySearchSelector([...tempArray]);
        $(`.scrollbar-${id}`).css("display", "none");
    };

    const addSearchQuerryHtml = () => {
        setQuerySearchSelector([
            ...querySearchSelector,
            {
                id: count,
                selectOperator: "",
                selectFamily: "",
                inputSearch: "",
                selectOptions: [],
                selectedOption: "",
            },
        ]);
        setCount(count + 1);
    };

    const handleDeletQuerySearch = () => {
        setQuerySearchSelector([]);
        setCount(0);
        props.compoFlag === "coverage" && props?.setMasterData([]);
        props.compoFlag === "coverage" && props?.setFilterMasterData([]);
        props.compoFlag === "coverage" && props?.setSelectedMasterData([]);
        props.compoFlag === "itemSearch" && props?.setBundleItems([]);
        props.compoFlag === "coverage" && props?.setOpenedModelBoxData([]);

        props.compoFlag === "portfolioTempItemSearch" && props?.setPortfolioTempMasterData([]);
        props.compoFlag === "portfolioTempItemSearch" && props?.setSelectedPortfolioTempMasterData([]);
        props.compoFlag === "portfolioTempItemSearch" && props?.setPortfolioTempFilterMasterData([]);

        props.compoFlag === "solutionTempItemSearch" && props?.setSolutionTempMasterData([]);
        props.compoFlag === "solutionTempItemSearch" && props?.setSelectedSolutionTempMasterData([]);


        props.setTempBundleService1([])

    };

    const handleQuerySearchClick = async () => {
        // let searchStr;
        try {

            if (props.compoFlag === "portfolioTempItemSearch") {
                props.setLoadingStatus("01")
            }

            if (props.compoFlag === "solutionTempItemSearch") {
                props.setSolutionLoadingStatus("01")
            }

            $(".scrollbar").css("display", "none");
            console.log("handleQuerySearchClick", querySearchSelector);
            // props.setQuerySearchSelectItem({querySearchSelector});
            if (
                querySearchSelector[0]?.selectFamily?.value == "" ||
                querySearchSelector[0]?.inputSearch == "" ||
                querySearchSelector[0]?.selectFamily?.value === undefined
            ) {
                throw "Please fill data properly"
            }

            // console.log("Try here1 ", querySearchSelector[0].selectFamily.value);
            // var  searchStr = `bundleFlag:${querySearchSelector[0]?.itemType.value} ${querySearchSelector[0]?.itemTypeOperator.value} ${querySearchSelector[0]?.selectFamily?.value}~${querySearchSelector[0]?.inputSearch}`;
            // var searchStr =
            //   querySearchSelector[0]?.selectFamily?.value +
            //   "~" +
            //   querySearchSelector[0]?.inputSearch;

            console.log("props.compoFlag 276: ", props.compoFlag)

            if (props.compoFlag === "solutionTempItemSearch") {
                var searchStr = `${querySearchSelector[0]?.selectFamily?.value}:"${querySearchSelector[0]?.inputSearch}"`;

            } else if (props.compoFlag === "portfolioTempItemSearch") {
                var searchStr = `${querySearchSelector[0]?.selectFamily?.value}:"${querySearchSelector[0]?.inputSearch}"`;
            }
            else {
                var searchStr = `bundleFlag:PORTFOLIO AND ${querySearchSelector[0]?.selectFamily?.value}:"${querySearchSelector[0]?.inputSearch}"`;
            }
            console.log("searchStr  try : ", searchStr);
            // var searchStr = `bundleFlag:${querySearchSelector[0]?.itemType.value} ${querySearchSelector[0]?.itemTypeOperator.value} ${querySearchSelector[0]?.selectFamily?.value}~${querySearchSelector[0]?.inputSearch}`;

            for (let i = 1; i < querySearchSelector.length; i++) {
                if (
                    querySearchSelector[i]?.selectOperator?.value == "" ||
                    querySearchSelector[i]?.selectFamily?.value == "" ||
                    querySearchSelector[i]?.inputSearch == ""
                ) {
                    throw "Please fill data properly"
                }
                searchStr =
                    searchStr +
                    " " +
                    querySearchSelector[i].selectOperator.value +
                    " " +
                    querySearchSelector[i].selectFamily.value +
                    ":\"" +
                    querySearchSelector[i].inputSearch + "\"";
            }
            // searchStr is ready call API 
            if (props.compoFlag === "coverage") {
                props?.setFlagIs(false);
                const res1 = await getSearchQueryCoverage(searchStr)
                props?.setMasterData(res1);
            } else if (props.compoFlag === "itemSearch") {
                props?.setBundleItems([]);
                props?.setLoadingItem(true)
                const res2 = await itemSearch(searchStr)
                let temArray = []
                for (let i = 0; i <= res2.data.length; i++) {
                    if (res2.data[i].itemHeaderModel.bundleFlag === "PORTFOLIO") {
                        temArray[0] = res2.data[i]
                        res2.data.splice(i, 1)
                        break
                    }
                }
                temArray[0].associatedServiceOrBundle = res2.data
                props.setBundleItems(temArray)
                props.setLoadingItem(false)
            } else if (props.compoFlag === "portfolioTempItemSearch") {

                const res3 = await portfolioSearch(searchStr)
                console.log("res3 is  : ", res3)
                if (!res3.data.length > 0) {
                    props.setLoadingStatus("")
                    props.setPortfolioTempMasterData([])
                    // props.ItemSearchResponseFun([], querySearchSelector)
                    // throw "No record found"
                    throw "No information is found for your search, change the search criteria";
                } else {
                    props.setPortfolioTempMasterData(res3.data)
                    // props.ItemSearchResponseFun(res3, querySearchSelector)
                    props.setLoadingStatus("")

                }
                let temArray = []
                // for (let i = 0; i <= res2.length; i++) {
                //   if (res2[i].itemHeaderModel.bundleFlag === "PORTFOLIO") {
                //     temArray[0] = res2[i]
                //     res2.splice(i, 1)
                //     break
                //   }
                // }
                // temArray[0].associatedServiceOrBundle = res2
                // props.setLoadingStatus("")
            } else if (props.compoFlag === "solutionTempItemSearch") {
                console.log("searchStr  try 352 : ", searchStr)
                // getSearchCustomPortfolio(searchStr)
                //     .then((res) => {
                //         obj.selectOptions = res;
                //         tempArray[id] = obj;
                //         setQuerySearchSelector([...tempArray]);
                //         $(`.scrollbar-${id}`).css("display", "block");
                //     })
                //     .catch((err) => {
                //         console.log("err in api call", err);
                //     });
                const res4 = await getSearchCustomPortfolio(searchStr)
                if (!res4.length > 0) {
                    props.setSolutionLoadingStatus("")
                    props.setSolutionTempMasterData([])
                    // throw "No record found"
                    throw "No information is found for your search, change the search criteria";
                } else {
                    props.setSolutionTempMasterData(res4)
                    props.setSolutionLoadingStatus("")

                }

            } else {
                // for other cases or default case
                const res = await getSearchQueryCoverage(searchStr)
                console.log("else search str is : ", searchStr)
            }

        } catch (error) {
            // console.log("searchStr catch : ", searchStr);
            console.log("error in getSearchQueryCoverage", error);
            toast("😐" + error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }
    };



    const handleBundleSearch = async () => {
        try {
            props.setLoadingItem("01")
            if (
                querySearchSelector[0]?.itemType.value == "" ||
                querySearchSelector[0]?.itemTypeOperator.value == "" ||
                querySearchSelector[0]?.selectFamily?.value == "" ||
                querySearchSelector[0]?.inputSearch == ""

            ) {
                throw "Please fill data properly"
            }
            var searchStr = `bundleFlag:${querySearchSelector[0]?.itemType.value} ${querySearchSelector[0]?.itemTypeOperator.value} ${querySearchSelector[0]?.selectFamily?.value}~${querySearchSelector[0]?.inputSearch}`

            for (let i = 1; i < querySearchSelector.length; i++) {
                if (
                    querySearchSelector[i]?.itemType.value == "" ||
                    querySearchSelector[i]?.itemTypeOperator.value == "" ||
                    querySearchSelector[i]?.selectFamily?.value == "" ||
                    querySearchSelector[i]?.inputSearch == "" ||
                    querySearchSelector[i]?.selectOperator?.value == ""

                ) {
                    throw "Please fill data properly"
                }
                searchStr =
                    searchStr +
                    " " +
                    querySearchSelector[i].selectOperator.value + ` bundleFlag:${querySearchSelector[i]?.itemType.value} ` + `${querySearchSelector[i]?.itemTypeOperator.value} ` +
                    querySearchSelector[i].selectFamily.value +
                    "~" +
                    querySearchSelector[i].inputSearch;
            }
            const res = await itemSearch(searchStr)
            if (!res.data.length > 0) {
                props.setLoadingItem("11")
                props.setTempBundleService1([])
                // throw "No record found"
                throw "No information is found for your search, change the search criteria";
            } else {
                props.setTempBundleService1(res.data)
                props.setLoadingItem("11")

            }

        } catch (error) {
            toast("😐" + error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(() => {
        if (props.compoFlag === "portfolioTempItemSearch") {
            setSearchFor(1);
        } else {
            setSearchFor(2);
        }

    })
    useEffect(() => {
        setQuerySearchSelector([
            {
                id: 0,
                selectFamily: "",
                selectOperator: "",
                inputSearch: "",
                selectOptions: [],
                selectedOption: "",
                itemType: { label: '', value: '' },
                itemTypeOperator: ""
            },
        ]);
    }, [searchFor])

    // useEffect(() => {
    //     // setQuerySearchSelector([]);
    //     props.compoFlag === "portfolioTempItemSearch" && props?.setPortfolioTempMasterData([]);
    //     props.compoFlag === "portfolioTempItemSearch" && props?.setSelectedPortfolioTempMasterData([]);
    //     props.compoFlag === "portfolioTempItemSearch" && props?.setPortfolioTempFilterMasterData([]);

    //     props.compoFlag === "solutionTempItemSearch" && props?.setSolutionTempMasterData([]);
    //     props.compoFlag === "solutionTempItemSearch" && props?.setSelectedSolutionTempMasterData([]);
    // }, [])

    // if (props.compoFlag === "portfolioTempItemSearch") {
    //     props.compoFlag === "portfolioTempItemSearch" && props?.setPortfolioTempMasterData([]);
    //     props.compoFlag === "portfolioTempItemSearch" && props?.setSelectedPortfolioTempMasterData([]);
    //     props.compoFlag === "portfolioTempItemSearch" && props?.setPortfolioTempFilterMasterData([]);
    // } else if (props.compoFlag === "solutionTempItemSearch") {
    //     props.compoFlag === "solutionTempItemSearch" && props?.setSolutionTempMasterData([]);
    //     props.compoFlag === "solutionTempItemSearch" && props?.setSelectedSolutionTempMasterData([]);
    // }


    return (
        <>
            <div className="w-100">
                <div className="d-flex align-items-center bg-light-dark w-100 border-radius-10">
                    <div className="d-flex justify-content-between align-items-center p-3 border-radius-10 w-100 border-right">
                        <div className="row align-items-center m-0">
                            {querySearchSelector.map((obj, i) => {
                                return (
                                    <div className="customselect d-flex align-items-center mr-3 my-2" key={i}>
                                        {i > 0 ? (
                                            <Select
                                                isClearable={true}
                                                defaultValue={{ label: "And", value: "AND" }}
                                                options={[{ label: "And", value: "AND", id: i }, { label: "Or", value: "OR", id: i }]}
                                                placeholder="&amp; AND/OR"
                                                onChange={(e) => handleOperator(e, i)}
                                                value={obj.selectOperator}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        {i === 0 ? <>
                                            {/* {(props.compoFlag === "itemSearch" || props.compoFlag === "bundleSearch") &&
                        <>
                          <Select
                            placeholder="Bundle Flag"
                            options={(props.compoFlag === "bundleSearch") ? ([
                              { label: "Bundle", value: "BUNDLE_ITEM" },
                              { label: "Service", value: "SERVICE" },
                            ]) : ([
                              // { label: "Bundle", value: "bundle" },
                              // { label: "Service", value: "service" },
                              // { label: "Portfolio Item", value: "portfolioItem" },
                              { label: "Bundle", value: "BUNDLE_ITEM" },
                              { label: "Service", value: "SERVICE" },
                              { label: "Portfolio Item", value: "PORTFOLIO" },
                            ])}
                            value={querySearchSelector.itemType}
                            onChange={(e) => handleItemType(e, i)}
                          />
                          <Select
                            options={[
                              { label: "AND", value: "AND" },
                              { label: "OR", value: "OR" },
                            ]}
                            placeholder="And/OR"
                            value={querySearchSelector.itemTypeOperator}
                            onChange={(e) => handleitemTypeOperator(e, i)}
                          />
                        </>
                      } */}

                                            {/* {(props.compoFlag === "portfolioTempItemSearch") &&
                                                <>
                                                    <Select
                                                        placeholder="Bundle Flag"
                                                        options={([
                                                            { label: "Portfolio", value: "PORTFOLIO" },

                                                        ])}

                                                        defaultValue={props.compoFlag === "portfolioTempItemSearch" ? ({ label: "Portfolio", value: "PORTFOLIO" }) : ""}
                                                        value={{ label: "Portfolio", value: "PORTFOLIO" }}
                                                   
                                                    />
                                                    <Select
                                                        options={[
                                                            { label: "AND", value: "AND" },
                                                        ]}
                                                        placeholder="And/OR"
                                                        defaultValue={props.compoFlag === "portfolioTempItemSearch" ? ({ label: "AND", value: "AND" }) : ""}
                                                        value={{ label: "AND", value: "AND" }}
                                                    />
                                                </>
                                            } */}

                                        </> : <></>}

                                        <div>
                                            {(props.compoFlag === "itemSearch" && querySearchSelector[i].itemType?.value === "portfolioItem") || (props.compoFlag !== "itemSearch") ? (
                                                <Select
                                                    isClearable={true}
                                                    options={props.options ? props.options : options}
                                                    onChange={(e) => handleFamily(e, i)}
                                                    value={obj.selectFamily}
                                                />) : ('')}

                                        </div>
                                        <div className="customselectsearch">
                                            <input
                                                className="custom-input-sleact"
                                                type="text"
                                                placeholder="Search string"
                                                value={obj.inputSearch}
                                                onChange={(e) =>
                                                    handleInputSearch(e, i)
                                                }
                                                id={"inputSearch-" + i}
                                                autoComplete="off"
                                            />

                                            {
                                                <ul
                                                    className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}

                                                >
                                                    {console.log("Obje obj.selectOptions : ", obj.selectOptions)}

                                                    {obj.selectOptions.map(
                                                        (currentItem, j) => (
                                                            <li
                                                                className="list-group-item"
                                                                key={j}
                                                                onClick={(e) => handleSearchListClick(e, currentItem, obj, i)}
                                                            >
                                                                {currentItem}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                );
                            })}
                            <div onClick={(e) => addSearchQuerryHtml(e)}>
                                <Link
                                    to="#"
                                    className="btn-sm text-violet border"
                                    style={{ border: "1px solid #872FF7" }}
                                >
                                    +
                                </Link>
                            </div>
                            <div onClick={handleDeletQuerySearch}>
                                <Link to="#" className="btn-sm">
                                    <svg
                                        data-name="Layer 41"
                                        id="Layer_41"
                                        viewBox="0 0 50 50"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title />
                                        <path
                                            className="cls-1"
                                            d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                                        />
                                        <path
                                            className="cls-1"
                                            d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                                        />
                                        <path
                                            className="cls-1"
                                            d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="px-3">
                        <Link
                            to="#"
                            className="btn bg-primary text-white"
                            onClick={props.compoFlag === "bundleSearch" ? handleBundleSearch : handleQuerySearchClick}
                        >
                            <SearchIcon />
                            <span className="ml-1">Search</span>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SolutionQuerySearchComp
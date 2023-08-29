import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Select from 'react-select';

import $ from "jquery";
import SearchIcon from "@mui/icons-material/Search";
import { getSearchCoverageForFamily, getSearchQueryCoverage, getServiceBundleItemPrices, itemSearchDropdown } from '../../../services/index';
import { isEmptyData, isEmptySelectData } from './utilities/textUtilities';
import { toast } from 'react-toastify';

const operatorOptions = [
    { label: "And", value: "AND" },
    { label: "Or", value: "OR" }
]

const bundleSearchOptions = [
    { label: "Bundle", value: "BUNDLE_ITEM" },
    { label: "Service", value: "SERVICE" },
];

const itemSearchOptions = [
    { label: "Bundle", value: "BUNDLE_ITEM" },
    { label: "Service", value: "SERVICE" },
    { label: "Portfolio Item", value: "PORTFOLIO" },
];

const portfolioSearchOptions = [
    { label: "Portfolio", value: "PORTFOLIO" },
]

const coverageSearchOptions = [
    { label: "Make", value: "make" },
    { label: "Model", value: "model" },
    { label: "Prefix", value: "prefix" },
    { label: "Family", value: "family" },
];

const itemSearchFamilyOptions = [
    { label: "Make", value: "itemHeaderMake" },
    { label: "Family", value: "itemHeaderFamily" },
    { label: "Model", value: "model" },
    { label: "Prefix", value: "prefix" },
    { label: "Item Name", value: "itemName" },
    { label: "Description", value: "itemHeaderDescription" }
]

const PortfolioCoverageSearch = (props) => {
    const { searchFlag, handleAddSearchItem } = props;
    const [searchSelector, setSearchSelector] = useState([
        {
            id: 0,
            selectFamily: "",
            selectOperator: "",
            inputSearch: "",
            selectOptions: [],
            selectedOption: "",
            // itemType: { label: '', value: '' },
            itemType: "",
            itemTypeOperator: ""
        },
    ]);

    // add more search Selector
    const addMoreSearchSelector = () => {
        const _searchSelector = [...searchSelector];
        _searchSelector.push({
            id: _searchSelector.length,
            selectOperator: "",
            selectFamily: "",
            inputSearch: "",
            selectOptions: [],
            selectedOption: "",
            // itemType: querySearchSelector[0].itemType,
        });
        setSearchSelector(_searchSelector);
    }

    // remove search selector
    const handleDeleteSearchSelector = () => {
        // const _searchSelector = [...searchSelector];
        // let selectorLength = _searchSelector.length;
        // _searchSelector.splice(selectorLength === 0 ? 0 : selectorLength.length - 1, 1)
        // setSearchSelector(_searchSelector);
        setSearchSelector([]);
    }

    // handle And/Or Operator
    const handleAndOrOperator = (e, i) => {
        let _searchSelector = [...searchSelector];
        let obj = _searchSelector[i];
        obj.selectOperator = e;
        _searchSelector[i] = obj;
        setSearchSelector([..._searchSelector]);
    };

    // handle And/Or Operator for Item Type
    const handleItemTypeAndOrOperator = (e, i) => {
        let _searchSelector = [...searchSelector];
        let obj = _searchSelector[i];
        obj.itemTypeOperator = e;
        _searchSelector[i] = obj;
        setSearchSelector([..._searchSelector]);
    }

    // Search for coverage input filed
    const coverageInputSearch = async (_searchSelector, searchValue, i, selectedObj) => {
        getSearchCoverageForFamily(_searchSelector[i].itemType.value, searchValue)
            .then((res) => {
                selectedObj.selectOptions = res;
                _searchSelector[i] = selectedObj;
                setSearchSelector([..._searchSelector]);
                $(`.scrollbar-${i}`).css("display", "block");
            })
            .catch((err) => {
                console.log("err in api call", err);
            });
    }

    // Search for Bundle/Service input search
    const bundleServiceInputSearch = async (_searchSelector, searchValue, i, selectedObj) => {
        var newSearchStr = `${selectedObj.selectFamily?.value}/${searchValue}?bundle_flag=${searchSelector[0]?.itemType?.value}`;
        itemSearchDropdown(newSearchStr)
            .then((res) => {
                console.log("ressss ", res);
                let searchResult = [];
                if (res.status === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        searchResult.push(res.data[i].key)
                    }
                }
                selectedObj.selectOptions = searchResult;
                _searchSelector[i] = selectedObj;
                setSearchSelector([..._searchSelector]);
                $(`.scrollbar-${i}`).css("display", "block");
            })
            .catch((err) => {
                return
            });
    }

    // handle Select Item Type || family Type Option
    const handleFamily = (e, i, keyName) => {
        let tempArray = [...searchSelector];
        let obj = tempArray[i];
        obj[keyName] = e;
        tempArray[i] = obj;
        setSearchSelector([...tempArray]);
    };

    // input fields Search
    const handleInputSearch = (e, i) => {
        try {
            const { id, value } = e.target;
            let _searchSelector = [...searchSelector];
            let obj = _searchSelector[i];
            if (value.length > 0) {
                obj.inputSearch = value;
                if (searchFlag === "coverage") {
                    coverageInputSearch(_searchSelector, value, i, obj);
                }
                if (searchFlag === "bundleSearch") {
                    if (isEmptySelectData(searchSelector[0]?.itemType?.value)) {
                        throw "Select Item Type first."
                    }
                    if (isEmptySelectData(obj?.selectFamily?.value)) {
                        throw "Select family first."
                    }
                    bundleServiceInputSearch(_searchSelector, value, i, obj)
                }
            } else {
                obj.inputSearch = value;
                obj.selectOptions = [];
                _searchSelector[i] = obj;
                setSearchSelector([..._searchSelector]);
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
            return;
        }
    }

    // handle Select input searched data
    const handleSearchListClick = (selectedItem, i) => {
        let tempArray = [...searchSelector];
        let obj = tempArray[i];
        obj.inputSearch = selectedItem;
        obj.selectedOption = selectedItem;
        tempArray[i] = obj;
        setSearchSelector([...tempArray]);
        $(`.scrollbar-${i}`).css("display", "none");
    };

    const handleSearchItems = async () => {
        try {
            var searchStr = "";
            if (isEmptySelectData(searchSelector[0].itemType?.value)) {
                throw "Please fill data properly";
            }
            if (searchFlag !== "coverage") {
                if (isEmptySelectData(searchSelector[0].itemType?.value)) {
                    throw "Please fill data properly";
                }
            }
            if (isEmptyData(searchSelector[0]?.inputSearch)) {
                throw "Please fill data properly";
            }

            if (searchFlag === "bundleSearch") {
                if (isEmptySelectData(searchSelector[0]?.itemTypeOperator?.value)) {
                    throw "Please fill data properly";
                }
                if (isEmptySelectData(searchSelector[0]?.selectFamily?.value)) {
                    throw "Please fill data properly";
                }
                searchStr = `itemIds=${(searchSelector[0]?.inputSearch.split("#")[0])}`;
                // searchStr = searchSelector[0]?.itemType?.value + ":" + searchSelector[0]?.inputSearch;
            }

            if (searchFlag === "coverage") {
                searchStr = searchSelector[0]?.itemType?.value + ":" + searchSelector[0]?.inputSearch;
            }

            for (let i = 1; i < searchSelector.length; i++) {
                if (isEmptySelectData(searchSelector[i].selectOperator?.value)) {
                    throw "Please fill data properly";
                } else if (isEmptySelectData(searchSelector[i].selectFamily?.value)) {
                    throw "Please fill data properly";
                } else if (isEmptyData(searchSelector[0]?.inputSearch)) {
                    throw "Please fill data properly";
                }
                if (searchFlag == "coverage") {
                    searchStr = searchStr + " " + searchSelector[i].selectOperator.value + " " + searchSelector[i].selectFamily.value + ":" + searchSelector[i].inputSearch;
                }
                if (searchFlag === "bundleSearch") {
                    searchStr = searchStr + "&itemsIds=" + (searchSelector[i]?.inputSearch.split("#")[0]);
                }
            }

            if (searchFlag == "coverage") {
                const coverageRes = await getSearchQueryCoverage(searchStr);
                handleAddSearchItem(coverageRes)
            }

            if (searchFlag === "bundleSearch") {
                const bundleServiceRes = await getServiceBundleItemPrices(searchStr)
                if (bundleServiceRes.status === 200) {
                    let bundleServiceItemsArr = [];
                    bundleServiceRes.data.length > 0 && bundleServiceRes.data.map(bundleServiceData => {
                        if (searchSelector[0]?.itemType?.value === "BUNDLE_ITEM") {
                            bundleServiceItemsArr.push(...bundleServiceData.bundleItems)

                        }
                        if (searchSelector[0]?.itemType?.value === "SERVICE") {
                            bundleServiceItemsArr.push(...bundleServiceData.serviceItems)
                        }
                    })
                    handleAddSearchItem(bundleServiceItemsArr)
                }
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
            return;
        }
    }

    return (
        <div className="w-100">
            <div className="d-flex align-items-center bg-light-dark w-100 border-radius-10">
                <div className="d-flex justify-content-between align-items-center p-3 border-radius-10 w-100 border-right">
                    <div className="row align-items-center m-0">
                        {searchSelector.map((selector, i) =>
                            <div className="customselect d-flex align-items-center mr-3 my-2" key={i}>
                                {i > 0 &&
                                    <Select
                                        defaultValue={{ label: "And", value: "AND" }}
                                        options={operatorOptions}
                                        placeholder="&amp;"
                                        onChange={(e) => handleAndOrOperator(e, i)}
                                        value={selector.selectOperator}
                                    />
                                }
                                <>
                                    {searchFlag === "coverage" ?
                                        <Select
                                            // placeholder="Bundle Flag"
                                            options={searchFlag === "bundleSearch" ? bundleSearchOptions :
                                                searchFlag === "itemSearch" ? itemSearchOptions :
                                                    searchFlag === "portfolio" ? portfolioSearchOptions :
                                                        searchFlag === "coverage" ? coverageSearchOptions : []}
                                            // value={searchFlag === "coverage" ? selector.selectFamily : selector.itemType}
                                            value={selector.itemType}
                                            onChange={(e) => handleFamily(e, i, "itemType")}
                                        />
                                        : <>
                                            {i === 0 && <>
                                                <Select
                                                    // placeholder="Bundle Flag"
                                                    options={searchFlag === "bundleSearch" ? bundleSearchOptions :
                                                        searchFlag === "itemSearch" ? itemSearchOptions :
                                                            searchFlag === "portfolio" ? portfolioSearchOptions :
                                                                searchFlag === "coverage" ? coverageSearchOptions : []}
                                                    value={selector.itemType}
                                                    onChange={(e) => handleFamily(e, i, "itemType")}
                                                />
                                                <Select
                                                    options={operatorOptions}
                                                    placeholder="And/OR"
                                                    value={selector.itemTypeOperator}
                                                    onChange={(e) => handleItemTypeAndOrOperator(e, i)}
                                                />
                                            </>}
                                        </>
                                    }

                                    <div>
                                        {searchFlag === "bundleSearch" &&
                                            <Select
                                                options={itemSearchFamilyOptions}
                                                onChange={(e) => handleFamily(e, i, "selectFamily")}
                                                value={selector.selectFamily}
                                            />}

                                    </div>
                                </>
                                <div className="customselectsearch">
                                    <input className="custom-input-sleact" type="text" placeholder="Search string"
                                        value={searchFlag === "bundleSearch" ? selector.inputSearch.split("#")[1] : selector.inputSearch}
                                        onChange={(e) => handleInputSearch(e, i)}
                                        id={"inputSearch-" + i}
                                        autoComplete="off"
                                    />
                                    <ul className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}>
                                        {(selector.inputSearch.length > 0 && selector.selectOptions.length === 0) ?
                                            <li>No Result Found</li> :
                                            selector.inputSearch.length > 0 && selector.selectOptions.map((currentItem, j) => (
                                                <li className="list-group-item" key={j}
                                                    onClick={(e) => handleSearchListClick(currentItem, i)}
                                                >
                                                    {searchFlag === "bundleSearch" ? currentItem.split("#")[1] : currentItem}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        <div onClick={addMoreSearchSelector}>
                            <Link className="btn-sm text-violet border cursor" style={{ border: "1px solid #872FF7" }}>+</Link>
                        </div>
                        {/* <div onClick={handleDeletQuerySearch}> */}
                        <div onClick={handleDeleteSearchSelector}>
                            <Link className="btn-sm cursor">
                                <svg
                                    data-name="Layer 41"
                                    id="Layer_41"
                                    viewBox="0 0 50 50"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title />
                                    <path className="cls-1"
                                        d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                                    />
                                    <path className="cls-1"
                                        d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                                    />
                                    <path className="cls-1"
                                        d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="px-3">
                    <Link className="btn bg-primary text-white cursor" onClick={handleSearchItems}
                    // onClick={props.compoFlag === "bundleSearch" ? handleBundleSearch : handleQuerySearchClick}
                    > <SearchIcon /><span className="ml-1">Search</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PortfolioCoverageSearch
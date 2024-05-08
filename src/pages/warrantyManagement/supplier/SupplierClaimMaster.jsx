import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import $ from "jquery";
import SelectFilter from "react-select";
import { Link } from "react-router-dom";

import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import SearchComponent from "pages/components/SearchComponent";
import { getVendors } from "services/searchServices";
import SupplierClaimDetailsModal from "./SupplierClaimDetailsModal";
import SupplierQuoteModal from "./SupplierQuoteModal";
import { supplierVendorSearchOptions } from "../warrantyManagementConstants";
import SupplierQuoteProcessModal from "./SupplierQuoteProcessModal";

const SupplierClaimMaster = () => {
    const [querySearchSelector, setQuerySearchSelector] = useState([
        {
            id: 0,
            selectCategory: "",
            selectOperator: "",
            inputSearch: "",
            selectOptions: [],
            selectedOption: "",
        },
    ]);

    const [showSupplierDtls, setShowSupplierDtls] = useState(false);
    const [openQuoteModal, setOpenQuoteModal] = useState(false);

    // Snack Bar State
    const [severity, setSeverity] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const handleSnackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnack(false);
    };

    const handleSnack = (snackSeverity, snackMessage) => {
        setSnackMessage(snackMessage);
        setSeverity(snackSeverity);
        setOpenSnack(true);
    };

    //  handle AND || OR operator
    const handleOperator = (e, id) => {
        let tempArray = [...querySearchSelector];
        let obj = tempArray[id];
        obj.selectOperator = e;
        tempArray[id] = obj;
        setQuerySearchSelector([...tempArray]);
    };

    // select search vendor
    const handleSelectVendorCategory = (e, id) => {
        let tempArray = [...querySearchSelector];
        let obj = tempArray[id];
        obj.selectCategory = e;
        obj.inputSearch = "";
        tempArray[id] = obj;
        setQuerySearchSelector([...tempArray]);
        setShowSupplierDtls(false);
    };

    // evendor quipment input search
    const handleInputSearch = (e, id) => {
        let tempArray = [...querySearchSelector];
        let obj = tempArray[id];
        let searchString =
            tempArray[id].selectCategory.value + "~" + e.target.value;
        if (tempArray[id].selectCategory.value && e.target.value) {
            getVendors(searchString)
                .then((res) => {
                    obj.selectOptions = res;
                    tempArray[id] = obj;
                    setQuerySearchSelector([...tempArray]);
                    $(`.scrollbar-${id}`).css("display", "block");
                })
                .catch((err) => {
                    handleSnack(
                        "error",
                        "Error occurred while searching spare parts!"
                    );
                });
        } else {
            handleSnack("info", "Please fill search criteria!");
            obj.selectOptions = [];
        }
        obj.inputSearch = e.target.value;
    };

    // vendor input search list click
    const handleSearchListClick = (e, currentItem, obj1, id) => {
        let tempArray = [...querySearchSelector];
        let obj = tempArray[id];
        obj.inputSearch = currentItem[obj.selectCategory.value];
        obj.selectedOption = currentItem;
        tempArray[id] = obj;
        setQuerySearchSelector([...tempArray]);
        $(`.scrollbar-${id}`).css("display", "none");
    };

    // delete vendor search query list
    const handleDeleteQuerySearch = () => {
        setQuerySearchSelector([
            {
                id: 0,
                selectCategory: "",
                selectOperator: "",
                inputSearch: "",
                selectOptions: [],
                selectedOption: "",
            },
        ]);
    };

    const handleQuerySearchClick = async () => {
        $(".scrollbar").css("display", "none");
        var searchStr = "";
        querySearchSelector.map(function (item, i) {
            if (i === 0 && item.selectCategory.value && item.inputSearch) {
                searchStr =
                    item.selectCategory.value +
                    ":" +
                    encodeURI('"' + item.inputSearch + '"');
            } else if (
                item.selectCategory.value &&
                item.inputSearch &&
                item.selectOperator.value
            ) {
                searchStr =
                    searchStr +
                    " " +
                    item.selectOperator.value +
                    " " +
                    item.selectCategory.value +
                    ":" +
                    encodeURI('"' + item.inputSearch + '"');
            }
            return searchStr;
        });

        try {
            if (searchStr) {
                const res = await getVendors(`${searchStr}`);
                setShowSupplierDtls(true);
                // setMasterData(res);
            } else {
                handleSnack("info", "Please fill the search criteria!");
            }
        } catch (err) {
            handleSnack("error", "Error occurred while fetching spare parts!");
        }
    };

    return (
        <>
            <CustomizedSnackbar
                handleClose={handleSnackBarClose}
                open={openSnack}
                severity={severity}
                message={snackMessage}
            />
            <div className="content-body" style={{ minHeight: "884px" }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-baseline mt-3 mb-3">
                        <h5 className="font-weight-600 mb-0 ">
                            Supplier Claim
                        </h5>
                    </div>
                    <div className="bg-primary px-3 mb-3 border-radius-6">
                        <div className="row align-items-center">
                            <div className="col-12 mx-2">
                                <div className="d-flex align-items-center w-100">
                                    <div className="d-flex align-items-center bg-primary w-100">
                                        <div
                                            className="d-flex mr-3 py-3"
                                            style={{ whiteSpace: "pre" }}
                                        >
                                            <h5 className="mr-2 mb-0 text-white">
                                                <span>Search</span>
                                            </h5>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center w-100 mr-4">
                                            <div className="row align-items-center m-0">
                                                {querySearchSelector.map(
                                                    (obj, i) => (
                                                        <div
                                                            className={`customselectPortfolio d-flex align-items-center mr-3 my-2 border-radius-6`}
                                                            style={{
                                                                position:
                                                                    "relative",
                                                                zIndex: 20 - i,
                                                            }}
                                                            key={"query" + i}
                                                        >
                                                            {i > 0 && (
                                                                <SelectFilter
                                                                    isClearable={
                                                                        true
                                                                    }
                                                                    defaultValue={{
                                                                        label: "And",
                                                                        value: "AND",
                                                                    }}
                                                                    options={[
                                                                        {
                                                                            label: "And",
                                                                            value: "AND",
                                                                            id: i,
                                                                        },
                                                                        {
                                                                            label: "OR",
                                                                            value: "OR",
                                                                            id: i,
                                                                        },
                                                                    ]}
                                                                    placeholder="And/Or"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleOperator(
                                                                            e,
                                                                            i
                                                                        )
                                                                    }
                                                                    value={
                                                                        obj.selectOperator
                                                                    }
                                                                />
                                                            )}

                                                            <div>
                                                                <SelectFilter
                                                                    // isClearable={true}
                                                                    options={
                                                                        supplierVendorSearchOptions
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSelectVendorCategory(
                                                                            e,
                                                                            i
                                                                        )
                                                                    }
                                                                    value={
                                                                        obj.selectCategory
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="customselectsearch customize">
                                                                <input
                                                                    className="custom-input-sleact pr-1"
                                                                    style={{
                                                                        position:
                                                                            "relative",
                                                                    }}
                                                                    type="text"
                                                                    placeholder="Search string"
                                                                    value={
                                                                        obj.inputSearch
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleInputSearch(
                                                                            e,
                                                                            i
                                                                        )
                                                                    }
                                                                    id={
                                                                        "inputSearch-" +
                                                                        i
                                                                    }
                                                                    autoComplete="off"
                                                                />
                                                                {querySearchSelector.length -
                                                                    1 ===
                                                                    i && (
                                                                    <div
                                                                        className="btn bg-primary text-white"
                                                                        onClick={() =>
                                                                            handleQuerySearchClick()
                                                                        }
                                                                    >
                                                                        <span className="mr-2">
                                                                            <SearchIcon />
                                                                        </span>
                                                                        SEARCH
                                                                    </div>
                                                                )}
                                                                {obj.selectOptions &&
                                                                    obj
                                                                        .selectOptions
                                                                        .length >
                                                                        0 && (
                                                                        <ul
                                                                            className={`list-group customselectsearch-list scrollbar-repair-autocomplete scrollbar-${i} style`}
                                                                            id="style"
                                                                        >
                                                                            {obj.selectOptions.map(
                                                                                (
                                                                                    currentItem,
                                                                                    j
                                                                                ) => (
                                                                                    <li
                                                                                        className="list-group-item"
                                                                                        key={
                                                                                            j
                                                                                        }
                                                                                        onClick={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleSearchListClick(
                                                                                                e,
                                                                                                currentItem,
                                                                                                obj,
                                                                                                i
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {`${currentItem?.customerId} - ${currentItem?.fullName}`}
                                                                                        {/* {currentItem[obj.selectCategory.value]} */}
                                                                                    </li>
                                                                                )
                                                                            )}
                                                                        </ul>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                                <div>
                                                    <Link
                                                        to="#"
                                                        className="btn-sm text-black border mr-2"
                                                        style={{
                                                            border: "1px solid #872FF7",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "white",
                                                            }}
                                                        >
                                                            +
                                                        </span>
                                                    </Link>
                                                </div>

                                                <div
                                                    onClick={
                                                        handleDeleteQuerySearch
                                                    }
                                                >
                                                    <Link
                                                        to="#"
                                                        className="btn-sm border mr-2"
                                                    >
                                                        <i
                                                            className="fa fa-trash fa-lg"
                                                            style={{
                                                                color: "white",
                                                            }}
                                                        ></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showSupplierDtls && (
                        <>
                            <div className="card border px-2 py-2 my-2">
                                <div className="">
                                    <div className="row mt-2">
                                        <div className="col-md-7 col-sm-7 d-flex">
                                            <img
                                                src="../assets/images/imgs/11.png"
                                                alt=""
                                                width={70}
                                                height={70}
                                            />
                                            <div className="mx-2">
                                                <h3 className="mb-0">
                                                    Cherokee Steel Supply
                                                </h3>
                                                <h6>Monroe, GA</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-5 d-flex justify-content-end">
                                            {/* <PeopleAltOutlinedIcon fontSize="large" /> */}
                                            <div>
                                                <button
                                                    className="btn bg-primary text-white"
                                                    onClick={() =>
                                                        setOpenQuoteModal(true)
                                                    }
                                                >
                                                    Start a Quote{" "}
                                                    <DescriptionOutlinedIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <SupplierClaimDetailsModal show={true} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {openQuoteModal && (
                <SupplierQuoteModal
                    show={openQuoteModal}
                    hideModal={() => setOpenQuoteModal(false)}
                    handleSnack={handleSnack}
                />
            )}

            {/* <SupplierQuoteProcessModal show={true} /> */}
        </>
    );
};

export default SupplierClaimMaster;

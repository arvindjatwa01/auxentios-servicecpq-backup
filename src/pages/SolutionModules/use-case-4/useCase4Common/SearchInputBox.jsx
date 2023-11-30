import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import React from "react";
import {
  SEARCH_FLAG_COMPONENT_CODE_SEARCH,
  SEARCH_FLAG_CUSTOMER_SEARCH,
} from "../Use_Case_4_Constansts";
import InputBoxSearchLoader from "./InputBoxSearchLoader";

const SearchInputBox = ({
  handleSearch,
  disabled = false,
  searchResult = [],
  placeHolder = "Search",
  value,
  searchType,
  handleSelectSearchResult,
  noOptions = false,
  searchFlag,
  loading = false,
}) => {
  // // View Customer Seach Dropwodn List
  // const handleViewCustomerSearchList = () => {
  //   return <></>;
  // };

  // // View ComponentCode Search dropown List
  // const handleViewComponentCodeSearchDropdown = () => {
  //   return <></>;
  // };

  return (
    <div className="customselectsearch">
      <div className="form-control-search">
        <span class="fa fa-search fa-lg " />
      </div>
      <input
        type="text"
        className="form-control border-radius-10 text-primary"
        // placeholder="Search (Required)"
        placeholder={placeHolder}
        value={value}
        autoComplete="off"
        onChange={handleSearch}
        disabled={disabled}
      />
      {loading ? (
        <InputBoxSearchLoader />
      ) : (
        <>
          {searchResult.length !== 0 && (
            <ul
              className={`list-group customselectsearch-list scrollbar-repair-autocomplete`}
              id="style"
            >
              {searchResult.map((currentItem, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  onClick={(e) =>
                    handleSelectSearchResult(currentItem, searchType)
                  }
                >
                  {searchFlag === SEARCH_FLAG_CUSTOMER_SEARCH &&
                  searchType === "customerId"
                    ? currentItem[searchType] + " " + currentItem["fullName"]
                    : searchFlag === SEARCH_FLAG_COMPONENT_CODE_SEARCH &&
                      searchType === "componentCode"
                    ? currentItem.componentCode
                    : currentItem[searchType]}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {!loading &&
        !isEmpty(value) &&
        searchResult.length === 0 &&
        noOptions && (
          <span style={{ color: "red", fontSize: 12, height: 2 }}>
            No Options Found!
          </span>
        )}
    </div>
  );
};

export default SearchInputBox;

import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import React from "react";

const SearchInputBox = ({
  handleSearch,
  disabled = false,
  searchResult = [],
  placeHolder = "Search",
  value,
  searchType,
  handleSelectSearchResult,
  noOptions = false,
}) => {
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
      {searchResult.length !== 0 && (
        <ul
          className={`list-group customselectsearch-list scrollbar-repair-autocomplete`}
          id="style"
        >
          {searchResult.map((currentItem, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={(e) => handleSelectSearchResult(currentItem, searchType)}
            >
              {searchType === "customerId"
                ? currentItem[searchType] + " " + currentItem["fullName"]
                : currentItem[searchType]}
            </li>
          ))}
        </ul>
      )}
      {!isEmpty(value) && searchResult.length === 0 && noOptions && (
        <span style={{ color: "red", fontSize: 12, height: 2 }}>
          No Options Found!
        </span>
      )}
    </div>
  );
};

export default SearchInputBox;

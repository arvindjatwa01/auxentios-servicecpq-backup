import { useState } from "react";
import { Link } from "react-router-dom";
import SelectFilter from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import $ from "jquery";

const SearchComponentTemplate = (props) => {
  const [count, setCount] = useState(1);
  const iconColor = props.color;

  const handleDeleteQuerySearch = () => {
    // props.setQuerySearchSelector([]);
    // setCount(0);
    if (count > 1) {
      props.querySearchSelector.pop();
      props.setQuerySearchSelector(props.querySearchSelector);
      setCount(props.querySearchSelector.length);
      props.clearFilteredData();
    } else {
      // Just reset the search criteria when only one element is present
      props.setQuerySearchSelector([
        {
          id: count,
          selectOperator: "",
          selectType: "",
          selectCategory: "",
          inputSearch: "",
          selectOptions: [],
          selectedOption: "",
        },
      ]);
    }
  };
  const handleSearchCategory = (e, id) => {
    let tempArray = [...props.querySearchSelector];
    console.log("handleSearchCategory e:", e);
    let obj = tempArray[id];
    obj.selectCategory = e;
    obj.inputSearch = "";
    tempArray[id] = obj;
    console.log(obj.selectCategory);
    props.setQuerySearchSelector([...tempArray]);
  };

  const handleSearchType = (e, id) => {
    let tempArray = [...props.querySearchSelector];
    console.log("handleSearchType e:", e);
    let obj = tempArray[id];
    obj.selectType = e;
    // obj.inputSearch = "";
    tempArray[id] = obj;
    console.log(obj.selectType);
    props.setQuerySearchSelector([...tempArray]);
  };
  const handleOperator = (e, id) => {
    let tempArray = [...props.querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    props.setQuerySearchSelector([...tempArray]);
  };
  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...props.querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem[obj.selectCategory.value];
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    props.setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };
  const addSearchQuerryHtml = () => {
    if (
      count === 0 ||
      (count === 1 &&
        props.querySearchSelector[0].inputSearch &&
        props.querySearchSelector[0].selectCategory) ||
      (props.querySearchSelector[count - 1].inputSearch &&
        props.querySearchSelector[count - 1].selectCategory &&
        props.querySearchSelector[count - 1].selectOperator)
    ) {
      props.setQuerySearchSelector([
        ...props.querySearchSelector,
        {
          id: count,
          selectOperator: "",
          selectCategory: "",
          inputSearch: "",
          selectOptions: [],
          selectedOption: "",
        },
      ]);
      setCount(count + 1);
    } else {
      props.handleSnack("info", "Please fill current search criteria");
    }
  };
  const handleInputSearch = (e, id) => {
    let tempArray = [...props.querySearchSelector];
    let obj = tempArray[id];
    let searchString =
      tempArray[id].selectCategory.value + "~" + e.target.value;
    if (tempArray[id].selectCategory.value && e.target.value) {
      if (props.type) {
        searchString = `templateType:${tempArray[0].selectType.value} AND saved:true AND ${searchString}`;
      }
      props
        .searchAPI(searchString)
        .then((res) => {
          obj.selectOptions = res;
          tempArray[id] = obj;
          props.setQuerySearchSelector([...tempArray]);
          $(`.scrollbar-${id}`).css("display", "block");
        })
        .catch((err) => {
          props.handleSnack(
            "error",
            "Error occurred while searching templates!"
          );
        });
    } else {
      props.handleSnack("info", "Please fill search criteria!");
      obj.selectOptions = [];
    }
    obj.inputSearch = e.target.value;
  };

  return (
    <div className="d-flex justify-content-between align-items-center w-100 mr-4">
      <div className="row align-items-center m-0">
        {props.querySearchSelector.map((obj, i) => {
          return (
            <div
              className={
                props.background === "white"
                  ? `customselectPortfolio ${
                      i < props.querySearchSelector.length - 1 ? "p-2" : ""
                    } d-flex align-items-center mr-3 my-2 border-radius-6`
                  : `customselect ${
                      i < props.querySearchSelector.length - 1 ? "p-2" : ""
                    } border-white d-flex align-items-center mr-3 my-2 border-radius-6`
              }
              style={{ position: "relative", zIndex: 20 - i }}
              key={"query" + i}
            >
              {i > 0 ? (
                <SelectFilter
                  isClearable={true}
                  defaultValue={{ label: "And", value: "AND" }}
                  options={[
                    { label: "And", value: "AND", id: i },
                    { label: "OR", value: "OR", id: i },
                  ]}
                  placeholder="And/Or"
                  onChange={(e) => handleOperator(e, i)}
                  // value={querySearchOperator[i]}
                  value={obj.selectOperator}
                />
              ) : (
                <></>
              )}

              {i === 0 && (
                <div>
                  <SelectFilter
                    // isClearable={true}
                    options={props.typeOptions}
                    onChange={(e) => handleSearchType(e, i)}
                    value={obj.selectType}
                  />
                </div>
              )}
              <div>
                <SelectFilter
                  // isClearable={true}
                  options={props.options}
                  onChange={(e) => handleSearchCategory(e, i)}
                  value={obj.selectCategory}
                />
              </div>
              <div className="customselectsearch customize">
                {/* <span className="search-icon-postn">
                  <SearchIcon className="text-primary" />
                </span> */}
                <input
                  className="custom-input-sleact pr-1"
                  style={{ position: "relative" }}
                  type="text"
                  placeholder="Search string"
                  value={obj.inputSearch}
                  onChange={(e) => handleInputSearch(e, i)}
                  id={"inputSearch-" + i}
                  autoComplete="off"
                />
                {props.querySearchSelector.length - 1 === i ? (
                  <div
                    className="btn bg-primary text-white"
                    onClick={() => props.searchClick(props.type)}
                  >
                    <span className="mr-2">
                      {props.buttonText === "SEARCH" ? (
                        <SearchIcon />
                      ) : (
                        <AddIcon />
                      )}
                    </span>
                    {props.buttonText ? props.buttonText : "Add Item"}
                  </div>
                ) : (
                  <></>
                )}
                {obj.selectOptions && obj.selectOptions.length > 0 && (
                  <ul
                    className={`list-group customselectsearch-list scrollbar-repair-autocomplete scrollbar-${i} style`}
                    id="style"
                  >
                    {obj.selectOptions.map((currentItem, j) => (
                      <li
                        className="list-group-item"
                        key={j}
                        onClick={(e) =>
                          handleSearchListClick(e, currentItem, obj, i)
                        }
                      >
                        {props.type === "consumables" &&
                        obj.selectCategory.value === "consumableId"
                          ? currentItem[obj.selectCategory.value] +
                            " " +
                            currentItem["name"]
                          : props.type === "extwork" &&
                            obj.selectCategory.value === "activityId"
                          ? currentItem[obj.selectCategory.value] +
                            " " +
                            currentItem["activityDescription"]
                          : currentItem[obj.selectCategory.value]}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
        <div onClick={(e) => addSearchQuerryHtml(e)}>
          <Link
            to="#"
            className="btn-sm text-black border mr-2"
            style={{ border: "1px solid #872FF7" }}
          >
            <span style={{ color: iconColor }}>+</span>
          </Link>
        </div>

        <div onClick={handleDeleteQuerySearch}>
          <Link to="#" className="btn-sm border mr-2">
            <i class="fa fa-trash fa-lg" style={{ color: iconColor }}></i>
          </Link>
        </div>
        {/* <div onClick={props.searchClick}>
          <span
            className="btn-sm border mr-2" style={{cursor: 'pointer'}}
          >
            <SearchIcon sx={{color: iconColor? iconColor : 'grey', "&:hover": { color: "blue" }, fontSize: 17}}/>
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default SearchComponentTemplate;

import { useState } from "react";
import { Link } from "react-router-dom";
import SelectFilter from "react-select";
import { sparePartSearch } from "services/searchServices";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import $ from "jquery";

const DynamicSearchComponent = (props) => {
  const [count, setCount] = useState(1);

  const handleDeletQuerySearch = () => {
    props.setQuerySearchSelector([]);
    setCount(0);
    props.clearFilteredData();
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
    if (tempArray[id].selectCategory.value && e.target.value) {
      sparePartSearch(tempArray[id].selectCategory.value + "~" + e.target.value)
        .then((res) => {
          obj.selectOptions = res;
          tempArray[id] = obj;
          props.setQuerySearchSelector([...tempArray]);
          $(`.scrollbar-${id}`).css("display", "block");
        })
        .catch((err) => {
          props.handleSnack(
            "error",
            true,
            "Error occurred while searching spare parts!"
          );
        });      
    } else {
      props.handleSnack("info", true, "Please fill search category");
    }
    obj.inputSearch = e.target.value;
  };

  return (
    <div className="d-flex justify-content-between align-items-center w-100 ">
      <div className="row align-items-center m-0">
        {props.querySearchSelector.map((obj, i) => {
          return (
              <div
                className="customselect d-flex align-items-center mr-3 my-2"
                style={{ position: "relative", zIndex: 20 - i }}
                key={"query"+i}
              >
                {i > 0 ? (
                  <SelectFilter
                    isClearable={true}
                    defaultValue={{ label: "And", value: "AND" }}
                    options={[
                      { label: "And", value: "AND", id: i },
                      { label: "Or", value: "OR", id: i },
                    ]}
                    placeholder="&amp;"
                    onChange={(e) => handleOperator(e, i)}
                    // value={querySearchOperator[i]}
                    value={obj.selectOperator}
                  />
                ) : (
                  <></>
                )}

                <div>
                  <SelectFilter
                    // isClearable={true}
                    options={[
                      {
                        label: "Part No",
                        value: "partNumber",
                        id: i,
                      },
                      {
                        label: "Description",
                        value: "partDescription",
                        id: i,
                      },
                      { label: "Model", value: "model", id: i },
                      {
                        label: "Group No",
                        value: "groupNumber",
                        id: i,
                      },
                      {
                        label: "Bec Code",
                        value: "becCode",
                        id: i,
                      },
                      { label: "Type", value: "partType", id: i },
                    ]}
                    onChange={(e) => handleSearchCategory(e, i)}
                    value={obj.selectCategory}
                  />
                </div>
                <div className="customselectsearch">
                  <input
                    className="custom-input-sleact"
                    type="text"
                    placeholder="Search string"
                    value={obj.inputSearch}
                    onChange={(e) => handleInputSearch(e, i)}
                    id={"inputSearch-" + i}
                    autoComplete="off"
                  />

                  {obj.selectOptions && obj.selectOptions.length > 0 && (
                    <ul
                      className={`list-group customselectsearch-list scrollbar scrollbar-${i}`}
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
                          {currentItem[obj.selectCategory.value]}
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
            +
          </Link>
        </div>
        
        <div onClick={handleDeletQuerySearch}>
          <Link to="#" className="btn-sm border mr-2">
            <i class="fa fa-trash fa-lg" ></i>         
          </Link>
        </div>
        <div onClick={props.searchClick}>
          <Link
            to="#"
            className="btn-sm border mr-2"
          >
            <SearchIcon sx={{color: 'grey', "&:hover": { color: "blue" }, fontSize: 17}}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DynamicSearchComponent;

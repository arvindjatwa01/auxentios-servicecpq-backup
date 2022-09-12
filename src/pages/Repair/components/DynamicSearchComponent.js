import { useState } from "react";
import { Link } from "react-router-dom";
import SelectFilter from "react-select";
import { sparePartSearch } from "services/repairBuilderServices";
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
      props.handleSnack("info", true, "Please fill current search criteria");
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
          <Link to="#" className="btn-sm border">
            <svg
              data-name="Layer 41"
              id="Layer_41"
              fill="black"
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
            {/* <DeleteIcon className="font-size-16" /> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DynamicSearchComponent;

const SearchBox = (props) => {
  return (
    <div className="customselectsearch">
      <input
        type="search"
        className="form-control border-radius-10"
        placeholder="Search (Required)"
        value={props.value}
        autoComplete="off"
        onChange={props.onChange}
      />
      {props.result && props.result.length > 0 && (
        <ul
          className={`list-group customselectsearch-list scrollbar`}
          id="style"
        >
          {props.result.map((currentItem, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={(e) => props.onSelect(props.type, currentItem)}
            >
              {props.type === "customerId"
                ? currentItem[props.type] + " " + currentItem["fullName"]
                : currentItem[props.type]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;

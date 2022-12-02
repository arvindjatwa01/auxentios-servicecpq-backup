const SearchBox = (props) => {
  return (
    <div className="customselectsearch">
      <input
        type="search"
        className="form-control border-radius-10 text-primary"
        placeholder="Search (Required)"
        value={props.value}
        autoComplete="off"
        onChange={props.onChange}
        disabled={props.disabled}
      />
      {props.result && props.result.length > 0 && (
        <ul
          className={`list-group customselectsearch-list scrollbar-repair-autocomplete`}
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
      <span style={{color: 'red', fontSize: 12, height: 2}}>{props.noOptions ? "No Options Found!": ''}</span>
    </div>
  );
};

export default SearchBox;

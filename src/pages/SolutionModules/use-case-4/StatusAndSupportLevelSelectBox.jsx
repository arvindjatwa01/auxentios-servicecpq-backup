import React from "react";
import Select, { StylesConfig } from "react-select";

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const customStyle = {
  control: (styles) => ({
    ...styles,
  }),
  options: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      ...dot(data.color),
      color: isDisabled ? "#ccc" : isSelected ? "#ffffff" : data.color,
      borderBottom: "1px solid #e5e5e5",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? "#ffffff"
            : data.color
          : undefined,
      },
    };
  },
  //   input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  singleValue: (styles, { data }) => ({ ...styles }),
};

// const colourStyles: StylesConfig<ColourOption> = {
//   control: (styles) => ({
//     ...styles,
//   }),
//   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//     return {
//       ...styles,
//       ...dot(data.color),
//       //   backgroundColor: isDisabled ? undefined : isSelected ? data.color : undefined,
//       color: isDisabled ? "#ccc" : isSelected ? "white" : data.color,
//       borderBottom: "1px solid #e5e5e5",
//       ":active": {
//         ...styles[":active"],
//         backgroundColor: !isDisabled
//           ? isSelected
//             ? "#ffffff"
//             : data.color
//           : undefined,
//         // backgroundColor: !isDisabled ? isSelected ? data.color : "#fff": undefined,
//       },
//     };
//   },
//   //   input: (styles) => ({ ...styles, ...dot() }),
//   placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
//   // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
//   singleValue: (styles, { data }) => ({ ...styles }),
// };

const StatusAndSupportLevelSelectBox = ({
  className,
  value,
  options,
  onChange,
  handleDisabledOptions = null,
  isStatus = true,
}) => {
  const CustomOption = ({
    innerProps,
    label,
    data,
    isDisabled,
    isSelected,
    isFocused,
  }) => (
    <div {...innerProps}>
      <div
        className="d-flex align-items-center border-bottom border-secondary px-3"
        style={{
          paddingTop: "7px",
          paddingBottom: "7px",
          backgroundColor: isDisabled
            ? "#e6e6e6"
            : isFocused
            ? `${data.color}30`
            : "#ffffff",
          cusror: isDisabled ? "default" : "pointer",
          // backgroundColor: isFocused ? "#000000" : "#ffffff",
          fontSize: "0.76563rem",
          // lineHeight: 1.5,
          // borderRadius: "50px",
          // minHeight: "auto",
          // background: "#f0f9ff",
        }}
      >
        <div
          className="d-flex align-items-center px-2 py-1"
          style={{
            backgroundColor: isStatus ? `${data.color}10` : data.color,
            color: isStatus ? data.color : "#ffffff",
            borderRadius: "10px",
            width: "auto",
            cusror: isDisabled ? "default" : "pointer",
            borderColor: isFocused ? `${data.color}50` : "default",
          }}
        >
          <span
            style={{
              backgroundColor: isStatus ? data.color : "#ffffff",
              borderRadius: 10,
              content: '" "',
              display: "block",
              marginRight: 8,
              height: 10,
              width: 10,
            }}
          ></span>
          {label}
        </div>
      </div>
    </div>
  );

  return (
    <Select
      // className={className}
      onChange={onChange}
      // options={portfolioStatusKeyValuePair}
      // styles={customStyle}
      styles={{
        control: (base) => ({
          ...base,
          // width: isStatus ? "125px" : "auto", // Adjust the width as needed
          borderRadius: "50px",
          fontSize: "0.76563rem",
          minHeight: "auto",
          lineHeight: 1.5,
          background: isStatus ? "#f0f9ff" : "#DCCB4C",
          padding: "0 10px",
        }),
        options: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: isDisabled
              ? "#8c8c8c"
              : isFocused
              ? "#d3eaf2"
              : "#ffffff",
            fontSize: "0.76563rem",
          };
        },
      }}
      // menuIsOpen={true}
      options={options}
      components={{
        Option: CustomOption,
      }}
      value={value}
      isOptionDisabled={(option) => isStatus && handleDisabledOptions(option)}
    />
  );
};

export default StatusAndSupportLevelSelectBox;

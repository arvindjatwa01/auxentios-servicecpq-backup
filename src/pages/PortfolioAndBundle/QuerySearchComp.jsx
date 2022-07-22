import React from 'react'
import Select from "react-select";

const QuerySearchComp = (props) => {
  return (
    <><div className="customselect d-flex align-items-center mr-3">
      <div>
        <Select
          isClearable={true}
          options={[
            { label: "Make", value: "Make" },
            { label: "Family", value: "Family" },
            { label: "Model", value: "Model" },
            { label: "Prefix", value: "Prefix" },
          ]}
        />
      </div>
      <input
        type="text"
        placeholder="Repair Quote"
      />
    </div>
    {
      props.count>0?(<div className="customselect d-flex align-items-center mr-3">
      <Select
        isClearable={true}
        options={[
          { label: "And", value: "And" },
          { label: "Or", value: "Or" },
        ]}
        placeholder="&"
      />
    </div>):<></>
    }
      
    </>
  )
}

export default QuerySearchComp

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
export const GuidedSearchOptionsComponent = props => {
    const history = useHistory();
    const [formControlLabel, setFormControlLabel] = useState([])
    // const goTo = (path) => {
    //     history.push(path || ROOT);
    // }
    const [selectValue, setSelectValue] = useState("");

    const handleTypeChange = (e) => {
        setSelectValue(e.target.value)
        props.parentCallback(e.target.value)
    };

    useEffect(() => {
        console.log(props)
        if (props.formControlLabels.length > 0) {
            var tempFormControlLbl = [];
            if (props.withDescription) {
                props.formControlLabels.map((child) => {
                    tempFormControlLbl.push(<div className="col-md-3 customFormControlLabel">
                        <div className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart h-100">
                            <FormControlLabel
                                className="m-0"
                                value={child}
                                control={<Radio />}
                                label=""
                                labelPlacement="bottom"
                            />
                            <label className="selectlable">{child.header}</label>
                            <p className="mb-0"> {child.description}</p>
                        </div>
                    </div>)
                })
            } else {
                props.formControlLabels.map((child) => {
                    tempFormControlLbl.push(<div className="col-md-3 customFormControlLabel">
                        <FormControlLabel
                            className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart "
                            value={child}
                            control={<Radio />}
                            label={child}
                            labelPlacement="bottom"
                        />
                    </div>)
                })
            }
            setFormControlLabel(tempFormControlLbl)
        }
        setSelectValue(props.dValue)
    }, [props.dValue]);

    return (
        <RadioGroup className='my-3'
            row
            aria-labelledby="demo-form-control-label-placement"
            name="position"
            defaultValue="top"
            value={selectValue}
            onChange={handleTypeChange}
        >
            {formControlLabel}
        </RadioGroup>
    )
}

// LoaderComponent.propTypes = {
//     title: PropTypes.string.isRequired
// }

// export RadioGroupComponent

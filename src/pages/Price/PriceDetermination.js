import React,{useEffect, useState} from "react";
import Select from 'react-select';
import DeleteIcon from '@mui/icons-material/Delete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import { MuiMenuComponent } from "pages/Operational";
import { CommanComponents } from "components";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
function PriceDetermination(){
  const [dValue,setDValue] = useState(null)
  const handleChangeSelect = (e) => {
    setDValue(e)
  }

  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
  ];
    return(
      <>
       <CommanComponents/>
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid mt-3">
   
           <div className="d-flex align-items-center justify-content-between mt-2">
          <h5 className="font-weight-600 mb-0">Price determination</h5>
          <div className="d-flex justify-content-center align-items-center">
          <a href="#" className="ml-3 font-size-14" title="Share"><img src={shareIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14" title="Items to review"><img src={folderaddIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14" title="Upload"><img src={uploadIcon}></img></a>
                            {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
                            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
           
          </div>
          </div>
          <div className=" card p-4 mt-5">
            <div>
            <FormGroup>
              <FormControlLabel className="text-black" control={<Checkbox />} label="Price determination" />
            </FormGroup>
            </div>
            <div className="row align-items-center">
              <div className="col-md-10">
                <div className="row">
              <div className="col-auto">
                   <div className="form-group">
                  <Select className="customwidth"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="if"
                  />
                </div>
               </div>
               <div className="col-auto">
              <div className="form-group">
              <div className=" d-flex itemcustominput">
              <Select className="select-inputcostom "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Item Type "
              />
               <Select className="select-inputcostom1 "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Spare Parts"
              />
               </div>
            </div>
              </div>
              <div className="col-auto">
                   <div className="form-group">
                  <Select className="customwidth"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="AND"
                  />
                </div>
               </div>
               <div className="col-auto">
              <div className="form-group">
              <div className=" d-flex itemcustominput">
              <Select className="select-inputcostom "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Item Type "
              />
               <Select className="select-inputcostom1 "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="List Price"
              />
               </div>
            </div>
              </div>
              
              </div>
              </div>
              <div className="col-md-2">
              <a href="#" className="btn-sm border"><DeleteIcon className="font-size-14 "/></a>
              </div>
              <div className="col-12">
                   <div className="form-group">
                  <Select className="customwidth"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="AND"
                  />
                </div>
               </div>
            </div>

            <div className="row align-items-center mt-4">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-12"><label class="font-size-14 " for="exampleInputEmail1">PRICE_AGREEMENT</label></div>
               <div className="col-auto">
              <div className="form-group">
              <div className=" d-flex itemcustominput">
              <Select className="select-inputcostom "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Customer "
              />
               <Select className="select-inputcostom1 "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Active"
              />
               </div>
            </div>
              </div>
              </div>
              </div>
              <div className="col-md-2">
              <a href="#" className="btn-sm border"><DeleteIcon className="font-size-14 "/></a>
              </div>
              <div className="col-12">
                   <div className="form-group">
                  <Select className="customwidth"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="OR"
                  />
                </div>
               </div>
            </div>

            <div className="row align-items-center mt-4">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-12"><label class="font-size-14 " for="exampleInputEmail1">FLAT RATE</label></div>
               <div className="col-auto">
              <div className="form-group">
              <div className=" d-flex itemcustominput">
              <Select className="select-inputcostom "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Flat Rate Indicator "
              />
               <Select className="select-inputcostom1 "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Active"
              />
               </div>
            </div>
              </div>
              <div className="col-auto">
              <div className="form-group">
              <div className=" d-flex itemcustominput">
              <Select className="select-inputcostom "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Flat Rate"
              />
               <Select className="select-inputcostom1 "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Reference Price 1"
              />
               </div>
            </div>
              </div>
              </div>
              </div>
              <div className="col-md-2">
              <a href="#" className="btn-sm border"><DeleteIcon className="font-size-14 "/></a>
              </div>
              <div className="col-12">
                   <div className="form-group">
                  <Select className="customwidth"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="Else"
                  />
                </div>
               </div>
            </div>
            <div className="row align-items-center mt-4">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-12"><label class="font-size-14 " for="exampleInputEmail1">SPECIAL PRICE RULE</label></div>
              <div className="col-auto">
              <div className="form-group">
              <div className=" d-flex itemcustominput">
              <Select className="select-inputcostom "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Parameter"
              />
               <input type="email" class="form-control rounded-top-left-0 rounded-bottom-left-0" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description"/>
               </div>
            </div>
              </div>
              <div className="col-auto">
              <div className="form-group">
              <div className=" d-flex itemcustominput">
              <Select className="select-inputcostom "
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Factor"
              />
               <input type="email" class="form-control rounded-top-left-0 rounded-bottom-left-0" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="1"/>
               </div>
            </div>
              </div>
              <div className="col-auto">
              <div className="form-group">
              <div className=" d-flex itemcustominput">
               <input type="email" class="form-control" style={{borderRadius:'10px 10px 10px 10px'}} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(1-0.20)" />
               </div>
            </div>
              </div>
              </div>
              </div>
              <div className="col-md-2">
              <a href="#" className="btn-sm border"><DeleteIcon className="font-size-14 "/></a>
              </div>
            </div>
            <div className="mt-3">
            <a href="#" className="btn alert-messges ">Add Calculation Rule<AddBoxOutlinedIcon className="font-size-16"/></a>
            </div>
            
          </div>
          <div>
            <a href="#" className="btn bg-primary text-white"> Save</a>
          </div>
        </div>
        </div>
        </>
    )
}


export default PriceDetermination
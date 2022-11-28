import React,{useEffect, useState} from "react";
import Select from 'react-select';
import DeleteIcon from '@mui/icons-material/Delete';
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
function PriceGlobalSetting(){
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
       {/* <CommanComponents/> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid mt-3">
           <div className="d-flex align-items-center justify-content-between mt-2">
          <h5 className="font-weight-600 mb-0">price global setting</h5>
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
          <div className="card p-4 mt-5">
          <div className="d-flex justify-content-between align-items-center">
          <div className="">
                <a href="#" className="btn alert-messges ">Difine item Type  <AddBoxOutlinedIcon className="font-size-16"/></a>
              </div>
              <div>
              <a href="#" className="btn-sm"><DeleteIcon className="font-size-14 text-danger"/></a>
              </div>
              </div>
          <div className="row mt-3">
          <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <div className=" d-flex">
              <Select className="select-input"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Item Type "
              />
               <input type="email" class="form-control rounded-top-left-0 rounded-bottom-left-0" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description od item Type"/>
               </div>
            </div>
              </div>

          </div>    

          </div>
          <div className="card p-4 mt-5">
          <div className="d-flex justify-content-between align-items-center">
          <div className="">
                <a href="#" className="btn alert-messges ">Define Price Methods<AddBoxOutlinedIcon className="font-size-16"/></a>
              </div>
              <div>
              <a href="#" className="btn-sm"><DeleteIcon className="font-size-14 text-danger"/></a>
              </div>
              </div>
          <div className="row mt-3">
          <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <div className=" d-flex">
              <Select className="select-input"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Price Methods "
              />
               <input type="email" class="form-control rounded-top-left-0 rounded-bottom-left-0" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description of price method"/>
               </div>
            </div>
              </div>

          </div>    

          </div>
          <div className="card p-4 mt-5">
          <div className="d-flex justify-content-between align-items-center">
          <div className=" ml-3 pl-2">
                <a href="#" className="btn alert-messges ">Assign Price Method To item Type  <AddBoxOutlinedIcon className="font-size-16"/></a>
              </div>
            
              </div>
              <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center mt-3">
              <div className="search-icon mr-2" style={{ lineHeight: '24px' }}>
                <img src={searchstatusIcon}></img>
              </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light-dark border-radius-10">
                <div className="d-flex align-items-center">
              <span className="mr-3">Repair Bulider</span>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Spare Parts</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Repair Quote"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                    <Select
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="&"
                      />
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Labor</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Cost Plus"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                    <Select
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="&"
                      />
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Consumables</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Flat rate"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div>
                  <a href="#" className="btn-sm text-violet border" style={{border:'1px solid #872FF7'}}>+</a>
                </div>
              </div>
                </div>
                
              </div>
              <div>
              <a href="#" className="btn-sm"><DeleteIcon className="font-size-14 text-danger"/></a>
              </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center mt-3">
              <div className="search-icon mr-2" style={{ lineHeight: '24px' }}>
                <img src={searchstatusIcon}></img>
              </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light-dark border-radius-10">
                <div className="d-flex align-items-center">
              <span className="mr-3">Repair Bulider</span>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Spare Parts</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Repair Quote"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                    <Select
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="&"
                      />
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Labor</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Cost Plus"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                    <Select
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="&"
                      />
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Consumables</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Flat rate"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div>
                  <a href="#" className="btn-sm text-violet border" style={{border:'1px solid #872FF7'}}>+</a>
                </div>
              </div>
                </div>
                
              </div>
              <div>
              <a href="#" className="btn-sm"><DeleteIcon className="font-size-14 text-danger"/></a>
              </div>
              </div>
           <div className=" text-right">
             <a href="#" className="btn text-white bg-primary mr-3">Review</a>
             <a href="#" className="btn border">Cancel</a>
           </div>
          </div>
        </div>
        </div>
        </>
    )
}


export default PriceGlobalSetting
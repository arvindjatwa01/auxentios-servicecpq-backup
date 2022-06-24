import React from "react";
// import logoIcon from '../assets/icons/png/logo.png'
import tataLogo from '../assets/icons/png/tata-logo.png'
import logoIcon from '../assets/icons/svg/Logo.svg'
export function HeaderLogoComponent(props) {
  return (
    <>
      <div className="nav-header">
        <div className="brand-logo">
          <a href="/">
            <b className="logo-abbr"><img src={logoIcon}></img> </b>
            <span className="logo-compact"><img src={logoIcon}></img></span>
            <span className="brand-title mr-4">
              <img style={{
                width: '65%',
                objectFit: 'cover'
              }} src={logoIcon}></img>
            </span>
            {/* <span>Tata Inc.</span> */}
          </a>
        </div>
      </div>
    </>
  );
}

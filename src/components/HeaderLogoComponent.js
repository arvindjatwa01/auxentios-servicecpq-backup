import React from "react";
import logoIcon from '../assets/icons/png/logo.png'
import tataLogo from '../assets/icons/png/tata-logo.png'

export function HeaderLogoComponent(props) {
  return (
    <>
      <div class="nav-header">
        <div class="brand-logo">
          <a href="index.html">
            <b class="logo-abbr"><img src={tataLogo}></img> </b>
            <span class="logo-compact"><img src={tataLogo}></img></span>
            <span class="brand-title mr-4">
              <img style={{ width: '35%' }} src={tataLogo}></img>
            </span>
            {/* <span>Tata Inc.</span> */}
          </a>
        </div>
      </div>
    </>
  );
}

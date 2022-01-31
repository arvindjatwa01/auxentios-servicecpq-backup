import React from "react";
import logoIcon from '../assets/icons/png/logo.png'

export function HeaderLogoComponent(props) {
  return (
    <>
      <div class="nav-header">
        <div class="brand-logo">
          <a href="index.html">
            <b class="logo-abbr"><img src={logoIcon}></img> </b>
            <span class="logo-compact"><img src={logoIcon}></img></span>
            <span class="brand-title mr-4">
              <img src={logoIcon}></img>
            </span>
            <span>Auxentios</span>
          </a>
        </div>
      </div>
    </>
  );
}

import React from "react";
import logoIcon from '../assets/icons/png/logo.png'
import { HeaderLogoComponent, HeaderComponent, SubHeaderLogoComponent, SubHeaderComponent, SideBarComponent } from "./index"

export function CommanComponents(props) {
    return (
        <>
            <HeaderLogoComponent />
            <SubHeaderLogoComponent />
            <HeaderComponent />
            <SubHeaderComponent />
            <SideBarComponent />
        </>
    );
}

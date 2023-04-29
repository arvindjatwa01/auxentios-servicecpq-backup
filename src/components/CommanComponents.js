import React, { useEffect } from "react";
import { HeaderLogoComponent, HeaderComponent, SubHeaderLogoComponent, SubHeaderComponent, SideBarComponent } from "./index"
export function CommanComponents(props) {

    return (
        <>
            <HeaderLogoComponent />
            {/* <SubHeaderLogoComponent /> */}
            <HeaderComponent />
            <SubHeaderComponent />
            <SideBarComponent />
        </>
    );
}

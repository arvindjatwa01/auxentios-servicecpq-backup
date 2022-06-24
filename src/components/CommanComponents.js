import React, { useEffect } from "react";
import { HeaderLogoComponent, HeaderComponent, SubHeaderLogoComponent, SubHeaderComponent, SideBarComponent } from "./index"
import { updateUser } from "../redux/actions/index"
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from "redux"
import { actionCreator } from "../redux/index"
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

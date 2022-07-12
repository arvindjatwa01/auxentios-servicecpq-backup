import type {StrategyTask} from "../../../models";

export const priceDropDownList:Array<StrategyTask>=[
    {value:1, key:"Construction-Heavy"},
    {value:2, key:"Construction-Low"},
    {value:3, key:"Construction-Medium"},
    {value:4, key:"Construction"},
]
export const unitDropDownList:Array<StrategyTask>=[
    {value:1, key:"Hr"},
    {value:2, key:"Km"},
    {value:3, key:"Miles"},
    {value:4, key:"Year"},
    {value:5, key:"Month"},
    {value:6, key:"Day"},
    {value:7, key:"Quarter"},
]

export const frequencyDropDownList:Array<StrategyTask>=[
    {value:1, key:"Cyclic"},
    {value:2, key:"Alternate"},
    {value:3, key:"Once"},
    {value:4, key:"Custom"},
]
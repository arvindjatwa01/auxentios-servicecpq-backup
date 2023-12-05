import { isEmpty } from "./textUtilities";

// convert time into format time according to readable
export const getFormatDateTime = (timeStamp, withTime) => {
  if (isEmpty(timeStamp)) {
    return "";
  }
  var date = new Date(timeStamp);
  var year = date.getFullYear(); // get year 
  var m = date.getMonth(); // get Month [0-11]// [Jan-Dec]
  var month = m;
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); // current day
  var format = "AM"; // time format AM/PM
  var hour = date.getHours(); // get hours
  var minutes = date.getMinutes(); // get minutes
  var monthName = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]; // Month Name

  if (hour > 11) { format = "PM"; } // hours is greater to 11 then PM else AM

  if (hour > 12) {
    hour = hour - 12; // if hour is greater to 12 then return hour in readable formate
  } else if (hour === 0) { hour = 12; }

  if (hour < 10) { hour = "0" + hour; } // hour is lesser to 10 then concat with 0

  if (minutes < 10) { minutes = "0" + minutes; } // minutes is lesser to 10 then concat with 0
  if (withTime) {
    var finalDateString = hour + ":" + minutes + "" + format + ", " + day + " " + monthName[month] + " " + year;
  } else {
    if(month < 10){ month = `0` + (month+1)}
    var finalDateString = year + "-" + month + "-" + day;
  }
  return finalDateString;
}
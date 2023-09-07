export const convertTimestampToFormateDate = (timeStamp) => {
  var date = new Date(timeStamp);
  var year = date.getFullYear();
  // var m = date.getMonth() + 1;
  var m = date.getMonth();
  // var month = m < 10 ? '0' + m : m;
  var month = m;
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var format = "AM";
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var monthName = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (hour > 11) {
    format = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
  } else if (hour === 0) {
    hour = 12;
  }

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  var finalDateString = year + "-" + month + "-" + day;
  return finalDateString;
}

// times- in-human readable with date-time
export const getFormattedDateTime = (timeStamp) => {
  var date = new Date(timeStamp);
  var year = date.getFullYear();
  var m = date.getMonth();
  var month = m;
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var format = "AM";
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var monthName = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (hour > 11) { format = "PM"; }

  if (hour > 12) {
    hour = hour - 12;
  } else if (hour === 0) { hour = 12; }

  if (hour < 10) { hour = "0" + hour; }

  if (minutes < 10) { minutes = "0" + minutes; }

  var finalDateString = hour + ":" + minutes + "" + format + ", " + day + " " + monthName[month] + " " + year;
  return finalDateString;
}
import React from "react";
import peopleIcon from '../assets/icons/svg/people.svg'
import repeateIcon from '../assets/icons/svg/repeate-music.svg'

export function SubHeaderComponent(props) {
  return (
    <>
      <div class="headerbottom">
        <div class="header-content clearfix">
          <div className="row h-100">
            <div className="col-6 h-100">
              <ul>
                <li>Date:21-Jul-2021</li>
                <li>Time:06:55pm</li>
                <li>User ID:1269JG80</li>

              </ul>
            </div>
            <div className="col-6 h-100">
              <ul className="    justify-content-end">
                <li><img src={repeateIcon}></img></li>
                <li><img src={peopleIcon}></img></li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

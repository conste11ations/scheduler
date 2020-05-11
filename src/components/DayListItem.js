import React from "react";

import "components/DayListItem.scss";
import classNames from 'classnames/bind';

export default function DayListItem(props) {
  console.log(props);

  let dayClass = classNames('day-list__item',
    { 'day-list__item--selected': props.selected },
    { 'day-list__item--full': !props.spots }
  );

  function formatSpots(spot) {
    return `${spot === 0 ? 'no' : spot} spot${spot === 1 ? '': 's'} remaining`;
  }

  return (
    <li className={classNames(dayClass)} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
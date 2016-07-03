import React from 'react';
import Time from '../classes/Time'
import classNames from 'classnames';

export default class Hour extends React.Component
{
  constructor(props) {
    super(props);

    this.minutes = [];

    Time.eachMin((key, min) => {
      this.minutes.push(
        <div
          key={min}
          className={classNames('tlMinView', 'tl' + (min + 15))}
          style={{height: this.props.minHeight + 'px'}}
        >&nbsp;</div>
      );
    }, 15)
  }

  render(){
    return (
      <div className="tlHourView">{this.minutes}</div>
    );
  }
}

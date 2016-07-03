import React from 'react';
import TimeSpan from '../classes/TimeSpan';

export default class Ruler extends React.Component
{
  constructor(props) {
    super(props);
    this.hours = [];

    this.props.timeSpan.eachTime((key, time) => {
      const style = {
        //border1pxを足す
        height: (this.props.minHeight + 1) * 4
      }
      this.hours.push(
        <div key={time.getHour()} style={style}>{time.getDisplayHour()}</div>
      );
    });
  }

  render(){
    return (
      <div className="tlRulerView" style={{width: Ruler.width + 'px'}}>{this.hours}</div>
    );
  }
}

Ruler.width = 30;

import React from 'react';
import Hour from './Hour';
import Ruler from './Ruler';
import classNames from 'classnames';

export default class Line extends React.Component
{
  constructor(props) {
    super(props);
    this.hours = [];
    this.props.timeSpan.eachTime((key, time) => {
      this.hours.push(
        <Hour
          key={time.getHour()}
          time={time}
          minHeight={this.props.minHeight}
        />
      );
    });

    this.props.lineComponents.push(this);

    this.state = {
      draggingOver: false
    }
  }

  getRelativeTop(e){
    return e.clientY - e.currentTarget.parentNode.offsetTop + e.currentTarget.parentNode.scrollTop;
  }

  onClick(e){
    if(this.props.lineDidClick){
      const clickedTop = this.getRelativeTop(e);
      this.props.lineDidClick({
        lineId: this.props.id,
        time: this.props.topToTime(clickedTop),
        top: clickedTop
      });
    }
  }

  onContextMenu(e){
    // if(this.props.timeline.props.lineDidRightClick){
    //   this.props.timeline.props.lineDidRightClick({
    //     component: this
    //   });
    // }
  }

  draggingOver(){
    this.setState({draggingOver: true});
  }

  clearDraggingOver(){
    this.setState({draggingOver: false});
  }

  render(){
    return (
      <div onClick={e => this.onClick(e)} onContextMenu={e => this.onContextMenu(e)}>
        {(() => {
          if(this.props.hasRuler){
            return (
              <Ruler
                key={'ruler_' + this.props.id}
                minHeight={this.props.minHeight}
                timeSpan={this.props.timeSpan}
              />
            )
          }
        })()}
        <div className={classNames('tlLineView', {tlEven: this.props.even, tlOdd: !this.props.even}, {tlOver: this.state.draggingOver})} style={{width: this.props.width + 'px'}}>
          {this.hours}
        </div>
      </div>
    );
  }
}

Line.sidePadding = 1;

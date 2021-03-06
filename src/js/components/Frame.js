import {Component} from 'react';
import { DragDropContext } from 'react-dnd';
import DndBackend from 'react-dnd-touch-backend';
import { DropTarget } from 'react-dnd';
import LineLabel from './LineLabel';
import Line from './Line';
import Ruler from './Ruler';
import Event from './Event';
import TimeSpan from '../classes/TimeSpan'
import EventPreview from './EventPreview';

let draggingOverLineComponent;

const target = {
  drop(props, monitor, component) {
    const event = monitor.getItem();
    props.actions.setOffsetToEvent(event.id, monitor.getDifferenceFromInitialOffset());
    props.actions.clearEventOffset(event.id);
  },
  hover(props, monitor, component){
    const clientOffset = monitor.getSourceClientOffset();
    if(clientOffset){
      const event = monitor.getItem();
      const lineWrapperBounds = component.refs.linesWrapper.getBoundingClientRect();

      //ドラッグ中のLINEを識別
      const lineComponent = component.getLineWithLeft(clientOffset.x - lineWrapperBounds.left + (event.width / 2));/*eventの真ん中を基準にする*/
      if(lineComponent && draggingOverLineComponent !== lineComponent){
        lineComponent.draggingOver();
        if(draggingOverLineComponent){
          draggingOverLineComponent.clearDraggingOver();
        }
        draggingOverLineComponent = lineComponent;
      }

      //タイムインジケーターを出す。
      const eventTop = clientOffset.y + component.refs.linesWrapper.scrollTop - lineWrapperBounds.top;
      const time = event.util.topToTime(eventTop);
      props.actions.displayTimeToEvent(event.id, time);
      // const eventComponent = props.timeline.findEventById(monitor.getItem().id);
      // const lineWrapperBounds = props.timeline.frameComponent.refs.linesWrapper.getBoundingClientRect();
      // const lineComponent = props.timeline.draggingOver(clientOffset.x - lineWrapperBounds.left + (eventComponent.props.width / 2/*eventの真ん中を基準にする*/));
      // const time = props.timeline.topToTime(clientOffset.y + props.timeline.frameComponent.refs.linesWrapper.scrollTop - lineWrapperBounds.top);
      // eventComponent.dragging(time, lineComponent.props.lineId);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class Frame extends Component
{
  constructor(props, context) {
    super(props, context);
    //linesWrapperのminWidth。ウィンドウの幅が全てのタイムラインの幅より小さくなるとフロートが崩れるので。
    this.minWidth = 0;

    //MinViewは一時間下に余分が生成されるので60分プラス
    this.timeSpan = this.props.timeSpan.addMin(60);

    //minViewがいくつあるかカウント。minViewは15分おき。それを元に高さを計算。border分1px足す
    this.lineHeight = (this.timeSpan.getDistance() / 15) * (this.props.minHeight + 1);

    //1分あたりの高さを算出しておく
    this.perMinHeight = this.lineHeight / this.timeSpan.getDistance();

    this.util = {
      timeToTop: time => this.timeSpan.getStartTime().getDistance(time) * this.perMinHeight - 1,
      timeSpanToHeight: timeSpan => (timeSpan.getDistance() * this.perMinHeight) - 1,
      getLineLeft: lineId => {
        let left = 0;

        for (var i = 0; i < this.props.lines.length; i++) {
          var line = this.props.lines[i];
          const hasRuler = i % this.props.rulerInterval === 0;
          if(hasRuler){
            left += Ruler.width;
          }

          if(line.id == lineId){
            break;
          }

          left += this.props.lineWidth;
        }

        left += Line.sidePadding;

        return left;
      },
      topToTime: top => {
        if(top <= 0){
          return this.timeSpan.getStartTime();
        }
        let minute = top / this.perMinHeight;
        const rest = minute % this.props.minInterval;
        if(rest !== 0){
          if(rest > this.props.minInterval / 2){
            minute += this.props.minInterval - rest;
          } else {
            minute -= rest;
          }
        }
        return this.timeSpan.getStartTime().addMin(minute);
      }
    }

    this.lineComponents = [];
    this.lines = [];
    this.labels = [];
    this.props.lines.forEach((data, index, array) => {
      this.createLineComponent(data, index, array);
    })
  }

  getLineWithLeft(left){
    var width = 0;
    const line = this.lineComponents.find(line => {
      width += line.props.hasRuler ? this.props.lineWidth + Ruler.width : this.props.lineWidth;
      if(left < width){
        return line;
      }
    });
    if(line){
      return line;
    }

    return false;
  }

  createLineComponent(data, index, array){
    const hasRuler = this.lines.length % this.props.rulerInterval === 0;
    const prevRuler = (this.lines.length + 1) % this.props.rulerInterval === 0;
    this.labels.push(
      <LineLabel
        key={data.id}
        width={this.props.lineWidth}
        hasRuler={hasRuler}
        prevRuler={prevRuler}
        label={data.label}
        isLast={index === array.length - 1}
      />
    );

    this.lines.push(
      <Line
        hasRuler={hasRuler}
        key={data.id}
        id={data.id}
        width={this.props.lineWidth}
        minHeight={this.props.minHeight}
        timeSpan={this.props.timeSpan}
        even={this.lines.length % 2 === 0}
        lineDidClick={this.props.lineDidClick}
        topToTime={top => {
          if(top <= 0){
            return this.timeSpan.getStartTime();
          }
          let minute = top / this.perMinHeight;
          const rest = minute % this.props.minInterval;
          if(rest !== 0){
            if(rest > this.props.minInterval / 2){
              minute += this.props.minInterval - rest;
            } else {
              minute -= rest;
            }
          }
          return this.timeSpan.getStartTime().addMin(minute);
        }}
        lineComponents={this.lineComponents}
      />
    );

    this.minWidth += this.props.lineWidth;
    if(hasRuler){
      this.minWidth += Ruler.width;
    }
  }

  render(){
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="tlFrameView" style={{minWidth: this.minWidth}}>
        <div className="tlLabelView" style={{height: LineLabel.height}}>{this.labels}</div>
        <div ref="linesWrapper" className="tlLinesWrapper" style={{height: this.props.windowHeight - LineLabel.height}}>
          {this.lines}
          {this.props.events.map(event => {
            return (
              <Event
                key={event.id}
                id={event.id}
                color={event.color}
                timeSpan={event.timeSpan}
                display={event.display}
                lineId={event.lineId}
                width={this.props.lineWidth - 2 - (Line.sidePadding * 2)}
                vars={event.vars}
                draggable={event.draggable}
                moveTo={event.moveTo}
                util={this.util}
                eventDidClick={this.props.eventDidClick}
                draggingDisplay={event.draggingDisplay}
              />
            )
          })}
          {this.props.children}
        </div>
        <EventPreview />
      </div>
    );
  }
}

Frame.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    lineId: React.PropTypes.string.isRequired,
    timeSpan: React.PropTypes.instanceOf(TimeSpan).isRequired,
    color: React.PropTypes.string.isRequired
  })).isRequired,
}

export default DragDropContext(DndBackend({ enableMouseEvents: true }))(DropTarget("Event", target, collect)(Frame))

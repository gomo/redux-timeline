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

const target = {
  drop(props, monitor, component) {
    const event = monitor.getItem();
    props.actions.setOffsetToEvent(event.id, monitor.getDifferenceFromInitialOffset());
    props.actions.clearEventOffset(event.id);
  },
  hover(props, monitor, component){
    const clientOffset = monitor.getSourceClientOffset();
    // if(clientOffset){
    //   const eventComponent = props.timeline.findEventById(monitor.getItem().id);
    //   const lineWrapperBounds = props.timeline.frameComponent.refs.linesWrapper.getBoundingClientRect();
    //   const lineComponent = props.timeline.draggingOver(clientOffset.x - lineWrapperBounds.left + (eventComponent.props.width / 2/*eventの真ん中を基準にする*/));
    //   const time = props.timeline.topToTime(clientOffset.y + props.timeline.frameComponent.refs.linesWrapper.scrollTop - lineWrapperBounds.top);
    //   eventComponent.dragging(time, lineComponent.props.lineId);
    // }
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

    this.lines = [];
    this.labels = [];
    this.props.lines.forEach((data, index, array) => {
      this.createLineComponent(data, index, array);
    })
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
        lineId={data.id}
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
      />
    );

    this.minWidth += this.props.lineWidth;
    if(hasRuler){
      this.minWidth += Ruler.width;
    }
  }

  getLineLeft(lineId){
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
                timeSpanToHeight={timeSpan => (timeSpan.getDistance() * this.perMinHeight) - 1}
                timeToTop={time => this.timeSpan.getStartTime().getDistance(time) * this.perMinHeight - 1}
                getLineLeft={lineId => this.getLineLeft(lineId)}
                eventDidClick={this.props.eventDidClick}
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

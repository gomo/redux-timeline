import {Component} from 'react';
import { DragDropContext } from 'react-dnd';
import DndBackend from 'react-dnd-touch-backend';
import { DropTarget } from 'react-dnd';
import LineLabel from './LineLabel';
import Line from './Line';
import Ruler from './Ruler';

const target = {
  drop(props, monitor, component) {

  },
  hover(props, monitor, component){

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

    this.lines = [];
    this.labels = [];
    this.props.lines.forEach((data, index, array) => {
      this.createLineComponent(data, index, array);
    })

    this.state = {
      events: this.props.events
    }
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
          {this.state.events.map(event => {
            return (
              <Event
                key={event.id}
                id={event.id}
                color={event.color}
                timeSpan={event.timeSpan}
                display={event.display}
                lineId={event.lineId}
                timeline={this.props.timeline}
                width={this.props.timeline.props.lineWidth - 2 - (Line.sidePadding * 2)}
                vars={event.vars}
              />
            )
          })}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default DragDropContext(DndBackend({ enableMouseEvents: true }))(DropTarget("Event", target, collect)(Frame));

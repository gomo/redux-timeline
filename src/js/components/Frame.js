import {Component} from 'react';
import { DragDropContext } from 'react-dnd';
import DndBackend from 'react-dnd-touch-backend';
import { DropTarget } from 'react-dnd';
import LineLabel from './LineLabel';
import Line from './Line';

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

    const lines = [];
    const labels = [];
    this.props.lines.forEach(data => {
      this.createLineComponent(data, lines, labels);
    })

    this.state = {
      lines: lines,
      labels: labels,
      events: this.props.events,
      minWidth: 0
    }
  }

  createLineComponent(data, lines, labels){
    const hasRuler = lines.length % this.props.rulerInterval === 0;
    const prevRuler = (lines.length + 1) % this.props.rulerInterval === 0;

    labels.push(
      <LineLabel
        key={data.id}
        width={this.props.lineWidth}
        hasRuler={hasRuler}
        prevRuler={prevRuler}
        label={data.label}
        timeline={this.props.timeline}
      />
    );

    lines.push(
      <Line
        hasRuler={hasRuler}
        label={data.l}
        key={data.id}
        lineId={data.id}
        width={this.props.lineWidth}
        minHeight={this.props.minHeight}
        timeSpan={this.props.timeSpan}
        even={lines.length % 2 === 0}
        timeline={this.props.timeline}
      />
    );
  }

  render(){
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="tlFrameView" style={{minWidth: this.state.minWidth}}>
        <div className="tlLabelView" style={{height: LineLabel.height}}>{this.state.labels}</div>
        <div ref="linesWrapper" className="tlLinesWrapper" style={{height: this.props.windowHeight - LineLabel.height}}>
          {this.state.lines}
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

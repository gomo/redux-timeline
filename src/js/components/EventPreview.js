import React from 'react';
import DragLayer from 'react-dnd/lib/DragLayer';
import EventBase from './EventBase';

function collect (monitor){
  return {
    clientOffset: monitor.getSourceClientOffset(),
    item: monitor.getItem()
  }
}

class EventPreview extends React.Component {
  getItemStyles () {
    if (!this.props.clientOffset) {
      return {
        display: 'none'
      };
    }

    const x = this.props.clientOffset.x;
    const y = this.props.clientOffset.y;
    const transform = `translate(${x}px, ${y}px)`;
    return {
      position:'absolute',
      top: 0,
      left: 0,
      height: this.props.item.util.timeSpanToHeight(this.props.item.timeSpan),
      width: this.props.item.width,
      backgroundColor: this.props.item.color,
      transform: transform,
      WebkitTransform: transform
    };
  }

  render () {
    return (
      <div ref="preview" className="tlEventView tlDraggingEvent" style={this.getItemStyles()}>
        <EventBase
          draggingDisplay={this.props.item && this.props.item.draggingDisplay ? this.props.item.draggingDisplay : ''}
          display={this.props.item && this.props.item.display ? this.props.item.display : []}
        />
      </div>
    );
  }
}

export default DragLayer(collect)(EventPreview);

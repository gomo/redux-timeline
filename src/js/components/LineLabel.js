import React from 'react';
import Ruler from './Ruler';
import classNames from 'classnames';

export default class LineLabel extends React.Component
{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div
        style={{width: this.props.width, marginLeft: this.props.hasRuler ? Ruler.width + 'px' : 0}}
        className={classNames({tlLabel: true, tlHasRuler: this.props.hasRuler, tlPrevRuler: this.props.prevRuler, tlLast: this.props.isLast})}
      >
        {this.props.label}
      </div>
    );
  }
}

LineLabel.height = 16;

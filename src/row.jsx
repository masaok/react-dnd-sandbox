// var _ = require("lodash");
import React, { Component } from 'react';

var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;

var Types = {
  ROW: 'row'
};

var rowSource = {
    beginDrag: function (props) {
        return { id: props.id };
    }
};

var rowTarget = {
    hover: function (props, monitor) {
        var draggedId = monitor.getItem().id;

        if (draggedId !== props.id) {
            props.moveRow(draggedId, props.id);
        }
    }
};

var sourceCollect = function(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

var targetCollect = function(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

class Row extends Component {

  constructor(props) {
    super(props)
  }

  render() {
      var self = this;
      var opacity = this.props.isDragging ? 0 : 1;
      var connectDragSource= this.props.connectDragSource;
      var connectDropTarget = this.props.connectDropTarget;

      return connectDragSource(connectDropTarget(
          <tr style={{backgroundColor: "grey", width: "200px", opacity: opacity}}>
              <td>{self.props.id}</td>
          </tr>
      ));
  }
}

var source = DragSource(Types.ROW, rowSource, sourceCollect)(Row);
var row = DropTarget(Types.ROW, rowTarget, targetCollect)(source);

module.exports = row;

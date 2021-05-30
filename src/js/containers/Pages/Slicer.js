import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import textMarkup from 'src/jss/textMarkup.js';
import SignUpPay from 'src/js/components/SignUpPay.js';
import { connect } from 'react-redux';
import * as actions from 'src/js/actions/index.js';
import { Interface } from '@doodle3d/doodle3d-slicer'
import Dialog from 'material-ui/Dialog';
import { saveAs } from 'file-saver';
import { generateExportMesh } from '@doodle3d/doodle3d-core/lib/utils/exportUtils.js';
import { Matrix4 } from 'three';
import { isEmpty } from '@doodle3d/doodle3d-core/lib/reducer';

const styles = {
  content: {
    height: '800px',
    '@media (max-height: 950px)': {
      height: '750px',
    },
    '@media (max-height: 750px)': {
      height: '400px',
    },
    '@media (max-height: 550px)': {
      height: '200px',
    },
  }
};

class Slicer extends React.Component {
  static = {
    classes: PropTypes.objectOf(PropTypes.string),
    onClose: PropTypes.func.isRequired,
    sketchData: PropTypes.object.isRequired
  };

  componentWillMount() {
    let mesh = null;
    if (this.props.sketchData) {
      mesh = generateExportMesh(this.props.sketchData, {
        offsetSingleWalls: false,
        matrix: new Matrix4()
      });
    }
    this.setState({ mesh });
  }

  render() {
    return (
      <Dialog
        open
        contentStyle={{ maxWidth: 'none' }}
        bodyStyle={{ padding: '0px' }}
        onRequestClose={this.props.onClose}
      >
        <div className={this.props.classes.content}>
          <Interface
            onCancel={this.props.onClose}
            onSliceSucces={({ gcode }) => saveAs(gcode, 'doodle.gcode')}
            mesh={this.state.mesh}
          />
        </div>
      </Dialog>
    );
  }
}

export default connect(state => ({
  sketchData: isEmpty(state) ? null : state.sketcher.present
}), dispatch => ({
  onClose: () => dispatch(actions.router.push(`/`))
}))(injectSheet(styles)(Slicer));

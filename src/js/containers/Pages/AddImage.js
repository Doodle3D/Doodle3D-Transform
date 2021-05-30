import React from 'react';
import PropTypes from 'prop-types';
import * as actions from 'src/js/actions/index.js';
import { connect } from 'react-redux';
// import Gallery from 'doodle3d-user/components/Gallery.js';
import JSONToSketchData from '@doodle3d/doodle3d-core/lib/shape/JSONToSketchData';
import { blobToJSON } from '@doodle3d/doodle3d-core/lib/utils/binaryUtils.js';
// import createDebug from 'debug';
// const debug = createDebug('d3d:popup:addImage');
import SignUpPay from 'src/js/components/SignUpPay.js';

class AddImage extends React.Component {

  static propTypes = {
    addImage: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };
  onFileChange = (event) => {
    const { addImage, onClose } = this.props;
    const input = event.target;

    // there is a file selected?
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    addImage(file).then(onClose);
  };
  onSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    const { onOpen, onClose } = this.props;
    return (
      <SignUpPay onClose={onClose}>
        <h2>Add Image</h2>
        <form onSubmit={this.onSubmit}>
          <input type="file"
            accept="image/*"
            required
            onChange={this.onFileChange}
          />
        </form>
        <h2>Import Sketch</h2>
      </SignUpPay>
    );
  }
}
// <Gallery onOpen={onOpen} />

export default connect(null, dispatch => ({
  addImage: () => dispatch(actions.sketcher.addImage),
  onClose: () => dispatch(actions.router.push(`/`)),
  onOpen: async (doc) => {
    const { _attachments } = doc;

    const data = await JSONToSketchData(await blobToJSON(_attachments.sketch.data));
    dispatch(actions.sketcher.openSketch({ data }));
    dispatch(actions.router.push(''));
  }
}))(AddImage);

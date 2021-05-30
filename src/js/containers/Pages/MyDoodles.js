import React from 'react';
import { connect } from 'react-redux';
// import Gallery from 'doodle3d-user/components/Gallery.js';
import * as actions from 'src/js/actions/index.js';
import PropTypes from 'prop-types';
import JSONToSketchData from '@doodle3d/doodle3d-core/lib/shape/JSONToSketchData';
import { blobToJSON } from '@doodle3d/doodle3d-core/lib/utils/binaryUtils.js';
import SignUpPay from 'src/js/components/SignUpPay.js';
import Thumb from 'src/js/components/Thumb.js';
import injectSheet from 'react-jss';
import Popover from 'material-ui/Popover';
import { forceResize } from '../../utils/utils.js';
import CircularProgress from 'material-ui/CircularProgress';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Pagination from 'material-ui-pagination';

const orders = [
  { id: 'DATE', text: 'Date New-Old', type: 'updatedOn', desc: true },
  { id: 'DATE_REVERSE', text: 'Date Old-New', type: 'updatedOn', desc: false },
  { id: 'ALPHABETICAL', text: 'Alphabetical A-Z', type: 'name', desc: false },
  { id: 'ALPHABETICAL_REVERSE', text: 'Alphabetical Z-A', type: 'name', desc: true }
];

const style = {
  grid: {
    '@supports (display: grid)': {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gridColumnGap: '10px',
      gridRowGap: '15px'
    },
    '@supports not (display: grid)': {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        width: '240px'
      }
    }
  },
  content: {
    gridColumn: '1 / 3'
  }
};

class MyDoodles extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    onOpen: PropTypes.func.isRequired,
    loadGallery: PropTypes.func.isRequired,
    openFileSelector: PropTypes.func.isRequired,
    downloadAllSketches: PropTypes.func.isRequired,
    numItems: PropTypes.number.isRequired
  };

  state = {
    orderSelect: {
      open: false,
      element: null
    },
    page: 0,
    order: 'DATE'
  };


  static defaultProps = {
    numItems: 9
  };

  componentWillMount() {
    console.log("componentWillMount");

    this.updatePage();
  }

  componentDidUpdate(props, state) {
    if (this.state.page !== state.page || this.state.order !== state.order) this.updatePage();
  }

  updatePage = () => {
    const { loadGallery, numItems } = this.props;
    const { page, order } = this.state;

    const { type, desc } = orders.find(({ id }) => id === order);

    forceResize();
    loadGallery(page, numItems, type, desc);
    //.then(forceResize);
  };

  openOrderSelect = (event) => {
    event.preventDefault();
    this.setState({ orderSelect: { open: true, element: event.currentTarget } });
  };

  closeOrderSelect = () => {
    this.setState({ orderSelect: { open: false, element: null } });
  };

  changeOrder = (order) => {
    this.closeOrderSelect();
    this.setState({ order, page: 0 });
  };

  render() {
    const { classes, numItems, onClose, gallery, onOpen, downloadAllSketches, openFileSelector } = this.props;
    const { page, orderSelect } = this.state;

    const _openFileSelector = async () => {
      await openFileSelector();
      this.updatePage();
    };

    const changePage = (page) => this.setState({ page: page - 1 });

    return (
      <SignUpPay onClose={onClose}>
        <div className={classes.content}>
          <h2>My Doodles</h2>
          {gallery.ready ? <div>
          <Popover
            open={orderSelect.open}
            anchorEl={orderSelect.element}
            onRequestClose={this.closeOrderSelect}
          >
            <Menu>
              {orders.map(({ id, text }) => <MenuItem
                key={id}
                onClick={() => this.changeOrder(id)}
                primaryText={text}
              />)}
            </Menu>
          </Popover>
          {gallery.data.rows.length === 0 ?
            <div>
              <RaisedButton
                label="Import Doodles"
                onClick={_openFileSelector}
                style={{ margin: '10px 0', }}
              />
              <p>No Doodles Found</p>
            </div> : <div>
              <RaisedButton
                label="Change Order"
                onClick={this.openOrderSelect}
                style={{ margin: '10px 0' }}
              />
              <RaisedButton
                label="Import Doodles"
                onClick={_openFileSelector}
                style={{ margin: '10px 5px', }}
              />
              <RaisedButton
                label="Backup as ZIP"
                onClick={downloadAllSketches}
                style={{ margin: '10px 0' }}
              />
              <div className={classes.grid}>
                {gallery.data.rows.map(({ doc }) => <Thumb
                  key={doc._id}
                  onOpen={onOpen}
                  onDeleted={this.updatePage}
                  doc={doc}
                />)}
            </div>
            <Pagination
              styleRoot={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}
              total={Math.ceil(gallery.data.total_rows / numItems)}
              current={page + 1}
              display={10}
              onChange={changePage}
            />
          </div>}
        </div> : <CircularProgress style={{ margin: '0 auto', display: 'block' }} />}
        </div>
      </SignUpPay>
    );
  }
}

export default connect(state => ({
  gallery: state.files.gallery
}), (dispatch) => ({
  openFileSelector: () => dispatch(actions.files.openFileSelector()),
  downloadAllSketches: () => dispatch(actions.files.downloadAllSketches()),
  loadGallery: (page, numItems, type, desc) => dispatch(actions.files.loadGallery(page, numItems, type, desc)),
  onClose: () => dispatch(actions.router.push(`/`)),
  onOpen: async (doc) => {
    const { _id, name, _attachments } = doc;
    dispatch(actions.sketcher.clear());
    const data = await JSONToSketchData(await blobToJSON(_attachments.sketch.data));
    dispatch(actions.files.openFile(data, name, _id));
    dispatch(actions.router.push(''));
  }
}))(injectSheet(style)(MyDoodles));

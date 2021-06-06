import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import * as actions from '../actions/index.js';
import { connect } from 'react-redux';
import StarIcon from 'material-ui-icons/Star';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import FlagIcon from 'material-ui-icons/Flag';
import IconButton from 'material-ui/IconButton';

const styles = {
  iconsContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    margin: '-10px'
  },
  container: {
    position: 'relative',
    background: 'white',
    boxShadow: '1px 2px 5px #70767F',
    overflow: 'hidden'
  },
  button: {
    cursor: 'pointer'
  },
  img: {
    width: '100%',
    display: 'block'
  },
  footer: {
    fontFamily: 'Helvetica, arial',
    color: '#375051',
    padding: '5px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: '1rem',
    fontWeight: 'normal',
    textTransform: 'none',
    display: 'box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    boxOrient: 'vertical',
    wordWrap: 'break-word',
    maxWidth: '200px',
    lineClamp: '2'
  },
  openContextMenu: {
    cursor: 'pointer',
    padding: '15px',
    margin: '-10px -10px -10px -5px'
  },
  contextMenu: {
    zIndex: '1',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    transitionProperty: 'transform',
    transitionDuration: '0.3s',
    transform: 'translateY(100%)',
    '& li': {
      cursor: 'pointer',
      flex: 'auto',
      display: 'flex',
      listStyleType: 'none',
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'helvetica, arial',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textShadow: '1px 1px 1px #375051'
    }
  },
  open: {
    backgroundColor: '#9fcaea'
  },
  remove: {
    backgroundColor: '#e392b0'
  },
  cancel: {
    backgroundColor: '#a5c88e'
  },
  download: {
    backgroundColor: '#ebe994'
  },
  active: {
    transform: 'translateY(0)'
  },
  contextMenuContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflow: 'hidden'
  },
  likeIcon: {
    zIndex: 1
  }
};

class Thumb extends React.Component {
  static propTypes = {
    doc: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      _rev: PropTypes.string,
      data: PropTypes.string,
      name: PropTypes.string.isRequired,
      _attachments: PropTypes.objectOf(PropTypes.shape({
        data: PropTypes.oneOfType([PropTypes.instanceOf(Blob), PropTypes.string]).isRequired,
        content_type: PropTypes.sting
      })).isRequired
    }).isRequired,
    contextMenuOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onDelete: PropTypes.func.isRequired,
    onDeleted: PropTypes.func,
    onOpenContextMenu: PropTypes.func,
    onCloseContextMenu: PropTypes.func,
    showContextMenu: PropTypes.bool,
    onDownloadSketch: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    showContextMenu: true
  }

  componentWillUnmount() {
    this.props.onCloseContextMenu();
  }
  render() {
    const {
      contextMenuOpen, showContextMenu, classes, doc,
      onOpenContextMenu, onDelete, onCloseContextMenu, onDownloadSketch
    } = this.props;
    let onOpen;
    if (this.props.onOpen) onOpen = () => this.props.onOpen(doc);

    let img = doc._attachments.img.data;
    if (img instanceof Blob) img = URL.createObjectURL(doc._attachments.img.data);

    const contextMenuClassNames = [classes.contextMenu];
    if (contextMenuOpen) contextMenuClassNames.push(classes.active);

    const containerClassNames = [classes.container];
    if (onOpen) containerClassNames.push(classes.button);

    const numLikes = doc.likes ? doc.likes.length : 0;

    return (
      <div className={containerClassNames.join(' ')} onClick={onOpen}>
        {showContextMenu && <ul className={contextMenuClassNames.join(' ')}>
          {onOpen && <li onClick={onOpen} className={classes.open}><div>Open</div></li>}
          <li onClick={onDelete} className={classes.remove}><div>Delete</div></li>
          <li onClick={onDownloadSketch} className={classes.download}><div>Download</div></li>
          <li onClick={onCloseContextMenu} className={classes.cancel}><div>Cancel</div></li>
        </ul>}
        <img src={img} className={classes.img} />
        <div className={classes.footer}>
          <div>
            <p className={classes.label}>{doc.name}</p>
            {doc.author && <p>{doc.author}</p>}
          </div>
          {showContextMenu && <p className={classes.openContextMenu} onClick={onOpenContextMenu}>...</p>}
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({
  contextMenuOpen: state.files.activeContextMenu === props.doc._id
}), (dispatch, props) => ({
  onDownloadSketch: (event) => {
    if (event) event.stopPropagation();
    dispatch(actions.files.downloadSketch(props.doc));
  },
  onDelete: (event) => {
    if (event) event.stopPropagation();
    dispatch(actions.files.removeDoodle(props.doc._id)).then(() => {
      if (props.onDeleted) props.onDeleted();
      dispatch(actions.files.closeContextMenu());
    });
  },
  onCloseContextMenu: (event) => {
    if (event) event.stopPropagation();
    dispatch(actions.files.closeContextMenu());
  },
  onOpenContextMenu: (event) => {
    if (event) event.stopPropagation();
    dispatch(actions.files.openContextMenu(props.doc._id));
  }
}))(injectSheet(styles)(Thumb));

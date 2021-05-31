import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from 'src/js/actions/index.js';
import App from '@doodle3d/doodle3d-core/lib/components/App';
import injectSheet from 'react-jss';
import Popover from 'material-ui/Popover/Popover';
import btnNewUrl from 'img/menu/btnNew.png';
import btnOpenUrl from 'img/menu/btnOpen.png';
import btnSaveUrl from 'img/menu/btnSave.png';
import btnSettingsUrl from 'img/menu/btnMenu.png';
import btnNewSmallUrl from 'img/menu/btnNewSmall.png';
import btnOpenSmallUrl from 'img/menu/btnOpenSmall.png';
import btnSaveSmallUrl from 'img/menu/btnSaveSmall.png';
import btnSettingsSmallUrl from 'img/menu/btnMenuSmall.png';
import btnExportUrl from 'img/menu/btnExport.png';
import btnExportSmallUrl from 'img/menu/btnExportSmall.png';
import btnLoveUrl from 'img/menu/btnLove.png';
import btnLoveSmallUrl from 'img/menu/btnLoveSmall.png';
import btnHelpUrl from 'img/menu/btnHelp.png';
import btnHelpSmallUrl from 'img/menu/btnHelpSmall.png';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropLeft from 'material-ui/svg-icons/navigation/chevron-left';

const button = {
  cursor: 'pointer',
  margin: '0 2px'
};

const styles = {
  buttonLeft: {
    '@media (max-width: 900px)': {
      backgroundColor: 'white'
    },
    userSelect: 'none',
    position: 'absolute',
    top: '0',
    left: '0',
    display: 'flex'
  },
  new: {
    '@media (max-width: 900px)': {
      backgroundImage: `url(${btnNewSmallUrl})`,
      backgroundSize: '40px auto',
      width: '40px',
      height: '40px'
    },
    backgroundImage: `url(${btnNewUrl})`,
    backgroundSize: '72px auto',
    width: '72px',
    height: '51px',
    ...button
  },
  open: {
    '@media (max-width: 900px)': {
      backgroundImage: `url(${btnOpenSmallUrl})`,
      backgroundSize: '40px auto',
      width: '40px',
      height: '40px'
    },
    backgroundImage: `url(${btnOpenUrl})`,
    backgroundSize: '80px auto',
    width: '80px',
    height: '55px',
    marginLeft: '-3px',
    ...button
  },
  save: {
    '@media (max-width: 900px)': {
      backgroundImage: `url(${btnSaveSmallUrl})`,
      backgroundSize: '40px auto',
      width: '40px',
      height: '40px'
    },
    backgroundImage: `url(${btnSaveUrl})`,
    backgroundSize: '80px auto',
    width: '80px',
    height: '56px',
    marginLeft: '-5px',
    ...button
  },
  settings: {
    '@media (max-width: 900px)': {
      backgroundImage: `url(${btnSettingsSmallUrl})`,
      backgroundSize: '40px auto',
      width: '40px',
      height: '40px'
    },
    backgroundImage: `url(${btnSettingsUrl})`,
    backgroundSize: '77px auto',
    width: '77px',
    height: '57px',
    marginLeft: '-3px',
    ...button
  },
  love: {
    '@media (max-width: 900px)': {
      backgroundImage: `url(${btnLoveSmallUrl})`,
      backgroundSize: '40px auto',
      width: '40px',
      height: '40px'
    },
    backgroundImage: `url(${btnLoveUrl})`,
    backgroundSize: '77px auto',
    width: '77px',
    height: '57px',
    marginLeft: '-10px',
    marginTop: '-2px',
    ...button
  },
  help: {
    '@media (max-width: 900px)': {
      backgroundImage: `url(${btnHelpSmallUrl})`,
      backgroundSize: '40px auto',
      width: '40px',
      height: '40px'
    },
    backgroundImage: `url(${btnHelpUrl})`,
    backgroundSize: '77px auto',
    width: '77px',
    height: '57px',
    marginLeft: '-13px',
    ...button
  },
  export: {
    '@media (max-width: 900px)': {
      backgroundImage: `url(${btnExportSmallUrl})`,
      backgroundSize: '40px auto',
      width: '40px',
      height: '40px'
    },
    backgroundImage: `url(${btnExportUrl})`,
    backgroundSize: '60px auto',
    position: 'absolute',
    top: '0',
    right: '0',
    width: '60px',
    height: '71px',
    cursor: 'pointer'
  },
};

class AppContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.objectOf(PropTypes.string),
    downloadAllSketches: PropTypes.func.isRequired,
    downloadStl: PropTypes.func.isRequired,
    downloadObj: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    toMyDoodles: PropTypes.func.isRequired,
    toSave: PropTypes.func.isRequired,
    toSettings: PropTypes.func.isRequired,
    toDonate: PropTypes.func.isRequired,
    toSlicer: PropTypes.func.isRequired,
    toHelp: PropTypes.func.isRequired,
  };

  state = {
    popover: { open: false, element: null },
    popoverAbout: { open: false, element: null },
  }

  openPopover = (event) => {
    this.setState({
      popover: {
        element: event.currentTarget,
        open: true
      }
    });
  };
  closePopover = () => {
    this.setState({
      popover: {
        element: null,
        open: false
      },
    });
  };

  openPopoverAbout = (event) => {
    this.setState({
      popoverAbout: {
        element: event.currentTarget,
        open: true
      }
    });
  };
  closePopoverAbout = () => {
    this.setState({
      popoverAbout: {
        element: null,
        open: false
      },
    });
  };


  wrapFunction = (callback) => {
    return async () => {
      callback();
      this.closePopover();
      this.closePopoverAbout();
    };
  };

  render() {
    const {
      downloadStl, downloadObj, downloadAllSketches,
      clear, toMyDoodles, toSettings, toSave, children, classes,
      toDonate, toHelp, toSlicer
    } = this.props;

    const _downloadStl = this.wrapFunction(downloadStl);
    const _downloadObj = this.wrapFunction(downloadObj);
    const _downloadAllSketches = this.wrapFunction(downloadAllSketches);
    const _toSettings = this.wrapFunction(toSettings);
    const _toHelp = this.wrapFunction(toHelp);
    const _toDonate = this.wrapFunction(toDonate);
    const _toSlicer = this.wrapFunction(toSlicer);

    return (
      <span>
        <App />
        <div className={classes.buttonLeft}>
          <div className={classes.new} onClick={clear} />
          <div className={classes.open} onClick={toMyDoodles} />
          <div className={classes.save} onClick={toSave} />
          <div className={classes.settings} onClick={_toSettings} />
          <div className={classes.help} onClick={_toHelp} />
          <div className={classes.love} onClick={_toDonate} />
        </div>
        <div className={classes.export} onClick={this.openPopover} />
        <Popover
          open={this.state.popover.open}
          anchorEl={this.state.popover.element}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          style={{ marginTop:"50px" }}
          onRequestClose={this.closePopover}
        >
          <Menu>
            <MenuItem
              primaryText="STL"
              onClick={_downloadStl}
            />
            <MenuItem
              primaryText="OBJ"
              onClick={_downloadObj}
            />
            <MenuItem
              primaryText="GCODE"
              onClick={_toSlicer}
            />
            <MenuItem
              primaryText="Backup as ZIP"
              onClick={_downloadAllSketches}
            />
          </Menu>
        </Popover>

        <Popover
          open={this.state.popoverAbout.open}
          anchorEl={this.state.popoverAbout.element}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          style={{marginTop: "50px", marginLeft: "-20px", minWidth: "140px", }}
          onRequestClose={this.closePopoverAbout}
        >
          <Menu>
            <MenuItem primaryText="Donate" onClick={_toDonate}/>
            <MenuItem primaryText="Help"  onClick={_toHelp}/>
            <MenuItem primaryText="About" onClick={_toSettings}/>
          </Menu>
        </Popover>
        {children}
      </span>
    );
  }
}

export default connect(state => ({ }), {
  toMyDoodles: () => actions.router.push('/my-doodles'),
  toSave: () => actions.router.push('/save'),
  toDonate: () => actions.router.push('/donate'),
  toHelp: () => actions.router.push('/help'),
  toSettings: () => actions.router.push('/settings'),
  toSlicer: () => actions.router.push('/slicer'),
  clear: actions.sketcher.clear,
  downloadStl: actions.downloadStl,
  downloadObj: actions.downloadObj,
  downloadAllSketches: actions.files.downloadAllSketches
})(injectSheet(styles)(AppContainer));

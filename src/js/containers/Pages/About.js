import React from 'react';
import PropTypes from 'prop-types';
import * as actions from 'src/js/actions/index.js';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { VERSION } from '@doodle3d/doodle3d-core/lib/constants/general.js';
import injectSheet from 'react-jss';
import textMarkup from 'src/jss/textMarkup.js';
import SignUpPay from 'src/js/components/SignUpPay.js';
import Dialog from 'material-ui/Dialog';
import iconDoodle3D from 'img/apple-touch-icon-144x144-precomposed.png';
import imgScreenshot from 'img/screenshot.png';

// import createDebug from 'debug';
// const debug = createDebug('d3d:popup:about');

const styles = {
  ...textMarkup,
  content: {
    gridColumn: '1 / 3'
  },
  header: {
    '& h2, & p': {
      lineHeight: '1.25em',
      margin: '0'
    }
  },
  floatRight: {
    float: "right",
    marginLeft: "20px"
  }
};

class About extends React.Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes, onClose } = this.props;

    return (
      <SignUpPay medium onClose={onClose}>
        <div className={`${classes.text} ${classes.content}`}>
          <div className={classes.header}>
            <h2><b>Doodle3D Transform</b> <small>v{VERSION}</small></h2>
          </div>
          <img src={iconDoodle3D} className={classes.floatRight} />
          <p>Doodle3D Transform is a free and open-source web-app that makes designing in 3D easy and fun!
          Created between 2015-2017 with love by Casper, Peter, Jeroen, Simon, Saskia, Arne, Donna, Nico and Rick. With the support of 1,626 Kickstarter backers.</p>
          <p>As of 2021-05-26 Doodle3D Transform is distributed as open source under the MIT License. This gives everyone the freedoms to use Doodle3D Transform in any context: commercial or non-commercial, public or private, open or closed source.</p>
          <p>
            <Link to={'/releasenotes'}>Release Notes</Link> | &nbsp; 
            <Link to={'/licenses'}>Licenses</Link> | &nbsp; 
            <Link to={'/help'}>Help</Link> | &nbsp; 
            <Link to={'/donate'}>Donate</Link> | &nbsp; 
            <a target='_blank' href='https://twitter.com/doodle3d_app'>Twitter</a> | &nbsp; 
            <a target='_blank' href='https://github.com/doodle3d/'>Github</a> 
          </p>
        </div>
      </SignUpPay>
    );
  }
}

export default connect(state => ({ }), dispatch => ({
  onClose: () => dispatch(actions.router.push(`/`)),
}))(injectSheet(styles)(About));

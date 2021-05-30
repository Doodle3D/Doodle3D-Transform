import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  line: {
    display: 'block',
    borderColor: 'rgb(189, 189, 189)',
    marginLeft: '-6px',
    borderTopStyle: 'solid',
    borderTopWidth: '1px'
  }
};

const Line = ({ classes }) => <span className={classes.line} />;
Line.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Line);

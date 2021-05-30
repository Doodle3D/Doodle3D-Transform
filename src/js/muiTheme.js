// import { grey100, cyan500, red50, darkBlack, white } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import { fade } from 'material-ui/utils/colorManipulator';

const muiTheme = getMuiTheme({
  raisedButton: {
    primaryColor: '#358ed7',
    primaryTextColor: '#ffffff',
    textTransform: 'none',
    fontWeight: 'bold'
  },
  flatButton: {
    textTransform: 'none',
    fontWeight: 'bold'
  }
});

export default muiTheme;

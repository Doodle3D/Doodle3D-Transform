import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

export default connect(({ notifications }) => ({ notifications }))(Notifications);

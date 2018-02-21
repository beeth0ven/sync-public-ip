import moment from 'moment';

const formatNow = () => moment().format('YYYY-MM-DD, h:mm:ss a');

export { formatNow };
import PropTypes from 'prop-types';
import './Receipt.css';

const Receipt = ({ children, explanation }) => {
  return (
    <div className="receipt-style">
      <h1 className='app-name'>PayDay</h1>
      <p className='explanation' style={{ visibility: explanation ? 'visible' : 'hidden' }}>
        {explanation || ' '}
      </p>
      <hr />
      {children}
    </div>
  );
};

Receipt.propTypes = {
    children: PropTypes.node,
    explanation: PropTypes.string,
};

export default Receipt;



import { Paper, Typography } from '@mui/material';
import './NodeRed.css';
const NodeRed = () => {
  const env = process.env.REACT_APP_NODERED_ENV;

  return (
    <>
      <div className='iframeClass'>
     <iframe
          title='node-red'
          className='iframeClass'
          src='http://127.0.0.1:1880'
          
        />
     </div>
    </>
  );
};

export default NodeRed;

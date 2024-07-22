import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrReaderComponent = (props) => {
  const [data, setData] = useState('No result');
  const [errorMessage, setErrorMessage] = useState('');
  const [scanned, setScanned] = useState(false);

  const handleResult = (result, error) => {
    if (scanned) return; // If already scanned, do nothing

    if (!!result) {
      setData(result?.text);
      setErrorMessage('');
      setScanned(true); // Stop scanning after a successful result
    }

    if (!!error) {
      console.error('QR Reader Error:', error);
      setData('No result');
      setErrorMessage('Error reading QR code');
    }
  };

  return (
    <div>
      {!scanned && (
        <QrReader
          onResult={handleResult}
          style={{ width: '100%' }}
        />
      )}
      <p>{data}</p>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default QrReaderComponent;

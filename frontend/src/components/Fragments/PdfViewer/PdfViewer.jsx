import React from 'react';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

const PdfViewer = ({ url }) => {
  const newPlugin = defaultLayoutPlugin();
  return <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>{url && <Viewer fileUrl={url} plugins={[newPlugin]} />}</Worker>;
};

export default PdfViewer;

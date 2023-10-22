import React from 'react';
import { Document, Page } from 'react-pdf';

function FileViewer({ fileData }) {
    const fileName = extractFileName(fileData);

    console.log('File Name:', fileName);

    function extractFileName(dataURI) {
        if (typeof dataURI !== 'string') {
            return 'file.pdf'; // Provide a default filename
        }

        // Extract the filename from the data URI
        const match = dataURI.match(/data:application\/\w+;filename=([^;]*)/);
        if (match && match[1]) {
            return match[1];
        } else {
            return 'file.pdf'; // Provide a default filename
        }
    }

    if (fileName.endsWith('.pdf')) {
        return (
            <div>
                <h2>File Name: {fileName}</h2>
                <Document file={`data:application/pdf;base64,${fileData}`}>
                    <Page pageNumber={1} />
                </Document>
            </div>
        );
    } else {
        return (
            <div>
                <h2>File Name: {fileName}</h2>
                <a href={`data:application/octet-stream;base64,${fileData}`} download={fileName}>
                    Download File
                </a>
            </div>
        );
    }
}

export default FileViewer;
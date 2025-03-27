export const printToPDF = (saveAsPDF = false) => {
  try {
    const cvElement = document.getElementById('cv-viewer');
    if (!cvElement) {
      throw new Error('CV element not found');
    }
    
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      @page {
        size: A4 portrait;
        margin: 0;
      }
      
      @media print {
        html, body {
          width: 210mm;
          height: 297mm;
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        body * {
          visibility: hidden;
        }
        
        #cv-viewer, #cv-viewer * {
          visibility: visible;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        #cv-viewer {
          position: fixed;
          left: 0;
          top: 0;
          width: 210mm;
          height: 297mm;
          margin: 0;
          padding: 0;
          overflow: hidden;
          page-break-after: avoid;
          page-break-inside: avoid;
          box-sizing: border-box;
          box-shadow: none;
          background-color: white !important;
        }
        
        #cv-viewer > div {
          width: 210mm;
          height: 297mm;
          margin: 0;
          padding: 0;
        }
        
        #cv-viewer .flex.h-full {
          transform: none !important;
          width: 100% !important;
          height: 100% !important;
          display: flex !important;
          flex-direction: row !important;
        }
        
        /* Ensure sidebar and main content maintain their proportions */
        #cv-viewer .flex.h-full > aside {
          width: 30% !important;
          min-width: 30% !important;
          max-width: 30% !important;
          height: 100% !important;
          overflow: hidden !important;
          background-color: #0891b2 !important; /* bg-cyan-700 */
          color: white !important;
        }
        
        #cv-viewer .flex.h-full > main {
          width: 70% !important;
          min-width: 70% !important;
          max-width: 70% !important;
          height: 100% !important;
          overflow: hidden !important;
          background-color: white !important;
        }
        
        /* Force background colors for specific elements */
        #cv-viewer .bg-cyan-700 {
          background-color: #0891b2 !important;
        }
        
        #cv-viewer .bg-cyan-800 {
          background-color: #0369a1 !important;
        }
        
        #cv-viewer .text-cyan-700 {
          color: #0891b2 !important;
        }
        
        /* Adjust font sizes if needed */
        #cv-viewer h1 { font-size: 18pt !important; }
        #cv-viewer h2 { font-size: 14pt !important; }
        #cv-viewer p, #cv-viewer li { font-size: 10pt !important; }
      }
    `;
    document.head.appendChild(style);
    
    if (saveAsPDF) {
      if (window.navigator && window.navigator.printing && window.navigator.printing.printPDF) {
        const printOptions = {
          destination: 'save-as-pdf',
          filename: 'CV.pdf',
          showPrintDialog: false,
        };
        window.navigator.printing.printPDF(printOptions);
      } else {
        window.print();
      }
    } else {
      window.print();
    }
    
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1000);
    
    return true;
  } catch (error) {
    console.error('Error printing to PDF:', error);
    throw error;
  }
};

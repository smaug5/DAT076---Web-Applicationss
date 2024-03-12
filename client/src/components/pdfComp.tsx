import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfComp(props: any) {
const [numPages, setNumPages] = useState<number>();
const [pageNumber, setPageNumber] = useState(1);

function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
}

  return (
    <div className="pdf-div">
           <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
          })}
      </Document>
   
    </div>
  );
}
export default PdfComp;
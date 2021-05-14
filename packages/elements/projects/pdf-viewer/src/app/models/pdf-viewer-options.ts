export interface DraymanPdfViewer {
    /**
     * URL of the PDF.
     */
    src: string;
    /**
     * Shows a single page if specified. 
     * Otherwise all pages will be shown.
     */
    page?: number;
}

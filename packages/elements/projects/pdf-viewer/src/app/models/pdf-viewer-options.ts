/**
 * # <drayman-pdf-viewer \/>
 * 
 * PDF viewer powered by [ng2-pdf-viewer](https://github.com/VadimDez/ng2-pdf-viewer) library.
 *
 * ## Example of usage
 * 
 * ### PDF viewer displaying all pages
 *
 * ![](media://drayman-pdf-viewer-scroll.gif)
 *
 * ```typescript
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 *     return () => (
 *         <div style={{ height: '100%' }}>
 *             <drayman-pdf-viewer
 *                 src="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
 *             />
 *         </div>
 *     );
 * }
 * ```
 * 
 * ### PDF viewer displaying each page separately
 * 
 * ![](media://drayman-pdf-viewer-paginated.gif)
 * 
 * ```typescript
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 *     let page = 1;
 *     const pageCount = 3;
 * 
 *     const wrapperStyle: CSS = {
 *         display: 'flex',
 *         flexDirection: 'column',
 *         height: '100%'
 *     }
 * 
 *     const onPageChange = async (step) => {
 *         if (page + step >= 1 && page + step <= pageCount) {
 *             page += step;
 *             await forceUpdate();
 *         }
 *     }
 * 
 *     return () => {
 *         const prevPageBtn = {
 *             disabled: page === 1,
 *             onClick: onPageChange.bind(this, -1),
 *         }
 * 
 *         const nextPageBtn = {
 *             disabled: page === pageCount,
 *             onClick: onPageChange.bind(this, 1),
 *         }
 * 
 *         return (
 *             <div style={wrapperStyle}>
 *                 <div style={{ display: 'flex' }}>
 *                     <button {...prevPageBtn}>Previous page</button>
 *                     <button {...nextPageBtn}>Next page</button>
 *                 </div>
 *                 <drayman-pdf-viewer
 *                     src="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
 *                     page={page}
 *                 />
 *             </div>
 *         );
 *     };
 * }
 * ```
 */
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

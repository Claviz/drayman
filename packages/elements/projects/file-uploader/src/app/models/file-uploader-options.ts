/**
 * # <drayman-file-uploader \/>
 * 
 * File uploader powered by [FilePond](https://pqina.nl/filepond/) library.
 *
 * ## Example of usage
 *
 * ![](media://drayman-file-uploader.gif)
 *
 * ```typescript
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 *     let file;
 * 
 *     return () => (
 *         <div>
 *             <drayman-file-uploader
 *                 onUpload={async (_, [uploadedFile]) => {
 *                     file = uploadedFile;
 *                     await forceUpdate();
 *                     return '123';
 *                 }}
 *             />
 *             {file && <img src={`data:${file.mimetype};base64,${file.buffer.toString('base64')}`} style={{ width: '200px;' }} />}
 *         </div>
 *     )
 * }
 * ```
 */
export interface DraymanFileUploader {
    /**
     * Array of files to show when uploader element appears.
     */
    initialFiles?: {
        /**
         * Unique file ID.
         */
        id: string;
        /**
         * Size of the file in bytes.
         */
        length: number;
        /**
         * Name of the uploaded file.
         */
        fileName: string;
        /**
         * URL that starts a download of this file.
         */
        downloadUrl: string;
    }[];
    /**
     * Wether multiple file upload is allowed or not.
     */
    allowMultiple?: boolean;
    /**
     * Executed when file is uploaded.
     * This function contains uploaded file as the first element of files array and must return a unique file ID.
     * This unique ID is then can be used to revert uploads.
     */
    onUpload?: (data: undefined, files: File[]) => Promise<string>;
    /**
     * Executed when user wants to remove a file.
     * Receives unique file ID `fileId`.
     * This function is usually used to remove a specific file from file system.
     */
    onRemoveUploaded?: (data: { fileId: string }) => Promise<string>;
}

interface File {
    /** Name of the form field associated with this file. */
    fieldname: string;
    /** Name of the file on the uploader's computer. */
    originalname: string;
    /**
     * Value of the `Content-Transfer-Encoding` header for this file.
     */
    encoding: string;
    /** Value of the `Content-Type` header for this file. */
    mimetype: string;
    /** Size of the file in bytes. */
    size: number;
    /** A Buffer containing the entire file. */
    buffer: any;
}
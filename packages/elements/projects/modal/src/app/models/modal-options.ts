export interface DraymanModal {
    /**
     * Executed when modal is requested to be closed by clicking on backdrop or pressing ESC.
     */
    onRequestClose?: ElementEvent<{}>;
    /**
     * Height of modal.
     * By default `80vh`.
     */
    height?: string;
    /**
     * Width of modal.
     * By default `50vw`.
     */
    width?: string;
}
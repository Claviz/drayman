export interface InputMaskOptionsBase {
    /**
     * Input mask options.
     */
    mask?: {
        /**
         * Expression that constrains user input.
         * If it exists, autocomplete suggestions will not work.
         * You can check available `mask` options here - https://jsdaddy.github.io/ngx-mask-page.
         */
        expression?: string;
        /**
         * Prefix for the input.
         */
        prefix?: string;
        /**
         * Suffix for the input.
         */
        suffix?: string;
        /**
         * Should value be emitted with charaters added by mask.
         */
        emitSpecialCharacters?: boolean;
        /**
         * If mask is shown while typing, or not.
         */
        showMaskTyped?: boolean;
        /**
         * If mask is `separator`, defines which character will separate thousands.
         */
        thousandSeparator?: string;
        /**
         * If the `leadZeroDateTime` parameter is `true`, skipped symbols of date or time will be replaced by 0.
         */
        leadZeroDateTime?: boolean;
        /**
         * If mask will allow the use of negative numbers.
         */
        allowNegativeNumbers?: boolean;
    }
}
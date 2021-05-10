import { ButtonOptionsBase } from './button-options-base';

/**
 * # <drayman-button \/>
 * Button powered by [Angular Material](https://material.angular.io/) library.
 *
 * ## Example of usage
 * 
 * ![](media://drayman-button.gif)
 *
 * ```typescript
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 *     let counter = 0;
 * 
 *     return () => {
 * 
 *         return (
 *             <div>
 *                 <drayman-button
 *                     label="Click me"
 *                     onClick={async () => {
 *                         counter++;
 *                         await forceUpdate();
 *                     }}
 *                 />
 *                 <p>Button was clicked {counter} times</p>
 *             </div>
 *         );
 *     }
 * }
 * ```
 */
export interface DraymanButton extends ButtonOptionsBase {
    /**
     * Executed when user clicks a button.
     */
    onClick?: () => Promise<void>;
}
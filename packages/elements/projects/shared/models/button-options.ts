import { ButtonOptionsBase } from './button-options-base';

export interface DraymanButton extends ButtonOptionsBase {
    /**
     * Executed when user clicks a button.
     */
    onClick?: ElementEvent<{}>;
}
import { ButtonOptionsBase } from '../../../../shared/models/button-options-base';

export interface DraymanMenu extends ButtonOptionsBase {
    /**
     * Menu item list.
     */
    items: DraymanMenuItem[];
    /**
     * Executed when user clicks a menu item.
     */
    onItemClick?: ({ item: DraymanMenuItem }) => Promise<void>;
}

export interface DraymanMenuItem {
    /**
     * Item label.
     */
    label?: string;
    /**
     * Icon displayed before label text.
     */
    icon?: string;
    /**
     * Whether item disabled or not.
     */
    disabled?: boolean;
    /**
     * Menu item list.
     */
    items?: DraymanMenuItem[];
}

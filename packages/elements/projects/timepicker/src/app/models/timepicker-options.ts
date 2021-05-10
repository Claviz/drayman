import { InputFieldOptionsBase } from '../../../../shared/models/input-field-options-base';

/**
 * # <drayman-timepicker \/>
 * 
 * Timepicker powered by [ngx-material-timepicker](https://github.com/Agranom/ngx-material-timepicker) library.
 *
 * ## Example of usage
 * 
 * ![](media://drayman-timepicker.gif)
 * 
 * ```typescript
 * import customParseFormat = require('dayjs/plugin/customParseFormat');
 * import dayjs from 'dayjs';
 * dayjs.extend(customParseFormat);
 * 
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 * 
 *     const time: { start?: string; end?: string } = {};
 *     let timeLeft: { hours: number; minutes: number };
 * 
 *     const onTimeChange = async (timeType: 'start' | 'end', { value }) => {
 *         time[timeType] = value;
 *         if (time.start && time.end) {
 *             const start = dayjs(time.start, 'HH:mm');
 *             const end = dayjs(time.end, 'HH:mm');
 *             timeLeft = { hours: end.diff(start, 'hours'), minutes: end.diff(start, 'minutes') % 60 };
 *             await forceUpdate();
 *         }
 *     }
 * 
 *     const wrapperStyle: CSS = {
 *         display: 'grid',
 *         gridAutoFlow: 'column',
 *     }
 * 
 *     return () => {
 *         return <div>
 *             <div style={wrapperStyle}>
 *                 <drayman-timepicker
 *                     label="Start time"
 *                     onValueChange={onTimeChange.bind(this, 'start')}
 *                     value={time.start}
 *                 />
 *                 <drayman-timepicker
 *                     label="End time"
 *                     onValueChange={onTimeChange.bind(this, 'end')}
 *                     showNowButton
 *                     value={time.end}
 *                 />
 *             </div>
 *             {timeLeft && <p>Time left: {timeLeft.hours} hours and {timeLeft.minutes} minutes.</p>}
 *         </div>;
 *     }
 * }
 * ```
 */
export interface DraymanTimepicker extends InputFieldOptionsBase<string> {
    /**
     * Wether to show now button or not.
     */
    showNowButton?: boolean;
}

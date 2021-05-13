import { DraymanCheckbox } from '../dist/types/checkbox/src/app/models/checkbox-options';
import { DraymanClavizCharts } from '../dist/types/claviz-charts/src/app/models/claviz-charts-options';
import { DraymanDatepicker } from '../dist/types/datepicker/src/app/models/datepicker-options';
import { DraymanFileUploader } from '../dist/types/file-uploader/src/app/models/file-uploader-options';
import { DraymanMenu } from '../dist/types/menu/src/app/models/menu-options';
import { DraymanNgxCharts } from '../dist/types/ngx-charts/src/app/models/ngx-charts-options';
import { DraymanNgxGraph } from '../dist/types/ngx-graph/src/app/models/ngx-graph-options';
import { DraymanNumberField } from '../dist/types/number-field/src/app/models/number-field-options';
import { DraymanPdfViewer } from '../dist/types/pdf-viewer/src/app/models/pdf-viewer-options';
import { DraymanRadioGroup } from '../dist/types/radio-group/src/app/models/radio-group-options';
import { DraymanSelect } from '../dist/types/select/src/app/models/select-options';
import { DraymanButton } from '../dist/types/shared/models/button-options';
import { DraymanTable } from '../dist/types/table/src/app/models/table-options';
import { DraymanTextField } from '../dist/types/text-field/src/app/models/text-field-options';
import { DraymanTextareaField } from '../dist/types/textarea-field/src/app/models/textarea-field-options';
import { DraymanTimepicker } from '../dist/types/timepicker/src/app/models/timepicker-options';
import { DraymanYoutubePlayer } from '../dist/types/youtube-player/src/app/models/youtube-player-options';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'drayman-button': DraymanButton & DefaultProps;
            'drayman-menu': DraymanMenu & DefaultProps;
            'drayman-checkbox': DraymanCheckbox & DefaultProps;
            'drayman-claviz-charts': DraymanClavizCharts & DefaultProps;
            'drayman-datepicker': DraymanDatepicker & DefaultProps;
            'drayman-file-uploader': DraymanFileUploader & DefaultProps;
            'drayman-ngx-charts': DraymanNgxCharts & DefaultProps;
            'drayman-ngx-graph': DraymanNgxGraph & DefaultProps;
            'drayman-number-field': DraymanNumberField & DefaultProps;
            'drayman-pdf-viewer': DraymanPdfViewer & DefaultProps;
            'drayman-radio-group': DraymanRadioGroup & DefaultProps;
            'drayman-select': DraymanSelect & DefaultProps;
            'drayman-table': DraymanTable & DefaultProps;
            'drayman-text-field': DraymanTextField & DefaultProps;
            'drayman-textarea-field': DraymanTextareaField & DefaultProps;
            'drayman-timepicker': DraymanTimepicker & DefaultProps;
            'drayman-youtube-player': DraymanYoutubePlayer & DefaultProps;
        }
    }
}

export { };
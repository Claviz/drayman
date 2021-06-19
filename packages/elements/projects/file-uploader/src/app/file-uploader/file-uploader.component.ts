import { Component, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FilePondOptions } from 'filepond';

import { DraymanFileUploader } from '../models/file-uploader-options';

@Component({
  selector: 'drayman-file-uploader-internal',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnChanges {

  @ViewChild('myPond', { static: false }) myPond: any;
  @Input() onUpload?: (data: undefined, files: File[]) => Promise<string>;
  @Input() onRemoveUploaded?: (data: { fileId: string }) => Promise<string>;
  @Input() allowMultiple?: boolean;
  @Input() initialFiles: {
    id: string;
    length: number;
    fileName: string;
    downloadUrl: string;
  }[] = [];

  pondOptions = {
    instantUpload: true,
    allowDownloadByUrl: true,
    server: {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        this.onUpload(null, [{ fieldName, file, fileName: file.name }] as any)
          .then(x => load(x))
          .catch(x => error(x));
        return {
          abort: () => {
            abort();
          }
        };
      },
      revert: (fileId, load, error) => {
        this.onRemoveUploaded({ fileId }).then(x => load()).catch(x => error(x));
      },
    }
  } as FilePondOptions;

  pondInit() {
    for (const x of this.initialFiles) {
      this.myPond.addFile(x.id, {
        type: 'limbo',
        file: {
          name: x.fileName,
          size: x.length,
        },
        metadata: {
          url: x.downloadUrl,
        }
      })
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pondOptions = {
      ...this.pondOptions,
      allowMultiple: !!this.allowMultiple,
    }
  }
}

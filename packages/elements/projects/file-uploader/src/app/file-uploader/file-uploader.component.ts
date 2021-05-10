import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FilePondOptions } from 'filepond';

import { DraymanFileUploader } from '../models/file-uploader-options';

@Component({
  selector: 'drayman-file-uploader-internal',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnChanges {

  @ViewChild('myPond', { static: false }) myPond: any;
  @Input() options: DraymanFileUploader;

  pondOptions = {
    instantUpload: true,
    allowDownloadByUrl: true,
    server: {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        this.options.onUpload(null, [{ fieldName, file, fileName: file.name }] as any)
          .then(x => load(x))
          .catch(x => error(x));
        return {
          abort: () => {
            abort();
          }
        };
      },
      revert: (fileId, load, error) => {
        this.options.onRemoveUploaded({ fileId }).then(x => load()).catch(x => error(x));
      },
    }
  } as FilePondOptions;

  pondInit() {
    for (const x of this.options?.initialFiles) {
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
      allowMultiple: this.options.allowMultiple,
    }
  }
}

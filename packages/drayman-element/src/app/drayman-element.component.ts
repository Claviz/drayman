import { ChangeDetectorRef, Component, Inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { applyPatch } from 'fast-json-patch';
import isHotkey from 'is-hotkey';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { DraymanModalComponent } from './modal/drayman-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { IConnectionService } from './interfaces/connection-service';

@Component({
  selector: 'app-drayman-element',
  templateUrl: './drayman-element.component.html',
  styleUrls: ['./drayman-element.component.scss'],
})
export class DraymanElementComponent implements OnChanges, OnInit, OnDestroy {
  @Input() component?: string;
  @Input() options: any;
  @Input() config?: { connection: IConnectionService, elementUrl: string };

  componentInstanceId: any;
  view = {};
  previouslySerializedTree = [];
  viewTree: any[] = [];
  messages$?: Subscription;

  constructor(
    // private draymanService: DraymanService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard,
    @Optional() private dialogRef: MatDialogRef<DraymanModalComponent>,
    private ref: ChangeDetectorRef,
    private ngZone: NgZone,
    // @Inject('DRAYMAN_CUSTOM_ELEMENT_URL') public elementUrl: string,
  ) {
    console.log({ dialogRef });
    // console.log(`ref socket`, this.draymanService.socket);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && !changes.options.firstChange) {
      console.log(this.component, this.options);
      this.config?.connection.updateComponentInstanceProps({ componentInstanceId: this.componentInstanceId, options: this.options });
    }
  }

  trackByFn(index: number, item: any) {
    return item.key;
  }

  ngOnDestroy() {
    this.config?.connection.destroyComponentInstance({ componentInstanceId: this.componentInstanceId });
    if (this.messages$) {
      this.messages$.unsubscribe();
    }
  }

  traverseTree(tree: any) {
    for (let item of tree) {
      const elementOptions = item.options;
      if (elementOptions) {
        for (const eventName of Object.keys(elementOptions)) {
          if (isEvent(eventName)) {
            elementOptions[eventName] = this.emit.bind(this, `${item.key}/${eventName}`);
          }
        }
      }
      this.traverseTree(item.children);
    }
  }

  async ngOnInit() {
    while (!this.config) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.componentInstanceId = await this.config?.connection.initializeComponent({ componentId: this.component, componentOptions: this.options, location: { href: window.location.href } });
    this.config?.connection.onEvent(this.componentInstanceId, ({ type, payload }) => {
      this.ngZone.run(() => {
        // const message = event.message;
        // if (event.type === 'componentInstanceMessage') {
        // console.log({ message });
        // if (message.componentInstanceId === this.componentInstanceId) {
        if (type === 'closeModal') {
          if (this.dialogRef) {
            const { data } = payload;
            this.dialogRef.close(data);
          }
        } else if (type === 'view') {
          applyPatch(this.previouslySerializedTree, (payload.view || []));
          const tree = JSON.parse(JSON.stringify(this.previouslySerializedTree));
          this.traverseTree(tree);
          this.viewTree = tree;
          console.log({ tree });
          this.ref.detectChanges();
        }
        // }
        // } else if (event.type === 'browserEventMessage') {
        else if (type === 'openModal') {
          const { component, options, onCloseCallbackId } = payload;
          const dialog = this.dialog.open(DraymanModalComponent, {
            data: {
              component,
              options,
              config: this.config,
            }
          });
          dialog.afterClosed().subscribe((data) => {
            if (onCloseCallbackId) {
              this.config?.connection.handleBrowserCallback({ callbackId: onCloseCallbackId, data });
            }
          });
        } else if (type === 'openWindow') {
          const { windowName, url, windowFeatures } = payload;
          window.open(url, windowName, windowFeatures);
        } else if (type === 'copyToClipboard') {
          const { text } = payload;
          this.clipboard.copy(text);
          this.snackBar.open(`Copied to clipboard!`, undefined, { duration: 2500 });
        } else if (type === 'openSnackBar') {
          let { options, message: snackBarMessage, onCloseCallbackId } = payload;
          let { duration, horizontalPosition, verticalPosition, action } = options || {};
          const snackbar = this.snackBar.open(snackBarMessage, action, { duration, horizontalPosition, verticalPosition });
          if (onCloseCallbackId) {
            snackbar.afterDismissed().subscribe((data) => {
              this.config?.connection.handleBrowserCallback({ callbackId: onCloseCallbackId, data: { dismissedByAction: data.dismissedByAction } });
            })
          }
        } else if (type === 'navigate') {
          const { path } = payload;
          this.config?.connection.navigate(path);
        }
        // }
      });
    });
  }

  emit = async (eventName: string, options = {}, files: any[] = []) => {
    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('componentInstanceId', this.componentInstanceId);
    formData.append('options', JSON.stringify(options));
    for (let file of files) {
      formData.append(file.fieldName, file.file, file.fileName);
    }
    return await this.config?.connection.postFormData(formData);
  }

  onShortcut($event: KeyboardEvent, element: any) {
    for (const attr of Object.keys(element.options)) {
      if (attr.startsWith('onShortcut')) {
        const shortcutSplit = attr.split(':');
        if (shortcutSplit.length === 2) {
          const shortcut = shortcutSplit[1];
          if (isHotkey(shortcut, $event)) {
            $event.preventDefault();
            element.options[attr]();
          }
        }
      }
    }
  }

  isHtmlElement(name: string) {
    return name === name.toLowerCase() && !name.includes('-');
  }
}

const isEvent = (optionName: string) => optionName?.length > 2 && optionName.slice(0, 2) === 'on' && optionName[2] === optionName[2].toUpperCase();

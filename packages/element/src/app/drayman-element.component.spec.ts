jest.mock('fast-json-patch');
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { AppModule } from './app.module';
import { DraymanElementComponent } from './drayman-element.component';
import { DraymanModalComponent } from './modal/drayman-modal.component';
import { applyPatch } from 'fast-json-patch';
import { Subject } from 'rxjs';

describe('DraymanElementComponent', () => {

  let spectator: Spectator<DraymanElementComponent>;
  const createComponent = createComponentFactory({
    component: DraymanElementComponent,
    imports: [AppModule],
    declareComponent: false,
    mocks: [Clipboard, MatSnackBar, MatDialogRef, MatDialog]
  });
  let eventHandler: ((event: { type: string, payload: any }) => void) | undefined;
  (applyPatch as jest.Mock).mockImplementation((previousTree, currentTree) => {
    previousTree[0] = currentTree[0];
  });
  const mockInitializeComponent = jest.fn(async (options) => {
    return '123';
  });
  const mockDestroyComponentInstance = jest.fn((componentInstanceId) => {
  });
  const mockHandleBrowserCallback = jest.fn((options) => {
  });
  const mockNavigate = jest.fn((path) => {
  });
  const mockOnEvent = jest.fn((componentInstanceId, handler) => {
    eventHandler = handler;
  });
  const mockPostFormData = jest.fn(async (formData) => {
  });
  const mockUpdateComponentInstanceProps = jest.fn((options) => {
  });
  const config = {
    elementUrl: '',
    connection: {
      initializeComponent: mockInitializeComponent,
      destroyComponentInstance: mockDestroyComponentInstance,
      handleBrowserCallback: mockHandleBrowserCallback,
      navigate: mockNavigate,
      onEvent: mockOnEvent,
      postFormData: mockPostFormData,
      updateComponentInstanceProps: mockUpdateComponentInstanceProps,
    }
  }

  beforeEach(() => {
    eventHandler = undefined;
    jest.clearAllMocks();
  });

  test(`should call connection mockInitializeComponent on init`, async () => {
    spectator = createComponent({
      props: {
        component: 'hello-world',
        options: { text: 'hi!' },
        config,
      }
    });
    await spectator.fixture.whenStable();

    expect(mockInitializeComponent.mock.calls.length).toEqual(1);
    expect(mockInitializeComponent.mock.calls[0][0]).toEqual({
      componentId: 'hello-world',
      componentOptions: { text: 'hi!' },
      location: { href: 'http://localhost/' }
    });
  });

  test(`should call connection updateComponentInstanceProps on options changes`, async () => {
    spectator = createComponent({
      props: {
        component: 'hello-world',
        options: { text: 'hi!' },
        config,
      }
    });
    await spectator.fixture.whenStable();

    expect(mockUpdateComponentInstanceProps.mock.calls.length).toEqual(0);
    spectator.setInput({
      options: { text: 'bye!' }
    })
    expect(mockUpdateComponentInstanceProps.mock.calls.length).toEqual(1);
    expect(mockUpdateComponentInstanceProps.mock.calls[0]).toEqual([
      { componentInstanceId: '123', options: { text: 'bye!' } }
    ]);
  });

  test(`should retry while config not received`, async () => {
    spectator = createComponent({
      props: {
        component: 'hello-world',
        options: { text: 'hi!' },
      }
    });

    expect(mockInitializeComponent.mock.calls.length).toEqual(0);
    spectator.setInput({
      config,
    })

    await spectator.fixture.whenStable();

    expect(mockInitializeComponent.mock.calls.length).toEqual(1);
  });

  test(`should register event handler with the received component id`, async () => {
    spectator = createComponent({
      props: {
        component: 'hello-world',
        options: { text: 'hi!' },
        config,
      }
    });
    await spectator.fixture.whenStable();
    expect(mockOnEvent.mock.calls.length).toEqual(1);
    expect(mockOnEvent.mock.calls[0][0]).toEqual('123');
    expect(mockOnEvent.mock.calls[0][1]).toEqual(eventHandler);
  });

  describe(`events`, () => {
    test(`should copy to clipboard`, async () => {
      spectator = createComponent({
        props: {
          component: 'hello-world',
          options: { text: 'hi!' },
          config,
        }
      });
      await spectator.fixture.whenStable();
      eventHandler?.({
        type: 'copyToClipboard',
        payload: {
          text: 'hello, world!'
        }
      });
      const clipboardService = spectator.inject<Clipboard>(Clipboard);
      expect(clipboardService.copy.mock.calls.length).toEqual(1);
      expect(clipboardService.copy.mock.calls[0][0]).toEqual('hello, world!');
      const snackBarService = spectator.inject<MatSnackBar>(MatSnackBar);
      expect(snackBarService.open.mock.calls.length).toEqual(1);
      expect(snackBarService.open.mock.calls[0]).toEqual([
        `Copied to clipboard!`, undefined, { duration: 2500 }
      ]);
    });

    test(`should navigate`, async () => {
      spectator = createComponent({
        props: {
          component: 'hello-world',
          options: { text: 'hi!' },
          config,
        }
      });
      await spectator.fixture.whenStable();
      eventHandler?.({
        type: 'navigate',
        payload: {
          path: '/home'
        }
      });
      expect(mockNavigate.mock.calls.length).toEqual(1);
      expect(mockNavigate.mock.calls[0][0]).toEqual('/home');
    });

    test(`should open window`, async () => {
      spectator = createComponent({
        props: {
          component: 'hello-world',
          options: { text: 'hi!' },
          config,
        }
      });
      await spectator.fixture.whenStable();
      const openWindowMock = jest.fn();
      window.open = openWindowMock;
      eventHandler?.({
        type: 'openWindow',
        payload: { windowName: '', url: 'google.com', windowFeatures: {} }
      });
      expect(openWindowMock.mock.calls.length).toEqual(1);
      expect(openWindowMock.mock.calls[0]).toEqual(['google.com', '', {}]);
    });

    test(`should close modal if current component is opened in modal`, async () => {
      spectator = createComponent({
        props: {
          component: 'hello-world',
          options: { text: 'hi!' },
          config,
        }
      });
      await spectator.fixture.whenStable();
      eventHandler?.({
        type: 'closeModal',
        payload: { data: 'bye!' }
      });
      const dialogRef = spectator.inject<MatDialogRef<DraymanModalComponent>>(MatDialogRef);
      expect(dialogRef.close.mock.calls.length).toEqual(1);
      expect(dialogRef.close.mock.calls[0]).toEqual(['bye!']);
    });

    test(`should open and close modal`, async () => {
      spectator = createComponent({
        props: {
          component: 'hello-world',
          options: { text: 'hi!' },
          config,
        }
      });
      await spectator.fixture.whenStable();
      const payload = { component: 'dialog-component', options: {}, onCloseCallbackId: 'close-dialog-component' };
      const matDialog = spectator.inject<MatDialog>(MatDialog);
      const closeModal = new Subject();
      matDialog.open.mockImplementation(() => {
        return {
          afterClosed: () => closeModal
        } as any
      });
      eventHandler?.({
        type: 'openModal',
        payload,
      });
      expect(matDialog.open.mock.calls.length).toEqual(1);
      expect(matDialog.open.mock.calls[0]).toEqual([
        DraymanModalComponent, {
          data: {
            component: payload.component,
            options: payload.options,
            config,
          }
        }
      ]);
      closeModal.next('bye!');
      expect(mockHandleBrowserCallback.mock.calls.length).toEqual(1);
      expect(mockHandleBrowserCallback.mock.calls[0]).toEqual([{
        callbackId: 'close-dialog-component',
        data: 'bye!'
      }]);
    });

    test(`should open and close snack bar`, async () => {
      spectator = createComponent({
        props: {
          component: 'hello-world',
          options: { text: 'hi!' },
          config,
        }
      });
      await spectator.fixture.whenStable();
      const payload = {
        message: 'surprise!',
        options: {
          duration: 2000, horizontalPosition: 'center', verticalPosition: 'bottom', action: 'close'
        },
        onCloseCallbackId: 'close-surprise',
      };
      const matSnackBar = spectator.inject<MatSnackBar>(MatSnackBar);
      const closeSnackBar = new Subject();
      matSnackBar.open.mockImplementation(() => {
        return {
          afterDismissed: () => closeSnackBar,
        } as any
      });
      eventHandler?.({
        type: 'openSnackBar',
        payload,
      });
      expect(matSnackBar.open.mock.calls.length).toEqual(1);
      expect(matSnackBar.open.mock.calls[0]).toEqual(['surprise!', 'close', { duration: 2000, horizontalPosition: 'center', verticalPosition: 'bottom' }]);
      closeSnackBar.next({ dismissedByAction: true });
      expect(mockHandleBrowserCallback.mock.calls.length).toEqual(1);
      expect(mockHandleBrowserCallback.mock.calls[0]).toEqual([{
        callbackId: 'close-surprise',
        data: { dismissedByAction: true }
      }]);
    });

    test(`should apply view tree`, async () => {
      spectator = createComponent({
        props: {
          component: 'hello-world',
          options: { text: 'hi!' },
          config,
        }
      });
      await spectator.fixture.whenStable();
      const emitMock = jest.fn();
      spectator.component.emit.bind = emitMock;
      const tree = [{
        type: 'button',
        options: {
          onClick: true,
        },
        key: 'btn-1',
        children: [],
      }];
      eventHandler?.({
        type: 'view',
        payload: { view: tree }
      });
      expect([{ ...spectator.component.viewTree[0], options: {} }]).toEqual([{ ...tree[0], options: {} }]);
      expect(emitMock.mock.calls[0][1]).toEqual('btn-1/onClick');
    });
  });

  test(`should render button`, async () => {
    spectator = createComponent({
      props: {
        component: 'hello-world',
        options: { text: 'hi!' },
        config,
      }
    });
    await spectator.fixture.whenStable();
    const tree = [{
      type: 'button',
      options: {
        onClick: true,
      },
      key: 'btn-1',
      children: [],
    }];
    const emitMock = jest.fn();
    spectator.component.emit = emitMock;
    eventHandler?.({
      type: 'view',
      payload: { view: tree }
    });

    expect(spectator.fixture).toMatchSnapshot();

    spectator.click('button');
    await spectator.fixture.whenStable();
    expect(emitMock.mock.calls[0]).toEqual(['btn-1/onClick']);
  });

});

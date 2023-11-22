import '@drayman/element';

const waitForConnection = () => new Promise<WebSocket>((resolve, reject) => {
    const socket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/`);
    socket.onerror = () => socket.close();
    socket.onclose = async (ev: any) => {
        setTimeout(async () => window.location.reload(), 500);
    };
    socket.addEventListener('open', (ev) => { resolve(socket); })
});
async function initializeDraymanFramework(options?: { browserCommands: any, elementOptions: any, }) {
    const requests = {};
    let sequence = 1;
    const browserCommands = options?.browserCommands;
    const handlers = {};
    const socket = await waitForConnection();
    socket.onmessage = (event) => {
        const { id, data, type } = JSON.parse(event.data);
        if (id) {
            requests[id](data);
            delete requests[id];
        }
        if (type === 'event') {
            const { payload, type, componentInstanceId } = data;
            for (const handler of (handlers[componentInstanceId] || [])) {
                handler({ payload, type, componentInstanceId });
            }
        }
    }
    const send = (type, data, callback?) => {
        const request = { type, data, id: undefined };
        if (callback) {
            request.id = sequence;
            requests[sequence] = callback;
            sequence++;
        }
        socket.send(JSON.stringify(request));
    }

    window['draymanConfig'] = {
        browserCommands,
        elementOptions: options?.elementOptions,
        elementUrl: '/elements/',
        connection: {
            onConnectionClose: (handler) => {
                socket.onclose = handler;
            },
            onEvent: (componentInstanceId, handler) => {
                if (handlers[componentInstanceId]) {
                    handlers[componentInstanceId].push(handler);
                } else {
                    handlers[componentInstanceId] = [handler];
                }
            },
            initializeComponent: (options) => {
                return new Promise((resolve, reject) => {
                    send('initializeComponentInstance', options, ({ componentInstanceId }) => {
                        resolve(componentInstanceId);
                    })
                });
            },
            postFormData: async (formData) => {
                return (await fetch('/api/componentEvent', {
                    method: 'POST',
                    body: formData,
                })).json();
            },
            handleBrowserCallback: (options) => {
                send('handleBrowserCallback', options);
            },
            destroyComponentInstance: ({ componentInstanceId }) => {
                send('destroyComponentInstance', { componentInstanceId });
                delete handlers[componentInstanceId];
            },
            updateComponentInstanceProps: (options) => {
                send('updateComponentInstanceProps', options);
            },
        }
    };

    return { emit: (type, data) => send('eventHubEvent', { type, data }) };
}

(window as any).initializeDraymanFramework = initializeDraymanFramework;
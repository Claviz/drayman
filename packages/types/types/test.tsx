// emulate @drayman/core/jsx-runtime to avoid using @drayman/core as a redundant dependency
declare module '@drayman/core/jsx-runtime';

const component: DraymanComponent = async ({ EventHub, Router, UI, forceUpdate, props }) => {
    EventHub.on('ping', async () => {
        console.log('pong');
    });

    EventHub.on('pong', async () => {
        console.log('ping');
    }, 'group1');

    return () => {
        return [
            <div style={{ fillOpacity: 1, }} tabindex={1} {...{ 'onShortcut:ctrl+i': async () => { } }} ></div>,
            <td></td>,
            <input type="text" value="hello" onValueChange={async ({ value }) => { console.log(value.charAt(1)); }}></input>,
            <input type="number" value={123} onValueChange={async ({ value }) => { console.log(value.toFixed()); }}></input>,
            <pre>const welcome = 'Hello, world!';</pre>,
            <div>Is modal? {UI.isModal}</div>
        ];
    };
};

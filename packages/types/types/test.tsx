// emulate @drayman/core/jsx-runtime to avoid using @drayman/core as a redundant dependency
declare module '@drayman/core/jsx-runtime';

const component: DraymanComponent = async ({ EventHub, forceUpdate, props, Browser }) => {
    EventHub.on('ping', async () => {
        console.log('pong');
    });

    EventHub.on('pong', async () => {
        console.log('ping');
    }, 'group1');

    return () => {
        return <>
            <div style={{ fillOpacity: 1, }} tabindex={1} onkeydown={async (event) => { console.log(event.code); }}></div>
            <td></td>
            <input type="text" value="hello" oninput={async ({ value }) => { console.log(value.charAt(1)); }}></input>
            <input type="number" value={123} oninput={async ({ value }) => { console.log(value.toFixed()); }}></input>
            <button onclick={async () => { await Browser.alert('Hello, world!'); }}>Alert!</button>
            <pre>const welcome = 'Hello, world!';</pre>
            <p>Paragraph</p>
            <i>italic</i>
            <b>bold</b>
        </>;
    };
};

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
            <div style={{ fillOpacity: 1, }} tabindex={'1'} onkeydown={async (event) => { console.log(event.code); }}></div>
            <td></td>
            <input type="text" value="hello" oninput={async ({ value }) => { console.log(value.charAt(1)); }}></input>
            <input ref="my-input" type="number" value={'123'} oninput={async ({ value }) => { console.log(value.toFixed()); }}></input>
            <button onclick={async () => { await Browser.alert('Hello, world!'); }}>Alert!</button>
            <button onclick={async () => { await Browser.focus(null, ['my-input']); }}>Focus!</button>
            <pre>const welcome = 'Hello, world!';</pre>
            <p>Paragraph</p>
            <i>italic</i>
            <b>bold</b>
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            </svg>
            <div style={{ '--dynamic-bg-image': `url('')` }}></div>
        </>;
    };
};

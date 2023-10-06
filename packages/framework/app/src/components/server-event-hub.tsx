export const component: DraymanComponent = async ({ forceUpdate, Server, EventHub }) => {

    let text;

    EventHub.on('message-from-server', async (data) => {
        text = data.text;
        await forceUpdate();
    });

    return async () => {
        return (
            <button id="message-from-server" onclick={async () => await Server.useEventHub()}>{text}</button>
        )
    }
}
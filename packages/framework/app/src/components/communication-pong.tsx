export const component: DraymanComponent = async ({ forceUpdate, EventHub }) => {
    let text;

    EventHub.on('ping', async (message) => {
        text = message;
        await forceUpdate();
    });

    return () => {
        return <p>{text}</p>;
    }
}
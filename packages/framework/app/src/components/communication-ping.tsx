export const component: DraymanComponent = async ({ EventHub }) => {

    const onBtnClick = async () => {
        EventHub.emit('ping', 'Pong!');
    }

    return () => {
        return (
            <button onclick={onBtnClick}>Ping!</button>
        )
    }
}
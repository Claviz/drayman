export const component: DraymanComponent = async ({ EventHub }) => {

    const onBtnClick = async () => {
        EventHub.emit('ping', 'Pong!');
    }

    return () => {
        return (
            <button id="ping-btn" onclick={onBtnClick}>Ping!</button>
        )
    }
}
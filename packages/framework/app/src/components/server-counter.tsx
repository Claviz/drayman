export const component: DraymanComponent = async ({ forceUpdate, Server }) => {

    const onBtnClick = async () => {
        await Server.increase();
        await forceUpdate();
    }

    return async () => {
        let count = await Server.getCount();
        return (
            <button id="counter-btn" onclick={onBtnClick}>Times clicked: {count}</button>
        )
    }
}
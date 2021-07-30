export const component: DraymanComponent = async ({ forceUpdate }) => {
    let count = 0;

    const onBtnClick = async () => {
        count++;
        await forceUpdate();
    }

    return () => {
        return (
            <button id="counter-btn" onclick={onBtnClick}>Times clicked: {count}</button>
        )
    }
}
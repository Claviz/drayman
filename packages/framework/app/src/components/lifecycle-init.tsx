export const component: DraymanComponent = async ({ forceUpdate, ComponentInstance }) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let text = 'Waiting for init hook....';

    ComponentInstance.onInit = async () => {
        await delay(1000);
        text = 'Initialized!';
        await forceUpdate();
    }

    return () => {
        return <h3>{text}</h3>
    }
}
export const component: DraymanComponent<{ text: string }> = async ({ props, forceUpdate, Router }) => {

    Router.onRouteChange = async ({ previousUrl }) => {
        previousLocation = previousUrl;
        await forceUpdate();
    }

    let header;
    let previousLocation;

    return () => {
        return [
            <button onClick={async () => { header = 'Hello, world!'; console.log(`You've clicked a button!`); await forceUpdate(); }}>
                {props.text}
            </button>,
            <h1>{header}</h1>,
            <div>Current location: {Router.url}. Previous location: {previousLocation}</div>,
            <button onClick={async () => Router.navigate('/home')}></button>
        ]
    }
}
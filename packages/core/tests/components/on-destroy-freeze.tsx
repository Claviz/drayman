export const component: DraymanComponent = async ({ forceUpdate, ComponentInstance }) => {

    ComponentInstance.onDestroy = () => {
        while (true) { }
    };

    return () => {
        return (
            <div>Hello, World!</div>
        )
    }
}
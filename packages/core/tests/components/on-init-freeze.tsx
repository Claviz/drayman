export const component: DraymanComponent = async ({ forceUpdate, ComponentInstance }) => {

    ComponentInstance.onInit = () => {
        while (true) { }
    };

    return () => {
        return (
            <div>Hello, World!</div>
        )
    }
}
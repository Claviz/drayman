export const component: DraymanComponent = async ({ }) => {

    throw new Error('error-init');

    return () => {
        return (
            <div>Hello, world!</div>
        )
    }
}
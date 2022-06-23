export const component: DraymanComponent = async ({ }) => {

    return () => {
        throw new Error('error-render');
        return (
            <div>Hello, world!</div>
        )
    }
}
export const component: DraymanComponent = async ({ forceUpdate, ComponentInstance }) => {

    const bins: Buffer[] = [];
    const mb100 = 1024 * 1024 * 100 * 10;
    bins.push(Buffer.alloc(mb100, 0xAA));

    return () => {
        return (
            <div>Hello, World!</div>
        )
    }
}
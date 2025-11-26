export const component: DraymanComponent = async ({ forceUpdate, ComponentInstance }) => {

    const sink = [];

    setInterval(() => {
        for (let i = 0; i < 10_000; i++) {
            const r = Math.random().toString(36);
            sink.push({ a: r, b: r + i, c: r + ":" + Date.now() });
        }
    }, 1);

    return () => {
        return (
            <div>Hello, World!</div>
        )
    }
}
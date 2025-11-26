export const component: DraymanComponent = async () => {
    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
    await delay(300);

    console.log('CHILD init');

    return async () => {
        await delay(50);
        return <div>child</div>;
    };
};
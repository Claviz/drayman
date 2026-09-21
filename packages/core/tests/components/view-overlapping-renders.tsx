export const component: DraymanComponent<any> = async ({ Browser }) => {
    let renderNumber = 0;
    return async () => {
        const currentRender = renderNumber++;
        const values = currentRender === 0
            ? { a: 0, b: 0 }
            : await Browser.renderGate({ renderNumber: currentRender });
        return {
            type: 'test-widget',
            props: {
                ...values,
                description: 'Stable content keeps small changes cheaper as patches.'.repeat(20),
            },
        };
    };
};

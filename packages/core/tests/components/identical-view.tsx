export const component: DraymanComponent = async ({ forceUpdate }) => {
    setTimeout(() => {
        forceUpdate();
    }, 100);

    return async () => {
        return (
            <div>
                identical
            </div>
        );
    };
};

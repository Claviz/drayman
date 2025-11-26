export const component: DraymanComponent = async ({ forceUpdate }) => {
    console.log('PARENT init');

    let i = 0;
    setTimeout(() => {
        console.log('PARENT forceUpdate()');
        i++;
        forceUpdate();
    }, 0);

    return async () => {
        return (
            <div>
                {i}
                <child />
                <child />
            </div>
        );
    };
};
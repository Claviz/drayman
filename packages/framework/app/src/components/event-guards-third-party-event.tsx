export const component: DraymanComponent = async ({ forceUpdate, }) => {
    let text = 'Hello';

    return () => {
        return (
            <>
                <drayman-text-field
                    value={text}
                    onValueChange={[
                        async ({ value }) => {
                            text = value;
                            await forceUpdate();
                        },
                        {
                            eventGuards: [
                                {
                                    mask: { value: 'A' },
                                    preventDefault: true
                                }
                            ],
                        }
                    ]}
                />
                <p>{text}</p>
            </>
        )
    }
}
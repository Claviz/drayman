export const component: DraymanComponent = async ({ forceUpdate, }) => {
    let text = 'Hello';

    return () => {
        return (
            <>
                <drayman-text-field
                    value={text}
                    onkeydown={[
                        async () => {
                            text = 'Saved!';
                            await forceUpdate();
                        },
                        {
                            eventGuards: [
                                {
                                    mask: { ctrlKey: true, code: 'KeyS' },
                                    preventDefault: true
                                }
                            ],
                        }
                    ]}
                    onValueChange={async ({ value }) => {
                        text = value;
                        await forceUpdate();
                    }}
                />
                <p>{text}</p>
            </>
        )
    }
}
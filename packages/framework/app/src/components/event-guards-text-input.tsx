export const component: DraymanComponent = async ({ forceUpdate, }) => {
    let text = 'Hello';

    return () => {
        return (
            <>
                <input
                    type="text"
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
                    oninput={async ({ value }) => {
                        text = value;
                        await forceUpdate();
                    }}
                />
                <p>{text}</p>
            </>
        )
    }
}
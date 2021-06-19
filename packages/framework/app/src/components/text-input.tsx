export const component: DraymanComponent = async ({ forceUpdate }) => {
    let text = 'Hello';

    return () => {
        return (
            <>
                <input
                    type="text"
                    value={text}
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
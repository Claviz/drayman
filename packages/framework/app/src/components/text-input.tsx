export const component: DraymanComponent = async ({ forceUpdate }) => {
    let text = 'Hello';

    return () => {
        return (
            <div>
                <input
                    type="text"
                    value={text}
                    onValueChange={async ({ value }) => {
                        text = value;
                        await forceUpdate();
                    }}
                />
                {text}
            </div>
        )
    }
}
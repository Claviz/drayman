export const component: DraymanComponent<{ onRootEvent: any; }> = async ({ props }) => {

    return () => {
        return (
            <button
                onclick={async () => {
                    await props.onRootEvent({ text: `Nice!` });
                }}
            >Click!</button>
        )
    }
}
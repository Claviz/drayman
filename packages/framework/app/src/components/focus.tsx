export const component: DraymanComponent = async ({ Browser }) => {

    return () => {
        return (<>
            <input
                type="text"
                ref="my-input"
            />
            <button
                id="focus-btn"
                onclick={async () => {
                    await Browser.focus(null, ['my-input']);
                }}
            >Focus input</button>
        </>
        )
    }
}
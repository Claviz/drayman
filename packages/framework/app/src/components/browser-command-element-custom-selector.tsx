export const component: DraymanComponent = async ({ Browser, forceUpdate, props }) => {
    return () => {
        return (
            <>
                <div id="text-id" ref="text"></div>
                <button
                    id="btn"
                    onclick={async () => {
                        await Browser.setText({
                            text: 'Hello World!',
                        }, [{ customSelector: '#text-id' }]);
                    }}
                >Set text</button>
            </>
        )
    }
}
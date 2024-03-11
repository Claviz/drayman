export const component: DraymanComponent<{ wait: boolean }> = async ({ Browser, forceUpdate, props }) => {
    let renderTextElement = false;

    setTimeout(async () => {
        renderTextElement = true;
        await forceUpdate();
    }, 2000);

    return () => {
        return (
            <>
                <div id="error" ref="error"></div>
                {
                    (!!renderTextElement) && <div id="text" ref="text"></div>
                }
                <button
                    id="btn"
                    onclick={async () => {
                        await Browser.setText({
                            text: 'Hello World!',
                        }, [{ ref: 'text', wait: props.wait }, 'error']);
                    }}
                >Set text</button>
            </>
        )
    }
}
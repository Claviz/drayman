export const component: DraymanComponent = async ({ Browser, forceUpdate }) => {

    let events = ``;

    return () => {
        return (
            <>
                <p id="event-count">Events: {events}</p>
                <button
                    id="btn-debounce"
                    onclick={async () => {
                        await Browser.emit10Events({ debounce: 1000, onEvent: async () => { events += 'A'; await forceUpdate(); } });
                    }}
                >Emit 10 events debounced</button>
                <button
                    id="btn"
                    onclick={async () => {
                        await Browser.emit10Events({ onEvent: async () => { events += 'A'; await forceUpdate(); } });
                    }}
                >Emit 10 events</button>
            </>
        )
    }
}
export const component: DraymanComponent = async ({ forceUpdate, UI }) => {
    return () => {
        return (
            <div>
                <h3>{UI.isModal ? `I am modal!` : `I am not modal!`}</h3>
                <button onClick={async () => { await UI.openModal('modal') }}>Open modal</button>
            </div>
        )
    }
}
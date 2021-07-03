export const component: DraymanComponent = async ({ Browser, forceUpdate }) => {

    let modalOpened = false;

    return () => {
        return (
            <>
                <p>Modal is opened: {modalOpened ? 'yes' : 'no'}</p>
                <button
                    onclick={async () => {
                        await Browser.openModal({ onClose: async () => { modalOpened = false; await forceUpdate(); } });
                        modalOpened = true;
                        await forceUpdate();
                    }}
                >Open modal</button>
            </>
        )
    }
}
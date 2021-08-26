export const component: DraymanComponent<{ text: string }> = async ({ props, forceUpdate, ComponentInstance }) => {

    console.log(`ComponentInstance object has id: ${!!ComponentInstance.id}`)

    ComponentInstance.onDestroy = () => { console.log('destroyed!') };

    let header;

    return () => {
        return <>
            <button onClick={async () => { header = 'Hello, world!'; console.log(`You've clicked a button!`); await forceUpdate(); }}>
                {props.text}
            </button>
            <h1>{header}</h1>
        </>
    }
}
// import fs from 'fs';
// import Drayman from 'drayman';

export const component: DraymanComponent = async ({ forceUpdate, UI, EventHub, Router }) => {
    let lightBulbStatus: 'on' | 'off' = 'off';
    let modalOpened = false;
    const eventMessages: string[] = [];

    Router.onRouteChange = async ({ previousUrl }) => {
        console.log(`LocationChanged`, { url: Router.url, previousUrl })
        await forceUpdate();
    };

    const setLightBulbStatus = async (status: 'on' | 'off') => {
        lightBulbStatus = status;
        await forceUpdate();
    }

    EventHub.on('hello', async (message) => {
        eventMessages.push(`from group ${message}`);
        await forceUpdate();
    }, 'amazing-group');

    EventHub.on('hello', async (message) => {
        eventMessages.push(message);
        await forceUpdate();
    });

    const Route = ({ }) => {
        let toReturn = (
            <div>
                <h1>Welcome to home!</h1>
                <button onClick={async () => { EventHub.emit('hello', new Date().toString()) }}>emit event to all</button>
                <button onClick={async () => { EventHub.emit('hello', new Date().toString(), 'amazing-group') }}>emit event to group</button>
                {
                    eventMessages.map((x, i) => <div>{x}</div>)
                }
            </div>
        );
        let preserved = Router.url.replace('/modal', '');
        if (Router.url.includes('/light')) {
            toReturn = (
                <div>
                    <button onClick={async () => await Router.navigate('/')}>Go home</button>
                    <h1>The light is {lightBulbStatus}</h1>
                    <span style={{ display: 'flex' }}>
                        <button disabled={lightBulbStatus === 'on'} onClick={setLightBulbStatus.bind(null, 'on')}>ON</button>
                        <button disabled={lightBulbStatus === 'off'} onClick={setLightBulbStatus.bind(null, 'off')}>OFF</button>
                        {/* <drayman-button label="OFF" disabled={lightBulbStatus === 'off'} onClick={setLightBulbStatus.bind(null, 'off')}></drayman-button> */}
                    </span>
                </div>
            );
        } else if (Router.url.includes('/todo')) {
            toReturn = <todoList key="wow" />;
        } else if (Router.url.includes('/timer')) {
            toReturn = <timer2 key="wow2" />;
        }
        if (Router.url.includes('/modal')) {
            if (!modalOpened) {
                UI.openModal('todoList', null, async () => { modalOpened = false; await Router.navigate(preserved) });
                modalOpened = true;
            }
        }
        return toReturn;
    }
    return () => {

        return (
            <div>
                {/* <drayman-button label="Go to home" onClick={async () => await Router.navigate('/')}></drayman-button> */}
                <button onClick={async () => await Router.navigate('/light')}>Go to light</button>
                {/* <drayman-button label="Go to light" onClick={async () => await UI.navigate('/light')}></drayman-button> */}
                {/* <drayman-button label="Go to to-do" onClick={async () => await Router.navigate('/todo')}></drayman-button> */}
                {/* <drayman-button label="Go to modal" onClick={async () => await Router.navigate(`${Router.url}/modal`)}></drayman-button> */}
                {/* <drayman-button label="Go to timer" onClick={async () => await Router.navigate(`/timer`)}></drayman-button> */}
                <Route />
                <img src="https://www.diffchecker.com/static/images/logo-v3.png" />
            </div>
        )

    }
}
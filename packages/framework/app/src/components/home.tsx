export const component: DraymanComponent<any> = async ({ Browser, props }) => {

    const url = await Browser.getCurrentUrl();

    const Route = () => {
        switch (url) {
            case 'http://localhost:3033/counter': {
                return <counter />
            }
            case 'http://localhost:3033/text-input': {
                return <text-input />
            }
            case 'http://localhost:3033/third-party-element': {
                return <third-party-element />
            }
            case 'http://localhost:3033/update-from-html': {
                return <update-from-html text={props.text} />
            }
            case 'http://localhost:3033/css-class': {
                return <css-class />
            }
            case 'http://localhost:3033/third-party-upload': {
                return <third-party-upload />
            }
            case 'http://localhost:3033/file-upload': {
                return <file-upload />
            }
            case 'http://localhost:3033/communication-ping': {
                return <communication-ping />
            }
            case 'http://localhost:3033/modal': {
                return <modal />
            }
            case 'http://localhost:3033/focus': {
                return <focus />
            }
            case 'http://localhost:3033/dependency': {
                return <dependency />
            }
            case 'http://localhost:3033/lifecycle-init': {
                return <lifecycle-init />
            }
            case 'http://localhost:3033/server-counter': {
                return <server-counter />
            }
            case 'http://localhost:3033/error-init': {
                return <error-init />
            }
            case 'http://localhost:3033/error-render': {
                return <error-render />
            }
            case 'http://localhost:3033/default-props': {
                return <default-props />
            }
            case 'http://localhost:3033/default-props-2': {
                return <default-props text1="Not default text" />
            }
            case 'http://localhost:3033/root-events': {
                return <root-events onRootEvent={props.onRootEvent} />
            }
        }
    }

    return () => {
        return (
            <Route />
        )
    }
}
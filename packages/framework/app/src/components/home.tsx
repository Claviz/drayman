export const component: DraymanComponent<any> = async ({ Router, props }) => {

    const Route = () => {
        switch (Router.url) {
            case 'http://localhost:3033/counter': {
                return <counter />
            }
            case 'http://localhost:3033/text-input': {
                return <text-input />
            }
            case 'http://localhost:3033/third-party-element': {
                return <third-party-element />
            }
            case 'http://localhost:3033/modal': {
                return <modal />
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
        }
    }

    return () => {
        return (
            <Route />
        )
    }
}
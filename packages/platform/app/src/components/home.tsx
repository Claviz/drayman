export const component: DraymanComponent = async ({ Router }) => {

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
        }
    }

    return () => {
        return (
            <Route />
        )
    }
}
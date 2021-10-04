import { add } from '../calc'

export const component: DraymanComponent = async ({ }) => {
    return () => {
        return <h3>2+2={add(2, 2)}</h3>
    }
}
export const component: DraymanComponent<{ text: string; }> = async ({ props }) => {
    return () => {
        return (
            <div>
                <div>Ready!</div>
                <div>{props.text}</div>
            </div>
        )
    }
}
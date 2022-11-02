export const defaultProps: DefaultProps = {
    text1: 'Default text'
};

export const component: DraymanComponent<DefaultProps> = async ({ props }) => {
    return () => {
        return (
            <div>
                <div>{props.text1} {props.text2}</div>
            </div>
        )
    }
}

interface DefaultProps {
    text1: string;
    text2?: string;
}
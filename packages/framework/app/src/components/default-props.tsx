export const defaultProps: DefaultProps = {
    text1: 'Default text'
};

export const component: DraymanComponent<DefaultProps> = async ({ props }) => {

    const propBeforeRender = props.text1;

    return () => {
        return (
            <div>
                <div>{props.text1} {props.text2}</div>
                <div>Before render: {propBeforeRender}</div>
            </div>
        )
    }
}

interface DefaultProps {
    text1: string;
    text2?: string;
}
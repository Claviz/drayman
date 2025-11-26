export const component: DraymanComponent = async ({ props }: any) => {
    return async ({ prevProps }) => {
        return (
            <div>
                {props.text}
            </div>
        );
    };
};

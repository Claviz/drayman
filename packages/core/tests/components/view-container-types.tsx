export const component: DraymanComponent<any> = async ({ props }) => () => ({
    type: 'test-widget',
    props: {
        config: { nested: props.value },
        label: props.label,
        description: 'Stable content that makes a small patch cheaper than a snapshot.'.repeat(10),
    },
});

export const Server: DraymanServer = async ({ emit, EventHub }) => {
    let count = 0;

    return {
        increase: async () => {
            count++;
        },
        getCount: async () => {
            return count;
        },
        useEventHub: async () => {
            EventHub.emit('message-from-server', { text: 'Hello, world!' });
        }
    };
}
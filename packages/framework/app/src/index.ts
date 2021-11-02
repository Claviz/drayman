export const Server: DraymanServer = async ({ emit }) => {
    let count = 0;

    return {
        increase: async () => {
            count++;
        },
        getCount: async () => {
            return count;
        }
    };
}
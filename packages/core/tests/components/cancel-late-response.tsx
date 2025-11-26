export const component: DraymanComponent = async () => {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    return () => (
        <div>
            <button onClick={async () => { await sleep(1000); return { ok: true }; }}>
                Slow
            </button>
        </div>
    );
};
export const component: DraymanComponent = async ({ forceUpdate }) => {

    let imageInfo = '';

    return () => {
        return (
            <>
                <input type="file" onchange={async (_, [uploadedFile]) => {
                    const { buffer, ...info } = uploadedFile;
                    imageInfo = JSON.stringify(info, null, 2);
                    await forceUpdate();
                }} />
                {imageInfo && <pre>{imageInfo}</pre>}
            </>
        )
    }
}
import fs from 'fs/promises';

export const component: DraymanComponent = async ({ forceUpdate }) => {

    let imageInfo = '';

    return () => {
        return (
            <>
                <drayman-file-uploader
                    onUpload={async (_, [uploadedFile]) => {
                        const { buffer, ...info } = uploadedFile;
                        imageInfo = JSON.stringify(info, null, 2);
                        await forceUpdate();
                        await fs.writeFile('image.png', buffer);
                        return 'file1';
                    }}
                    onRemoveUploaded={async ({ fileId }) => {
                        await fs.unlink('image.png');
                        return fileId;
                    }}
                >
                </drayman-file-uploader>
                {imageInfo && <pre>{imageInfo}</pre>}
            </>
        )
    }
}
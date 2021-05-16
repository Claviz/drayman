import { Attributes, IntersectionObserverHooks, LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule } from 'ng-lazyload-image';

export class LazyLoadImageHooks extends IntersectionObserverHooks {
    async loadImage({ imagePath }: Attributes): Promise<string> {
        const response = await fetch(imagePath);
        const blob = await response.blob();
        if (blob.size) {
            const url = URL.createObjectURL(blob);
            return url;
        }
    }
}
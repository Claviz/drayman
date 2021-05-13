export interface IConnectionService {
    // events$: Subject<any>;
    onEvent(componentInstanceId: string, handler: (event: any) => void): void;
    initializeComponent(options: any): Promise<string>;
    updateComponentInstanceProps(options: any): void;
    handleBrowserCallback(options: any): void;
    destroyComponentInstance(options: { componentInstanceId: string }): void;
    navigate(path: string): void;
    postFormData(formData: FormData): Promise<any>;
}
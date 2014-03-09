interface FileUploadOptions {
    dropZone?: JQuery;
    pasteZone?: JQuery;
    fileInput?: any;
    replaceFileInput?: boolean;
    paramName?: any;
    singleFileUploads?: boolean;
    limitMultiFileUploads?: any;
    sequentialUploads?: boolean;
    limitConcurrentUploads?: any;
    forceIframeTransport?: boolean;
    redirect?: any;
    redirectParamName?: any;
    postMessage?: any;
    multipart?: boolean;
    maxChunkSize?: any;
    uploadedBytes?: any;
    recalculateProgress?: boolean;
    progressInterval?: number;
    bitrateInterval?: number;
    formData?: (form: any) => any[];
    add?: (event: any, data: any) => void;
    processData?: boolean;
    contentType?: boolean;
    cache?: boolean;

    submit?: (e: any, data: any) => void;
    send?: (e: any, data: any) => void;
    done?: (e: any, data: any) => void;
    fail?: (e: any, data: any) => void;
    always?: (e: any, data: any) => void;
    progress?: (e: any, data: any) => void;
    progressall?: (e: any, data: any) => void;

}

interface JQuery {
    fileupload(options: FileUploadOptions): JQuery;
}
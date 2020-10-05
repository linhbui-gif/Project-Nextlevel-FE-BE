const getFileType = (arr) => {
  let header = "";
  for (let i = 0; i < arr.length; i += 1) {
    header += arr[i].toString(16);
  }
  switch (header) {
    case "89504e47":
      return "image/png";
    case "47494638":
      return "image/gif";
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      return "image/jpeg";
    case "25504446":
      return "application/pdf";
    default:
      return "unknown"; // Or you can use the blob.type as fallback
  }
};

export const readFile = (file: Blob): Promise<[ArrayBuffer | string, string]> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onabort = () => reject(new Error("file reading was aborted"));
    reader.onerror = () => reject(new Error("file reading has failed"));
    reader.onload = () => {
      const arr = new Uint8Array(<ArrayBuffer>reader.result).subarray(0, 4);
      const type = getFileType(arr);
      resolve([reader.result, type]);
    };
    reader.readAsArrayBuffer(file);
  });

/* eslint-disable no-underscore-dangle */
export class CKUploadAdapter {
  xhr: any;

  loader: any;

  url = process.env.NEXT_PUBLIC_EDITOR_UPLOAD_URL;

  constructor(loader: Promise<File>) {
    this.loader = loader;
  }

  // Starts the upload process.
  upload(): Promise<{ default: string }> {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  // Aborts the upload process.
  abort(): void {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest(): void {
    this.xhr = new XMLHttpRequest();
    this.xhr.open("POST", this.url, true);
    this.xhr.responseType = "json";
  }

  _initListeners(resolve: (any) => void, reject: (msg?: string) => void): void {
    const { xhr, loader } = this;
    const genericErrorText = `Couldn't upload file: ${loader.file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const { response } = xhr;

      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      return resolve({
        default: response.url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  _sendRequest(): void {
    const data = new FormData();
    this.loader.file.then((file) => {
      data.append("upload", file);
      this.xhr.send(data);
    });
  }
}

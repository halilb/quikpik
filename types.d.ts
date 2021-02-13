export default function quikpik<T>(opts: {
  sources?: Array<'filepicker' | 'takephoto' | 'takevideo' | 'takeaudio'>;
  customProgress?: boolean;
  upload(opts: { file: File, onProgress: (percent: number) => any }): void | ({ promise: Promise<T>, cancel: () => void });
}): Promise<{ canceled: true } | { canceled: false, result: T }> & { cancel(): void; };

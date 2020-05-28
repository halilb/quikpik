import { render } from 'solid-js/dom';
import quikpik from '../src';

function mockUpload({ file, onProgress }) {
  console.log('Uploading file:', file.name, 'type:', file.type);

  const mockProgressInterval = 250;
  let progress = 0;
  let resolve, reject, timeout;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
    timeout = setTimeout(mockProgress, mockProgressInterval);

    function mockProgress() {
      progress += 10;
      onProgress(progress);

      if (progress >= 100) {
        resolve();
      } else {
        setTimeout(mockProgress, mockProgressInterval);
      }
    }
  });

  return {
    promise,

    cancel() {
      // Reject should do whatever XMLHttpRequest abort does:
      // The XMLHttpRequest.abort() method aborts the request if it has already been sent. When a request is aborted, its readyState is changed to XMLHttpRequest.UNSENT (0) and the request's status code is set to 0.
      console.log('I was canceled!');
      clearTimeout(timeout);
      return reject && reject({ status: 0 });
    },
  };
}

function PickerDemo() {
  return (
    <>
      <button
        onClick={() =>
          quikpik({
            upload: mockUpload,
            sources: ['filepicker'],
          })
        }
      >
        There can be only one
      </button>
      <button
        onClick={(e) =>
          quikpik({
            customProgress: true,

            upload({ file }) {
              return mockUpload({
                file,
                onProgress(progress) {
                  e.target.textContent = `${progress}%`;
                },
              });
            },
          })
        }
      >
        Custom progress
      </button>
    </>
  );
}

function init() {
  const root = document.createElement('main');
  document.body.appendChild(root);

  quikpik({
    upload: mockUpload,
  });

  render(PickerDemo, root);
}

init();

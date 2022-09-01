import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function ImageUploader({ user, amount }) {
  const router = useRouter()
  const dropbox = useRef(null);
  const fileSelect = useRef(null);
  const [image, setImage] = useState(); // '/images/withdraw-1.png'
  const [progress, setProgress] = useState(0);

  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  function handleFiles(files) {
    // console.log("handling Files");
    // console.log(files);
    for (let i = 0; i < files.length; i++) {
      // console.log(files[i]);
      uploadFile(files[i]);
    }
  }

  function uploadFile(file) {
    const NEXT_PUBLIC_CLOUDINARY_CLOUDNAME = 'code-cent' // get this from .env
    const NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET = 'sjoawypm' // get this from .env

    const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", (e) => {
      // console.log(Math.round((e.loaded * 100.0) / e.total));
      setProgress(Math.round((e.loaded * 100.0) / e.total));
    });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);

        // console.log(response.secure_url);
        setImage(response.secure_url);
      }
    };

    fd.append(
      "upload_preset", NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET
    );
    fd.append("tags", "browser_upload");
    fd.append("file", file);
    xhr.send(fd);
  }

  function handleCancel() {
    setImage(null);
    window.location = '/'
  }

  async function handleSave() {
    // console.log(image);
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(['paymentProof', user, parseInt(amount), image]),
        type: 'application/json'
      })
      const res = await response.json()
      // console.log(res.message)
      if(res.message === 'success'){
        alert('Your request has been received and will be processed.');
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    function dragEnter(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function dragOver(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function drop(e) {
      e.stopPropagation();
      e.preventDefault();

      const dt = e.dataTransfer;
      const files = dt.files;

      handleFiles(files);
    }

    dropbox?.current?.addEventListener("dragenter", dragEnter, false);
    dropbox?.current?.addEventListener("dragover", dragOver, false);
    dropbox?.current?.addEventListener("drop", drop, false);

    return () => {
      dropbox?.current?.removeEventListener("dragenter", dragEnter);
      dropbox?.current?.removeEventListener("dragover", dragOver);
      dropbox?.current?.removeEventListener("drop", drop);
    };
  }, []);

  return (
    <div ref={dropbox}>
      {image ? (
        <>
          <img
            className="rounded-lg"
            src={image.replace("upload/", "upload/w_600/")}
            style={{ height: 400, width: '100%' }}
          />
          <div className="flex justify-between items-center mt-2">
            <button
              className="text-gray-700 hover:text-gray-500 border-2 border-gray-300 px-4 py-2 rounded w-1/2"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-800 border-2 border-blue-600 text-white px-4 py-2 rounded ml-2 w-1/2"
              onClick={handleSave}
              type="button"
            >
              Upload
            </button>
          </div>
        </>
      ) : (
        <div
          className="bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg"
          style={{ height: 400, width: '100%' }}
        >
          <form className="flex justify-center items-center h-full">
            {progress === 0 ? (
              <div className="text-gray-700 text-center">
                <div>Drag and Drop assets here</div>
                <div className="my-2">or</div>
                <button
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded block m-auto"
                  onClick={handleImageUpload}
                  type="button"
                >
                  Browse
                </button>
              </div>
            ) : (
              <span className="text-gray-700">{progress}%</span>
            )}

            <input
              ref={fileSelect}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </form>
        </div>
      )}
    </div>
  );
}

import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({});
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [userUpdateError, setUserUpdateError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setUserUpdateSuccess(null);
      setUserUpdateError(null);
      //setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setUserUpdateSuccess(null);
    setUserUpdateError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUserUpdateError("No change made");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json(res);
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        setUserUpdateError(data.message);
      }

      if (res.ok) {
        dispatch(updateSuccess(data));
        setUserUpdateSuccess("Update user success");
        setUserUpdateError(null);
      }
    } catch (error) {
      dispatch(updateFailure(error));
      setUserUpdateError(error);
    }
  };

  console.log(formData);
  return (
    <div className=" max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className=" relative size-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className=" rounded-full size-full object-cover border-8 border-[lightgray]"
          />
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          id="password"
          placeholder="password"
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          outline
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className=" pl-3">Loading...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
      <div className=" text-red-500 flex justify-between mt-5">
        <span className=" cursor-pointer">Delete Account</span>
        <span className=" cursor-pointer">Sign Out</span>
      </div>
      {userUpdateSuccess && (
        <Alert color="success" className="mt-5">
          {userUpdateSuccess}
        </Alert>
      )}
      {userUpdateError && (
        <Alert color="failure" className="mt-5">
          {userUpdateError}
        </Alert>
      )}
    </div>
  );
};
export default DashProfile;

import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className=" size-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className=" rounded-full size-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="text" id="password" placeholder="password" />
        <Button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          outline
        >
          Update
        </Button>
        <div className=" text-red-500 flex justify-between mt-5">
          <span className=" cursor-pointer">Delete Account</span>
          <span className=" cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
};
export default DashProfile;

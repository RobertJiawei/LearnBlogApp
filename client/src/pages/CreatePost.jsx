import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [text, setText] = useState("");

  console.log(text);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className=" uppercase text-3xl my-3 font-semibold text-center mt-8">
        create post
      </h1>
      <form className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JaveScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          value={text}
          placeholder="Write something......"
          onChange={setText}
          className=" h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink" outline>
          Publish
        </Button>
      </form>
    </div>
  );
};
export default CreatePost;

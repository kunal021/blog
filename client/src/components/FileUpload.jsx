/* eslint-disable react/prop-types */
import { useAuth } from "@/context";
import makeRequest from "@/utils/makeRequest";
import { Image, Loader } from "lucide-react";
import { useState } from "react";

const ImageUpload = ({ onImageUpload }) => {
  const [loading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());

  const { token } = useAuth();

  const MAX_SIZE_MB = 5;
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);

    if (fileSizeMB > MAX_SIZE_MB) {
      alert("File size exceeds the limit of 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await makeRequest(
        "POST",
        "https://blog-lwf2.onrender.com/api/posts/image-upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },

          Authorization: `Bearer ${token}`,
        },
        setLoading
      );
      // console.log("Image upload response:", response.data.url.data.publicUrl);
      const imageUrl = response.data.url.data.publicUrl;
      onImageUpload(imageUrl);
      setInputKey(Date.now());
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      {loading ? (
        <Loader className="h-4 animate-spin" />
      ) : (
        <Image className="h-4" />
      )}
      <input
        key={inputKey}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </label>
  );
};

export default ImageUpload;

import supabase from "./supabase.js";

export const imageUpload = async (req, res) => {
  try {
    const file = req.file;
    // console.log(file);
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileName = `${Date.now()}-${file.originalname}`;
    const { data, error } = await supabase.storage
      .from("zuai-blog")
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const publicUrl = await supabase.storage
      .from("zuai-blog")
      .getPublicUrl(fileName);

    res.status(200).json({ url: publicUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

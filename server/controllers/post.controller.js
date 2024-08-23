import Post from "../schemas/post.schema.js";

export const getAllPost = async (req, res) => {
  const { page = "", limit = "", search = "" } = req.query;

  const searchTerm = search.trim();
  try {
    let posts;
    let searchFilter = {};
    if (searchTerm) {
      searchFilter = {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          // { content: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }

    const filter = {
      $and: [{ published: true }, searchFilter],
    };
    const totalPosts = await Post.countDocuments(filter);

    if (!page || !limit) {
      posts = await Post.find(filter).sort({ createdAt: -1 });
    } else {
      page = Math.max(1, parseInt(page));
      limit = Math.max(1, parseInt(limit));

      posts = await Post.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }

    if (!posts || posts.length === 0)
      return res.status(404).json({ error: "Posts not found" });
    res.json({
      data: posts,
      meta: {
        totalPosts,
        currPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const post = await Post.create({ title, content, published });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content, published } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, published },
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

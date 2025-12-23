const Blog = require("../models/models.blog");

// helper: normalize tags input
function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map(t => String(t).trim()).filter(Boolean);

  // if it's "tag1, tag2"
  return String(tags)
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);
}

function makeExcerpt(content, length = 160) {
  const text = String(content || "").trim();
  if (!text) return "";
  return text.length > length ? text.slice(0, length).trim() + "..." : text;
}

// GET /api/blog  (published only)
exports.getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
  }
};

// GET /api/blog/admin/all (admin only)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch all blogs", error: error.message });
  }
};

// GET /api/blog/:id
// - public: can view only published
// - admin: can view any
exports.getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // If not published, only admin can view
    const isAdmin = req.user && String(req.user.role).toLowerCase() === "admin";
    if (!blog.published && !isAdmin) {
      return res.status(403).json({ message: "This blog is not published" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(400).json({ message: "Failed to fetch blog", error: error.message });
  }
};

// POST /api/blog (admin only)
exports.createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, author, category, tags, published } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: "title, content, and category are required" });
    }

    const imagePath = req.file ? `/uploads/blogs/${req.file.filename}` : undefined;

    const payload = {
      title: String(title).trim(),
      content: String(content).trim(),
      category: String(category).trim(),

      // optional
      author: author ? String(author).trim() : undefined,
      excerpt: excerpt && String(excerpt).trim() ? String(excerpt).trim() : makeExcerpt(content),
      tags: normalizeTags(tags),
      published: String(published) === "true" || published === true,
      image: imagePath,
      updatedAt: new Date()
    };

    const blog = await Blog.create(payload);
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(400).json({ message: "Failed to create blog", error: error.message });
  }
};

// PUT /api/blog/:id (admin only)
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { title, content, excerpt, author, category, tags, published } = req.body;

    // update fields if provided
    if (title !== undefined) blog.title = String(title).trim();
    if (content !== undefined) blog.content = String(content).trim();
    if (category !== undefined) blog.category = String(category).trim();
    if (author !== undefined) blog.author = String(author).trim();
    if (published !== undefined) blog.published = String(published) === "true" || published === true;

    // excerpt auto-gen if missing and content updated
    if (excerpt !== undefined) {
      const ex = String(excerpt || "").trim();
      blog.excerpt = ex ? ex : makeExcerpt(blog.content);
    } else if (content !== undefined) {
      // if content changed and excerpt not explicitly set, keep excerpt but if empty regenerate
      if (!blog.excerpt || !String(blog.excerpt).trim()) blog.excerpt = makeExcerpt(blog.content);
    }

    // tags
    if (tags !== undefined) blog.tags = normalizeTags(tags);

    // image update if uploaded
    if (req.file) {
      blog.image = `/uploads/blogs/${req.file.filename}`;
    }

    blog.updatedAt = new Date();

    await blog.save();
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(400).json({ message: "Failed to update blog", error: error.message });
  }
};

// DELETE /api/blog/:id (admin only)
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to delete blog", error: error.message });
  }
};

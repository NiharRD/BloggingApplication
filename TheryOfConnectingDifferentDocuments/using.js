// Create a user first
const user = new User({ name: "John Doe", email: "john@example.com" });
await user.save();

// Create a post referencing the user
const post = new Post({
  title: "My First Post",
  content: "Hello World!",
  createdBy: user._id, // Store the ObjectId reference
});
await post.save();

// Fetch post with user information populated
const postWithUser = await Post.findOne().populate("createdBy");
console.log(postWithUser.createdBy.name); // 'John Doe'

// Without populate, you'd only get the ObjectId
const postOnly = await Post.findOne();
console.log(postOnly.createdBy); // ObjectId('...')

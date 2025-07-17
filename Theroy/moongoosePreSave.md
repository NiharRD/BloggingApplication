Mongoose Pre Save Middleware
Mongoose pre save middleware is a powerful feature that allows you to execute custom logic before a document is saved to the database. These middleware functions, also called "hooks," run automatically when you call the save() method on a Mongoose document.

const schema = new Schema({ /_ your schema definition _/ });

schema.pre('save', function(next) {
// Your pre-save logic here
next();
});

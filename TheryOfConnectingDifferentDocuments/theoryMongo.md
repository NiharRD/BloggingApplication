createdBy: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",

}

The type Property
In Mongoose, mongoose.Schema.Types.ObjectId is used specifically for
referencing other documents, not for creating new ObjectIds.
This tells Mongoose that the field will contain
the \_id value of a document from another collection.

The ref Property
ref: "User" tells Mongoose which model this ObjectId
references. In this case, it's pointing to the "User" model.
This enables several powerful features:

Population: You can use .populate() to
automatically replace the ObjectId with the actual referenced document

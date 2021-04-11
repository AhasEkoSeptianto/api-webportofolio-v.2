const mongoose = require("mongoose");

// connect my monggodb
mongoose.connect(
	"mongodb+srv://ahaseko:aaseko100465@cluster0.hqm02.mongodb.net/news?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	(err) => {
		if (err) throw err;
		console.log("MongoDB connection established");
	}
);

const userSchema = new mongoose.Schema({
	judul: {
		type: String,
	},
	isiText: {
		type: String,
	},
	imgUrl: {
		type: String,
	},
});

module.exports = user = mongoose.model("News", userSchema);

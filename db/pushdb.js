const mongoose = require("mongodb").MongoClient;
const urlmongoose =
	"mongodb+srv://ahaseko:aaseko100465@cluster0.hqm02.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new mongoose(urlmongoose, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const dbname = "web_stikom";

async function postdb(data) {
	// console.log("here");
	// console.log(data);
	try {
		await client.connect();
		datatopost = [data];

		const db = client.db(dbname);
		const col = db.collection("call_us");
		const push = await col.insertMany(datatopost);
	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}
}

module.exports = postdb;

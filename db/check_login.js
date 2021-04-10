const mongoose = require("mongodb").MongoClient;
const urlmongoose =
	"mongodb+srv://ahaseko:aaseko100465@cluster0.hqm02.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new mongoose(urlmongoose, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function check(data) {
	try {
		await client.connect();
		// console.log(data);
		const db = client.db("web_stikom");
		const col = db.collection("admin_account");
		datalogin = [data];
		// await col.insertMany(datalogin);
		// find;
		const myDoc = await col.find().toArray();
		let id = myDoc[0]._id;
		let username = myDoc[0].username;
		let password = myDoc[0].password;

		if (data.username === username && data.password === password) {
			return { result: true, id: id, username: username };
			await client.close();
		} else {
			return false;
			await client.close();
		}
	} catch (e) {
		console.log(e);
	}
}

module.exports = check;

const { MongoClient } = require("mongodb");
//const Db = process.env.ATLAS_URI;

const Db = 'mongodb+srv://mcnalj:tec0L0te@cluster0.duafm.mongodb.net/?retryWrites=true&w=majorityPORT=5000'
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function(callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("calculus");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};

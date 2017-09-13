const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

//TODO:- Change time file to FILE
const projectSchema = new Schema ({
	projectName: {type: String},
	userID: {type: Schema.Types.ObjectId, ref: 'User'},
	file: {
		fileHTML: {type: String},
		fileCSS: {type: String},
		fileJS: {type: String}
    }
  },
  {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Project = mongoose.model('project', projectSchema);
module.exports = Project;

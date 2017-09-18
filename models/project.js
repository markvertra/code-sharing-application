const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

//TODO:- Change file to FILE
const projectSchema = new Schema ({
	projectName: {type: String},
	userID: {type: Schema.Types.ObjectId, ref: 'User'},
	isPublic: {type: Boolean},
	file: {
		fileHTML: {type: String},
		fileCSS: {type: String},
		fileJS: {type: String}
    }
  },
  {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

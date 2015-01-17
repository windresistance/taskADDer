var mongoose = require('mongoose');

//////////////
// list schema
var listSchema = new mongoose.Schema({
	list_name: String,
	// background_color: String,
	list_position: Number,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	tasks: [taskSchema],	// embedded 'taskSchema'
});

mongoose.model('list', listSchema);

//////////////
// task schema
var taskSchema = new mongoose.Schema({
	task_name:  String,
	category: String,
	priority: String,
	task_position: Number,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	hidden: Boolean,
});

// validation
taskSchema.path('task_name').required(true, 'Please insert item text');

mongoose.model('task', taskSchema);


// EXPANDED DOCUMENT SCHEMA (with embedded 'taskSchema'):
/*
var listSchema = new mongoose.Schema({
	list_name: String,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	tasks: [{
		task_name:  String,
		category: String,
		priority: String,
		list_position: Number,
		created_at: { type: Date, default: Date.now },
		updated_at: { type: Date, default: Date.now },
		hidden: Boolean,
	}],
});
*/
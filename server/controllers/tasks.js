var mongoose = require('mongoose');
var task = mongoose.model('task');
var list = mongoose.model('list');

module.exports = {
	
	// render the index page
	index: function(req, res){
		res.render('./../server/views/tasks/index', {title:'Welcome Page'});
	},
	
	// retrieve all list and task data
	index_json: function(req, res){
		// task.find({}).sort({task_position: 1}).exec(function(err, results){
		list.find().sort({list_position: 1}).exec(function(err, results){
			console.log("results= ",results);
			res.send(JSON.stringify(results));
		});
	},
	
	// create a new list
	create_list: function(req, res){
		console.log("create_list:req.body= ",req.body);
		var newList = new list(req.body);
		newList.save(function(err){
			if(err){
				res.send(JSON.stringify(err));	// json(err) will also work
			} else {
				console.log(newList);
				res.send(newList);
			}
		});
	},
	
	// create a new task
	create_task: function(req, res){
		console.log("create_task:req.params= ",req.params);	// list id
		console.log("create_task:req.body= ",req.body);	// task data
		
		list.update(
			// { _id: req.body.list._id },
			{ _id: req.params.id },
			{ $push: { "tasks": req.body } },
			function(err) {
				if(err){
					console.log(JSON.stringify(err));
					res.send(JSON.stringify(err));
				} else {
					res.end();
				}
		 	}
		);
	},
	
	////// FIX:
	// show an individual list/task
	// show: function(req, res){
	// 	console.log(req.params.id);
	// 	res.render('./../server/views/tasks/show', {title: 'Welcome Page'});
	// },
	
	// remove a list
	destroy: function(req, res){
		console.log("destroy:req.params.id= ", req.params.id);
		
		list.remove(
			{_id: req.params.id },
			function(err, count){
				if (err) return next(err);
    			if (count !==1) return next(new Error('Something went wrong.'));
				console.log('Deleted list with id=',req.params._id);
				res.send("SUCCESS");
			}
		)
	},
	
	// remove a task
	removeTask: function(req, res){
		console.log("removeTask:req.params.listid= ",req.params.listid);
		console.log("removeTask:req.params.taskpos= ",req.params.taskpos);
		
		list.findOne(
			{_id: req.params.listid},
			function(err, list){
				var tasks = list.tasks;
				tasks.splice(req.params.taskpos, 1);
				list.tasks = tasks;
				list.save(function(err, list){
					res.send("SUCCESS");
				}
			);
		});
	},
	
	// update the order of the tasks
	update: function(req, res){
		console.log("update= ",req.body);
		
		var thislist = req.body.list;
		var tasks = req.body.tasks;
		
		list.update(
			{ _id: thislist._id },
			{ $set: { tasks: tasks } },
			function(err) {
				if(err){
					res.send(JSON.stringify(err));
				} else {
					res.send("SUCCESS");
				}
		 	}
		);
	}
}
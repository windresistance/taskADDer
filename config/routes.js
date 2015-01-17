var tasks = require('./../server/controllers/tasks.js');

module.exports = function Routes(app){
	
	// default route
	app.get('/', function(req,res) { tasks.index(req,res) });
	
	// get all lists and tasks
	app.get('/tasks/index.json', function(req,res) { tasks.index_json(req,res) });
	// app.get('/tasks', function(req,res) { tasks.index(req,res) });
	
	// new list
	app.post('/tasks/create_list', function(req,res) { tasks.create_list(req,res) });
	
	// new task
	app.put('/tasks/:id/create_task', function(req,res) { tasks.create_task(req,res) });
	
	// view one list/task
	app.get('/tasks/:id', function(req,res) { tasks.show(req,res) });
	
	// delete list
	app.delete('/tasks/:id/delete', function(req, res) { tasks.destroy(req, res); })
	
	// delete task
	app.put('/tasks/:listid/:taskpos', function(req, res) { tasks.removeTask(req, res); })
	
	// rearrange tasks
	app.put('/tasks/update', function(req,res) { tasks.update(req,res) });
	
};

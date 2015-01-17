myApp.factory('TasksFactory', function($http){
	var lists;
	var tasks;
	var factory = {};
	
	// retrieve all lists (tasks are within list data)
	factory.getLists = function(callback){
		$http.get('/tasks/index.json').success(function(data, status, headers, config) {
			for (list in data) {
				data[list].new_task = {};
			}
			callback(data);
			lists = data;
	    });
	}
	
	// factory.getTasks = function(callback){
	// 	$http.get('/tasks/index.json').success(function(data, status, headers, config) {
	// 		callback(data);
	// 		tasks = data;
	//     });
	// }

	// create a new list
	factory.addList = function(list, update_success, update_errors){
		$http.post('/tasks/create_list', list).success(function(data, status, headers, config) {
			if(data.errors) {
				update_errors(data);
			} else {
				lists.push(data);
				update_success(lists);
			}
		})
	}
	
	// create a new task
	factory.addTask = function(list, update_success, update_errors){
		$http.put('/tasks/' + list._id + '/create_task', list.new_task).success(function(data, status, headers, config) {
			if(data.errors) {
				update_errors(data);
			} else {
				lists[lists.indexOf(list)].tasks.push(list.new_task);
				update_success(lists);
			}
		})
	}
	
	// delete a list
	factory.removeList = function(list, callback){
		$http.delete('/tasks/' + list._id + '/delete').success(function(data) {
			if(data == "SUCCESS"){
				lists.splice(lists.indexOf(list), 1);
				callback(lists);
			} else {
				console.log("Something went wrong");
			}
		});
	}
	
	// delete a task
	factory.removeTask = function(list, index, callback){
		$http.put('/tasks/' + list._id + '/' + index).success(function(data) {
			if(data == "SUCCESS"){
				lists[lists.indexOf(list)].tasks.splice(index, 1);
				callback(lists);
			}
		});
	}
	
	factory.rearrange = function(list, tasks, callback){
		var data = {list: list, tasks: tasks};
		$http.put('/tasks/update', data).success(function(err) {
			if(err){
				callback(err);
			} else {
				callback("SUCCESS");
			}
		});
	}
	
	return factory;
})
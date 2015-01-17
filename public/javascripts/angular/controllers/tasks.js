myApp.controller('tasksController', function($scope, TasksFactory){
	// initailize Angular $scope variables
	$scope.new_task = {};
	$scope.new_list = {};
	
	$scope.priorities = [
		{value: 'LOW', name: 'LOW'},
		{value: 'MED', name: 'MED'},
		{value: 'HIGH', name: 'HIGH'},
	];
	
	$scope.common_tasks = [
		{task_name: "clean kitchen", category: "household", priority: "LOW"},
		{task_name: "take out garbage", category: "household", priority: "LOW"},
		{task_name: "buy groceries", category: "errand", priority: "LOW"},
	];
	
	$scope.treeOptions = {
		accept: function(sourceNodeScope, destNodesScope, destIndex) {
			return true;
		},
		dropped: function(event) {
			updateOrder();
		}
	};
	
	
	// invoke these methods immediately!!!
	TasksFactory.getLists(function(lists){
		$scope.lists = lists;
	});
	
	// listen for changes to the order of the tasks
	$scope.$watchCollection('lists[$index].tasks', function(){
		updateOrder();
	});
	
	
	// add a new list
	$scope.addList = function(){
		$scope.new_list.list_position = $scope.lists.length;
		$scope.new_list.tasks = [];
		TasksFactory.addList($scope.new_list,
			function(lists){	// success
				$scope.lists = lists;
				$scope.new_list = {};
				$scope.errors = {};
			},
			function(err){ // error
				$scope.errors = err;
			}
		);
	}
	
	// add a new task
	$scope.addTask = function(list){
		if (typeof list.tasks !== 'undefined' && list.tasks.length > 0) {
			list.new_task.task_position = list.tasks.length;
		} else {
			list.new_task.task_position = 0;
		}
		
		TasksFactory.addTask(list, 
			function(lists){	// success
				$scope.lists = lists;
				list.new_task = {};
				$scope.errors = {};
			},
			function(err){ // error
				$scope.errors = err;
			}
		);
	}
		
	// delete a list
	$scope.delList = function(list){
		if(confirm("Remove list \"" + list.list_name + "\"?")){
			TasksFactory.removeList(list, function(lists){
				$scope.lists = lists;
			});
		}
	}
	
	// delete a task
	$scope.delTask = function(list, index){
		TasksFactory.removeTask(list, index, function(lists){
			$scope.lists = lists;
		});
	}
	
	// update the order of the tasks if they are rearranged
	var updateOrder = function(){
		for(list in $scope.lists){
			var position = 0;
			var arr_tasks = [];
			
			for(task in $scope.lists[list].tasks){
				$scope.lists[list].tasks[task].task_position = position;
				arr_tasks.push($scope.lists[list].tasks[task]);
				position++;
			}
			TasksFactory.rearrange($scope.lists[list], arr_tasks, function(){
				$scope.lists[list].tasks = arr_tasks;
			});
		}
	}
	
	// edit a list
	$scope.editList = function(list){
	}
	
		// edit a list title
		$scope.editListTitle = function(list){
			angular.element('[listname="'+list.list_name+'"]').html("<input value='"+list.list_name+"'></input><a ng-click='saveListName(list)' href='#'>SAVE</a>");
		}
		
		// save a list name
		$scope.saveListName = function(list){
			alert(list.list_name);
			angular.element('[listname="'+list.list_name+'"]').html(list.list_name);
		}
	
	// create print view
	$scope.printList = function(list){
		$scope.printedList = list;
	}
});
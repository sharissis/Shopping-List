var app = angular.module('shoppingList', []);

app.controller('ShoppingListController', function($scope, $http) {

	// Initialize items array
	$scope.items = [];

	// Get shopping list items
	$http.get('/items').success(function(items) {
		$scope.items = items;
	}).error(function(error) {
		console.log('Could not get shopping list items.');
	});

	// Add new item
	$scope.addItem = function(newItemName) {

		var isDuplicate = false;

		if (newItemName == '' || newItemName == undefined) {
			$scope.showMessage('#js-message-empty');
		} else {

			// If the item already exists, show a message and remove the entry
			$.each($scope.items, function(i) {
				var name = $scope.items[i].name;
				// Set to lowercase to check word without case sensitivity
				if (newItemName.toLowerCase() == name.toLowerCase()) {
					$scope.showMessage('#js-message-duplicate');
					$scope.newItemName = '';
					isDuplicate = true;
				}
			});

			// Otherwise, add the new item
			if (!isDuplicate) {
				$http.post('/items', {
					name: newItemName,
					purchased: false
				}).success(function(item) {
					$scope.newItemName = '';
					$scope.items.push(item);
					$scope.showMessage('#js-message-added');
				}).error(function(error) {
					console.log('Could not add item.');
				});
			}

		}

	};

	// Remove item
	$scope.removeItem = function(item, event) {

		$(event.target).slideToggle(300, function() {
			$http.delete('/items/' + item.id).success(function() {
				var index = $scope.items.indexOf(item);
				if (index !== -1) {
					$scope.items.splice(index, 1);
				}
			}).error(function(err) {
				console.log('Could not remove item.');
			});
		});

	};

	// Show notification/error messages
	$scope.showMessage = function(messageId) {
		$('#js-add-item-container').addClass('alert');
		$(messageId).fadeIn(600);
		setTimeout(function(){
	        $(messageId).fadeOut(600, function() {
	        	$('#js-add-item-container').removeClass('alert');
	        });
		}, 2500);
	}

});
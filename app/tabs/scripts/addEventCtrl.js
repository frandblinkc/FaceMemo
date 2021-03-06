angular
  .module('tabs')
  .controller('AddEventCtrl', function($scope, $firebaseArray, supersonic, store, Events, Users) {
	var ref = new Firebase("https://scorching-fire-12.firebaseio.com");
	$scope.submit = function() {
		var eventsRef = ref.child("events");
		var userRef = ref.child("users");
		var myuid = store.get('user_id');
		var thisAttendee = {
			id: myuid, 
			role: 'recruiter'
		};
		var newEvent = {
			name: $scope.name,
			description: $scope.description,
			location: $scope.location,
			date: $scope.date.toString(),
			starttime: $scope.starttime.toString(),
			stoptime: $scope.endtime.toString(),
			attendees: [thisAttendee],
			image: "http://www.news.gatech.edu/hg/image/223541/original",
			owner: myuid
		};

		Events.add(newEvent).then(function(ref) {
		$scope.id = ref.key();
		var currentUser = Users.get(myuid);
		// alert("here4" + angular.toJson(currentUser));
		console.log($scope.id);
		currentUser.myEvents.push($scope.id);
		Users.save(currentUser);
		alert("Your event was successfully created")
		supersonic.ui.layers.pop();
		});
	}
});
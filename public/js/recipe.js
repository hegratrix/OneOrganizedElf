let recipeLists = []
//variable naming which list is being used
let addingToList 
let currentID 

//Displays list titles when page loads
function displayLists() {
	recipeLists = [];
	setTimeout(function() {
		currentID = firebase.auth().currentUser.uid;
		//adds greeting
		$.get(`usersList/${currentID}`, function (data) {
			$('.greeting').text(`Happy Holidays ${data[0].userNickname}!`);
		})
		//pulls list titles and pushes into recipeLists array
    $.get(`/recipeList/${currentID}`, function (data) {
			for (let i=0; i< data.length; i++) {
				if (recipeLists.includes(data[i].whichList) === false) {
					recipeLists.push(data[i].whichList);
				};
			};
			recipeLists.forEach(function(item) {
				$('#add-recipe-list').append (`
					<div class="delete-list-div">
						<br><a class="added-to-list" onclick="showList('${item}')">${item}</a>
						<button class="delete-list-button" onclick="deleteList('${item}')">Delete</button>
					</div>
				`);
			});
    });
	}, 1000);
};

//add recipe to database
function addRecipeItem() {
	event.preventDefault();
	var newRecipeImageInput = $("#recipeImage").val();
	var newRecipeNameInput = $("#recipeType").val();
	var newRecipeLinkInput = $("#recipeLink").val();
	var newRecipeMakesInput = $("#recipeMakes").val();
	var recipe = {
		whichList: addingToList,
		recipeImage: newRecipeImageInput,
		recipeName: newRecipeNameInput,
		recipeLink: newRecipeLinkInput,
		recipeMakes: newRecipeMakesInput,         
		complete: false,
		usersListId: currentID
	};
	$.post("/recipeList", recipe)
	.then(r => {
		$("#recipeImage").val('');
		$("#recipeType").val('');
		$("#recipeLink").val('');
		$("#recipeMakes").val('');
		showList(addingToList);
	});
};

//shows the items for the list clicked
function showList(Name) {
	addingToList = Name;
	$('#recipe-list-title').html(`${Name} Recipe List`);
	$('.recipe-table-body').empty();
	$('.done-recipe-table-body').empty();
	$.get(`/recipeList/${currentID}`, function (data) {
		for (let i=0; i<data.length; i++) {
			if (data[i].whichList === Name && data[i].complete === false) {
				$('.recipe-table-body').append(`
					<tr>
						<td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
						<td><img class="recipe-pic" src="${data[i].recipeImage}"></td>
						<td>${data[i].recipeName}</td>
						<td><a href="${data[i].recipeLink}">Recipe</a></td>
						<td>${data[i].recipeMakes}</td>
						<td><button id="edit-recipe-list" class="add-to-table" onclick="editRecipeItem(${data[i].id})">Edit</button></td>
						<td><button id="delete-recipe-list" class="add-to-table" onclick="deleteRecipeItem(${data[i].id})">Delete</button></td>
					</tr>
				`);
			} else {
				if (data[i].whichList === Name) {
					$('.done-recipe-table-body').append(`
						<tr>
							<td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
							<td><img class="recipe-pic" src="${data[i].recipeImage}"></td>
							<td>${data[i].recipeName}</td>
							<td><a href="${data[i].recipeLink}">Recipe</a></td>
							<td>${data[i].recipeMakes}</td>
							<td><button id="edit-recipe-list" class="add-to-table" onclick="editRecipeItem(${data[i].id})">Edit</button></td>
							<td><button id="delete-recipe-list" class="add-to-table" onclick="deleteRecipeItem(${data[i].id})">Delete</button></td>
						</tr>
					`);
				};
			};
		};
	});
	$('#show-recipe-details').css('display', 'block');
 };

 //add list title
function addToRecipeList() {
	event.preventDefault();
	let listName = $('#add-to-recipe-list').val();
	$('#add-recipe-list').append (`<div class="delete-list-div">
			<br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
			<button class="delete-list-button" onclick="deleteList('${listName}')">Delete</button>
		</div>
	`);
	$('#add-to-recipe-list').val('');
};

//show completed tasks
function showCompleted() {
	$('#show-recipe-done').css('display', 'block');
	$('#show-recipe').css('display', 'none');
	$('#hide-recipe').css('display', 'block');
};

//hide completed tasks
function hideCompleted() {
	$('#show-recipe-done').css('display', 'none');
	$('#show-recipe').css('display', 'block');
	$('#hide-recipe').css('display', 'none');
};

//delete item
function deleteRecipeItem(id) {
	event.stopPropagation();
	fetch(`/recipeList/${id}`, {
		method: 'DELETE'
	}).then(r=> {
		showList(addingToList);
	});
};

//change complete status
function changeStatus(idStatus) {
	let isComplete;
	$.get(`/recipeList/${currentID}`, function (data) {
		for (i=0; i<data.length; i++) {
			if (data[i].id === idStatus) {
				isComplete = data[i].complete;
			};
		};
	})
	.then(r => {
		if (isComplete === true) {
			fetch(`/recipeList/${idStatus}`, {
				method: "PUT",
				headers: { 'Content-Type' : 'application/json; charset=utf-8'},
				body: JSON.stringify({ complete: false })
			}).then(r=> {
				showList(addingToList);
			});
		} else {
			fetch(`/recipeList/${idStatus}`, {
				method: "PUT",
				headers: { 'Content-Type' : 'application/json; charset=utf-8'},
				body: JSON.stringify({ complete: true })
			}).then(r=> {
					showList(addingToList);
			});
		};
	});
};

//fills in and opens edit modal
function editRecipeItem (id) {
	$.get(`/recipeList/${currentID}`, function (data) {
		for (i=0; i<data.length; i++) {
			if (data[i].id === id) {
				$('#modal5-id').val(id);
				$("#recipe-list").val(data[i].whichList);            
				$("#recipe-image").val(data[i].recipeImage);             
				$("#recipe-type").val(data[i].recipeName);
				$("#recipe-link").val(data[i].recipeLink);
				$("#recipe-makes").val(data[i].recipeMakes);
			}
		}
	}).then(r => {
		$('.modal5').css('display', 'block');
	});
};

//edit itme
function updateItem () {
	let id = $("#modal5-id").val();
	let list = $('#recipe-list').val();
	let image = $('#recipe-image').val();
	let type = $('#recipe-type').val();
	let link = $('#recipe-link').val();
	let makes = $('#recipe-makes').val();
	fetch(`/recipeList/${id}`, {
		method: "PUT",
		headers: { 'Content-Type' : 'application/json; charset=utf-8'},
		body: JSON.stringify({ whichList: list, recipeImage: image, recipeName: type, recipeLink: link, recipeMakes: makes})
	}).then(r=> {
    $('.modal5').css('display', 'none');
    $("#modal5-id").val('');
		$('#recipe-list').val('');
		$('#recipe-image').val('');
		$('#recipe-type').val('');
		$('#recipe-link').val('');
		$('#recipe-makes').val('');
		showList(addingToList);
	});
};

//delete list and its items;
function deleteList(name) {
	$.get(`/recipeList/${currentID}`, function (data) {
		for (let i=0; i<data.length; i++) {
			if (data[i].whichList === name){
				let id = data[i].id;
				fetch(`/recipeList/${id}`, {
					method: 'DELETE'
				});
			};
		};
	}) 
	.then(r=> {
    recipeLists = [];
    showList(addingToList);
	});     
};
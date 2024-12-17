import React , {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [input, setInput] = useState("")
	const [task, setTask] = useState([])


	// const AddNewTask = () => {
	// 	setTask([...task, input])
	// 	setInput("")
	// }
	// console.log(task)

	useEffect (() => {

		getUserTask()
		// createTask ()

	}, [] )
	
	const createUser = () => {
		fetch('https://playground.4geeks.com/todo/users/daniel', {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json' 
			},
			body: JSON.stringify() 
		})
		.then(response => {

			return response.json();
		})
		.then(data => {
			console.log(data);
		})
		.catch(error => {
			console.log(error);
		});

	}
	
	const getUserTask = () => {
		fetch('https://playground.4geeks.com/todo/users/daniel')
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				setTask(data.todos)
			})
			.catch(error => {
				console.log(error);
			});
	}
	const createTask = (input) => {
		fetch('https://playground.4geeks.com/todo/todos/daniel', {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json' 
			},
			body: JSON.stringify({
				"label": input,
				"is_done": false
			}) 
		})
		.then(response => {

			console.log ("TAREA  CREADA");
			return response.json();
		})
		.then(data => {
			setInput("")
			getUserTask()
			console.log(data);
		})
		.catch(error => {
			console.log(error);
		});

	}
	const deleteTask = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: 'DELETE', 
			headers: {
				'Content-Type': 'application/json' 
			},
		})
		// .then(response => {

		// 	console.log ("estoy dentro");
		// 	return response.json();
		// })
		.then(data => {
			getUserTask()
			console.log(data);
		})
		.catch(error => {
			console.log(error);
		});

	}
		

	return (
		<div className="d-flex justify-content-center container-fluid ">
			<div className="text-center ">
				<h1>To do List</h1>
				<div className="card mt-5 " style={{ width: "25rem" }}>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<input type="text"
								placeholder="AddNewTask"
								value={input}
								onChange={(e) => {
									console.log("miTarea:", e.target.value)
									setInput(e.target.value)
								}}

								onKeyDown={(e) => {
									if (e.key === "Enter") {
										createTask(input)
									}
								}}
							/></li>
						{task.map((tasks) => (
							<li key={tasks.id} className="list-group-item">{tasks.label} {tasks.id}<button onClick={() => {
								 deleteTask(tasks.id) }}>x</button></li>

						))}

					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;

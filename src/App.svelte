<script>
	import { shuffle } from 'lodash';

	let names = [
		{ firstName: 'Tony', lastName: 'Stark', movies: 10, age: 45 },
		{ firstName: 'Steve', lastName: 'Rogers', movies: 9, age: 100 },
		{ firstName: 'Thor', lastName: 'Odinson', movies: 8, age: 1500 },
		{ firstName: 'Bruce', lastName: 'Banner', movies: 6, age: 50 },
		{ firstName: 'Natasha', lastName: 'Romanoff', movies: 7, age: 36 },
		{ firstName: 'Clint', lastName: 'Barton', movies: 6, age: 45 },
		{ firstName: 'Peter', lastName: 'Parker', movies: 5, age: 22 },
		{ firstName: 'Wanda', lastName: 'Maximoff', movies: 5, age: 30 },
		{ firstName: 'Stephen', lastName: 'Strange', movies: 4, age: 42 },
		{ firstName: 'Scott', lastName: 'Lang', movies: 3, age: 45 }
	];

	let casts = ['Tony', 'captain', 'thor'];

	function handleShuffle() {
		names = shuffle([...names]); // Create a new array and shuffle it
	}

	function handleShuffle1() {
		casts = shuffle([...casts]); // Create a new array and shuffle it
	}
</script>

<main>
	<button on:click={handleShuffle} class="shuffle-button">Shuffle</button>
	<table>
		<thead>
			<tr>
				<th>#</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Movies</th>
				<th>Age</th>
				<th>Placeholder</th>
			</tr>
		</thead>
		<tbody>
      <!-- Add id if you want to shuffle placeholder also -->
			{#each names as { firstName, lastName, movies, age }, index (firstName)}
      	<tr>
      		<td>{index + 1}</td>
      		<td>{firstName}</td>
      		<td>{lastName}</td>
      		<td>{movies}</td>
      		<td>{age}</td>
      		<td><input placeholder="Table placeholder"></td> <!-- Static placeholder -->
      	</tr>
      {/each}
		</tbody>
	</table>
	<button on:click={handleShuffle1} class="shuffle-button">Shuffle</button>
	{#each casts as name (name)}
      <h2>{name}</h2>
      <input placeholder="Cast placeholder"> <!-- Static placeholder -->
    {/each}
</main>

<style>
	/* Styling for the main container, centers the content and restricts the width */
	main {
		text-align: center; /* Centers the text horizontally */
		padding: 1em; /* Adds padding inside the container */
		max-width: 800px; /* Sets the maximum width of the container */
		margin: 0 auto; /* Centers the container horizontally on the page */
	}

	table {
		width: 100%; /* Makes the table span the full width of the container */
		border-collapse: collapse; /* Collapses table borders */
		margin: 1em 0; /* Adds vertical spacing around the table */
	}

	th, td {
		border: 1px solid #ddd; /* Adds borders to table cells */
		padding: 0.8em; /* Adds padding inside cells */
		text-align: left; /* Aligns text to the left */
	}

	th {
		background-color: #f4f4f4; /* Adds a background color to header cells */
	}

	.shuffle-button {
		padding: 0.5em 1em; /* Adds padding inside the button */
		background-color: #007bff; /* Sets the background color of the button */
		color: #fff; /* Sets the text color */
		border: none; /* Removes default border */
		border-radius: 4px; /* Adds rounded corners */
		cursor: pointer; /* Changes cursor to pointer on hover */
		font-size: 1em; /* Adjusts the font size */
		margin-bottom: 1em; /* Adds space below the button */
	}

	.shuffle-button:hover {
		background-color: #0056b3; /* Changes button color on hover */
	}
</style>

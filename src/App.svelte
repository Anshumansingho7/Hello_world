<script>
	const names = [
		{ firstName: 'Tony', lastName: 'Stark', movies: 10, age: 45 },
		{ firstName: 'Steve', lastName: 'Rogers', movies: 9, age: 100 },
		{ firstName: 'Thor', lastName: 'Odinson', movies: 8, age: 1500 }
	]
</script>

<main>
	{#each names as { firstName, lastName, movies, age }, index}
		<h1>{index + 1}. {firstName} {lastName}</h1>
		<p>Movies: {movies}</p>
		<p>Age: {age}</p>
	{/each}
</main>

<style>
	/* Styling for the main container, centers the content and restricts the width */
	main {
		text-align: center; /* Centers the text horizontally */
		padding: 1em; /* Adds padding inside the container */
		max-width: 240px; /* Sets the maximum width of the container */
		margin: 0 auto; /* Centers the container horizontally on the page */
	}

	h1 {
		margin: 0.5em 0; /* Adds some space around the heading */
	}

	p {
		margin: 0.2em 0; /* Adds some space around the paragraph */
		font-size: 1em; /* Adjusts the font size */
	}
</style>

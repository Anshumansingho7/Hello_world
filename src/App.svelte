<script>
	// Defining a constant 'name' with the value 'Anshuman'
	const name = 'Anshuman';
	
	// Defining a constant 'channel' with an HTML paragraph element containing 'Anshuman'
	const channel = '<p>Anshuman</p>';
	
	// Defining a constant 'hack' with a potentially malicious anchor element
	// that triggers an alert when clicked
	const hack = `<a href="#" onclick="alert('You have been Hacked!')">Win a prize!</a>`;

	// Initializing a variable 'count' to 0
	let count = 0;

	// Defining a function 'increase' to increment the count by 1
	const increase = () => {
		count += 1;
	};
	
	// Defining a function 'decrease' to decrement the count by 1
	const decrease = () => {
		count -= 1;
	};
</script>

<main>
	<!-- Displaying a heading with a greeting and the result of 2+2 -->
	<h1>Hello {name} { 2 + 2 }</h1>

	<!-- Rendering the 'channel' constant as HTML content -->
	<div>{@html channel}</div>

	<!-- Rendering the 'hack' constant as HTML content (be cautious with this) -->
	<div>{@html hack}</div>

	<!-- Displaying the current value of 'count' and providing buttons to increase/decrease the count -->
	<div>
		<h2>Count: {count}</h2>
		<button on:click={increase}>Increase</button>
		<button on:click={decrease}>Decrease</button>
	</div>
</main>

<style>
	/* Styling for the main container */
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	/* Styling for the h1 heading */
	h1 {
		color: #ff3e00; /* Orange color for the text */
		text-transform: uppercase; /* Uppercase text */
		font-size: 4em; /* Large font size */
		font-weight: 100; /* Light font weight */
	}

	/* Styling for the h2 heading */
	h2 {
		margin: 1em 0; /* Margin around the heading */
		font-size: 2em; /* Medium font size */
	}

	/* Styling for the buttons */
	button {
		font-size: 1em; /* Medium font size */
		margin: 0.5em; /* Small margin around the button */
		padding: 0.5em 1em; /* Padding inside the button */
		cursor: pointer; /* Pointer cursor on hover */
	}

	/* Responsive styling: When the screen width is 640px or more */
	@media (min-width: 640px) {
		main {
			max-width: none; /* Remove the max-width restriction */
		}
	}
</style>

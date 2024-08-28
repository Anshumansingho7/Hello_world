<script>
	// Defining a constant 'name' with the value 'Anshuman'
	const name = 'Anshuman';

	// Defining a constant 'channel' that contains HTML code for a paragraph element with the text 'Anshuman'
	const channel = '<p>Anshuman</p>';

	// Defining a constant 'hack' that contains an anchor element with an onclick event triggering an alert
	// This is an example of potentially dangerous code, often referred to as a security risk (like XSS)
	const hack = `<a href="#" onclick="alert('You have been Hacked!')">Win a prize!</a>`;

	// Defining a constant 'headingId' to hold the id value for an HTML element
	const headingId = 'heading';

	// Defining a constant 'disabled' which will disable the button when bound to it
	const disabled = true;

	// Defining a constant 'isPromoted' to control conditional styling for a heading element
	const isPromoted = true;

	// Initializing a variable 'count' with an initial value of 0
	let count = 0;

	// Defining a function 'increase' that increments the value of 'count' by 1
	const increase = () => {
		count += 1;
	};

	// Defining a function 'decrease' that decrements the value of 'count' by 1
	const decrease = () => {
		count -= 1;
	};
</script>

<main>
	<!-- Displaying a heading that includes the 'name' and the result of the expression 2 + 2 -->
	<h1 class="underline">Hello {name} { 2 + 2 }</h1>

	<!-- Rendering the HTML content stored in 'channel' using the {@html} directive -->
	<div>{@html channel}</div>

	<!-- Rendering the HTML content stored in 'hack'; this will create a clickable link that triggers an alert -->
	<div>{@html hack}</div>

	<!-- Adding an h2 element with an id assigned from the 'headingId' constant -->
	<h2 id={headingId}>This is a heading</h2>

	<!-- Adding another h2 element with conditional styling based on the 'isPromoted' constant class applied if is promoted is true-->
	<h2 class:promoted={isPromoted}>This is a heading</h2>

	<!-- Creating a button element with the 'disabled' attribute bound to the 'disabled' constant -->
	<button {disabled}>Bind</button>

	<!-- Creating a section that displays the current value of 'count' and two buttons to change the value -->
	<div>
		<!-- Displaying the current value of 'count' inside an h2 element -->
		<h2>Count: {count}</h2>

		<!-- Creating a button that calls the 'increase' function when clicked -->
		<button on:click={increase}>Increase</button>

		<!-- Creating a button that calls the 'decrease' function when clicked -->
		<button on:click={decrease}>Decrease</button>
	</div>
</main>

<style>
	/* Styling for the underline class */
	.underline {
		text-decoration: underline; /* Underlines the text */
	}

	/* Styling for the promoted class */
	.promoted {
		color: rgb(5, 68, 68); /* Sets the text color to a specific shade of green */
	}

	/* Styling for the main container, centers the content and restricts the width */
	main {
		text-align: center; /* Centers the text horizontally */
		padding: 1em; /* Adds padding inside the container */
		max-width: 240px; /* Sets the maximum width of the container */
		margin: 0 auto; /* Centers the container horizontally on the page */
	}

	/* Styling for the h1 heading element */
	h1 {
		color: #ff3e00; /* Sets the text color to orange */
		text-transform: uppercase; /* Converts the text to uppercase */
		font-size: 4em; /* Sets a large font size */
		font-weight: 100; /* Applies a light font weight */
	}

	/* Styling for the h2 heading elements */
	h2 {
		margin: 1em 0; /* Adds vertical margin around the element */
		font-size: 2em; /* Sets a medium font size */
	}

	/* Styling for button elements */
	button {
		font-size: 1em; /* Sets a medium font size for the button text */
		margin: 0.5em; /* Adds margin around the button */
		padding: 0.5em 1em; /* Adds padding inside the button */
		cursor: pointer; /* Changes the cursor to a pointer when hovering over the button */
	}

	/* Media query for screens wider than 640px */
	@media (min-width: 640px) {
		/* Removes the max-width restriction on the main container for larger screens */
		main {
			max-width: none;
		}
	}
</style>

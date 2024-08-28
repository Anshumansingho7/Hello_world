<script>
	const num = 5
</script>

<main>
	{#if num === 0}
	    <h2>The number is zero</h2>
	{:else if num < 0}
	    <h2>The number is negative</h2>
	{:else if num > 0}
	    <h2>The number is positive</h2>
	{:else}
	    <h2>Not a number</h2>
	{/if}	
	
</main>

<style>
	/* Styling for the main container, centers the content and restricts the width */
	main {
		text-align: center; /* Centers the text horizontally */
		padding: 1em; /* Adds padding inside the container */
		max-width: 240px; /* Sets the maximum width of the container */
		margin: 0 auto; /* Centers the container horizontally on the page */
	}
</style>

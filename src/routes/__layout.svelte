<script>
	import { onMount } from 'svelte';
	//import { themeChange } from 'theme-change';
	import '../app.css';

	onMount(async () => {
	
		//themeChange(false);
	});
</script>

	<main class="container mx-auto grid gap-1 sm:grid-cols-1 lg:grid-cols-2 justify-evenly">
		<slot />
	</main>


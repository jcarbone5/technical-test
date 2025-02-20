<script lang="ts">
	import '../app.css';
	import Header from '../components/Header.svelte';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<main class="font-poppins h-screen antialiased">
	<Header />

	<Toaster position="bottom-right" richColors />

	{@render children()}
</main>

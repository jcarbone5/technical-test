<script>
	import FadeIn from './FadeIn.svelte';
	import avatar from '../assets/avatar.svg';
</script>

<FadeIn>
	<div class="relative space-y-4">
		<h1 class="text-4xl font-semibold">Check your balance</h1>

		<h3 class="w-full text-3xl font-medium md:w-80">Check your USDT balance for Sepolia network</h3>

		<p class="text-sm font-light">Lorem ipsum</p>

		<img alt="Avatar" src={avatar} class="absolute top-24 -right-32 z-50 hidden h-96 lg:block animate-slow-bounce" />
	</div>
</FadeIn>

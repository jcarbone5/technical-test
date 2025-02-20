<script lang="ts">
	import { walletStore, balanceStore } from '$lib';
	import FadeIn from './FadeIn.svelte';
	import { DoubleBounce } from 'svelte-loading-spinners';

	const toggleWalletConnection = () => {
		if ($walletStore.isConnected) {
			walletStore.disconnect();
		} else {
			walletStore.connect();
		}
	};
</script>

<FadeIn>
	<div class="flex w-full flex-col space-y-6 md:w-96">
		<h3 class="hidden text-3xl font-medium md:block">Balance:</h3>

		<div class="flex h-56 items-center justify-center rounded-sm bg-[#F0EFFF]">
			{#if $balanceStore.loading}
				<DoubleBounce size="40" color="#4D47C3" unit="px" duration="2s" />
			{:else}
				<h2 class="text-3xl font-semibold">{$balanceStore.balance} USDT</h2>
			{/if}
		</div>

		<button
			on:click={toggleWalletConnection}
			class="w-full rounded-sm bg-[#4D47C3] p-4 text-white shadow-lg transition-opacity duration-300 hover:opacity-80"
		>
			{$walletStore.isConnected ? `${$walletStore.address?.slice(0, 8)}...` : 'Connect your wallet'}
		</button>
	</div>
</FadeIn>

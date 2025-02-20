import { http, createConfig } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { metaMask } from '@wagmi/connectors';
import { sepoliaURL } from '$lib/utils/sepoliaURL';

const chains = [sepolia] as const;

export const config = createConfig({
	chains: chains,
	connectors: [metaMask()],
	transports: {
		[sepolia.id]: http(sepoliaURL)
	}
});

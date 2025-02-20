import { writable, get } from 'svelte/store';
import { getAccount, injected, type GetAccountReturnType } from '@wagmi/core';
import { connect, reconnect, disconnect, watchAccount, readContract } from '@wagmi/core';
import { formatUnits, parseAbi } from 'viem';
import { config } from '$lib';
import { usdtAddress } from '$lib/utils/usdtAddress';
import { toast } from 'svelte-sonner';

type Wallet = GetAccountReturnType;
type Balance = {
	balance: number;
	loading: boolean;
};

export const connectWallet = async () => {
	try {
		await connect(config, { connector: injected() });
		walletStore.set(getAccount(config));

		toast.success('Wallet is connected!');
	} catch (error) {
		if (error instanceof Error) {
			toast.error(error.message);
		}
	}
};

export const disconnectWallet = async () => {
	await disconnect(config);
	toast.success('Wallet is disconnected!');

	walletStore.set(getAccount(config));
	balanceStore.set({ balance: 0, loading: false });
};

export const getBalance = async () => {
	const account = get(walletStore);
	if (!account.address) return balanceStore.set({ balance: 0, loading: false });

	balanceStore.set({ balance: 0, loading: true });

	try {
		const currentBalance = await readContract(config, {
			address: usdtAddress,
			abi: parseAbi(['function balanceOf(address _owner) view returns (uint256)']),
			functionName: 'balanceOf',
			args: [account.address]
		});

		const balance = Number(formatUnits(currentBalance, 6));

		balanceStore.set({ balance, loading: false });

		if (balance > 0) {
			toast.success('Balance obtained successfully');
		} else {
			toast.warning('You don’t have any USDT');
		}
	} catch (error) {
		console.log(error);

		toast.error('Error getting balance');
		balanceStore.set({ balance: 0, loading: false });
	}
};

const createWalletStore = () => {
	const { set, subscribe, update } = writable<Wallet>(getAccount(config));

	return {
		subscribe,
		set,
		update,
		connect: connectWallet,
		disconnect: disconnectWallet
	};
};

const createBalanceStore = () => {
	const { set, subscribe, update } = writable<Balance>({ balance: 0, loading: false });

	return {
		subscribe,
		set,
		update
	};
};

export const walletStore = createWalletStore();
export const balanceStore = createBalanceStore();

watchAccount(config, {
	onChange: async (account) => {
		walletStore.set(account);
		if (account.isConnected) {
			await getBalance();
		}
	}
});
reconnect(config);

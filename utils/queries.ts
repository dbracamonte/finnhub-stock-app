import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/api";
import { useStore } from "./store/useStore";

export type stock = {
	currency: string;
	description: string;
	displaySymbol: string;
	figi: string;
	isin: any;
	mic: string;
	shareClassFIGI: string;
	symbol: string;
	symbol2: string;
	type: string;
};

export interface ICryptoSymbol {
	description: string;
	displaySymbol: string;
	symbol: string;
}

const fetchCryptoSymbols = async (): Promise<ICryptoSymbol[]> => {
	const { data }: { data: ICryptoSymbol[] } = await get({
		url: `crypto/symbol?exchange=coinbase`,
	});
	return data;
};

export const useCryptoSymbols = () => {
	const symbols = useStore((state) => state.symbols);
	const { setSymbols } = useStore();
	
	const { isLoading, isPending, error } = useQuery({
		queryKey: ["crypto-symbols-binance"],
		queryFn: async () => {
			const data = await fetchCryptoSymbols();
			setSymbols(data);
			return data;
		},
	});

	return {
		symbols,
		loading: isLoading || isPending,
		error,
	};
};

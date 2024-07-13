import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ICryptoSymbol } from "../queries";

type TStatus = "pending" | "connected" | "active" | "closed" | "error";

export interface ITrade extends ICryptoSymbol {
	p: number;
	s: string;
	t: number;
	v: number;
	origPrice?: number;
	alertPrice?: number;
}

export const WATCHLIST = [
	{
		description: "COINBASE BTC/USD",
		displaySymbol: "BTC/USD",
		symbol: "COINBASE:BTC-USD",
	},
	{
		description: "COINBASE ETH/USD",
		displaySymbol: "ETH/USD",
		symbol: "COINBASE:ETH-USD",
	},
	{
		description: "Oanda EUR/USD",
		displaySymbol: "EUR/USD",
		symbol: "OANDA:EUR_USD",
	},
];

export interface IStore {
	status: TStatus;
	setStatus: (status: TStatus) => void;
	symbols: ICryptoSymbol[];
	setSymbols: (trades: ICryptoSymbol[]) => void;
	watchlist: ICryptoSymbol[];
	setWatchlist: (symbol: ICryptoSymbol[]) => void;
	trades: ITrade[];
	setTrades: (trades: ITrade[]) => void;
	addAlert: (symbol: string, price: number) => void;
	removeAlert: (symbol: string) => void;
}

export type TradeAccumulator = {
	[symbol: string]: ITrade;
};

export const useStore = create<IStore>()(
	persist(
		(set) => ({
			status: "pending",
			setStatus: (status: TStatus) => set(() => ({ status })),
			symbols: [],
			setSymbols: (symbols: ICryptoSymbol[]) => set(() => ({ symbols })),
			watchlist: WATCHLIST,
			setWatchlist: (watchlist: ICryptoSymbol[]) => set(() => ({ watchlist })),
			trades: [],
			setTrades: (trades: ITrade[]) =>
				set((prev) => {
					const watchlist = prev.watchlist;
					const newData = trades?.reduce<TradeAccumulator>((acc, item) => {
						const prevItem = prev.trades?.find((trade) => trade.s === item.s);

						acc[item.s] = {
							...prev.watchlist.find((wl) => wl.symbol === item.s),
							...item,
							origPrice: prevItem?.origPrice ?? item.p,
						};
						return acc;
					}, {});

					const prevData = prev.trades?.reduce<TradeAccumulator>(
						(acc, item) => {
							if (watchlist.some((wl) => wl.symbol === item.s)) {
								acc[item.s] = item;
							}
							return acc;
						},
						{}
					);

					const mergedData = { ...prevData, ...newData };

					return { trades: Object.values(mergedData) };
				}),
			addAlert: (symbol: string, price: number) =>
				set((prev) => {
					const newTrades = prev.trades.map((trade) => {
						if (trade.symbol === symbol) {
							return {
								...trade,
								alertPrice: price,
							};
						}
						return trade;
					});
					return { trades: newTrades };
				}),
			removeAlert: (symbol: string) =>
				set((prev) => {
					const newTrades = prev.trades.map((trade) => {
						if (trade.symbol === symbol) {
							return {
								...trade,
								alertPrice: undefined,
							};
						}
						return trade;
					});
					return { trades: newTrades };
				}),
		}),
		{
			name: "app-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);

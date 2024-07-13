import { useEffect, useState } from "react";
import { ITrade, useStore } from "../store/useStore";

export const useFinnhubWebSocket = () => {
	const [socket, setSocket] = useState<WebSocket | null>(null);

	const watchlist = useStore((state) => state.watchlist);
	const trades = useStore((state) => state.trades);
	const symbols = useStore((state) => state.symbols);
	const status = useStore((state) => state.status);
	const { setTrades, setWatchlist, setStatus } = useStore();

	useEffect(() => {
		const ws = new WebSocket(
			`wss://ws.finnhub.io?token=${process.env.EXPO_PUBLIC_API_KEY}`
		);

		ws.onopen = () => {
			setStatus("connected");
			watchlist.forEach((symbol) => {
				ws.send(JSON.stringify({ type: "subscribe", symbol: symbol.symbol }));
			});
		};

		ws.onmessage = (event) => {
			setStatus("active");

			const { data }: { data: ITrade[] } = JSON.parse(event.data);

			if (!Array.isArray(data)) return;

			setTrades(data);
		};

		ws.onclose = () => {
			setStatus("closed");
		};

		ws.onerror = () => {
			setStatus("error");
		};

		setSocket(ws);

		// return () => {
		// 	ws.close();
		// };
	}, [watchlist]);

	const subscribe = (symbol: string) => {
		if (socket) {
			const _symbol = symbols.find((s) => s.symbol === symbol);
			const newWatchlist = _symbol ? [...watchlist, _symbol] : watchlist;
			setWatchlist(newWatchlist);
		}
	};

	const unsubscribe = (symbol: string) => {
		if (socket) {
			const newWatchlist = watchlist.filter((s) => s.symbol !== symbol);
			setWatchlist(newWatchlist);
		}
	};

	return { data: trades, status, subscribe, unsubscribe };
};

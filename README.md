Instructions:

You can choose either of the two exercises. We encourage you to send us whatever you have done, even if you don't finish the test.

The easy one:

1. Create a React Native app (Typescript and using components, not functional) for showing stock data in real time using Finnhub Stock APIs

2. The app should have 3 screens:

a. Add alert: A form with 2 fields, a dropdown to select a stock to watch and an input for price alert.

b. Watchlist (similar to Finnhub home at the top), for showing the stock as cards, showing the name, value and marginal change as a percentage.

"p": 7296.89, // last price
"s": "BINANCE:BTCUSDT", // Symbol
"t": 1575526691134, // UNIX milliseconds timestamp.
"v": 0.011467 Volume.

c. A graph for plotting the value of all stocks watched in dollar value.

3. For real time tracking use Sockets API

The real challenge, same as the easy one but:

1. Adding Auth0 authentication

2. Adding local push notification when the price goes higher than the price alert
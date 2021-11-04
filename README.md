# bleskophone
Smartphone app for signed offline QRs to withdraw from LNbits

This app works as an offline companion for [LNbits](https://github.com/lnbits/lnbits-legend)'s Bleskomat extension. It generates qr-encoded, signed lnurls that authorize the withdrawal of a given amount (the exchange rate is handled by the LNbits instance).

It can be used as a meatbag-assisted [Bleskomat](https://github.com/samotari/bleskomat-diy), for selling Bitcoin to buyers in a physical setting. The operator types the amount in fiat currency and, upon receiving the cash (or equivalent goods) authorizes the display of a QR code. The buyer then scans the QR code to withdraw the satoshis from it to their wallet; the buyer's wallet does need to have an online connection.

More generally, the Bleskophone app can also be used for buying goods or services in a physical setting, paid in Bitcoin. In this case, the customer is offline and the merchant has an online connection. The customer generates the QR code upon receiving the goods, and then the merchant scans it to withdraw the equivalent number of satoshis. 

The customer's LNbits instance chooses the exchange rate in that case, so the customer should have set it up to zero fee, and even then the merchant might want to cross-check the rate and eventually demand an extra if it's not enough. Alternatively, the app could be set up to make QRs that are directly denominated in satoshis; the merchant would start by checking the exchange rate in their wallet, and then quoting the price of the goods to the customer already in sats. 

The app is coded in Quasar/Vue. It uses androidjs for packaging, for Android or iOS, but the entire functionality runs in webview or browser javascript, so it could be used from a browser too. The app requires internet permission because of that, but it fetches no remote content and it can be used entirely offline.

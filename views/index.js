// Copyright (C) 2021 Bleskomatizer
// SPDX-License-Identifier: MIT
/*
    The Bleskomat https://github.com/samotari/bleskomat-diy is an LNURL-based ATM which uses offline, low power, inexpensive hardware.
    It basically counts coins and then displays a corresponding lnurl-withdraw QR. Then, the server (bleskomat-server or lnbits), paired
    with an LN node, authenticates the HMAC code, calculates the exchange rate, and calls back the payer to retrieve and pay their LN invoice.

    This script generates lnurl-withdraw codes in the same way, as a "manual Bleskomat" of sorts, or for testing.
*/



# Uplift CSV CUP UI (Uplift CSV Upload Program UI)

This app is designed to lower the bar and reduce human error when processing csv files from Paypal or Stripe.
It will produce a number of output csv files properly processed for upload to Engaging Networks.
It is an electron app so anyone can easily complete the upload process regardless of technical ability.
It has not yet been tested on Mac or Unix, but works fine on Windows.

This App leverages the custom built module [uplift-csv-cup](https://www.npmjs.com/package/uplift-csv-cup) available from
NPM.

## Getting data

For Paypal you can [download from here](https://history.paypal.com/cgi-bin/webscr?cmd=_history-download).
Just make sure you select all transactions in the period since the last upload... If you don't know when that is, you 
need to check or you will end up with duplicates.

For Stripe you should go to [all payments on the dashboard](https://dashboard.stripe.com/payments) and set the filters
to the correct period. Once again, if you're unsure on the period, find out before processing or you will cause 
duplication.

## Using the app

The UI is simple, you need to choose three options, the input file, the output directory and whether it is in Stripe
or PayPal format. It uses native file I/O dialogs and drag & drop file selection. You should only be able to click to process once the options are selected. The app has no test suite
or programmed feedback loop, so if you encounter difficulties try closing and reopening the application.

## Uploading output

I don't think uploading is within scope of this app, although it wouldn't be much of an extra step to incorporate 
a EN transactional import step.

## Rights

This app was created for Uplift by Adam Harrington. All rights reserved by [Uplift](https://uplift.ie). It is 
licensed under ISC, feel free to fork or modify for your own needs.

## Contributing

If you would like to contribute add an issue or PR.
'use strict';

const {
  getPriceFromSymbol,
  getExchangeAddressForSymbol,
  getLatestItem,
  sendTweetMessage } = require('./utils');

async function createMessageForUniswapReport(reportData, currencies=['DAI', 'MKR', 'USDC', 'BAT', 'WBTC']) {
  let reportRecords = reportData.data.exchangeDayDatas
  let usdformatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  });
  let message = '🦄💱 24hr Uniswap Report:\n\n'
  message += '--Daily Volume / Pool Size--\n'

  reportRecords.forEach((record, i) => {
    let nextText = `$${record.tokenSymbol}: $${usdformatter.format(record.ethVolumeUsd)} ` +
      `/ $${usdformatter.format(record.poolSize)}\n`

    message += nextText
  })

  message += `\n#DeFi`

  return message
}

module.exports.start = async (reportData={}) => {
  // Get latest report from DynamoDB
  reportData = await getLatestItem('DAILY_UNISWAP_SUMMARY')
  reportData = reportData.data

  console.log(reportData.data.exchangeDayDatas)

   // Create tweet message
  if(reportData && reportData.data.exchangeDayDatas) {
    const uniswapCurrencies = ['DAI', 'MKR', 'USDC', 'BAT', 'WBTC']
    let tweet = await createMessageForUniswapReport(reportData, uniswapCurrencies)
 
    console.log(tweet)

    // Send message to lambda function to tweet
    // let response = await sendTweetMessage({message: tweet})
    // return response
  }

  return null
}

// Copyright (c) 2020, BB Jansen
//
// Please see the included LICENSE file for more information.

'use strict'

require('dotenv').config();

const request = require('request');
const moment = require('moment');

// Adding a company and a new deal to HubSpot CRM
//
// NOTE: https://www.npmjs.com/package/@hubspot/api-client 
//
// Due to simplicity working with simply API calls and not the SDK
//
//
// https://developers.hubspot.com/docs/methods/deals/create_deal

(async () => {
    try {

        // Associate a company with the new deal
        const associations = {
            associatedCompanyIds: [0]
        }

        // Example Data for a new Deal
        const properties = [{
            dealname: 'Bobs New Deal',
            dealstage: 'appointmentscheduled',
            pipeline: 'default',
            hubspot_owner_id: '24',
            closedate: moment().add(2, 'days').unix(),
            amount: 60000,
            dealtype: 'newbusiness'
        }]

        var options = {
            method: 'POST',
            url: 'https://' + process.env.API_URL + '/deals/v1/deal',
            qs: { hapikey: process.env.API_KEY },
            headers: { 'Content-Type': 'application/json' },
            body: {
                //associations: associations,
                properties: properties
            },
            json: true
        }
      

     
        const res = await request(options)

        console.log(res.res)
          

    }
    catch(err) {
      console.error(err.toString())
    }
})()
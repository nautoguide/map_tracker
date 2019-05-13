module.exports = {

    tracker_list : function() {

        return global_config.tracker_list;
    },

    update_tracker : function(tracker_gid) {

        const fetchJson = require('fetch-json');
        const fetch = require('node-fetch');

        let spot_url = global_config.spot_url + tracker_gid + '/message.json';


        fetchJson.get(spot_url).then(function(data) {


    //SPOT is truely shit, if only one message sent as object not array
            let messages = data.response.feedMessageResponse.messages.message.id === undefined  ? data.response.feedMessageResponse.messages.message : [data.response.feedMessageResponse.messages.message];



            for(var i in messages) {


                //add features via api
               const payload = {
                   _token: global_config.ng_token,
                   schema: global_config.schema,
                   app: global_config.app,
                   api: 'feature_api',
                   action: 'add',
                   payload: {
                       geometry: 'SRID=4326;POINT(' + messages[i].longitude + ' ' + messages[i].latitude + ')',
                       attributes: {
                           message_id: messages[i].id,
                           messageType: messages[i].messageType,
                           modelId: messages[i].modelId,
                           altitude: messages[i].altitude,
                           batteryState: messages[i].batteryState,
                           messengerId: messages[i].messengerId,
                           dateTime: messages[i].dateTime,
                           messengerName: messages[i].messengerName,
                           feature_type: 'spot_tracker_point',
                           org_id: global_config.org_id,
                           point_type: 'tracked'

                       }
                   }
               };

                fetchJson.post(global_config.ng_endpoint,payload).then(function(data){console.log(data);}).catch(console.log);
            }
        })

    }
};
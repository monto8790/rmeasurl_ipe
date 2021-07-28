const mqtt = require("mqtt");
var util = require('util');
const sensor_model = require('./functions/placeBuilder.js');
var host = "203.253.128.164";
var port = "1883";

init_mqtt_client();

const floating_point_attrs = ["RDP", "Temp"];
function replacer (key, value) {
    if (floating_point_attrs.includes(key) && Number.isInteger(value)) {
        return value.toString() + ".0";
    }
    return value;
}

function init_mqtt_client() {
    var opt = {
        host: host,
        port: port,
        protocol: "mqtt",
        keepalive: 10,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 2000,
        connectTimeout: 2000,
        rejectUnauthorized: false
    };
    mqtt_cli = mqtt.connect(opt);
    mqtt_cli.on('connect', on_mqtt_connect);
    mqtt_cli.on('message', on_mqtt_message_recv);
    console.log("init_mqtt_client!!!");
}


function on_mqtt_connect() {
    var noti_topic = util.format('/waterdna/haemil/+');
    console.log(noti_topic);
    mqtt_cli.unsubscribe(noti_topic);
    mqtt_cli.subscribe(noti_topic);
    console.log('[mqtt_connect] noti_topic : ' + noti_topic);
}

function on_mqtt_message_recv(topic, message) {
    console.log('receive message from topic: <- ' + topic);
    console.log('receive message: ' + message.toString('hex'));
    let sen_topic = topic.split('/');
    sen_topic = sen_topic[2];
    let recv_mes = message.toString('hex');
    let {model_type, obj} = hamemil_decoded(recv_mes);
    if(model_type === "collected_model"){

    }else if (model_type === "cs650_model"){
        sensor_model.cs650_sensor(obj,sen_topic[2]);
    }else if (model_type === "wetherData_model"){
        sensor_model.aws_sensor(obj,sen_topic[2]);
    }else if (model_type === "xonic_model"){

    }else {
        console.log("Reserved");
    }

}


function response_mqtt (rsp_topic, rsc, to, fr, rqi, inpcs) {
    // var rsp_message = {};
    // rsp_message['m2m:rsp'] = {};
    // rsp_message['m2m:rsp'].rsc = rsc;
    // rsp_message['m2m:rsp'].to = to;
    // rsp_message['m2m:rsp'].fr = fr;
    // rsp_message['m2m:rsp'].rqi = rqi;
    // rsp_message['m2m:rsp'].pc = inpcs;
    //
    // mqtt_client.publish(rsp_topic, JSON.stringify(rsp_message['m2m:rsp']));
    //
    // console.log('noti publish -> ' + JSON.stringify(rsp_message));

}
function date_calc() {
    let data = [];
    for (var i=0; i<date.length; i=i+2) {
        let txt = date.substr(i,2);
        data.push(parseInt(txt.toString('hex'),16));
    }
    data[0]='2021';
    // let datedate = data[0]+'-'+data[1]+'-'+data[2]+':'+data[3]+':'+data[4]+':'+data[5];
    // console.log(datedate);
    console.log(moment(data).utc().format('YYYY-MM-DDThh:mm:ss'));
    let dateform = moment(data).subtract(1,'M').utc().format('YYYY-MM-DDThh:mm:ss')+',000+09:00';
    console.log(dateform)
    return dateform
}
function hamemil_decoded(message){
    let model_type = "";
    let frame = {};
    let stx= message.substr(0,2);//2
    console.log(stx);
    if(stx === 'fa'){
        let data = [];
        let date = message.substr(2,12);//12


        date = date_calc(date);
        console.log(date);
        frame.date = date;
        let len = message.substr(14,2);//2

        frame.len = parseInt(len,16);
        frame.payload = {};

        let device_type = message.substr(16,2);
        let status_flag = message.substr(18,2);
        let payload = message.substr(20,48);

        if(device_type === '01'){
            frame.payload.device_type = "전자유량계";
            model_type = "collected_model";
        }
        else if(device_type === '02'){
            frame.payload.device_type = "유속계";
            model_type = "collected_model";
        }
        else if(device_type === '03'){
            frame.payload.device_type = '수위계';
            model_type = "collected_model";
        }
        else if(device_type === '10'){
            frame.payload.device_type = 'CS650 LID Sensor';
            model_type = "cs650_model";
        }
        else if(device_type === '11'){
            frame.payload.device_type = 'Aws Device(Model:unknown)';
            model_type = "wetherData_model";
        }
        else if(device_type === '20'){
            frame.payload.device_type = 'XONIC10100 전자유량계';
            model_type = "xonic_model";
        }
        else{ //00 or 04 ~ ff
            frame.payload.device_type = "Reserved";
        }

        if(status_flag === '00'){
            frame.payload.status_flag = "결측";
        }
        else if(status_flag === '01'){
            frame.payload.status_flag = "Normal";
        }
        else if(status_flag === '02'){
            frame.payload.status_flag = "오측";
        }
        else{ //03 ~ ff
            frame.payload.status_flag = "Reserved";
        }
        data = [];
        for (var i=0; i<payload.length; i=i+8) {
            data.push(Buffer(payload.substr(i,8),'hex').readFloatLE(0));
        }
        frame.payload.data = {}
        frame.payload.data.RDP = data[0];
        frame.payload.data.VWC = data[1];
        frame.payload.data.EleC = data[2];
        frame.payload.data.Temp = data[3];
        frame.payload.data.reserv1 = data[4];
        frame.payload.data.reserv2 = data[5];
        const str = JSON.stringify(frame.payload.data,replacer);
        frame.payload.data=JSON.parse(str);
        // frame.payload.reserved = message.substr(40,8);
        // let crc = message.substr(0,36)//36 xor
        // frame.crc = crc;
        // console.log(crc)

    }
    console.log(frame);
    return model_type, frame
}


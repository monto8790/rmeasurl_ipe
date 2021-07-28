// // var message ='01020304050607080910111213141516171819202122232425262728293031';
var message ='fa15071a0f13001a10010060b944f6a88142ee69a64700000000000000000000000003f500';
// var stx=message.substr(0,2);
// console.log(stx);
// console.log(message);
// //0xfa
const moment = require('moment');
var date = message.substr(2,12);
// console.log(date);
// console.log(message);
// // let len = message.substr(9,14);//2
// // console.log(len);
// // var test = '0080b043b81e56429e298f46000000000000000000000000';
// // // console.log(test)
let data = []
// // // let abv = '100100a006457b148f42adc7ff47000000000000000000000000'
// // // console.log(abv.length);
for (var i=0; i<date.length; i=i+2) {
    let txt = date.substr(i,2);
    data.push(parseInt(txt.toString('hex'),16));
}
// //
// console.log(data);
// console.log(('20'+data[0]+data[1]+"-"+data[2]+"-"+data[3]+"-"+data[4]+"-"+data[5]).toString());
data[0]='2021';
console.log(data)
let datedate = (data[0]+'-'+data[1]+'-'+data[2]+':'+data[3]+':'+data[4]+':'+data[5]).toString();
console.log(datedate);
let test = 2021+'-'+'7'+'-'+26+':'+15+':'+19+':'+0;
console.log(test)
// const today = moment([2021,1,28]);
console.log(moment(data).utc().format('YYYY-MM-DDThh:mm:ss'));
let dateform = moment(data).subtract(1,'M').utc().format('YYYY-MM-DDThh:mm:ss')+',000+09:00';
console.log(dateform)
// const today2 = moment(data).format('YYYY-MM-DDThh:mm:ss')+',000+09:00';
// let timet = moment(data).utc().format('YYYY-MM-DDThh:mm:ss');
// console.log(today)
// const dateFormat = require('dateformat');
// console.log(data)
// var now = new Date(2014,1,1,1,1,1);
// console.log(now);
// let currentTime = dateFormat(now, "yyyy-mm-dd'T'HH:MM:ss") + ',000+09:00'
// console.log(currentTime)
// var date1 = moment([2018, 11, 18]);
// var date2 = moment([2018, 01, 01]);
// console.log(date1);
// console.log(date2);

// console.log(today2)
// console.log(timet)
// var test1 = Buffer('406ea716','hex').readFloatBE(0)
// console.log(test1);
// yy-mm-dd-hh-mm-ss
// 02-03-04-05-06-07
// 15 07 1a 0f 13 00
// 15 07 1a 0f 13 00
// while:true{
//
// }
// fa 15 07 1a 0f 13 00 1a 10 01 fd 65 77 3c ed 5e 11 42 07 5f 78 40 86 38 56 3d 0000000000000000 63 f5 00
// fa 15 07 1a 0f 13 00 1a 10 01 00 60 b9 44 f6 a8 81 42 ee 69 a6 47 00 00 00 00 0000000000000000 03 f5 00
// fa 15 07 1a 10 07 28 1a 10 0100e0dd44008087420039cc4700000000000000000000000048f500
// fa 15 07 1a 10 07 00 1a 10 01211f743c07ce104210e97740cf66553d00000000000000000cf500


// fa
// {
//     date: '15071a102a00',
//         len: '1a',
//     payload: {
//     device_type: '10',
//         status_flag: '01',
//         data: '44d8703c2d720d428b6c',
//         reserved: '77401895'
//     00 a0 06 45 7b 14 8f 42 ad c7
//     fa 15071a102a00 1a 10 01 44d8703c2d720d428b6c 77401895543d000000000000000037f500
//     fa 15071a102a00 1a 10 01 44d8703c2d720d428b6c 77401895
//     fa 15071a102a00 1a 10 01 44d8703c2d720d42     77401895
// var util = require('util');
// var data = util.format('%s', 'abc', { name: 'node.js'});
// const fs = require('fs');
// console.log(data);
// var test = "LID"
// temp = JSON.parse(fs.readFileSync(util.format('./water_models/%s.json',test), 'utf-8'));
// console.log(temp);
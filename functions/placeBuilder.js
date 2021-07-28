const fs = require('fs');
// const getSensingValue = require('./getSensingValue.js');
var util = require('util');
// const axios = require('axios');
// const http = require('http');
exports.cs650_sensor = function(obj,topic){
    let coordinates = [];
    let rawSensorObj = {};
    let models_json = "";
    let sensor_type = "";
    if(topic !== "weatherObserved_0001"){
        sensor_type = "kr.waterdna.LID:1.0";
        if(topic == "LID_0001"){
            coordinates = [36.525838,127.265174];
        }else if(topic == "LID_0002"){
            coordinates = [36.524677,127.266663];
        }else if(topic == "LID_0003"){
            coordinates = [36.525030,127.270622];
        }else if(topic == "LID_0004"){
            coordinates = [36.526624,127.271479];
        }else if(topic == "LID_0005"){
            coordinates = [36.528258,127.267970];
        }
    }

    rawSensorObj.datasetId = "waterDataset001";//topic?
    rawSensorObj.entities = [];
    temp = {};
    temp = JSON.parse(fs.readFileSync(util.format('./water_models/%s.json','LID'), 'utf-8'));
    temp["@context"] = [
        "http://uri.etsi.org/ngsi-ld/core-context.jsonld",
        "http://waterdna.kr/ngsi-ld/water.jsonld"
    ];
    temp.id = "urn:waterdna:_"+topic; // ?
    temp.type = sensor_type;
    temp.location.value.coordinates = coordinates;
    // temp.turbidity.value =

    rawSensorObj.entities = temp;
    // rawWaterSourceTemp.id = conf.place.id;
    // rawWaterSourceTemp.name.value = conf.place.name;
    //
    // rawWaterSourceTemp.location.value.coordinates = coordinates;

    // rawWaterSourceTemp.waterLevel.value = getSensingValue.getWaterLevel().toFixed(2)*1.0;
    // rawWaterSourceTemp.waterLevel.observedAt = currentTime;
    //
    // rawWaterSourceTemp.pondage.value = Math.round(rawWaterSourceTemp.waterLevel.value * 1342)/100;
    // rawWaterSourceTemp.pondage.observedAt = currentTime;
    //
    // console.log("Place ID:",rawWaterSourceTemp.id);
    // console.log("Sensing value(pondage):",rawWaterSourceTemp.pondage.value);
    // console.log("Reported time:",rawWaterSourceTemp.pondage.observedAt);
    // console.log("-----------------------------------------------");
    //
    console.log(rawSensorObj);
    // rawWaterSource.entities[0] = rawWaterSourceTemp;
    // // sendCreateRequest(rawWaterSource);
    // sendCreateRequest(JSON.stringify(rawWaterSource));
}
exports.aws_sensor = function(obj,topic){
    let coordinates = [];
    let rawSensorObj = {};
    let sensor_type = "kr.waterdna.weatherObserved:1.0";
    if(topic === "weatherObserved_0001"){
        coordinates = [36.527418,127.265801];




    rawSensorObj.datasetId = "waterDataset001";//topic?
    rawSensorObj.entities = [];
    temp = {};
    temp = JSON.parse(fs.readFileSync(util.format('./water_models/%s.json','weatherObserved'), 'utf-8'));
    temp["@context"] = [
        "http://uri.etsi.org/ngsi-ld/core-context.jsonld",
        "http://waterdna.kr/ngsi-ld/water.jsonld"
    ];
    temp.id = "urn:waterdna:_"+topic; // ?
    temp.type = sensor_type;
    temp.location.value.coordinates = coordinates;
    // temp.turbidity.value =

    rawSensorObj.entities = temp;
    // rawWaterSourceTemp.id = conf.place.id;
    // rawWaterSourceTemp.name.value = conf.place.name;
    //
    // rawWaterSourceTemp.location.value.coordinates = coordinates;

    // rawWaterSourceTemp.waterLevel.value = getSensingValue.getWaterLevel().toFixed(2)*1.0;
    // rawWaterSourceTemp.waterLevel.observedAt = currentTime;
    //
    // rawWaterSourceTemp.pondage.value = Math.round(rawWaterSourceTemp.waterLevel.value * 1342)/100;
    // rawWaterSourceTemp.pondage.observedAt = currentTime;
    //
    // console.log("Place ID:",rawWaterSourceTemp.id);
    // console.log("Sensing value(pondage):",rawWaterSourceTemp.pondage.value);
    // console.log("Reported time:",rawWaterSourceTemp.pondage.observedAt);
    // console.log("-----------------------------------------------");
    //
    }
    console.log(rawSensorObj);
    // rawWaterSource.entities[0] = rawWaterSourceTemp;
    // // sendCreateRequest(rawWaterSource);
    // sendCreateRequest(JSON.stringify(rawWaterSource));
}
//
// exports.waterPumpStation = function(currentTime) {
//
//     waterPumpStation = {}
//     waterPumpStation.datasetId = "waterDataset003";
//     waterPumpStation.entities = [];
//     waterPumpStationTemp = {};
//     waterPumpStationTemp = JSON.parse(fs.readFileSync('./Places/waterPumpStation.json', 'utf-8'));
//
//     waterPumpStationTemp.id = conf.place.id;
//     waterPumpStationTemp.name.value = conf.place.name;
//
//     waterPumpStationTemp.location.value.coordinates = conf.place.coordinates;
//
//     waterPumpStationTemp.intakeVolume.value = getSensingValue.getFlux().toFixed(2)*1.0;
//     waterPumpStationTemp.intakeVolume.observedAt = currentTime;
//
//     waterPumpStationTemp.energyConsumption.value = (waterPumpStationTemp.intakeVolume.value / 9.345).toFixed(2) * 1.0;
//     waterPumpStationTemp.energyConsumption.observedAt = currentTime;
//
//     console.log("Place ID:",waterPumpStationTemp.id);
//     console.log("Sensing value(intakeVolume):",waterPumpStationTemp.intakeVolume.value);
//     console.log("Sensing value(energyConsumption):",waterPumpStationTemp.energyConsumption.value);
//     console.log("Reported time:",waterPumpStationTemp.energyConsumption.observedAt);
//     console.log("-----------------------------------------------");
//
//     waterPumpStation.entities[0] = waterPumpStationTemp;
//     // sendCreateRequest(waterPumpStation);
//     sendCreateRequest(JSON.stringify(waterPumpStation));
//
// }
//
// exports.waterPurificationPlant = function(currentTime) {
//
//     waterPurificationPlant = {}
//     waterPurificationPlant.datasetId = "waterDataset014";
//     waterPurificationPlant.entities = [];
//     waterPurificationPlantTemp = {};
//     waterPurificationPlantTemp = JSON.parse(fs.readFileSync('./Places/waterPurificationPlant.json', 'utf-8'));
//
//     waterPurificationPlantTemp.id = conf.place.id;
//     waterPurificationPlantTemp.name.value = conf.place.name;
//
//     waterPurificationPlantTemp.location.value.coordinates = conf.place.coordinates;
//
//     waterPurificationPlantTemp.inflowFlux.value = getSensingValue.getFlux().toFixed(2)*1.0;
//     waterPurificationPlantTemp.inflowFlux.observedAt = currentTime;
//
//     waterPurificationPlantTemp.outflowFlux.value = (waterPurificationPlantTemp.inflowFlux.value*0.995).toFixed(2)*1.0;
//     waterPurificationPlantTemp.outflowFlux.observedAt = currentTime;
//
//     waterPurificationPlantTemp.inflowToc.value = getSensingValue.getToc().toFixed(2)*1.0;
//     waterPurificationPlantTemp.inflowToc.observedAt = currentTime;
//
//     waterPurificationPlantTemp.outflowToc.value = (waterPurificationPlantTemp.inflowToc.value*0.3).toFixed(2)*1.0;
//     waterPurificationPlantTemp.outflowToc.observedAt = currentTime;
//
//     waterPurificationPlantTemp.inflowUv254.value = getSensingValue.getUv254().toFixed(2)*1.0;
//     waterPurificationPlantTemp.inflowUv254.observedAt = currentTime;
//
//     waterPurificationPlantTemp.outflowUv254.value = (waterPurificationPlantTemp.inflowUv254.value*0.9).toFixed(2)*1.0;;
//     waterPurificationPlantTemp.outflowUv254.observedAt = currentTime;
//
//     waterPurificationPlantTemp.inflowTurbidity.value = getSensingValue.getTurbidity().toFixed(1)*1.0;
//     waterPurificationPlantTemp.inflowTurbidity.observedAt = currentTime;
//
//     waterPurificationPlantTemp.outflowTurbidity.value = (waterPurificationPlantTemp.inflowTurbidity.value*0.3).toFixed(2)*1.0;
//     waterPurificationPlantTemp.outflowTurbidity.observedAt = currentTime;
//
//     waterPurificationPlantTemp.residualChlorine.value = getSensingValue.getCl().toFixed(1)*1.0;
//     waterPurificationPlantTemp.residualChlorine.observedAt = currentTime;
//
//     waterPurificationPlantTemp.pH.value = (getSensingValue.getPh()*0.3).toFixed(2)*1.0;
//     waterPurificationPlantTemp.pH.observedAt = currentTime;
//
//     console.log("Place ID:",waterPurificationPlantTemp.id);
//     console.log("Sensing value(inflowFlux):",waterPurificationPlantTemp.inflowFlux.value);
//     console.log("Sensing value(outflowFlux):",waterPurificationPlantTemp.outflowFlux.value);
//     console.log("Sensing value(inflowToc):",waterPurificationPlantTemp.inflowToc.value);
//     console.log("Sensing value(outflowToc):",waterPurificationPlantTemp.outflowToc.value);
//     console.log("Sensing value(inflowUv254):",waterPurificationPlantTemp.inflowUv254.value);
//     console.log("Sensing value(outflowUv254):",waterPurificationPlantTemp.outflowUv254.value);
//     console.log("Sensing value(inflowTurbidity):",waterPurificationPlantTemp.inflowTurbidity.value);
//     console.log("Sensing value(outflowTurbidity):",waterPurificationPlantTemp.outflowTurbidity.value);
//     console.log("Sensing value(residualChlorine):",waterPurificationPlantTemp.residualChlorine.value);
//     console.log("Sensing value(pH):",waterPurificationPlantTemp.pH.value);
//     console.log("Reported time:",waterPurificationPlantTemp.pH.observedAt);
//     console.log("-----------------------------------------------");
//
//     waterPurificationPlant.entities[0] = waterPurificationPlantTemp;
//     // sendCreateRequest(waterPurificationPlant);
//     sendCreateRequest(JSON.stringify(waterPurificationPlant));
// }
//
// exports.waterReservoir = function(currentTime) {
//     waterReservoir = {}
//     waterReservoir.datasetId = "waterDataset009";
//     waterReservoir.entities = [];
//     waterReservoirTemp = {};
//     waterReservoirTemp = JSON.parse(fs.readFileSync('./Places/waterReservoir.json', 'utf-8'));
//
//     waterReservoirTemp.id = conf.place.id;
//     waterReservoirTemp.name.value = conf.place.name;
//
//     waterReservoirTemp.location.value.coordinates = conf.place.coordinates;
//
//     waterReservoirTemp.waterLevel.value = getSensingValue.getWaterLevel().toFixed(2)*1.0;
//     waterReservoirTemp.waterLevel.observedAt = currentTime;
//
//     waterReservoirTemp.intakeVolume.value = (waterReservoirTemp.waterLevel.value*20).toFixed(2)*1.0;
//     waterReservoirTemp.intakeVolume.observedAt = currentTime;
//
//     waterReservoirTemp.inflowFlux.value = getSensingValue.getFlowRate().toFixed(2)*1.0;
//     waterReservoirTemp.inflowFlux.observedAt = currentTime;
//
//     waterReservoirTemp.outflowFlux.value = (waterReservoirTemp.inflowFlux.value *0.995).toFixed(2)*1.0;
//     waterReservoirTemp.outflowFlux.observedAt = currentTime;
//
//     console.log("Place ID:",waterReservoirTemp.id);
//     console.log("Sensing value(intakeVolume):",waterReservoirTemp.intakeVolume.value);
//     console.log("Sensing value(waterLevel):",waterReservoirTemp.waterLevel.value);
//     console.log("Sensing value(inflowFlux):",waterReservoirTemp.inflowFlux.value);
//     console.log("Sensing value(outflowFlux):",waterReservoirTemp.outflowFlux.value);
//     console.log("Reported time:",waterReservoirTemp.outflowFlux.observedAt);
//     console.log("-----------------------------------------------");
//
//     waterReservoir.entities[0] = waterReservoirTemp;
//     // sendCreateRequest(waterReservoir);
//     sendCreateRequest(JSON.stringify(waterReservoir));
// }
// exports.sewageTreatmentPlant = function(currentTime) {
//     sewageTreatmentPlant = {}
//     sewageTreatmentPlant.datasetId = "waterDataset016";
//     sewageTreatmentPlant.entities = [];
//     sewageTreatmentPlantTemp = {};
//     sewageTreatmentPlantTemp = JSON.parse(fs.readFileSync('./Places/sewageTreatmentPlant.json', 'utf-8'));
//
//     sewageTreatmentPlantTemp.id = conf.place.id;
//     sewageTreatmentPlantTemp.name.value = conf.place.name;
//
//     sewageTreatmentPlantTemp.location.value.coordinates = conf.place.coordinates;
//
//     sewageTreatmentPlantTemp.inflowFlux.value = getSensingValue.getFlux().toFixed(2)*1.0;
//     sewageTreatmentPlantTemp.inflowFlux.observedAt = currentTime;
//
//     sewageTreatmentPlantTemp.outflowFlux.value = (sewageTreatmentPlantTemp.inflowFlux.value*0.995).toFixed(2)*1.0;
//     sewageTreatmentPlantTemp.outflowFlux.observedAt = currentTime;
//
//     sewageTreatmentPlantTemp.inflowToc.value = getSensingValue.getToc().toFixed(2)*1.0;
//     sewageTreatmentPlantTemp.inflowToc.observedAt = currentTime;
//
//     sewageTreatmentPlantTemp.outflowToc.value = (sewageTreatmentPlantTemp.inflowToc.value*0.3).toFixed(2)*1.0;
//     sewageTreatmentPlantTemp.outflowToc.observedAt = currentTime;
//     console.log(sewageTreatmentPlantTemp.outflowToc.observedAt);
//     console.log(currentTime);
//
//     sewageTreatmentPlantTemp.inflowUv254.value = getSensingValue.getUv254().toFixed(2)*1.0;
//     sewageTreatmentPlantTemp.inflowUv254.observedAt = currentTime;
//
//     sewageTreatmentPlantTemp.outflowUv254.value = (sewageTreatmentPlantTemp.inflowUv254.value*0.9).toFixed(2)*1.0;;
//     sewageTreatmentPlantTemp.outflowUv254.observedAt = currentTime;
//
//     sewageTreatmentPlantTemp.inflowTurbidity.value = getSensingValue.getTurbidity().toFixed(1)*1.0;
//     sewageTreatmentPlantTemp.inflowTurbidity.observedAt = currentTime;
//
//     sewageTreatmentPlantTemp.outflowTurbidity.value = (sewageTreatmentPlantTemp.inflowTurbidity.value*0.3).toFixed(2)*1.0;
//     sewageTreatmentPlantTemp.outflowTurbidity.observedAt = currentTime;
//
//     sewageTreatmentPlantTemp.residualChlorine.value = getSensingValue.getCl().toFixed(1)*1.0;
//     sewageTreatmentPlantTemp.residualChlorine.observedAt = currentTime;
//
//     sewageTreatmentPlantTemp.pH.value = (getSensingValue.getPh()*0.3).toFixed(2)*1.0;
//     sewageTreatmentPlantTemp.pH.observedAt = currentTime;
//
//     console.log("Place ID:",sewageTreatmentPlantTemp.id);
//     console.log("Sensing value(inflowFlux):",sewageTreatmentPlantTemp.inflowFlux.value);
//     console.log("Sensing value(outflowFlux):",sewageTreatmentPlantTemp.outflowFlux.value);
//     console.log("Reported time:",sewageTreatmentPlantTemp.outflowToc.observedAt);
//     console.log("-----------------------------------------------");
//
//     sewageTreatmentPlant.entities[0] = sewageTreatmentPlantTemp;
//     sendCreateRequest(sewageTreatmentPlant);
//     sendCreateRequest(JSON.stringify(sewageTreatmentPlant));
// }
//
// exports.river = function(currentTime) {
//
//     river = {}
//     river.datasetId = "waterDataset012";
//     river.entities = [];
//     riverTemp = {};
//     riverTemp = JSON.parse(fs.readFileSync('./Places/river.json', 'utf-8'));
//
//     riverTemp.id = conf.place.id;
//     riverTemp.name.value = conf.place.name;
//
//     riverTemp.location.value.coordinates = conf.place.coordinates;
//
//     riverTemp.waterLevel.value = getSensingValue.getWaterLevel().toFixed(2)*1.0;
//     riverTemp.waterLevel.observedAt = currentTime;
//
//     riverTemp.toc.value = getSensingValue.getToc().toFixed(2)*1.0;
//     riverTemp.toc.observedAt = currentTime;
//
//     riverTemp.uv254.value = getSensingValue.getUv254().toFixed(2)*1.0;
//     riverTemp.uv254.observedAt = currentTime;
//
//     riverTemp.turbidity.value = getSensingValue.getTurbidity().toFixed(2)*1.0;
//     riverTemp.turbidity.observedAt = currentTime;
//
//     console.log("Place ID:",riverTemp.id);
//     console.log("Sensing value(toc):",riverTemp.toc.value);
//     console.log("Sensing value(uv254):",riverTemp.uv254.value);
//     console.log("Sensing value(turbidity):",riverTemp.turbidity.value);
//     console.log("Reported time:",riverTemp.turbidity.observedAt);
//     console.log("-----------------------------------------------");
//
//     river.entities[0] = riverTemp;
//     // sendCreateRequest(river);
//     sendCreateRequest(JSON.stringify(river));
//
// }
// exports.waterPipe = function(currentTime) {
//
//     waterPipe = {};
//     waterPipe.datasetId = "waterDataset008";
//     waterPipe.entities = [];
//     waterPipeTemp = {};
//     waterPipeTemp = JSON.parse(fs.readFileSync('./Places/waterPipe.json', 'utf-8'));
//
//     waterPipeTemp.id = conf.place.id;
//     waterPipeTemp.name.value = conf.place.name;
//
//     waterPipeTemp.location.value.coordinates = conf.place.coordinates[0];
//
//     waterPipeTemp.pipeType.value = conf.place.pipeType;
//     waterPipeTemp.pipeType.observedAt = currentTime;
//
//     waterPipeTemp.flux.value = getSensingValue.getFlux().toFixed(2)*1.0;
//     waterPipeTemp.flux.observedAt = currentTime;
//
//     waterPipeTemp.flowRate.value = getSensingValue.getFlowRate().toFixed(2)*1.0;
//     waterPipeTemp.flowRate.observedAt = currentTime;
//
//     console.log("Place ID:",waterPipeTemp.id);
//     console.log("Sensing value(flux):",waterPipeTemp.flux.value);
//     console.log("Sensing value(flowRate):",waterPipeTemp.flowRate.value);
//     console.log("Reported time:",waterPipeTemp.flowRate.observedAt);
//     console.log("-----------------------------------------------");
//
//     switch (conf.place.pipeType) {
//         case "WaterSupply":
//             waterPipeTemp.waterPressure = {};
//             waterPipeTemp.waterPressure.value = getSensingValue.getWaterPressure().toFixed(2)*1.0;
//             waterPipeTemp.waterPressure.observedAt = currentTime;
//             break;
//         case "Sewer":
//             waterPipeTemp.waterLevel = {};
//             waterPipeTemp.waterLevel.value = getSensingValue.getSewerWaterLevel().toFixed(2)*1.0;
//             waterPipeTemp.waterLevel.observedAt = currentTime;
//             break;
//     }
//     waterPipe.entities[0] = waterPipeTemp;
//     // sendCreateRequest(waterPipe);
//     sendCreateRequest(JSON.stringify(waterPipe));
// }
// exports.waterPipePredicted = function(currentTime) {
//
//     waterPipePredicted = {};
//     waterPipePredicted.datasetId = "waterDataset007";
//     waterPipePredicted.entities = [];
//     waterPipePredictedTemp = {};
//     waterPipePredictedTemp = JSON.parse(fs.readFileSync('./Places/waterPipePredicted.json', 'utf-8'));
//     waterPipePredictedTemp.id = conf.place.id;
//     waterPipePredictedTemp.name.value = conf.place.name;
//
//     waterPipePredictedTemp.location.value.coordinates = conf.place.coordinates;
//     waterPipePredictedTemp.pipeType.value = conf.place.pipeType;
//     waterPipePredictedTemp.pipeType.observedAt = currentTime;
//
//     waterPipePredictedTemp.flux.value = getSensingValue.getFlux().toFixed(2)*1.0;
//     waterPipePredictedTemp.flux.observedAt = currentTime;
//
//     waterPipePredictedTemp.flowRate.value = getSensingValue.getFlowRate().toFixed(2)*1.0;
//     waterPipePredictedTemp.flowRate.observedAt = currentTime;
//
//     switch (conf.place.pipeType) {
//         case "WaterSupply":
//             waterPipePredictedTemp.waterPressure = {};
//             waterPipePredictedTemp.waterPressure.value = getSensingValue.getWaterPressure().toFixed(2)*1.0;
//             waterPipePredictedTemp.waterPressure.observedAt = currentTime;
//             break;
//         case "Sewer":
//             waterPipePredictedTemp.waterLevel = {};
//             waterPipePredictedTemp.waterLevel.value = getSensingValue.getSewerWaterLevel().toFixed(2)*1.0;
//             waterPipePredictedTemp.waterLevel.observedAt = currentTime;
//             break;
//     }
//
//     console.log("Place ID:",waterPipePredictedTemp.id);
//     console.log("Sensing value(flux):",waterPipePredictedTemp.flux.value);
//     console.log("Sensing value(flowRate):",waterPipePredictedTemp.flowRate.value);
//     console.log("Reported time:",waterPipePredictedTemp.flowRate.observedAt);
//     console.log("-----------------------------------------------");
//
//     waterPipePredicted.entities[0] = waterPipePredictedTemp;
//     // sendCreateRequest(JSON.stringify(waterPipePredicted));
//     sendCreateRequest(waterPipePredicted);
// }

// function sendCreateRequest(body) {
//     let createRequest = {
//         method: 'POST',
//
//         url: 'http://' + conf.server_ip + ':' + conf.server_port + '/' + conf.server_path,
//         //url: 'http://localhost:7001',
//         'Content-Type': 'application/json',
//         Connection: 'keep-alive',
//         json: true,
//         body: body
//     };
//
//     sendRequest.sendRequest(createRequest, (resp) => {
//
//     });
// }

function sendCreateRequest(data) {
    // var config =;/
    console.log(data)
    axios({
        method: 'post',
        httpAgent: new http.Agent({ keepAlive: true }),
        url: 'http://' + conf.server_ip + ':' + conf.server_port + '/' + conf.server_path,
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Accept': 'application/json'
        },
        data : data
    })
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

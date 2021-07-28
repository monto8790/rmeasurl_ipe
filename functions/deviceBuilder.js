const fs = require('fs');
// const getSensingValue = require('./getSensingValue.js');

const axios = require('axios');
const http = require('http');
exports.cc650 = function(i, currentTime) {
    for (j = 0; j < conf.sensorsArray[i].amount; j++) {
        waterFlowMeter = {};
        waterFlowMeter.datasetId = "waterDataset004";
        waterFlowMeter.entities = [];
        waterFlowMeterTemp = {}
        waterFlowMeterTemp = JSON.parse(fs.readFileSync('./Sensors/waterFlowMeter.json', 'utf-8'));

        waterFlowMeterTemp.id = conf.sensorsArray[i].id[j];
        waterFlowMeterTemp.type = conf.sensorsArray[i].type;
        waterFlowMeterTemp.name.value = conf.sensorsArray[i].name[j];

        waterFlowMeterTemp.location.value.coordinates = conf.sensorsArray[i].coordinates[j];

        waterFlowMeterTemp.flux.value = getSensingValue.getFlux().toFixed(2)*1.0;
        waterFlowMeterTemp.flux.observedAt = currentTime;

        console.log("Device ID:",waterFlowMeterTemp.id);
        console.log("Sensing value(flux):",waterFlowMeterTemp.flux.value);
        console.log("Reported time:",waterFlowMeterTemp.flux.observedAt);
        console.log("-----------------------------------------------");

        switch (conf.place.type) {
            case "kr.waterdna.waterPumpStation:1.0":
                waterFlowMeterTemp.refWaterPumpStation = {};
                waterFlowMeterTemp.refWaterPumpStation.type = "Relationship";
                waterFlowMeterTemp.refWaterPumpStation.object = conf.place.id;
                break;
            case "kr.waterdna.waterPurificationPlant:1.0":
                waterFlowMeterTemp.refWaterPurificationPlant = {};
                waterFlowMeterTemp.refWaterPurificationPlant.type = "Relationship";
                waterFlowMeterTemp.refWaterPurificationPlant.object = conf.place.id;
                break;
            case "kr.waterdna.waterReservoir:1.0":
                waterFlowMeterTemp.refWaterReservoir = {};
                waterFlowMeterTemp.refWaterReservoir.type = "Relationship";
                waterFlowMeterTemp.refWaterReservoir.object = conf.place.id;
                break;
            case "kr.waterdna.sewageTreatmentPlant:1.0":
                waterFlowMeterTemp.refSewageTreatmentPlant = {};
                waterFlowMeterTemp.refSewageTreatmentPlant.type = "Relationship";
                waterFlowMeterTemp.refSewageTreatmentPlant.object = conf.place.id;
                break;
            case "kr.waterdna.waterPipe:1.0":
                waterFlowMeterTemp.refWaterPipe = {};
                waterFlowMeterTemp.refWaterPipe.type = "Relationship";
                waterFlowMeterTemp.refWaterPipe.object = conf.place.id;
                break;
        }
        waterFlowMeter.entities[0] = waterFlowMeterTemp;
        // sendCreateRequest(waterFlowMeter);
        sendCreateRequest(JSON.stringify(waterFlowMeter));
    }
}
exports.waterPump = function(i, currentTime) {
    for (j = 0; j < conf.sensorsArray[i].amount; j++) {
        waterPump = {};
        waterPump.datasetId = "waterDataset006";
        waterPump.entities = [];
        waterPumpTemp = {};
        waterPumpTemp = JSON.parse(fs.readFileSync('./Sensors/waterPump.json', 'utf-8'));

        waterPumpTemp.id = conf.sensorsArray[i].id[j];
        waterPumpTemp.type = conf.sensorsArray[i].type;

        waterPumpTemp.name.value = conf.sensorsArray[i].name[j];

        waterPumpTemp.location.value.coordinates = conf.sensorsArray[i].coordinates[j];
        waterPumpTemp.operationStatus.observedAt = currentTime;

        waterPumpTemp.pumpCapacity.value = (getSensingValue.getFlux()*2).toFixed(2)*1.0;
        waterPumpTemp.pumpCapacity.observedAt = currentTime;

        waterPumpTemp.refWaterPumpStation.object = "urn:waterdna:waterPumpStation_100";

        console.log("Device ID:",waterPumpTemp.id);
        console.log("Sensing value(pumpCapacity):",waterPumpTemp.pumpCapacity.value);
        console.log("Reported time:",waterPumpTemp.pumpCapacity.observedAt);
        console.log("-----------------------------------------------");

        waterPump.entities[0] = waterPumpTemp;
    // sendCreateRequest(waterPump);
        sendCreateRequest(JSON.stringify(waterPump));
    }
}

exports.waterProcess = function(i, currentTime) {

    
    for (j = 0; j < conf.sensorsArray[i].amount; j++) {
        waterProcess = {};
    waterProcess.datasetId = "waterDataset015";
    waterProcess.entities = [];
        waterProcessTemp = {};
        waterProcessTemp = JSON.parse(fs.readFileSync('./Sensors/waterProcess.json', 'utf-8'));

        waterProcessTemp.id = conf.sensorsArray[i].id[j];
        waterProcessTemp.type = conf.sensorsArray[i].type;

        waterProcessTemp.name.value = conf.sensorsArray[i].name[j];

        waterProcessTemp.location.value.coordinates = conf.sensorsArray[i].coordinates[j];
        waterProcessTemp.waterProcessType.value = conf.sensorsArray[i].waterProcessType[j];
        waterProcessTemp.waterProcessType.observedAt = currentTime;
        waterProcessTemp.operationStatus.observedAt = currentTime;

        waterProcessTemp.toc.value = (getSensingValue.getToc() - (0.05 * j)).toFixed(2) * 1.0;
        waterProcessTemp.toc.observedAt = currentTime;

        waterProcessTemp.uv254.value = (getSensingValue.getUv254() - (0.005 * j)).toFixed(2) * 1.0;
        waterProcessTemp.uv254.observedAt = currentTime;

        waterProcessTemp.turbidity.value = (getSensingValue.getTurbidity() - (0.4 * j)).toFixed(2) * 1.0;
        waterProcessTemp.turbidity.observedAt = currentTime;

        console.log("Device ID:",waterProcessTemp.id);
        console.log("Sensing value(toc):",waterProcessTemp.toc.value);
        console.log("Sensing value(uv254):",waterProcessTemp.uv254.value);
        console.log("Sensing value(turbidity):",waterProcessTemp.turbidity.value);
        console.log("Reported time:",waterProcessTemp.turbidity.observedAt);
        console.log("-----------------------------------------------");

        switch (conf.place.type) {
            case "kr.waterdna.waterPurificationPlant:1.0":
                waterProcessTemp.refWaterPurificationPlant = {};
                waterProcessTemp.refWaterPurificationPlant.type = "Relationship";
                waterProcessTemp.refWaterPurificationPlant.object = conf.place.id;
                break;
            case "kr.waterdna.sewageTreatmentPlant:1.0":
                waterProcessTemp.refSewageTreatmentPlant = {};
                waterProcessTemp.refSewageTreatmentPlant.type = "Relationship";
                waterProcessTemp.refSewageTreatmentPlant.object = conf.place.id;
                break;
        }
        
        waterProcess.entities[0] = waterProcessTemp;
        // sendCreateRequest(waterProcess);
        sendCreateRequest(JSON.stringify(waterProcess));
    }
    
}
exports.waterLevelMeter = function(i, currentTime) {

    waterLevelMeter = {};
    waterLevelMeter.datasetId = "waterDataset002";

    waterLevelMeter.entities = []
    waterLevelMeterTemp = {};
    waterLevelMeterTemp = JSON.parse(fs.readFileSync('./Sensors/waterLevelMeter.json', 'utf-8'));

    waterLevelMeterTemp.id = conf.sensorsArray[i].id;
    waterLevelMeterTemp.type = conf.sensorsArray[i].type;

    waterLevelMeterTemp.name.value = conf.sensorsArray[i].name;

    waterLevelMeterTemp.location.value.coordinates = conf.sensorsArray[i].coordinates;

    waterLevelMeterTemp.waterLevel.value = getSensingValue.getWaterLevel().toFixed(1)*1.0;
    waterLevelMeterTemp.waterLevel.observedAt = currentTime;

    console.log("Device ID:",waterLevelMeterTemp.id);
    console.log("Sensing value(waterLevel):",waterLevelMeterTemp.waterLevel.value);
    console.log("Reported time:",waterLevelMeterTemp.waterLevel.observedAt);
    console.log("-----------------------------------------------");

    switch (conf.place.type) {
        case "kr.waterdna.rawWaterSource:1.0":
            waterLevelMeterTemp.refRawWaterSource = {};
            waterLevelMeterTemp.refRawWaterSource.type = "Relationship";
            waterLevelMeterTemp.refRawWaterSource.object = conf.place.id;
            break;
        case "kr.waterdna.waterReservoir:1.0":
            waterLevelMeterTemp.refWaterReservoir = {};
            waterLevelMeterTemp.refWaterReservoir.type = "Relationship";
            waterLevelMeterTemp.refWaterReservoir.object = conf.place.id;
            break;
        case "kr.waterdna.river:1.0":
            waterLevelMeterTemp.refRiver = {};
            waterLevelMeterTemp.refRiver.type = "Relationship";
            waterLevelMeterTemp.refRiver.object = conf.place.id;
            break;
        case "kr.waterdna.waterPipe:1.0":
            waterLevelMeterTemp.waterLevel.value = getSensingValue.getSewerWaterLevel().toFixed(2)*1.0;
            waterLevelMeterTemp.refWaterPipe = {};
            waterLevelMeterTemp.refWaterPipe.type = "Relationship";
            waterLevelMeterTemp.refWaterPipe.object = conf.place.id;
            break;
        case "kr.waterdna.waterPipePredicted:1.0":
            waterLevelMeterTemp.waterLevel.value = getSensingValue.getSewerWaterLevel().toFixed(2)*1.0;
            waterLevelMeterTemp.refWaterPipe = {};
            waterLevelMeterTemp.refWaterPipe.type = "Relationship";
            waterLevelMeterTemp.refWaterPipe.object = conf.place.id;
            break;
    }
    waterLevelMeter.entities[0] = waterLevelMeterTemp;
    // sendCreateRequest(waterLevelMeter);
    sendCreateRequest(JSON.stringify(waterLevelMeter));
}

exports.waterFlowPredicted = function(i, currentTime) {

    waterFlowPredicted = {};
    waterFlowPredicted.datasetId = "waterDataset005";
    waterFlowPredicted.entities = [];
    waterFlowPredictedTemp = {};
    waterFlowPredictedTemp = JSON.parse(fs.readFileSync('./Sensors/waterFlowPredicted.json', 'utf-8'));

    waterFlowPredictedTemp.id = conf.sensorsArray[i].id;
    waterFlowPredictedTemp.type = conf.sensorsArray[i].type;

    waterFlowPredictedTemp.flux.value = getSensingValue.getFlux().toFixed(2)*1.0;
    waterFlowPredictedTemp.flux.observedAt = currentTime;

    waterFlowPredictedTemp.refWaterMeter = {};
    waterFlowPredictedTemp.refWaterMeter.type = "Relationship";
    waterFlowPredictedTemp.refWaterMeter.object = conf.sensorsArray[1].id;

    console.log("Device ID:",waterFlowPredictedTemp.id);
    console.log("Sensing value(flux):",waterFlowPredictedTemp.flux.value);
    console.log("Reported time:",waterFlowPredictedTemp.flux.observedAt);
    console.log("-----------------------------------------------");

    waterFlowPredicted.entities[0] = waterFlowPredictedTemp;
    // sendCreateRequest(waterFlowPredicted);
    sendCreateRequest(JSON.stringify(waterFlowPredicted));
}

exports.waterQualitySensor = function(i, currentTime) {

    waterQualitySensor = {};
    waterQualitySensor.datasetId = "waterDataset019";
    waterQualitySensor.entities = [];
    waterQualitySensorTemp = {};
    waterQualitySensorTemp = JSON.parse(fs.readFileSync('./Sensors/waterQualitySensor.json', 'utf-8'));

    waterQualitySensorTemp.id = conf.sensorsArray[i].id;
    waterQualitySensorTemp.type = conf.sensorsArray[i].type;

    waterQualitySensorTemp.location.value.coordinates = conf.sensorsArray[i].coordinates;

    waterQualitySensorTemp.turbidity.value = getSensingValue.getTurbidity().toFixed(2)*1.0;
    waterQualitySensorTemp.turbidity.observedAt = currentTime;
    waterQualitySensorTemp.residualChlorine.value = getSensingValue.getCl().toFixed(2)*1.0;
    waterQualitySensorTemp.residualChlorine.observedAt = currentTime;
    waterQualitySensorTemp.pH.value = getSensingValue.getPh().toFixed(2)*1.0;
    waterQualitySensorTemp.pH.observedAt = currentTime;

    console.log("Device ID:",waterQualitySensorTemp.id);
    console.log("Sensing value(turbidity):",waterQualitySensorTemp.turbidity.value);
    console.log("Sensing value(residualChlorine):",waterQualitySensorTemp.residualChlorine.value);
    console.log("Sensing value(pH):",waterQualitySensorTemp.pH.value);
    console.log("Reported time:",waterQualitySensorTemp.pH.observedAt);
    console.log("-----------------------------------------------");

    switch (conf.place.type) {
        case "kr.waterdna.waterPurificationPlant:1.0":
            waterQualitySensorTemp.refRawWaterSource = {};
            waterQualitySensorTemp.refRawWaterSource.type = "Relationship";
            waterQualitySensorTemp.refRawWaterSource.object = conf.place.id;
            break;
        case "kr.waterdna.sewageTreatmentPlant:1.0":
            waterQualitySensorTemp.refWaterReservoir = {};
            waterQualitySensorTemp.refWaterReservoir.type = "Relationship";
            waterQualitySensorTemp.refWaterReservoir.object = conf.place.id;
            break;
        case "kr.waterdna.river:1.0":
            waterQualitySensorTemp.refRiver = {};
            waterQualitySensorTemp.refRiver.type = "Relationship";
            waterQualitySensorTemp.refRiver.object = conf.place.id;
            break;
    }
    waterQualitySensor.entities[0] = waterQualitySensorTemp;
    // sendCreateRequest(waterQualitySensor);
    sendCreateRequest(JSON.stringify(waterQualitySensor));

}

exports.waterPressureMeter = function(i, currentTime) {
    waterPressureMeter = {};
    waterPressureMeter.datasetId = "waterDataset010";
    waterPressureMeter.entities = [];
    waterPressureMeterTemp = {};
    waterPressureMeterTemp = JSON.parse(fs.readFileSync('./Sensors/waterPressureMeter.json', 'utf-8'));

    waterPressureMeterTemp.id = conf.sensorsArray[i].id;
    waterPressureMeterTemp.type = conf.sensorsArray[i].type;

    waterPressureMeterTemp.location.value.coordinates = conf.sensorsArray[i].coordinates;

    waterPressureMeterTemp.waterPressure.value = getSensingValue.getWaterPressure().toFixed(2)*1.0;
    waterPressureMeterTemp.waterPressure.observedAt = currentTime;
    waterPressureMeterTemp.refWaterPipe.object = conf.place.id;

    console.log("Device ID:",waterPressureMeterTemp.id);
    console.log("Sensing value(waterPressure):",waterPressureMeterTemp.waterPressure.value);
    console.log("Reported time:",waterPressureMeterTemp.waterPressure.observedAt);
    console.log("-----------------------------------------------");

    waterPressureMeter.entities[0] = waterPressureMeterTemp;
    // sendCreateRequest(waterPressureMeter);
    sendCreateRequest(JSON.stringify(waterPressureMeter));
}
exports.hydroMeter = function(i, currentTime) {
    hydroMeter = {};
    hydroMeter.datasetId = "waterDataset013";
    hydroMeter.entities = [];
    hydroMeterTemp = {};
    hydroMeterTemp = JSON.parse(fs.readFileSync('./Sensors/hydroMeter.json', 'utf-8'));

    hydroMeterTemp.id = conf.sensorsArray[i].id;
    hydroMeterTemp.type = conf.sensorsArray[i].type;

    hydroMeterTemp.location.value.coordinates = conf.sensorsArray[i].coordinates;

    hydroMeterTemp.flowRate.value = getSensingValue.getFlowRate().toFixed(2)*1.0;
    hydroMeterTemp.flowRate.observedAt = currentTime;
    hydroMeterTemp.refWaterPipe.object = conf.place.id;

    console.log("Device ID:",hydroMeterTemp.id);
    console.log("Sensing value(flowRate):",hydroMeterTemp.flowRate.value);
    console.log("Reported time:",hydroMeterTemp.flowRate.observedAt);
    console.log("-----------------------------------------------");

    hydroMeter.entities[0] = hydroMeterTemp;
    // sendCreateRequest(hydroMeter);
    sendCreateRequest(JSON.stringify(hydroMeter));

}


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

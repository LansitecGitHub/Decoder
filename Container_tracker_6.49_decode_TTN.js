// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of Type string)
// The function must return an object, e.g. {"temperature": 22.5}

function decodeUplink(input) {
    // Parse the TTN NS platform input
    var bytes = input.bytes;
    //get uplink message Type
    var uplink_Type = ((bytes[0] >> 4) & 0x0F);

    switch (uplink_Type) {
        case 0x01:
            var Register_Msg = Register_proc(bytes);
            return {
                data: Register_Msg,
                warnings: [],
                errors: []
            };

        case 0x02:
            var Heartbeat_Msg = Heartbeat_proc(bytes);
            return {
                data: Heartbeat_Msg,
                warnings: [],
                errors: []
            };

        case 0x03:
            var GNSSPosition_Msg = GNSSPosition_proc(bytes);
            return {
                data: GNSSPosition_Msg,
                warnings: [],
                errors: []
            };

        case 0x07:
            var PositionBeacon_Msg = PositionBeacon_Proc(bytes);
            return {
                data: PositionBeacon_Msg,
                warnings: [],
                errors: []
            };

        case 0x08:
            var AssetBeacon_Msg = AssetBeacon_Proc(bytes);
            return {
                data: AssetBeacon_Msg,
                warnings: [],
                errors: []
            };

        case 0x09:
            var Alarm_Msg = Alarm_proc(bytes);
            return {
                data: Alarm_Msg,
                warnings: [],
                errors: []
            };

        case 0x0A:
            var ShockDetection_Msg = ShockDetection_proc(bytes);
            return {
                data: ShockDetection_Msg,
                warnings: [],
                errors: []
            };

        case 0x0B:
            var OfflineCachePosition_Msg = OfflineCachePosition_proc(bytes);
            return {
                data: OfflineCachePosition_Msg,
                warnings: [],
                errors: []
            };

        default:
            return null;
    }

}
//Message Type: Register  0x1
function Register_proc(bytes) {
    var Register_Msg = {
        "Type": 0,
        "Adr": 0,
        "Mode": 0,
        "Smode": 0,
        "LoRaTxpower": 0,
        "OfflineCacheEnable": 0,
        "AlarmEnable": 0,
        "SingleKeyEnable": 0,
        "DR": 0,
        "GNSSEN": 0,
        "Posmode": 0,
        "Switchen": 0,
        "HB": 0,
        "BLEPRI": 0,
        "DIV": 0,
        "BLEEN": 0,
        "PositioningUUID": null,
        "AccelerometerThreshold": 0,
        "VER": 0,
        "CFMMSG": 0,
        "HBCOUNT": 0,
        "AssetBeaconReportPeriod": 0,
        "BluetoothReceivingDuration": 0,
        "ExtraAssetBeaconReportInterval": 0,
        "AssetBeaconUUID": 0,
        "ShockDetectionThreshold": 0,
        "ShockDetectionReportPeriod": 0,
        "GNSSPositionReportInterval": 0,
    };

    //type
    Register_Msg.Type = "Register";
    //adr
    Register_Msg.Adr = ((bytes[0] >> 3) & 0x1);
    switch (Register_Msg.Adr) {
        case 0x0:
            Register_Msg.Adr = "false";
            break;

        case 0x1:
            Register_Msg.Adr = "true";
            break;

        default:
            break;
    }
    //mode
    Register_Msg.Mode = 0x0;
    //smode
    Register_Msg.Smode = 0x00;

    //LoraTxpower
    Register_Msg.LoRaTxpower = ((bytes[2] >> 3) & 0x1F) + "dBm";
        //OfflineCacheEnable
    Register_Msg.OfflineCacheEnable = ((bytes[2] >> 2) & 0x01); 
    switch (Register_Msg.OfflineCacheEnable) {
        case 0x0:
            Register_Msg.OfflineCacheEnable = "disable";
            break;

        case 0x1:
            Register_Msg.OfflineCacheEnable = "enable";
            break;

        default:
            break;
    }
    //AlarmEnable
    Register_Msg.AlarmEnable = ((bytes[2] >> 1) & 0x01); 
    switch (Register_Msg.AlarmEnable) {
        case 0x0:
            Register_Msg.AlarmEnable = "disable";
            break;

        case 0x1:
            Register_Msg.AlarmEnable = "enable";
            break;

        default:
            break;
    }
    //SingleKeyEnable
    Register_Msg.SingleKeyEnable = (bytes[2] & 0x01); 
    switch (Register_Msg.SingleKeyEnable) {
        case 0x0:
            Register_Msg.SingleKeyEnable = "disable";
            break;

        case 0x1:
            Register_Msg.SingleKeyEnable = "enable";
            break;

        default:
            break;
    }
    //DR
    Register_Msg.DR = "DR" + ((bytes[3] >> 4) & 0x0F);
    //GNSSEN
    Register_Msg.GNSSEN = ((bytes[3] >> 3) & 0x01);
    switch (Register_Msg.GNSSEN) {
        case 0x0:
            Register_Msg.GNSSEN = "false";
            break;

        case 0x1:
            Register_Msg.GNSSEN = "true";
            break;

        default:
            break;
    }

    //posmode
    Register_Msg.Posmode = ((bytes[3] >> 1) & 0x03);
    switch (Register_Msg.Posmode) {
        case 0x0:
            Register_Msg.Posmode = "Period";
            break;

        case 0x1:
            Register_Msg.Posmode = "Autonomous";
            break;

        case 0x2:
            Register_Msg.Posmode = "On-Demand";
            break;

        default:
            break;
    }

    //SWITCHEN
    Register_Msg.Switchen = (bytes[3] & 0x01);
    switch (Register_Msg.Switchen) {
        case 0x0:
            Register_Msg.Switchen = "Disable";
            break;

        case 0x1:
            Register_Msg.Switchen = "Enable";
            break;

        default:
            break;
    }



    //HB
    Register_Msg.HB = ((((bytes[4] << 8) & 0xFF00) | (bytes[5] & 0xFF)) * 30) + "sec";

    //pos
    Register_Msg.BLEPRI = ((((bytes[6] << 8) & 0xFF00) | (bytes[7] & 0xFF)) * 5) + "sec";

    //div
    Register_Msg.DIV = bytes[8] & 0xFF;

    //BLEEN
    Register_Msg.BLEEN = (bytes[9] & 0x01);
    switch (Register_Msg.BLEEN) {
      case 0x0:
           Register_Msg.BLEEN = "Disable";
           break;

      case 0x1:
           Register_Msg.BLEEN = "Enable";
            break;
 
        default:
            break;
    }


    //Positioning UUID   
    for (var i = 0; i < 4; i++) {
        if (i == 0)
            Register_Msg.PositioningUUID = (Array(2).join(0) + (((bytes[10 + 4 * i] << 8) & 0xFF00) | (bytes[11 + 4 * i])).toString(16).toUpperCase()).slice(-4) + (Array(2).join(0) + (((bytes[12 + 4 * i] << 8) & 0xFF00) | (bytes[13 + 4 * i])).toString(16).toUpperCase()).slice(-4);
        else
            Register_Msg.PositioningUUID = Register_Msg.PositioningUUID + (Array(2).join(0) + (((bytes[10 + 4 * i] << 8) & 0xFF00) | (bytes[11 + 4 * i])).toString(16).toUpperCase()).slice(-4) + (Array(2).join(0) + (((bytes[12 + 4 * i] << 8) & 0xFF00) | (bytes[13 + 4 * i])).toString(16).toUpperCase()).slice(-4);
    }

    //GSensorThreshold
    Register_Msg.GsensorThreshold = (bytes[26] * 0.01) + "g";

    //ver
    Register_Msg.VER = (((bytes[27] << 8) & 0xFF00) | (bytes[28] & 0xFF)).toString(16).toUpperCase();

    //CFMMSG
    Register_Msg.CFMMSG = bytes[29];

    //HBCOUNT
    Register_Msg.HBCOUNT = bytes[30];

    //BluetoothReceivePeriod
    Register_Msg.AssetBeaconReportPeriod = bytes[31] + "min";

    //BluetoothReceivingDuration
    Register_Msg.BluetoothReceivingDuration = bytes[32] + "s";

    //AssetReportPeriod
    Register_Msg.ExtraAssetBeaconReportInterval = (bytes[33] * 10) + "s";

    //AssetBeaconUUID
    for (var i = 0; i < 4; i++) {
        if (i == 0)
            Register_Msg.AssetBeaconUUID = (Array(2).join(0) + bytes[34 + 4 * i].toString(16).toUpperCase()).slice(-2) + (Array(2).join(0) + bytes[35 + 4 * i].toString(16).toUpperCase()).slice(-2) + (Array(2).join(0) + bytes[36 + 4 * i].toString(16).toUpperCase()).slice(-2) + (Array(2).join(0) + bytes[37 + 4 * i].toString(16).toUpperCase()).slice(-2);
        else
            Register_Msg.AssetBeaconUUID = Register_Msg.AssetBeaconUUID + (Array(2).join(0) + bytes[34 + 4 * i].toString(16).toUpperCase()).slice(-2) + (Array(2).join(0) + bytes[35 + 4 * i].toString(16).toUpperCase()).slice(-2) + (Array(2).join(0) + bytes[36 + 4 * i].toString(16).toUpperCase()).slice(-2) + (Array(2).join(0) + bytes[37 + 4 * i].toString(16).toUpperCase()).slice(-2);

    }
    //ShockDetectionThreshold
    Register_Msg.ShockDetectionThreshold = (bytes[50] * 0.01) + "g";

    //ShockDetectionReportPeriod
    Register_Msg.ShockDetectionReportPeriod = (bytes[51] * 30) + "s";

    //pos
    Register_Msg.GNSSPositionReportInterval = ((((bytes[52] << 8) & 0xFF00) | (bytes[53] & 0xFF)) * 5) + "sec";

    return Register_Msg;
}


//Message Type: Heartbeat  0x2
function Heartbeat_proc(bytes) {
    var Heartbeat_Msg = {
        "Type": 0,
        "snrinc": 0,
        "vol": 0,
        "rssi": 0,
        "snr": 0,
        "gnssstate": 0,
        "vibstate": 0,
        "temperature": 0,
        "movement": 0
    };

    //Type
    Heartbeat_Msg.Type = "Heartbeat";
    //SNRINC
    Heartbeat_Msg.snrinc = bytes[0] & 0x0f;
    switch (Heartbeat_Msg.snrinc) {
        case 0x0:
            Heartbeat_Msg.snrinc = "no SNR field";
            break;

        case 0x1:
            Heartbeat_Msg.snrinc = "SNR field included ";
            break;

        default:
            break;
    }

    //vol
    Heartbeat_Msg.vol = (bytes[1] * 0.01 + 1.5) + "V";

    //rssi
    Heartbeat_Msg.rssi = (bytes[2] * (-1)) + "dBm";

    //SNR  
    Heartbeat_Msg.snr = ((((bytes[3] << 8) & 0xFF00) | (bytes[4] & 0xFF)) * 0.01) + "dB";

    //gnssstate
    Heartbeat_Msg.gnssstate = ((bytes[5] >> 4) & 0x0F);
    switch (Heartbeat_Msg.gnssstate) {
        case 0x00:
            Heartbeat_Msg.gnssstate = "off";
            break;

        case 0x01:
            Heartbeat_Msg.gnssstate = "bootGPS";
            break;

        case 0x02:
            Heartbeat_Msg.gnssstate = "locating";
            break;

        case 0x03:
            Heartbeat_Msg.gnssstate = "located";
            break;

        case 0x09:
            Heartbeat_Msg.gnssstate = "no signal";
            break;

        default:
            break;
    }
    //vibstate
    Heartbeat_Msg.vibstate = (bytes[5] & 0x0F) + "level";

    //temperature
    Heartbeat_Msg.temperature = (((bytes[6] << 8) & 0xFF00) | (bytes[7] & 0xFF)) + "℃";

    //movement
    Heartbeat_Msg.movement = ((((bytes[8] << 8) & 0xFF00) | (bytes[9] & 0xFF)) * 5) + "sec";

    return Heartbeat_Msg;
}

//函数意义
function hex2float(num) {
    var sign = (num & 0x80000000) ? -1 : 1;
    var exponent = ((num >> 23) & 0xff) - 127;
    var mantissa = 1 + ((num & 0x7fffff) / 0x7fffff);
    return sign * mantissa * Math.pow(2, exponent);
}

//Message Type: GNSSPosition  0x03
function GNSSPosition_proc(bytes) {
    var GNSSPposition_Msg = {
        "Type": 0,
        "Longitude": 0.0,
        "Latitude": 0.0,
        "Time": 0,
    };

    //Type
    GNSSPposition_Msg.Type = "GNSSPosition";

    //Longitude
    GNSSPposition_Msg.Longitude = ((bytes[1] << 24) & 0xFF000000);
    GNSSPposition_Msg.Longitude |= ((bytes[2] << 16) & 0xFF0000);
    GNSSPposition_Msg.Longitude |= ((bytes[3] << 8) & 0xFF00);
    GNSSPposition_Msg.Longitude |= (bytes[4] & 0xFF);
    GNSSPposition_Msg.Longitude = hex2float(GNSSPposition_Msg.Longitude);

    //Latitude
    GNSSPposition_Msg.Latitude = ((bytes[5] << 24) & 0xFF000000);
    GNSSPposition_Msg.Latitude |= ((bytes[6] << 16) & 0xFF0000);
    GNSSPposition_Msg.Latitude |= ((bytes[7] << 8) & 0xFF00);
    GNSSPposition_Msg.Latitude |= (bytes[8] & 0xFF);
    GNSSPposition_Msg.Latitude = hex2float(GNSSPposition_Msg.Latitude);

    //Time
    GNSSPposition_Msg.Time = ((bytes[9] << 24) & 0xFF000000);
    GNSSPposition_Msg.Time |= ((bytes[10] << 16) & 0xFF0000);
    GNSSPposition_Msg.Time |= ((bytes[11] << 8) & 0xFF00);
    GNSSPposition_Msg.Time |= (bytes[12] & 0xFF);
    GNSSPposition_Msg.Time = JSON.stringify(new Date((GNSSPposition_Msg.Time + 8 * 60 * 60) * 1000));
    return GNSSPposition_Msg;
}

function PositionBeacon_Proc(bytes) {

    var PositionBeacon_Msg = {
        "Type": 0,
        "length": 0,
    };

    //Type
    PositionBeacon_Msg.Type = "PositionBeacon";
    //length
    PositionBeacon_Msg.length = (bytes[0] & 0x0F);
    //vibstate
    PositionBeacon_Msg.vibstate = bytes[1] + "level";

    //It's P2P message, need to calcuate the real length.
    if (PositionBeacon_Msg.length == 0x0) {
        return PositionBeacon_Msg;
    } else {
        //Maximum 6 groups of history position
        if (PositionBeacon_Msg.length > 20) { //该部分由DR决定
            return PositionBeacon_Msg;
        }
        for (var i = 0; i < PositionBeacon_Msg.length; i++) {

            // major
            PositionBeacon_Msg["dev" + (i + 1) + ".major"] = (Array(2).join(0) + (bytes[6 + 5 * i].toString(16).toUpperCase())).slice(-2) + (Array(2).join(0) + (bytes[7 + 5 * i].toString(16).toUpperCase())).slice(-2);
            // minor
            PositionBeacon_Msg["dev" + (i + 1) + ".minor"] = (Array(2).join(0) + (bytes[8 + 5 * i].toString(16).toUpperCase())).slice(-2) + (Array(2).join(0) + (bytes[9 + 5 * i].toString(16).toUpperCase())).slice(-2);
            // rssi
            PositionBeacon_Msg["dev" + (i + 1) + ".rssi"] = (bytes[10 + 5 * i] - 256) + "dBm";
        }
    }
    return PositionBeacon_Msg;
}


function AssetBeacon_Proc(bytes) {

    var AssetBeacon_Msg = {
        "Type": 0,
        "Quantity": 0,
    };
    //Type
    AssetBeacon_Msg.Type = "AssetBeacon";
    //Quantity
    AssetBeacon_Msg.Quantity = bytes[1];

    //It's P2P message, need to calcuate the real length.
    if (AssetBeacon_Msg.Quantity == 0x0) {
        return AssetBeacon_Msg;
    } else {
        //Maximum 6 groups of history position
        if (AssetBeacon_Msg.Quantity > 20) { //该部分由DR决定
            return AssetBeacon_Msg;
        }
        for (var i = 0; i < AssetBeacon_Msg.Quantity; i++) {
            //major
            AssetBeacon_Msg["asset" + (i + 1) + ".major"] = (Array(2).join(0) + (bytes[2 + 5 * i].toString(16).toUpperCase())).slice(-2) + (Array(2).join(0) + (bytes[3 + 5 * i].toString(16).toUpperCase())).slice(-2);
            //minor
            AssetBeacon_Msg["asset" + (i + 1) + ".minor"] = (Array(2).join(0) + (bytes[4 + 5 * i].toString(16).toUpperCase())).slice(-2) + (Array(2).join(0) + (bytes[5 + 5 * i].toString(16).toUpperCase())).slice(-2);
            //rssi
            AssetBeacon_Msg["asset" + (i + 1) + ".rssi"] = (bytes[6 + i * 5] - 256) + "dBm";
        }
        return AssetBeacon_Msg;
    }
}



function OfflineCachePosition_proc(bytes) {
    var OfflineCachePosition_Msg = {
        "Type": 0,
        "length": 0,
        "flag": 0,
    };

    //Type
    OfflineCachePosition_Msg.Type = "OfflineCachePosition";

    //length
    OfflineCachePosition_Msg.length = (bytes[0] & 0x0F);

    var j = new Array();
    var flag = "";
    for (var i = 0; i < OfflineCachePosition_Msg.length; i++) {
        OfflineCachePosition_Msg.flag = ((bytes[1] >> (7-i)) & 0x01);
        flag = flag + OfflineCachePosition_Msg.flag;
       // OfflineCachePosition_Msg.flag += OfflineCachePosition_Msg.flag;

        switch (OfflineCachePosition_Msg.flag) {
            case 0x0:
                //j[i] = 5;
                j.push(5);
                OfflineCachePosition_Msg["flag"+ (i + 1)] = (i + 1) + " is Bluetooth position data";
                break;

            case 0x1:
                //j[i] = 12;
                j.push(12);
                OfflineCachePosition_Msg["flag"+ (i + 1)] = (i + 1) + " is GNSS position data";
                break;

            default:
                break;
        }
    }

    for (var i = 0; i < OfflineCachePosition_Msg.length; i++) {

        var count = 0;
        for (var h = 0; h < i; h++) {
            count = count + j[h];
        }

        if (((bytes[1] >> (7-i)) & 0x01) == 0) {
            // major
            OfflineCachePosition_Msg["dev" + (i + 1) + "major"] = (Array(2).join(0) + (bytes[2 + count].toString(16).toUpperCase())).slice(-2) + (Array(2).join(0) + (bytes[3 + count].toString(16).toUpperCase())).slice(-2);
            // minor
            OfflineCachePosition_Msg["dev" + (i + 1) + "minor"] = (Array(2).join(0) + (bytes[4 + count].toString(16).toUpperCase())).slice(-2) + (Array(2).join(0) + (bytes[5 + count].toString(16).toUpperCase())).slice(-2);
            // rssi
            OfflineCachePosition_Msg["dev" + (i + 1) + "rssi"] = (bytes[6 + count] - 256) + "dBm";
        }
        else {
            //Longitude
            OfflineCachePosition_Msg["Longitude" + (i + 1)] = ((bytes[2 + count] << 24) & 0xFF000000);
            OfflineCachePosition_Msg["Longitude" + (i + 1)] |= ((bytes[3 + count] << 16) & 0xFF0000);
            OfflineCachePosition_Msg["Longitude" + (i + 1)] |= ((bytes[4 + count] << 8) & 0xFF00);
            OfflineCachePosition_Msg["Longitude" + (i + 1)] |= (bytes[5 + count] & 0xFF);
            OfflineCachePosition_Msg["Longitude" + (i + 1)] = hex2float(OfflineCachePosition_Msg["Longitude" + (i + 1)]);

            //Latitude
            OfflineCachePosition_Msg["Latitude" + (i + 1)] = ((bytes[6 + count] << 24) & 0xFF000000);
            OfflineCachePosition_Msg["Latitude" + (i + 1)] |= ((bytes[7 + count] << 16) & 0xFF0000);
            OfflineCachePosition_Msg["Latitude" + (i + 1)] |= ((bytes[8 + count] << 8) & 0xFF00);
            OfflineCachePosition_Msg["Latitude" + (i + 1)] |= (bytes[9 + count] & 0xFF);
            OfflineCachePosition_Msg["Latitude" + (i + 1)] = hex2float(OfflineCachePosition_Msg["Latitude" + (i + 1)]);

            //Time
            OfflineCachePosition_Msg["Time" + (i + 1)] = ((bytes[10 + count] << 24) & 0xFF000000);
            OfflineCachePosition_Msg["Time" + (i + 1)] |= ((bytes[11 + count] << 16) & 0xFF0000);
            OfflineCachePosition_Msg["Time" + (i + 1)] |= ((bytes[12 + count] << 8) & 0xFF00);
            OfflineCachePosition_Msg["Time" + (i + 1)] |= (bytes[13 + count] & 0xFF);
            OfflineCachePosition_Msg["Time" + (i + 1)] = JSON.stringify(new Date((OfflineCachePosition_Msg["Time" + (i + 1)] + 8 * 60 * 60) * 1000));
        }

    }
    OfflineCachePosition_Msg.flag = flag;
    return OfflineCachePosition_Msg;
}


function Alarm_proc(bytes) {
    var Alarm_Msg = {
        "Type": 0,
        "alarm": 0
    };
    //Type
    Alarm_Msg.Type = "Alarm";
    if (Alarm_Msg.alarm == 0x01)
        Alarm_Msg.alarm = "Magnet is removed";
    return Alarm_Msg;
}


function ShockDetection_proc(bytes) {
    var Shock_Msg = {
        "Type": 0,
        "count": 0
    };
    //Type
    Shock_Msg.Type = "ShockDetection";
    Shock_Msg.count = (((bytes[1] << 8) & 0xFF00) | (bytes[2] & 0xFF)) + "s";
    return Shock_Msg;
}



import * as path from "path";

    

import { ic3ClientVersion, webChatDirectLineVersion, webChatIC3AdapterVersion } from "../config/settings";

const getIC3ClientCDNUrl = (version = ic3ClientVersion): string => {
    const IC3ClientCDNUrl = `https://comms.omnichannelengagementhub.com/release/${version}/Scripts/SDK/SDK.min.js`;
    return IC3ClientCDNUrl;
}

const getIC3AdapterCDNUrl = (version = webChatIC3AdapterVersion): string => {
    const IC3AdapterCDNUrl = `https://webchatic3.blob.core.windows.net/webchat-ic3adapter/${version}/botframework-webchat-adapter-ic3.production.min.js`;
    return IC3AdapterCDNUrl;
}

const getACSAdapterCDNUrl = (): string => {
    const ACSAdapterCDNUrl = path.resolve(__dirname, '../acs_adapter.js');
    const adapterPath = path.resolve(__dirname, '../acs_adapter.js');
    
    console.log("adapterPath=> ", adapterPath);
    
    console.log("getACSAdapterCDNUrl=> ", ACSAdapterCDNUrl);
    return "../dist/acs_adapter.js";
}

const getDirectLineCDNUrl = (version = webChatDirectLineVersion): string => {
    const DirectLineCDNUrl = `https://unpkg.com/botframework-directlinejs@${version}/dist/directline.js`;
    return DirectLineCDNUrl;
}

export default {
    getIC3ClientCDNUrl,
    getIC3AdapterCDNUrl,
    getACSAdapterCDNUrl,
    getDirectLineCDNUrl
}

export {
    getIC3ClientCDNUrl,
    getIC3AdapterCDNUrl,
    getACSAdapterCDNUrl,
    getDirectLineCDNUrl
}
import { webChatDirectLineVersion } from "../config/settings";

const getDirectLineCDNUrl = (version = webChatDirectLineVersion): string => {
    const DirectLineCDNUrl = `https://unpkg.com/botframework-directlinejs@${version}/dist/directline.js`;
    return DirectLineCDNUrl;
}

export default {
    getDirectLineCDNUrl
}

export {
    getDirectLineCDNUrl
}
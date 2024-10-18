import ChatAdapterProtocols from "../core/messaging/ChatAdapterProtocols";
import ChatSDKConfig from "../core/ChatSDKConfig";
import LiveChatVersion from "../core/LiveChatVersion";
import libraries from "./libraries";

const resolveDirectLineCDNUrl = (chatSDKConfig: ChatSDKConfig) => {
    if (chatSDKConfig.chatAdapterConfig && 'webChatDirectLineCDNUrl' in chatSDKConfig.chatAdapterConfig) {
        return chatSDKConfig.chatAdapterConfig.webChatDirectLineCDNUrl as string;
    }

    if (chatSDKConfig.chatAdapterConfig && 'webChatDirectLineVersion' in chatSDKConfig.chatAdapterConfig) {
        return libraries.getDirectLineCDNUrl(chatSDKConfig.chatAdapterConfig.webChatDirectLineVersion);
    }

    return libraries.getDirectLineCDNUrl();
}

const resolveChatAdapterUrl = (chatSDKConfig: ChatSDKConfig, liveChatVersion: LiveChatVersion, protocol: string): string => {
    const supportedChatAdapterProtocols = [ChatAdapterProtocols.DirectLine];
    if (protocol && !supportedChatAdapterProtocols.includes(protocol as string)) {
        throw new Error(`ChatAdapter for protocol ${protocol} currently not supported`);
    }

    if (protocol === ChatAdapterProtocols.DirectLine) {
        return resolveDirectLineCDNUrl(chatSDKConfig);
    }

    return '';
};

export default {
    resolveChatAdapterUrl
}

export {
    resolveChatAdapterUrl
}
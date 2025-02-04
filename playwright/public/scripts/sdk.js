const run = async () => {

    const omnichannelConfig = {
        orgId: "ce4db5f6-1c20-ee11-a66d-000d3a0a02f3",
        orgUrl: "https://m-ce4db5f6-1c20-ee11-a66d-000d3a0a02f3.ca.omnichannelengagementhub.com",
        widgetId: "148d0ead-14d2-41ea-bfc9-f4d4287f060c"
    }

    const { sleep } = window;

    const { OmnichannelChatSDK_1: OmnichannelChatSDK } = window;
    const chatSDK = new OmnichannelChatSDK.default(omnichannelConfig);

    await chatSDK.initialize();

    await chatSDK.startChat();

    const runtimeContext = {
        requestId: chatSDK.requestId,
        chatId: chatSDK.chatToken.chatId,
        acsEndpoint: chatSDK.chatToken.acsEndpoint,
    };

    const messages = [];

    const loaded = await chatSDK.getMessages();
    console.table(loaded);

    try {
        chatSDK.onNewMessage((message) => {
            console.log("##################################################################");
            console.log("Callback: New message received => ", JSON.stringify(message));
            messages.push(message);
        });
    } catch (err) {
        runtimeContext.errorMessage = `${err.message}`;
        runtimeContext.errorObject = `${err}`;
    }

    console.time("counter");
    await sleep(30000); // Wait to accumulate messages if any
    console.timeEnd("counter");
    runtimeContext.messages = messages;


    console.log("**************** Messages received *******************");
    console.table(messages);

    console.log("**************** Fething Messages *******************");
    const reloaded = await chatSDK.getMessages();
    console.table(reloaded);


    await chatSDK.endChat();


};

run();
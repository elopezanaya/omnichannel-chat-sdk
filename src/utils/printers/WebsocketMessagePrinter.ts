import { ChatMessageEditedEvent, ChatMessageReceivedEvent } from "@azure/communication-chat";

import { PrintableMessage } from "./types/PrintableMessageType";

export class WebSocketMessagePrinter {

    static printify(event: ChatMessageReceivedEvent | ChatMessageEditedEvent): PrintableMessage {
        const result: PrintableMessage = {} as PrintableMessage;
        if (event) {
            result.id = event.id;
            result.tags = event?.metadata?.tags ? event.metadata.tags.replace(/"/g, "").split(",").filter((tag: string) => tag.length > 0) : [];
            result.bot = event?.metadata?.tags?.includes('public') ? false : true;
            result.card = event?.message?.includes('application/vnd.microsoft.card.adaptive');
            if (!result.card && event?.message) {
                result.content = this.messageContentMetadata(event?.message);
            }
            result.created = event.createdOn;
        }
        return result;
    }

    static messageContentMetadata(message: string): string {
        if (!message) {
            return '0';
        }
        const first = message?.charAt(0);
        const last = message?.charAt(message?.length - 1);
        const size = message?.length;
        return `${first}${size}${last}`;
    }

}

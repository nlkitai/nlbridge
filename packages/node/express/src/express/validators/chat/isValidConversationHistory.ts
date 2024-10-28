export const isValidConversationHistory = (history: any) => {
    if (!Array.isArray(history)) {
        return {
            success: false,
            error: 'payload.conversationHistory is not an array',
        };
    }

    if (history.some((item: any) => {
        if (typeof item !== 'object' || item === null) {
            return true;
        }

        if (
            (item.role !== 'user' && item.role !== 'ai' && item.role !== 'system') ||
            typeof item.message !== 'string'
        ) {
            return true;
        }
    })) {
        return {
            success: false,
            error: 'payload.conversationHistory contains invalid items',
        };
    }

    return {
        success: true,
        history,
    };
};
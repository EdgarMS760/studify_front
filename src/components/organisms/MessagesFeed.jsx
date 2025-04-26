import React, { useEffect, useState } from 'react';
import CardFeedMessage from '@components/molecules/CardFeedMessage';
import { listenToGroupMessages } from '@libs/helpers/firebaseUtils';

const MessagesFeed = ({ groupId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!groupId) return;
        
        const unsubscribe = listenToGroupMessages(groupId, setMessages);
        return () => unsubscribe();
    }, [groupId]);
    
    useEffect(() => {
        
        console.log('messages', messages)
    }, [messages]);
    return (
        <div className="flex flex-col h-full overflow-y-auto p-3 space-y-3">
            {messages.map((msg) => (
                <CardFeedMessage key={msg.id} msgObj={msg} />
            ))}
        </div>
    );
};

export default MessagesFeed;

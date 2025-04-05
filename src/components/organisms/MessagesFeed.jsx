import React from 'react';
import CardFeedMessage from '@components/molecules/CardFeedMessage';

const MessagesFeed = ({ messages = [] }) => {
    return (
        <div className="flex flex-col h-full overflow-y-auto p-3 space-y-3">
            {messages.map((msg, index) => (
                <CardFeedMessage key={index} msgObj={msg} />
            ))}
        </div>
    );
};

export default MessagesFeed;

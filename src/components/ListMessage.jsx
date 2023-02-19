import React, { useState, useEffect } from 'react'
import Post from './Post';

function ListMessage(props) {
    const [listOfMessage,setListOfMessage]=useState([])
    const [isLoaded,setIsLoaded]=useState(false)
    const listMessages = async () => {
        const messages = await fetchMessagesForSchema(
            parseInt(props.schema.schema_id)
        );

        let allMessages = messages.map((msg, index) => {
            return {
                key: index,
                payload: staticSchema.fromBuffer(
                    Buffer.from(msg.payload.unwrap().buffer)
                ),
            };
        });

        setListOfMessage(allMessages);
        setIsLoaded(!isLoaded);
    }
    console.log(allMessages)
    return (
        <>
            <p>Hi we here now.</p>
            {isLoaded?(
                <>
                    <Post posts={allMessages}></Post>
                </>
            ):(
                <p>Loading Messages...</p>
            )}
        </>
    )
}

export default ListMessage
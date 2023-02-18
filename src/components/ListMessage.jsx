import React, { useState, useEffect } from 'react'

function ListMessage(props) {
    const [listOfMessage,setListOfMessage]=useState([])
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
    }
    console.log(allMessages)
    return (
        <>
            <p>Hi we here now.</p>
        </>
    )
}

export default ListMessage
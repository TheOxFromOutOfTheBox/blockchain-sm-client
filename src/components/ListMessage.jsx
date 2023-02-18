import React, { useState, useEffect } from 'react'
import { fetchMessagesForSchema } from '../services/chain/apis/extrinsic';
import { Schema } from './CreateMessage';

function ListMessage(props) {
    const [listOfMessage,setListOfMessage]=useState([])
    const listMessages = async () => {
        const messages = await fetchMessagesForSchema(
            // parseInt(props.schema.schema_id)
            2
        );

        let allMessages = messages.map((msg, index) => {
            return {
                key: index,
                payload: Schema.fromBuffer(
                    Buffer.from(msg.payload.unwrap().buffer)
                ),
            };
        });

        setListOfMessage(allMessages);
        console.log(listOfMessage)
    }
    return (
        <>
            <p>Hi we here now.</p>
            <button onClick={()=>listMessages()} className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'> Fetch Messages</button>
        </>
    )
}

export default ListMessage
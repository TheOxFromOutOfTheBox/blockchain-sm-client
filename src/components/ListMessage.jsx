import React, { useState, useEffect } from 'react'
import Post from './Post';
import { fetchMessagesForSchema } from '../services/chain/apis/extrinsic';
import { Schema } from './CreateMessage';

const fetchTime=3600

function ListMessage(props) {
    const [listOfMessage,setListOfMessage]=useState([])
    const [isLoaded,setIsLoaded]=useState(false)
    const listMessages = async () => {
        let schemaID=11;
        const messages = await fetchMessagesForSchema(
            // parseInt(props.schema.schema_id)
            schemaID
        );
        console.log(`fetching for schema id ${schemaID}`)
        let allMessages = messages.map((msg, index) => {
            return {
                key: index,
                payload: Schema.fromBuffer(
                    Buffer.from(msg.payload.unwrap().buffer)
                ),
            };
        });

        setListOfMessage(allMessages);
        // setIsLoaded(true);
        console.log(listOfMessage)
    }
    setTimeout(()=>{
        listMessages();
        console.log("ran timeout func");
    },fetchTime*1000);
    return (
        <div className='p-4'>
            <Post posts={listOfMessage}></Post>
            {/* {isLoaded?(
                <>
                    <Post posts={listOfMessage}></Post>
                </>
            ):(
                <p>Loading Messages...</p>
            )}
            <button onClick={()=>listMessages()} className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'> Fetch Messages</button> */}
        </div>
    )
}

export default ListMessage
import React, { useState, useEffect } from 'react'
import Post from './Post';
import { fetchMessagesForSchema } from '../services/chain/apis/extrinsic';
import { Schema } from './CreateMessage';
import Channel from './Channel';

 //const fetchTime=3600
const fetchTime=3

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
        // console.log(listOfMessage)
    }
    setTimeout(()=>{
        listMessages();
        console.log("ran timeout func");
    },fetchTime*1000);
    return (
        <div className='p-4'>   
            <Post posts={listOfMessage}></Post>
        </div>
    )
}

export default ListMessage
import React, { useState, useEffect } from 'react'
import { createMessage, createSchema } from "../services/chain/apis/extrinsic";
import { fetchAllSchemas } from '../services/chain/apis/extrinsic';
import { ParquetSchema, ParquetWriter } from "./parquet.esm";
import * as avro from "avsc";

// @dsnp/parquetjs error
// import { testCompression, testParquetSchema } from "../helpers/parquet";
// import * as generators from "@dsnp/test-generators";
// import broadcastSchema from "./broadcast";   

// describe("Broadcast Spec", () => {
//   testParquetSchema(broadcastSchema);

//   testCompression("broadcast", broadcastSchema, () => ({
//     announcementType: 2,
//     contentHash: generators.generateHash(),
//     fromId: generators.randInt(10000000),
//     url: `https://www.imadapp.com/data/posts/${generators.generateHash()}`,
//   }));
// });

export const Schema = avro.Type.forSchema({
    type: "record",
    name: "User",
    fields: [
        { name: "message", type: "string" },
        { name: "fromuser", type: "string" },
        { name: "channel", type: "string" },
    ],
});

const doRegisterSchema = async () => {
    await createSchema(JSON.stringify(Schema.schema()));
    console.log("Schema registered!")
    // setSchemaRegistered("Schema Registered");
};

const Dropdown = (props) => {
    // declare a schema for the `fruits` table
    // var schema = new ParquetSchema({
    //     name: { type: 'UTF8' },
    //     quantity: { type: 'INT64' },
    //     price: { type: 'DOUBLE' },
    //     date: { type: 'TIMESTAMP_MILLIS' },
    //     in_stock: { type: 'BOOLEAN' }
    // });
    // console.log(schema);
    const items = props.items
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Select an item");

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleItemClick = (item) => {
        setSelectedItem(item);

        props.passToParent(item[0])
        setShowDropdown(false);
    };


    return (
        <div className="relative">
            <button
                className="bg-white border border-gray-400  py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
                onClick={toggleDropdown}
            >
                {selectedItem}
            </button>
            {showDropdown && (
                <ul className="absolute bg-gray-500 rounded-lg shadow-md mt-2">
                    {items.map((item) => (
                        <li
                            key={item}
                            className="py-2 px-4 hover:bg-gray-200"
                            onClick={() => handleItemClick(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const Form = (props) => {

    // useEffect(()=>{
    //     doRegisterSchema()
    //     console.log("Schema registered")
    // },[])
    const [values, setValues] = useState({});

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitMessage();
    };

    const handleError = (e) => {
        console.log(e)
    }

    const Fields = [
        {
            name: "Message"
        },
        {
            name: "From"
        }
    ]
    const submitMessage = async () => {
        let avroBuffer = Schema.toBuffer(values);
        // console.log(avroBuffer)
        console.log("avro buffer: ", values);
        await createMessage(
            avroBuffer,
            11,
            () => { },
            handleError
        );
        console.log("Done did it")
    };
    return (
        <>
            <div className='grid grid-cols-1 align-items-center justify-items-center'>
                <button className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600' onClick={() => doRegisterSchema()}>
                    Register Schema
                </button>
            </div>
            <form onSubmit={handleSubmit} className="p-2 text-white rounded-lg shadow-md">
                {Schema.fields.map((item) => {
                    console.log(item)
                    if (item.name != "channel") {
                        return (

                            <>
                                <div className="mb-2">
                                    <label className="block  font-medium mb-2">
                                        {item.name}
                                    </label>
                                    <input
                                        type="text"
                                        id={item.name}
                                        name={item.name}
                                        value={values[item.name] || ""}
                                        onChange={handleChange}
                                        className="w-full bg-gray-400 p-2 rounded-lg"
                                    />
                                </div>
                            </>
                        )
                    }
                    else {
                        <>

                        </>
                    }
                }
                )}
                <div className='grid grid-cols-1 align-items-center justify-items-center'>
                    <button
                        type="submit"
                        onClick={() => { submitMessage() }}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};


function CreateMessage(props) {
    const smsaid = props.smsaid
    const [posts, setPosts] = useState([]);
    const fetchData = async () => {
        try {
            const schemas = await fetchAllSchemas();
            // console.log(schemas)
            // console.log("Hello");
            setPosts(schemas);
            console.log(posts)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [smsaid])
    let arr = []
    posts.map((item) => {
        arr.push(`${item.schema_id} - ${item.model_type}`)
    })
    const [index, setIndex] = useState(-1)
    const [showForm, setShowForm] = useState(true)
    function returnChildValue(value) {
        console.log(`value is ${value}`)
        setIndex(value - 1)
        setShowForm(true)
    }

    return (
        <>
            {/* Index = {index} */}
            {/* <Dropdown items={arr} passToParent={returnChildValue}></Dropdown> */}
            {showForm && <Form postNum={index} posts={posts} active={props.active}></Form>}
        </>
    )
}

export default CreateMessage
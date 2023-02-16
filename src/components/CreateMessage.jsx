import React, { useState, useEffect } from 'react'
import { createMessage } from "../services/chain/apis/extrinsic";
import { fetchAllSchemas } from '../services/chain/apis/extrinsic';
// import { staticSchema } from "./CreateSchema";
import * as avro from 'avsc'
// import * as parquet from 'parquetjs'
// import { ParquetModel } from "../types/frequency";
// import { ParquetModel } from '../types/frequency';



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

const Dropdown = (props) => {
    const items = props.items
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Select an item");

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        // console.log("parquet")
        // var schema = new parquet.ParquetSchema({
        //     age: { type: 'UINT_32', encoding: 'RLE', bitWidth: 7 },
        //   });
        // console.log(schema);
        console.log("itemmmmmmmmmmm")
        console.log(item)
        props.passToParent(item[0])
        setShowDropdown(false);
    };


    return (
        <div className="relative">
            <button
                className="bg-white border border-gray-400 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
                onClick={toggleDropdown}
            >
                {selectedItem}
            </button>
            {showDropdown && (
                <ul className="absolute bg-white rounded-lg shadow-md mt-2">
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
    const [values, setValues] = useState({});

    const handleChange = (e) => {
        // console.log(e.target.value)
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(values);
        submitMessage();
    };

    const handleError = (e) =>{
        console.log(e)
    }
    const posts = props.posts
    const idx = props.postNum
    const model = posts[idx]
    // const Schema=avro.Type.forSchema(model)
    console.log(model.model_structure)
    const a=model.model_structure
    let b={}
    a.map((item)=>{
        b[item.name]=item.column_type
        console.log(item.column_type)
    })
    console.log(b)
    const submitMessage = async () => {
        // let avroBuffer= Schema.toBuffer(values);
        // console.log("avro buffer: ", values);
        // values.fromId=parseInt(values.fromId,10)
        let msg="Hi This Monish Pondey"
        const encoded = Buffer.from(msg).toString('hex');
        await createMessage(
          encoded,
          0,
        //   parseInt(props?.schema?.schema_id),
          () => {},
          handleError
        );
      };
    return (
        <>
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
                {model.model_structure.map((item) => (
                    (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    {item.name}
                                </label>
                                <input
                                    type="text"
                                    id={item.name}
                                    name={item.name}
                                    value={values[item.name]||""}
                                    onChange={handleChange}
                                    className="w-full border border-gray-400 p-2 rounded-lg"
                                />
                            </div>
                        </>

                    )
                ))}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Submit
                </button>
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
    const [showForm, setShowForm] = useState(false)
    function returnChildValue(value) {
        console.log(`value is ${value}`)
        setIndex(value - 1)
        setShowForm(true)
    }
    
    return (
        <>
            Index = {index}
            <Dropdown items={arr} passToParent={returnChildValue}></Dropdown>
            {showForm && <Form postNum={index} posts={posts}></Form>}
        </>
    )
}

export default CreateMessage
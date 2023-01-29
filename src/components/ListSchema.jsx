import React, { useEffect, useState } from 'react'
import { fetchAllSchemas } from "../services/chain/apis/extrinsic"

function ListSchema(props) {
    const smsaid = props.smsaid
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const fetchData = async () => {
        try {
            const schemas = await fetchAllSchemas();
            console.log(schemas)
            console.log("Hello");
            setPosts(schemas);
            console.log(posts)
            console.log("turned off loading again")

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
        setLoading(false);
    }, [smsaid])
    return (
        <>
            <div className="App">
                {loading ? (
                    <h4>Loading...</h4>) :
                    (
                        <ul>
                            {posts.map((item) => (
                                <>
                                    <li key={item.schema_id}>{item.model_type}</li>
                                </>
                            )
                            )}
                        </ul>
                    )

                }
            </div>
        </>
    )
}

export default ListSchema
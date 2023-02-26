import React from 'react'

const channels=[
    "General",
    "Valorant",
    "Stumble Guys",
    "Tatakae",
]

function Channel(props) {
    return (
        <>
            <div class="bg-gray-800 text-gray-400 w-1/5 px-4 py-2">
                {/* <div class="flex items-center mb-6">
                    <div class="w-8 h-8 bg-gray-500 rounded-full mr-3"></div>
                    <div class="font-medium">User Name</div>
                </div> */}
                <ul className="list-reset"> 
                {channels.map((item,index)=>{
                    console.log(index)
                    return(
                        <>
                        {index==props.active?(
                            <>
                            <li key={index} className="py-2 bg-gray-600 hover:bg-gray-700">
                                <a href="#" onClick={()=>{
                                    console.log(`${index} is active channel`)
                                    props.setActiveChannel(index);
                                }} className="text-white flex items-center">
                                    <span className="text-white bg-indigo-600 rounded-full w-4 h-4 mr-2"></span>
                                    <span>{item}</span>
                                </a>
                            </li>
                            </>
                        ):(

                            <li key={index} className="py-2 hover:bg-gray-700">
                                <a href="#" onClick={()=>{
                                    console.log(`${index} is active channel`)
                                    props.setActiveChannel(index);
                                }} className="text-white flex items-center">
                                    <span className="text-white bg-indigo-600 rounded-full w-4 h-4 mr-2"></span>
                                    <span>{item}</span>
                                </a>
                            </li>
                        )}
                        </>
                    )
                })}
                </ul>
            </div>
        </>
    )
}

export default Channel
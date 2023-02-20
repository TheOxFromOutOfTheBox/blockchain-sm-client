import React,{useState} from 'react'

// const posts = ([
//     {
//         title: 'Post 1',
//         content: 'This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.This is the content of post 1.v',
//         likes: 10,
//         user: "ItsSRG",
//         expanded:false,
//     },
//     {
//         title: 'Post 2',
//         content: 'This is the content of post 2.',
//         likes: 22,
//         user: "TheOxFromOutOfTheBox",
//         expanded:false,

//     },
//     {
//         title: 'Post 3',
//         content: 'This is the content of post 3.',
//         likes: 30,
//         user: "PrateekPondey",
//         expanded:false,
//     },
// ]);

function Like({likes}) {
    return (
        <div className='p-3 rounded-full bg-gray-400 text-white font-bold text-2xl'>
            {likes}
        </div>
    )
}

function Post(props) {
    const posts=props.posts;
    console.log(posts);
    posts.map((item)=>{
        console.log(item.payload.message)
        console.log(item.payload.fromuser)
    })
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Popular Posts</h2>
            {posts.map((post, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow p-4 mb-4 grid grid-cols-6 gap-4"
                >
                    <div className="p-4 flex items-center justify-center flex-col mr-4">
                        <div className=''>
                            {post.payload.fromuser}
                        </div>
                        {/* <Like likes={post.`payload.likes}></Like> */}
                    </div>
                    <div className='border-gray-500 border-l-4 col-span-4 pl-4'>
                        {/* <h3 className="text-lg font-semibold mb-2">{post.payload.title}</h3> */}
                        <p className="text-gray-700">{post.payload.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default Post
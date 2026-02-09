import React from 'react'
import cookie from '../assets/cookie4.png'
const Grid = ({ posts, setSelectedPost, className }) => {

    return (

        <div className={`${className} overflow-auto`}>
            <div className='grid grid-cols-3 gap-1'>
                {posts.map((item, index) => {
                    return (
                        <div className='aspect-square'>
                            <img onClick={() => setSelectedPost(item)} key={index} className='w-full h-full object-cover cursor-pointer hover:opacity-50 transition-all duration-200 ' src={item.image_URL} alt="" />
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Grid
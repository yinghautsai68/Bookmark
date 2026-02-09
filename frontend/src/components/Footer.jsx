import React from 'react'
import Title from './Title'

const Footer = () => {
    return (
        <div className='w-full h-[20%] xl:px-90 px-5 py-10 flex flex-row justify-between items-center  '>
            <div className=' flex flex-col justify-center items-center w-full h-full   '>
                <Title title="BookMark" />
                <p>Copyright @ 2025 BookMark</p>
            </div>
            <ul className='h-full  flex flex-row justify-center items-center gap-5 flex-wrap w-full  h-full   '>
                <li>關於</li>
                <li>服務</li>
                <li>聯絡</li>
                <li>隱私</li>
                <li>使用條款</li>
            </ul>
        </div>
    )
}

export default Footer
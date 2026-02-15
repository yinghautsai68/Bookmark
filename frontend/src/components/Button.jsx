import React from 'react'

const Button = ({ className, type, text, onClick }) => {
    return (
        <button type={type} onClick={onClick} className={`${className} px-5 py-2 flex flex-row  justify-center items-center rounded-lg bg-[#22287C]  text-center text-white cursor-pointer`}>
            <span>{text}</span>
        </button>
    )
}

export default Button
import React from 'react'

const Input = ({ text, value, onChange, type, className }) => {
    return (
        <input
            className={`${className} p-2 bg-gray-900 rounded placeholder-gray-500`}
            type={type}
            placeholder={text}
            value={value}
            onChange={onChange}
            required />
    )
}

export default Input
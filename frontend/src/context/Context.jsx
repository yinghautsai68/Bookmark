import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [stories, setStories] = useState(() => {
        const saved = localStorage.getItem("stories")
        return saved ? JSON.parse(saved) : []
    })

    const [storyIndex, setStoryIndex] = useState(() => {
        const saved = localStorage.getItem("storyIndex")
        return saved ? Number(saved) : 0
    })
    return (
        <Context.Provider value={{
            stories,
            setStories,
            storyIndex,
            setStoryIndex,
            navigate
        }}>
            {children}
        </Context.Provider>
    )
}


import { createContext, useState } from "react";

const ThemeContext = createContext()

const initialTheme = "light"


const ThemeProvider=({children})=>{
    const [theme, setTheme] = useState(initialTheme)

    const handleTheme=(e)=>{
        if(e.target.id === "light"){
            setTheme("dark")
        }else{
            setTheme("light")
        }
    }

    const data = {theme,handleTheme}

    return<ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>

}

export {ThemeProvider}
export default ThemeContext
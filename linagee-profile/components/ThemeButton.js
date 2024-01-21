// /components/ThemeSwitch/index.tsx

"use client"

import { PiSunDimFill } from 'react-icons/pi'
import { BiSolidMoon } from 'react-icons/bi'
import { useTheme } from 'next-themes';


export default function ThemeButton() {

    const {systemTheme, theme, setTheme} = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    const renderThemeChanger = () => {

        const currentTheme = theme === "system" ? systemTheme : theme;

        if (currentTheme === "dark") {
            return (
                <PiSunDimFill className="w-5 h-5 text-yellow-400 hover:text-yellow-700 hover:scale-105 transition duration-200" role="button" onClick={() => setTheme('light')}/>
            )
        } else {
            return (
                <BiSolidMoon className="w-5 h-5 text-slate-700 hover:text-slate-500 hover:scale-105 transition duration-200" role="button" onClick={() => setTheme('dark')}/>
            )
        }
    };

    return (
        <>
            {renderThemeChanger()}
        </>
    )
}
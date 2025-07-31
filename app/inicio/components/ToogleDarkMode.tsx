import { useEffect, useState } from "react";

export function ToogleDarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
        localStorage.setItem('darkMode', (!darkMode).toString());   
    };

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode) {
            const isDarkMode = savedDarkMode === 'true';
            setDarkMode(isDarkMode);
            document.documentElement.classList.toggle('dark', isDarkMode);
        }
    }, []);

    return(
        <div className="absolute right-8 top-4">            
            <label
            htmlFor="AcceptConditions"
            className="relative block h-8 w-12 [-webkit-tap-highlight-color:_transparent]"
            >
                <input type="checkbox" id="AcceptConditions" className="peer sr-only" onChange={toggleDarkMode}/>

                <span className="absolute inset-0 m-auto h-2 rounded-full bg-gray-600 dark:bg-gray-300"></span>

                <span
                    className="absolute inset-y-0 start-0 m-auto size-6 rounded-full bg-gray-500 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:scale-0"
                >
                    <span className="absolute inset-0 m-auto size-4 rounded-full bg-gray-200 transition-transform">
                    </span>
                </span>
            </label>
        </div>
    );
}
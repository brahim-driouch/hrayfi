

import AuthLinks from "./Navbar/AuthLinks"
import Navbar from "./Navbar/Navbar"



const Header = () => {

  return (
    <header className="w-full flex items-center justify-between py-2 text-gray-700 ">
        <h2 className="text-2xl font-bold text-gray-600">
            <span className="font-black text-4xl text-blue-400">7</span>rayfi
        </h2>
        <Navbar/>
    </header>
  )
}

export default Header
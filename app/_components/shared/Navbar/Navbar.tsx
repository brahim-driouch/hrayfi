import LargeScreenNavbar from "./LargeScreenNavbar"
import SmallScreenNavbar from "./SmallScreenNavbar"



const Navbar = () => {
  return (
    <nav className="">
        <LargeScreenNavbar/>
        <SmallScreenNavbar/>
    </nav>
  )
}

export default Navbar
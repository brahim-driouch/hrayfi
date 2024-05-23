import Input from "../../reusable/Input"



const Search = () => {
  return (
    <div>

        <form>
            Je cherche: <Input type="text" styling="px-2 border-b  outline-none  focus:border-b-green-300" placeholder="plombier, electricien...."/>
             à : <Input type="text" styling="px-2 border-b  outline-none focus:border-b-green-300" placeholder="ex: Casablanca"/>
        </form>
        
    </div>
  )
}

export default Search




interface InputProps {
    type:string,
    placeholder:string,
    styling:string


}
const Input = ({type,placeholder,styling}:InputProps) => {
  return (
   <input type={type} placeholder={placeholder} className={styling} />
  )
}

export default Input
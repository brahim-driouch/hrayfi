import { useTranslations } from "next-intl"
import Image from "next/image"
import Search from "./Search"

const Hero = () => {
    const th = useTranslations("Headings")
    const tb = useTranslations("Buttons")
  return (
    <section className="w-full lg:w-10/12 flex justify-center items-start mt-24 text-gray-800">
      <div className="w-full flex flex-col space-y-6 lg:w-1/2 mt-16">
            <h1 className="font-black text-4xl ">
                {th("h1Hero")}
            </h1>
            <div className="w-full flex justify-start ">
              <button className="py-2 rounded mx-6 bg-purple-700 text-white w-1/3">
                {tb("heroSearchBtn")}
              </button>
              <button className="py-2 rounded  bg-black text-white w-1/3">
                {tb("heroRegisterBtn")}
              </button>
            </div>
      </div>
      <div className="relative hidden lg:flex lg:w-1/2 h-[350px]">
        <Image src={"/images/workers.svg"} alt="workers" fill={true}/>
      </div>
    </section>
  )
}

export default Hero
import RegisterForm from "@/app/_components/users/RegisterForm";
import { useTranslations } from "next-intl";



export default function Page(){

  const t = useTranslations("Headings")

    return (
       <main className="w-full flex flex-col items-center justify-start space-y-6 py-16">
         <h1 className="text-3xl font-bold ">{t("h1RegisterPage")} </h1>
        <RegisterForm/>
       </main>
    )
}
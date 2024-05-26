"use client";
import RegisterForm from "@/app/_components/users/RegisterForm";
import { useTranslations } from "use-intl";



export default function Page(){

  const t = useTranslations("Headings")

    return (
       <main className="w-full lg:w-3/5 flex flex-col space-y-6 py-24">
         <h1 className="text-3xl font-bold ">{t("h1RegisterPage")} </h1>
        <RegisterForm/>
       </main>
    )
}
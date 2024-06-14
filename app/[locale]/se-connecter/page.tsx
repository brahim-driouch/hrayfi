import LoginForm from "@/app/_components/users/LoginForm"
import { useTranslations } from "next-intl";



function LoginPage() {

    const t = useTranslations("Headings")
    return (
        <main className="w-full flex flex-col items-center justify-start space-y-6 py-16">
          <h1 className="text-3xl font-bold ">{t("h1LoginPage")} </h1>
         <LoginForm/>
        </main>
     )
}

export default LoginPage
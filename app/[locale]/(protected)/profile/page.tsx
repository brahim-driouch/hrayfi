import { getSession } from "@/auth"
import { LoggedInUserType } from "@/dataSchemas"
import { getLocale } from "next-intl/server"
import Link from "next/link"




export default async function ProfilePage() {

    const user :LoggedInUserType= (await getSession()).user
    const locale = await getLocale()

    if(!user) return <div>loading</div>

    if(!user?.isVerified){
        return (
            <div>
                Merci de bien vouloir verifier votre compte <Link href={`/${locale}/account-validation?uid=${user.id}`}></Link>
            </div>
        )
    }

  return (
    <div>
        {
            user?.isVerified ? "verfied" : "Merci de verifier votre compte"
        }
    </div>
  )
}


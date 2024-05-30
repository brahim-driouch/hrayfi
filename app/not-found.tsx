import Link from "next/link";


export default async function NotFound() {
    
    return (
        <html>
            <head>

            </head>
            <body>
                <div className=" min-h-screen w-full flex justify-center items-center">
                    <p> La page demandée semble ne pas exister</p>
                    <p> Retourner vers la page <Link href={"/fr"}>d'acceuil
                    </Link></p>
                </div>
            </body>
        </html> 
    )
}
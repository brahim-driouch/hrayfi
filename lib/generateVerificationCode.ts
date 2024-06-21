


export default function generateVerificationCode(){

    return (Math.floor(Math.random()*900000)+100000).toString()
}
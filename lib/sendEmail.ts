
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY
const resend = new Resend(RESEND_API_KEY);

type Tag = {
    name:string,
    value:string
}

interface EmailProps {
    from:string,
    to:string[],
    subject:string,
    text?:string,
    tags?:Tag[],
    html?:any,
    headers?:any
}

export default async function sendEmail({from,to,subject,text,tags,headers,html}:EmailProps){

    if(!RESEND_API_KEY) return


    return await resend.emails.send({
        from: from,
        to: to,
        subject: subject,
        text: text,
         html:html,
        headers: headers,
        tags:tags
      });
}

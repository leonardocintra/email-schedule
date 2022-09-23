
interface To {
    email: string;
    name: string;
}

interface Personalization {
    to: To[];
    subject: string;
}

interface Content {
    type: string;
    value: string;
}

interface From {
    email: string;
    name: string;
}

interface ReplyTo {
    email: string;
    name: string;
}

export interface SendEmailInterface {
    personalizations: Personalization[];
    content: Content[];
    from: From;
    reply_to: ReplyTo;
}
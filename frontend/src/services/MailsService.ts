import { ISendEMail, ISendEmailResponse } from "../interfaces";
import { Api } from "../providers"

const sendEmail = (data: ISendEMail) => Api.post<ISendEmailResponse>('/api/v1/mails', data);

export const MailsServices = {
    sendEmail
}
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SendEmailInterface } from 'src/app/sendgrid/interface/send-email.interface';
import { SendgridService } from '../../sendgrid/sendgrid.service';
import { MailStatusEnum } from '../enum/mail-status.enum';
import { MailService } from '../mail.service';

@Injectable()
export class MailCron {

  private logger = new Logger(MailCron.name);

  constructor(private readonly mailService: MailService, private readonly sendGridService: SendgridService) { }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async estorno() {
    await this.sendGridService.sendEstorno();
    this.logger.log('Enviado estorno com sucesso!');
  }


  @Cron(CronExpression.EVERY_MINUTE)
  async handler() {
    const mailList = await this.mailService.findAll({
      dueDateLte: new Date().toISOString(),
      status: MailStatusEnum.WAITING,
    });

    if (mailList.length === 0) {
      this.logger.warn('Nenhum email encontrado para ser enviado!');
    }

    for (const mail of mailList) {
      const data: SendEmailInterface = {
        personalizations: [
          {
            to: [
              {
                email: mail.destinationAddress,
                name: mail.destinationName,
              },
            ],
            subject: mail.subject,
          },
        ],
        content: [
          {
            type: 'text/html',
            value: mail.body,
          },
        ],
        from: {
          email: 'leonardo.ncintra@outlook.com',
          name: 'Leonardo Cintra',
        },
        reply_to: {
          email: 'leonardo.ncintra@outlook.com',
          name: 'Leonardo Cintra',
        },
      };
      await this.sendGridService.sendEmail(data);
      await this.mailService.updateStatus(mail.id, MailStatusEnum.SENT);
      this.logger.log('Enviado ' + mailList.length.toString() + ' email(s) com sucesso!');
    }
  }
}

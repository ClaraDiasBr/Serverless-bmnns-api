import handler from "../../libs/handler-lib";
import nodemailer from 'nodemailer';


export const main = handler(async (event, context) => {
    const sucessSend = {
        message: ''
    };

  //mandar email de reserva
  let transporter = nodemailer.createTransport({
      service: 'smtp.umbler.com',
      port: 587,
      secure: false,
      ignoreTLS: true,
      auth: {
          user: 'devclara@store.minionshop.gl',
          pass: 'Dev123bgc*'
      }
  });

  let info = await transporter.sendMail({
      from: "Minion Shop <devclara@store.minionshop.gl>",
      to: "claradprado.aws@gmail.com", // lista de envio
      subject: "Nova reserva realizada!", // Assunto
      text: "Nova reserva feita no Minio Shop!",
      html: "<h1>Nova reserva!</h1><h4>Seu minion está a caminho</h4>", // html body

  });
    if (!info.messageId) {
    sucessSend.message = 'Não conseguimos fazer a reserva!';
    } else {
    sucessSend.message = 'Reservado com sucesso!';
    }

  return sucessSend.message;
});
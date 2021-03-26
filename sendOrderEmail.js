import handler from "./libs/handler-lib";
import nodemailer from 'nodemailer';

//funcao para enviar email apos a compra
export const main = handler(async (event, context) => {
    const sucessSend = {
        message: ''
    };
    //adiciona as informações de email e senha
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: '587',
      auth: {
          user: 'devclara.bgc@gmail.com',
          pass: 'gugxcbdaspzusurm'
      }
    });
    // envia o email utilizndo o objeto transporter criado
    let info = await transporter.sendMail({
    from: '"Minion Shop" <devclara.bgc@gmail.com>',
    to: "claradprado.aws@gmail.com, thiago@bgcbrasil.com.br", // lista de envio
    subject: "Nova reserva realizada!", // Assunto
    text: "Nova reserva feita no Minion Shop!",
    html: "<h1>Nova reserva!</h1><h4>Seu minion está a caminho</h4>", // html body
  });
    if (!info.messageId) {
        sucessSend.message = 'Não conseguimos fazer a reserva!';
    } else {
        sucessSend.message = 'Reservado com sucesso!';
    }
    return sucessSend.message;
});


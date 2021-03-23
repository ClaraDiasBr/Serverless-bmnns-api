import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import nodemailer from 'nodemailer';
const table=process.env.tableName;

export const main = handler(async (event, context) => {
    const sucessSend = {
        message: ''
    };
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const params = {
    TableName: table,
    Item: {
      // The attributes of the item to be created
      orderId: uuid.v1(), // A unique uuid
      createdAt: new Date().toISOString(), // Current Unix timestamp
      username: data.username,
      name: data.name, // nome do produto
      preco: data.preco, // preço
    },

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
      html: "<h1>Nova reserva!</h1><h4>Seu minion está a caminho</h4><br><b> <br>Produto:"+ params.Item.name + "<br></b>", // html body

  });
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
    if (!info.messageId) {
    sucessSend.message = 'Não conseguimos fazer a reserva!';
    } else {
    sucessSend.message = 'Reservado com sucesso!';
    }

  await dynamoDb.put(params);

  return sucessSend.message;
});
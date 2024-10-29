const nodemailer = require('nodemailer');

// Configuração do transportador
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seu_email@gmail.com', 
    pass: 'sua_senha',            
  },
});

// Função para enviar e-mail
const sendEmail = (to, subject, message) => {
  const mailOptions = {
    from: 'seu_email@gmail.com', 
    to,
    subject,
    text: message,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      console.log('E-mail enviado: ' + info.response);
      resolve(info);
    });
  });
};

module.exports = {
  sendEmail,
};

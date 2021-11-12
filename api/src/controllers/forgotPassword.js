const { Users } = require("../db");
const nodemailer = require('nodemailer');



async function forgotPassword(req, res, next) {
    const { email } = req.body;
    console.log('emailBody', req.body)
    const user = await Users.findOne({where: { email: email}});
    
    if (!user) return res.status(401).json([]);

    // await user.update({ resetPassword: true });


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'webservices363@gmail.com',
            pass: 'hola1234@'
        }
    })



    let htmlCreator = `
    <html>
    <head>
    <style type="text/css">
    .containergral {
        align-content: center;
        justify-content: center;
        padding: 30px;
        position: relative;
        background: #EFEFEF;
        }
    h1 {
        color: #000000CC;
    }
    .unorderlist {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: #F7F7F7;
        color: #000000CC;
      }
    .img-card {
        margin-left: 25%;
        margin-top: 20px    
    }
    .ap{
        text-decoration: none;
    }
    
    </style>
    </head>
    <body>
    <div class="containergral">
    <h1>Hola ${user.name}, hemos generado un link para que cambies tu contraseña</h1>
    <a href="https://pf-web-service.vercel.app" target="_blank" rel="noopener noreferrer" class="ap">Click aqui</a>
    </hr>
    <b>Este enlace dura 24 horas.</b>
  
    </hr>
    <b>Gracias por confiar en nosotros!</b>
    </div>
    </body>
    </html>
    `;

    let mailOptions = {
        from: "WebServices <webservices363@gmail.com>",
        to: user.email,
        subject: `Cambio de contraseña, usuario: ${user.name}`,
        html: htmlCreator,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){ 
            console.log('errorrr', error.message)
         return res.status(500).send(error.message);
        }
        console.log('Email Enviado')
        res.status(200).json(req.body);
    });

}


module.exports = {
    forgotPassword
}

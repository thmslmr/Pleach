// Gestion des emails
Meteor.startup( function(){

    // Variable d'environnement MAIL_URL. address + password fourni par l'herbergeur smtp (Mailgun)
    process.env.MAIL_URL = Meteor.settings.private.email.MAIL_URL;

    // Function d'envoie d'un email de bienvenue (appelée à la création d'un utilisateur)
    sendWelcomeEmail = function(newUserProfile){
        // Récupération et rendu du code html
        SSR.compileTemplate( 'welcomeEmail', Assets.getText( 'emailTemplates/welcomeEmail.html' ) );
        htmlEmail = SSR.render( 'welcomeEmail', newUserProfile );

        // Envoie de l'email
        Email.send({
            to: newUserProfile.email,
            from: "Pleach <welcome@pleach.com>",
            subject: "Bienvenue sur Pleach !",
            html: htmlEmail
        });
    };
});

// Configuration du système d'OAuth avec facebook
ServiceConfiguration.configurations.remove({
	service: 'facebook'
});
ServiceConfiguration.configurations.insert({
		  service: 'facebook',
		  appId: Meteor.settings.private.oAuth.facebook.appId,
		  secret: Meteor.settings.private.oAuth.facebook.secret,
});

// Configuration du système d'OAuth avec google
ServiceConfiguration.configurations.remove({
	service : 'google'
})
ServiceConfiguration.configurations.insert({
		  service: 'google',
		  clientId: Meteor.settings.private.oAuth.google.clientId,
		  secret: Meteor.settings.private.oAuth.google.secret,
});

//Mise en forme des données utilisateurs récupérées depuis le service tiers
Accounts.onCreateUser(function(options, user){

	// Récupération du service utilisé (fb / google)
	service = Object.keys(user['services'])[0]

	// Mise en forme des données utilisateur dans l'objet profile
	if(service == 'google'){
		options.profile.picture = user.services.google.picture;
		options.profile.email = user.services.google.email;
		options.profile.family_name = user.services.google.family_name;
		options.profile.first_name = user.services.google.given_name;
		options.profile.gender = user.services.google.gender;
		options.profile.link = "https://plus.google.com/" +  user.services.google.id;
	}else if(service == 'facebook'){
		options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?width=150&height=150";
		options.profile.email = user.services.facebook.email;
		options.profile.family_name = user.services.facebook.last_name;
	 	options.profile.first_name = user.services.facebook.first_name;
		options.profile.gender = user.services.facebook.gender;
		options.profile.link = user.services.facebook.link;
		options.profile.service = "facebook";
	}
	options.profile.service = service;
	//  Mise à jour du profile de l'utilisateur
	user.profile = options.profile

	// Appel de la fonction d'envoie d'email de bienvenue.
	// sendWelcomeEmail( user.profile );
	addNotifConv(user._id)
    return user;
});

function addNotifConv(idUser){

	newConversation = Conversations.insert({
		public : {
			views : [
				{
					user : idUser,
					view : false
				},
				{
					user : '0',
					view : false
				}
			],
			messages : [
 			{
				author: '0',
				text: 'Bienvenue sur Pleach !',
				createdAt: new Date(),
				action : null
				}
			],
		},
		private: {
			id_cours: null,
			createdAt: new Date(),
			notification: true,
		}
	});

	return newConversation;
}

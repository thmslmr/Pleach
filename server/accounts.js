ServiceConfiguration.configurations.remove({
	service: 'facebook'
});
ServiceConfiguration.configurations.insert({
		  service: 'facebook',
		  appId: Meteor.settings.private.oAuth.facebook.appId,
		  secret: Meteor.settings.private.oAuth.facebook.secret,
});

ServiceConfiguration.configurations.remove({
	service : 'google'
})
ServiceConfiguration.configurations.insert({
		  service: 'google',
		  clientId: Meteor.settings.private.oAuth.google.clientId,
		  secret: Meteor.settings.private.oAuth.google.secret,
});

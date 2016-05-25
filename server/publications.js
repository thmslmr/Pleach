// Publications des données vers le client
Meteor.publish('lessons', function(){
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }else{
        return Lessons.find()
    }
});

Meteor.publish('linkedLessons', function(){
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }else{
        return Lessons.find({"private.owner" : this.userId})
    }
})

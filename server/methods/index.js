
export default () => {
    Meteor.methods({
        registerUser: (username, password, avatar) => {
            check(username, String);
            check(password, String);
            check(avatar, String);

            const userId = Accounts.createUser({
                username,
                password
            });

            const result = Meteor.users.update(userId, {
               $set: {
                   userData: {
                       avatar: avatar,
                       language: 'pl'
                   }
               }
            });

            return result === 1;
        },
        getUserData: function() {
            return Meteor.users.findOne({ _id: this.userId });
        }
    });
};

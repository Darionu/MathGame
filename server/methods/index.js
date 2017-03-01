export default () => {
    Meteor.methods({
        registerUser: (username, password, language, avatar) => {
            check(username, String);
            check(password, String);
            check(language, String);
            check(avatar, String);

            const userId = Accounts.createUser({
                username,
                password
            });

            const result = Meteor.users.update(userId, {
                $set: {
                    userData: {
                        avatar: avatar,
                        language: language
                    },
                    gameData: {
                        wins: 0,
                        loses: 0
                    }
                }
            });

            return result === 1;
        },
        getUserData: function() {
            return Meteor.users.findOne(this.userId);
        }
    });
};

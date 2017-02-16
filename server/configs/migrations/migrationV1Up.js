import Logger from '/lib/logging/Logger';

export default () => {
    Logger.info('Start migration V1 UP!', __filename);

    const users = [
        {
            username: 'Mamorina',
            password: 'qwerty',
            language: 'en',
            avatar: 'otter'
        }, {
            username: 'Darionu',
            password: 'qwerty',
            language: 'pl',
            avatar: 'tiger'
        }
    ];

    users.forEach((user) => {
        const userId = Accounts.createUser({
            username: user.username,
            password: user.password
        });

        Meteor.users.update({ _id: userId }, {
            $set: {
                userData: {
                    language: user.language,
                    avatar: user.avatar
                },
                gameData: {
                    wins: 0,
                    loses: 0
                }
            }
        });

        Logger.info(`Created user username: ${user.username}`, __filename);
    });
};

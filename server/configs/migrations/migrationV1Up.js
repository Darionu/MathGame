import Logger from '/lib/logging/Logger';

export default () => {
    Logger.info('Start migration V1 UP!', __filename);

    const users = [
        {
            firstName: 'Tomasz',
            lastName: 'Przytuła',
            username: 'darionu',
            password: 'qwerty',
            language: 'pl'
        }, {
            firstName: 'Tomasz',
            lastName: 'Przytuła',
            username: 'darionu2',
            password: 'qwerty',
            language: 'en'
        }
    ];

    users.forEach((user) => {
        const userId = Accounts.createUser({
            email: `${user.username}@a.com`,
            username: user.username,
            password: user.password
        });

        Meteor.users.update({ _id: userId }, {
            $set: {
                userData: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    language: user.language
                }
            }
        });

        Logger.info(`Created user username: ${user.username}`, __filename);
    });
};

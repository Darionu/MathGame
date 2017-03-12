import Logger from '/lib/logging/Logger';
import AccountTypes from '/lib/constants/accountTypes';

export default () => {
    Logger.info('Start migration V2 UP!', __filename);

    const botUser = {
        id: 'bot',
        username: 'Bot',
        password: 'feh2fkdfjw#!das!',
        language: 'en',
        avatar: 'robot'
    };


    const userId = Meteor.users.insert({
        _id : botUser.id,
        createdAt : new Date(),
        services : {
            password : {
                bcrypt : ""
            }
        },
        username : botUser.username
    });

    Accounts.setPassword(userId, botUser.password);
    Meteor.users.update(userId, {
        $set: {
            userData: {
                accountType: AccountTypes.player,
                language: botUser.language,
                avatar: botUser.avatar
            },
            gameData: {
                wins: 0,
                loses: 0
            }
        }
    });

    Logger.info('Created bot user', __filename);

    Meteor.users.update({}, {
        $set: {
            "userData.accountType": AccountTypes.player
        }
    }, { multi: true });

    Logger.info('Set account type to player for every user.', __filename);
};

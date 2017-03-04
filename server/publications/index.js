import { Meteor } from 'meteor/meteor';
import PublicationNames from '/lib/constants/publicationsNames';
import { QueueHistory, Games, Exercises } from '/lib/collections';
import { GameStatuses }from '/lib/constants/gameConstants';

export default () => {
    Meteor.publish(PublicationNames.users, () => Meteor.users.find({}, {
        fields: {
            gameData: 1,
            userData: 1,
            username: 1
        }
    }));
    Meteor.publish(PublicationNames.userData, function() {
       return Meteor.users.findOne(this.userId);
    });
    Meteor.publish(PublicationNames.userQueue, function() {
        return QueueHistory.find({ userId: this.userId });
    });
    Meteor.publish(PublicationNames.userGames, function() {
        return Games.find({
            $or: [
                { "playerA.id": this.userId },
                { "playerB.id": this.userId }
            ]
        })
    });
    Meteor.publish(PublicationNames.userExercises, function() {
        this.autorun(() => {
            const game = Games.findOne({
                $and: [
                    {
                        status: {
                            $in: [
                                GameStatuses.created,
                                GameStatuses.initialized,
                                GameStatuses.started
                            ]
                        }
                    },
                    {
                        $or: [
                            { "playerA.id": this.userId },
                            { "playerB.id": this.userId }
                        ]
                    }
                ]
            }, {
                fields: {
                    exercises: 1
                }
            });

            return game
                ? Exercises.find({
                    _id: {
                        $in: game.exercises
                    }
                }, {
                    fields: {
                        answers: 1,
                        firstNumber: 1,
                        secondNumber: 1,
                        type: 1
                    }
                })
                : [];
        });
    });
};

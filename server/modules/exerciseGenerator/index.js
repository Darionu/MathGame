import Logger from '/lib/logging/Logger';
import _ from 'lodash';
import { GameTypes } from '/lib/constants/gameConstants';
import { Exercises } from '/lib/collections';
import ExerciseConstants from '/lib/constants/exerciseConstants';

/**
 * ExerciseGenerator
 *
 * This class is responsible for creating new exercises.
 */
export default class {
    constructor(gameType) {
        this.gameType = gameType;
    }

    /**
     * Create a specific exercise according to the chosen game type.
     * @returns {string | boolean} _id - id of created exercise or false otherwise.
     * @public
     */
    init() {
        switch (this.gameType) {
            case GameTypes.addition:
                Logger.info('[ExerciseGenerator] Generating addition exercise..', __dirname);
                return this.generateAdditionExercise();
            case GameTypes.subtraction:
                Logger.info('[ExerciseGenerator] Generating subtraction exercise..', __dirname);
                return this.generateSubtractionExercise();
            case GameTypes.multiplication:
                Logger.info('[ExerciseGenerator] Generating multiplication exercise..', __dirname);
                return this.generateMultiplicationExercise();
            case GameTypes.division:
                Logger.info('[ExerciseGenerator] Generating division exercise..', __dirname);
                return this.generateDivisionExercise();
            default:
                Logger.error(`[ExerciseGenerator] Unknown gameType provided: ${this.gameType}`, __dirname);
                return false;
        }
    }

    /**
     * Creates addition exercise.
     * The result is a sum of two generated numbers.
     * @returns {string} _id - id of created exercise.
     * @private
     */
    generateAdditionExercise() {
        this.firstNumber = Math.floor((Math.random() * 100) + 1);
        this.secondNumber = Math.floor((Math.random() * 100) + 1);
        this.result = this.firstNumber + this.secondNumber;
        this.generateFalseResults();

        Logger.info(`[ExerciseGenerator] Addition exercise generated. ${this.firstNumber} + ${this.secondNumber} = ${this.result} with result table [${this.arrayOfResults}]`, __dirname);
        return this.insertExercise();
    }

    /**
     * Creates subtraction exercise.
     * The result is a difference of two generated numbers.
     * Ensures that the difference result is positive.
     * @returns {string} _id - id of created exercise.
     * @private
     */
    generateSubtractionExercise() {
        this.firstNumber = Math.floor((Math.random() * 100) + 1);
        this.secondNumber = Math.floor((Math.random() * 100) + 1);
        if (this.firstNumber < this.secondNumber) {
            const numberHolder = this.firstNumber;
            this.firstNumber = this.secondNumber;
            this.secondNumber = numberHolder;
        }
        this.result = this.firstNumber - this.secondNumber;
        this.generateFalseResults();

        Logger.info(`[ExerciseGenerator] Addition subtraction generated. ${this.firstNumber} - ${this.secondNumber} = ${this.result} with result table [${this.arrayOfResults}]`, __dirname);
        return this.insertExercise();
    }

    /**
     * Creates multiplication exercise.
     * The result is a product of two generated numbers.
     * @returns {string} _id - id of created exercise.
     * @private
     */
    generateMultiplicationExercise() {
        this.firstNumber = Math.floor((Math.random() * 15) + 1);
        this.secondNumber = Math.floor((Math.random() * 15) + 1);
        this.result = this.firstNumber * this.secondNumber;
        this.generateFalseResults();

        Logger.info(`[ExerciseGenerator] Addition multiplication generated. ${this.firstNumber} * ${this.secondNumber} = ${this.result} with result table [${this.arrayOfResults}]`, __dirname);
        return this.insertExercise();
    }

    /**
     * Creates division exercise.
     * The result is a division of two generated numbers.
     * Modulo of the division is always 0.
     * @returns {string} _id - id of created exercise.
     * @private
     */
    generateDivisionExercise() {
        this.firstNumber =  Math.floor((Math.random() * 100) + 1);
        this.secondNumber = Math.floor((Math.random() * 100) + 1);

        while (this.firstNumber % this.secondNumber !== 0) {
            this.firstNumber = Math.floor((Math.random() * 100) + 1);
            this.secondNumber = Math.floor((Math.random() * 100) + 1);
        }

        this.result = Math.floor(this.firstNumber / this.secondNumber);
        this.generateFalseResults();

        Logger.info(`[ExerciseGenerator] Addition division generated. ${this.firstNumber} / ${this.secondNumber} = ${this.result} with result table [${this.arrayOfResults}]`, __dirname);
        return this.insertExercise();
    }

    /**
     * Creating an array with up to 4 results.
     * The array is containing one correct result and 3 false ones.
     * Generates false results and shuffling the array afterwards.
     * @private
     */
    generateFalseResults() {
        Logger.info('[ExerciseGenerator] Generating additional results', __dirname);
        if (this.result < 3) {
            const preparedArray = [ 1, 2, 3, 4 ];
            this.arrayOfResults = _.shuffle(preparedArray);
            return;
        }

        const arrayOfResults = [this.result];
        while (arrayOfResults.length < ExerciseConstants.answerCount) {
            const newNumber = Math.floor(Math.random() * (this.result * 2 - this.result / 2) + this.result / 2);
            if (!_.includes(arrayOfResults, newNumber)) {
                arrayOfResults.push(newNumber);
            }
        }
        this.arrayOfResults = _.shuffle(arrayOfResults);
    }

    /**
     * Insert just created exercise.
     * @returns {string} _id - exercise's id.
     * @private
     */
    insertExercise() {
        Logger.info(`[ExerciseGenerator] Inserting exercise to the database.`, __dirname);
        return Exercises.insert({
            type: this.gameType,
            firstNumber: this.firstNumber,
            secondNumber: this.secondNumber,
            correctAnswer: this.result,
            answers: this.arrayOfResults
        });
    }
};

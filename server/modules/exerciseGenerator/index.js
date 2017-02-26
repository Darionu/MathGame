import Logger from '/lib/logging/Logger';
import _ from 'lodash';
import { GameTypes } from '/lib/constants/gameConstants';
import { Exercises } from '/lib/collections';

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
     */
    init() {
        switch (this.gameType) {
            case GameTypes.addition:
                Logger.info('[ExerciseGenerator] Generating addition exercise..', __dirname);
                return this.generateAdditionExercise();
                break;
            case GameTypes.subtraction:
                Logger.info('[ExerciseGenerator] Generating subtraction exercise..', __dirname);
                return this.generateSubtractionExercise();
                break;
            case GameTypes.multiplication:
                Logger.info('[ExerciseGenerator] Generating multiplication exercise..', __dirname);
                return this.generateMultiplicationExercise();
                break;
            case GameTypes.division:
                Logger.info('[ExerciseGenerator] Generating division exercise..', __dirname);
                return this.generateDivisionExercise();
                break;
            default:
                Logger.error(`[ExerciseGenerator] Unknown gameType provided: ${this.gameType}`, __dirname);
                return false;
                break;
        }
    }

    /**
     * Creates addition exercise.
     * The result is a sum of two generated numbers.
     * @returns {string} _id - id of created exercise.
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
     * @returns {string} _id - id of created exercise.
     */
    generateSubtractionExercise() {
        this.firstNumber = Math.floor((Math.random() * 100) + 1);
        this.secondNumber = Math.floor((Math.random() * 100) + 1);
        this.result = this.firstNumber - this.secondNumber;
        this.generateFalseResults();

        Logger.info(`[ExerciseGenerator] Addition subtraction generated. ${this.firstNumber} - ${this.secondNumber} = ${this.result} with result table [${this.arrayOfResults}]`, __dirname);
        return this.insertExercise();
    }

    /**
     * Creates multiplication exercise.
     * The result is a product of two generated numbers.
     * @returns {string} _id - id of created exercise.
     */
    generateMultiplicationExercise() {
        this.firstNumber = Math.floor((Math.random() * 15) + 1);
        this.secondNumber = Math.floor((Math.random() * 15) + 1);
        this.result = this.firstNumber / this.secondNumber;
        this.generateFalseResults();

        Logger.info(`[ExerciseGenerator] Addition multiplication generated. ${this.firstNumber} * ${this.secondNumber} = ${this.result} with result table [${this.arrayOfResults}]`, __dirname);
        return this.insertExercise();
    }

    /**
     * Creates division exercise.
     * The result is a division of two generated numbers.
     * TODO: Don't let the function create floating results.
     * @returns {string} _id - id of created exercise.
     */
    generateDivisionExercise() {
        this.firstNumber = Math.floor((Math.random() * 100) + 1);
        this.secondNumber = Math.floor((Math.random() * 100) + 1);
        this.result = this.firstNumber * this.secondNumber;
        this.generateFalseResults();

        Logger.info(`[ExerciseGenerator] Addition division generated. ${this.firstNumber} / ${this.secondNumber} = ${this.result} with result table [${this.arrayOfResults}]`, __dirname);
        return this.insertExercise();
    }

    /**
     * Creating an array with up to 4 results.
     * The array is containing one correct result and 3 false ones.
     * Shuffling the array afterwards.
     */
    generateFalseResults() {
        Logger.info('[ExerciseGenerator] Generating additional results', __dirname);
        const arrayOfResults = [this.result];
        arrayOfResults.push(this.generateResult(arrayOfResults));
        arrayOfResults.push(this.generateResult(arrayOfResults));
        arrayOfResults.push(this.generateResult(arrayOfResults));
        this.arrayOfResults = _.shuffle(arrayOfResults);
    }

    /**
     * Generate new false result similar to the original one.
     * Created results can't be duplicated.
     * @param arrayOfResults - array of already existing results.
     * @returns {number} - new fake result.
     */
    generateResult(arrayOfResults) {
        const newNumber = Math.floor(Math.random() * (this.result * 2 - this.result / 2) + this.result / 2);
        return _.some(arrayOfResults, newNumber)
            ? this.generateResult(arrayOfResults)
            : newNumber;
    }

    /**
     * Insert just created exercise.
     * @returns {string} _id - exercise's id.
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

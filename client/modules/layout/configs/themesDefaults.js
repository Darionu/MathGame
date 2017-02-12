import PageNames from '/lib/constants/pageNames';

const themeDefaults = {
    default: {
        pageVersions: {
            [PageNames.homePage]: 1,
            [PageNames.rankings]: 1,
            [PageNames.playBoard]: 1,
            [PageNames.learn]: 1
        },
        texts: {
            test: 'testDefault'
        },
        images: {
            siteLogo: 'general/logo.png',
            dogs: 'images/dogs.jpg',
            owl: 'images/owl.jpg',
            parrot: 'images/parrot.jpg',
            squirrel: '/images/squirrel.jpg',
            lion: 'images/lion.jpg',
            avatars: {
                bird: 'images/avatars/bird.jpg',
                bird2: 'images/avatars/bird2.jpg',
                eagle: 'images/avatars/eagle.jpg',
                giraffe: 'images/avatars/giraffe.jpg',
                otter: 'images/avatars/otter.jpg',
                tiger: 'images/avatars/tiger.jpg'
            },
            mathSigns: {
                plus: 'images/mathOperations/plus.png',
                subtract: 'images/mathOperations/subtract.png',
                multiply: 'images/mathOperations/multiply.png',
                divide: 'images/mathOperations/divide.png'
            }
        },
        colors: {
            test: '#FF00000'
        },
        sounds: {

        }
    }
};

export default themeDefaults;

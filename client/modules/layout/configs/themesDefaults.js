import PageNames from '/lib/constants/pageNames';

const themeDefaults = {
    default: {
        pageVersions: {
            [PageNames.homePage]: 1
        },
        texts: {
            test: 'testDefault'
        },
        images: {
            dogs: 'images/dogs.jpg',
            owl: 'images/owl.jpg',
            parrot: 'images/parrot.jpg',
            squirrel: '/images/squirrel.jpg',
            avatars: {
                bird: 'images/avatars/bird.jpg',
                bird2: 'images/avatars/bird2.jpg',
                eagle: 'images/avatars/eagle.jpg',
                giraffe: 'images/avatars/giraffe.jpg',
                otter: 'images/avatars/otter.jpg',
                tiger: 'images/avatars/tiger.jpg'
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

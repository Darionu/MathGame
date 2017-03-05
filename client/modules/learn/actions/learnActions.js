import AppRoutes from '/lib/constants/appRoutes';

export default {
    goToGamePage({ FlowRouter }) {
        FlowRouter.go(AppRoutes.learnGame);
    },
    goToMathPage({ FlowRouter }) {
        FlowRouter.go(AppRoutes.learnMath);
    }
};

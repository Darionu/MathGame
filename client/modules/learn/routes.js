import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from '../core/containers/mainLayout';
import Page from '../layout/containers/page';

import AppRoutes from '/lib/constants/appRoutes';
import RouteNames from '/lib/constants/routeNames';
import PageNames from '/lib/constants/pageNames';

export default function (injectDeps, { FlowRouter }) {
    const MainLayoutCtx = injectDeps(MainLayout);

    FlowRouter.route(AppRoutes.learn, {
        name: RouteNames.learn,
        action() {
            mount(MainLayoutCtx, { content: () => (<Page page={PageNames.learn} />) });
        }
    });

    FlowRouter.route(AppRoutes.learnGame, {
        name: RouteNames.learnGame,
        action() {
            mount(MainLayoutCtx, { content: () => (<Page page={PageNames.learnGame} />) });
        }
    });

    FlowRouter.route(AppRoutes.learnMath, {
        name: RouteNames.learnMath,
        action() {
            mount(MainLayoutCtx, { content: () => (<Page page={PageNames.learnMath} />) });
        }
    });
}

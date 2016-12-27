import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './containers/mainLayout';
import Page from '../layout/containers/page';

import AppRoutes from '/lib/constants/appRoutes';
import RouteNames from '/lib/constants/routeNames';
import PageNames from '/lib/constants/pageNames';

export default function (injectDeps, { FlowRouter }) {
    const MainLayoutCtx = injectDeps(MainLayout);

    FlowRouter.route(AppRoutes.home, {
        name: RouteNames.home,
        action() {
            mount(MainLayoutCtx, { content: () => (<Page page={PageNames.homePage} />) });
        }
    });
}

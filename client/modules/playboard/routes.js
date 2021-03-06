import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from '../core/containers/mainLayout';
import Page from '../layout/containers/page';

import AppRoutes from '/lib/constants/appRoutes';
import RouteNames from '/lib/constants/routeNames';
import PageNames from '/lib/constants/pageNames';

export default function (injectDeps, { FlowRouter }) {
    const MainLayoutCtx = injectDeps(MainLayout);

    FlowRouter.route(AppRoutes.playBoard, {
        name: RouteNames.playBoard,
        action() {
            mount(MainLayoutCtx, { content: () => (<Page page={PageNames.playBoard} />) });
        }
    });
}

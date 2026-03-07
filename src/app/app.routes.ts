import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./layout/main-layout/main-layout").then((m) => m.MainLayout),
        children: [
            {
                path: "",
                loadChildren: () =>
                    import("./pages/dashboard/dashboard/routes").then((m) => m.routes),
            },
            {
                path: "manager",
                loadChildren: () =>
                    import("./pages/manager-food/routes").then((m) => m.routes),
            },
             {
                path: "list-table",
                loadChildren: () =>
                    import("./pages/list-table/routes").then((m) => m.routes),
            }
        ]
    }
];

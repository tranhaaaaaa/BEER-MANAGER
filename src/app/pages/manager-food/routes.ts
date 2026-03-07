import { Routes } from "@angular/router";
export const routes: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./manager-food").then((m) => m.ManagerFood),
    }
];
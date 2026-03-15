import { Routes } from "@angular/router";
export const routes: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./category").then((m) => m.Category),
    }
];
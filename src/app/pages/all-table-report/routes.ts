import { Routes } from "@angular/router";
export const routes: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./all-table-report").then((m) => m.AllTableReport),
    }
];
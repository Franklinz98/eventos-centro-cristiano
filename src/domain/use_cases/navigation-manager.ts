import router from "@/domain/router";
import { RouteParamsRaw } from "vue-router";

export abstract class NavigationManager {
  static goTo(target: string, params?: RouteParamsRaw): void {
    router.push({ name: target, params });
  }

  static goBack(): void {
    router.go(-1);
  }
}

export enum Routes {
  Home = "Home",
  Schedule = "Schedule",
  Stream = "Stream",
}

export default NavigationManager;

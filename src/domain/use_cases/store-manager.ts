import { DispatchOptions } from "vuex";
import store from "@/domain/store";

export abstract class StoreManager {
  static update(
    name: string,
    // eslint-disable-next-line
    payload?: any,
    options?: DispatchOptions | undefined
  ): void {
    store.dispatch(name, payload, options);
  }

  // eslint-disable-next-line
  static getValue(name: string): any {
    return store.getters[name];
  }
}

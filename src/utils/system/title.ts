import {systemTitle} from "@/config/index";

export function changeTitle(name: string) {
  document.title = `${name}-${systemTitle}`;
}

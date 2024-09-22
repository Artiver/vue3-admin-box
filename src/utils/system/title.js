import {systemTitle} from "@/config/index.js";

export function changeTitle(name) {
  document.title = `${name}-${systemTitle}`;
}

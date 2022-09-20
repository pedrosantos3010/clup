import { terminal } from "terminal-kit";
import { createBanner } from "./Banner";

export function displayLogo(): void {
    terminal(createBanner());
}

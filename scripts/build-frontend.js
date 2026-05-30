import { execSync } from "child_process";
import { cpSync, existsSync, rmSync } from "fs";
import path from "path";

const cwd = process.cwd();
const appDir = path.join(cwd, "roadsos-app");
const distSrc = path.join(appDir, "dist");
const distDest = path.join(cwd, "dist");

try {
  console.log("Installing frontend dependencies...");
  execSync("npm ci", { cwd: appDir, stdio: "inherit" });

  console.log("Building frontend (roadsos-app)...");
  execSync("npm run build", { cwd: appDir, stdio: "inherit" });

  if (existsSync(distDest)) {
    console.log("Removing existing root dist/...");
    rmSync(distDest, { recursive: true, force: true });
  }

  console.log("Copying roadsos-app/dist -> ./dist");
  // Node 16.7+ has cpSync recursive
  cpSync(distSrc, distDest, { recursive: true });

  console.log("Frontend build complete. Root ./dist is ready.");
} catch (err) {
  console.error("Build failed:", err);
  process.exit(1);
}

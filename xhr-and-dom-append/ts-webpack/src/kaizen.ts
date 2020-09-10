import { loadPlaces } from "./placesProvider";
import { render } from "./view";
import { sendViewLog } from "./logger";

// main scope logic
const run = async (): Promise<void> => {
  try {
    console.log("kaizen.js run");

    const ps = await loadPlaces();
    render(ps);
    sendViewLog(ps.length);

    console.log("kaizen.js done");
  } catch (e) {
    console.error(e);
  }
};

run();

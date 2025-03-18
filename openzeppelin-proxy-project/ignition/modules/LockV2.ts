import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import upgradeModule from "./Upgrade";

const lockV2Module = buildModule("LockV2Module", (m) => {
    const { proxy, proxyAdmin } = m.useModule(upgradeModule);

    const lock = m.contractAt("LockV2", proxy);

    return { lock };
});

export default lockV2Module;
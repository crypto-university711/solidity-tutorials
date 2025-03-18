import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import proxyModule from "./Proxy";

const upgradeModule = buildModule("UpgradeModule", (m) => {
    const proxyAdminOwner = m.getAccount(0);

    const { proxy, proxyAdmin } = m.useModule(proxyModule);

    const lockV2 = m.contract("LockV2");

    m.call(proxyAdmin, "upgradeAndCall", [proxy, lockV2, "0x"], {
        from: proxyAdminOwner
    });

    return { proxyAdmin, proxy };

});

export default upgradeModule;
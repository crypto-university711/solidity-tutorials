import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import proxyModule from "./Proxy";

const lockModule = buildModule("LockModule", (m) => {
    const { proxy, proxyAdmin } = m.useModule(proxyModule);

    const lock = m.contractAt("Lock", proxy);

    return { lock };
});

export default lockModule;
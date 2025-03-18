import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI: bigint = 1_000_000_000n;

const proxyModule = buildModule("ProxyModule", (m) => {
    const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
    const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);
    const proxyAdminOwner = m.getAccount(0);

    const lock = m.contract("Lock");

    const proxy = m.contract("TransparentUpgradeableProxy", [
        lock,
        proxyAdminOwner,
        "0x"
    ]);

    const lockProxy = m.contractAt("Lock", proxy, { id: "LockProxyInstance" });

    m.call(lockProxy, "initialize", [unlockTime], {
        from: proxyAdminOwner,
        value: lockedAmount
    })

    const proxyAdminAddress = m.readEventArgument(
        proxy,
        "AdminChanged",
        "newAdmin"
    );

    const proxyAdmin = m.contractAt("ProxyAdmin", proxyAdminAddress);

    return { proxy, proxyAdmin };

});

export default proxyModule;
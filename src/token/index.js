import { Principal } from "@dfinity/principal";
import { Actor } from "@dfinity/agent";
import { idlFactory } from './ext.did.js';

const canisterId = Principal.fromText("cps3y-fiaaa-aaaak-qav4a-cai");

export const createTokenActor = (agent) => {   
    return Actor.createActor(idlFactory, {
        agent, canisterId
    });
};


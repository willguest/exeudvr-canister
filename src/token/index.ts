import { Principal } from "@dfinity/principal";
import { HttpAgent, Actor } from '@dfinity/agent';
import  idlFactory  from './ext.did';

// an EXT test token, see candid UI here:
// https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app/?id=cps3y-fiaaa-aaaak-qav4a-cai

const tokenCanisterId = "cps3y-fiaaa-aaaak-qav4a-cai";

export const createTokenActor = (agent: HttpAgent) => {
  return Actor.createActor (idlFactory, {
    agent, canisterId: Principal.fromText(tokenCanisterId),
  });
}
 
export default { createTokenActor };
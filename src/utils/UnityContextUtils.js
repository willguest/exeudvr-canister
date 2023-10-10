import * as CanisterUtils from "./CanisterUtils.js";
import * as TokenUtils from "./TokenUtils.js";


export function AddUnityListeners(unityContext, auth) {
	
	unityContext.on("ICLogin", async function (cbIndex) {
		await CanisterUtils.ICLogin(cbIndex, unityContext, auth);
	});
	
	unityContext.on("GetCoin", async function (cbIndex) {
		await TokenUtils.GetCoin(cbIndex, unityContext, auth);
	});
	
}
import { HttpAgent } from "@dfinity/agent";
import { createTokenActor } from "../token/index.js"

export async function GetCoin(cbIndex, unityContext, auth) {
	let data = {};
    data.cbIndex = cbIndex;
	try{
		const agent = new HttpAgent(auth.identity);
		let tokenActor = createTokenActor(agent);
		let coinResponse = await tokenActor.requestCoin();

		if (coinResponse['ok']){
			const fundNum = Number(coinResponse['ok']);
			console.log("Fund Request successful:", fundNum);
			data.result = fundNum;
		}
		else if (coinResponse['err']){
			const responseErr = coinResponse['err'];
			data.result = responseErr;
		}
		unityContext.send("CanisterConnection", "HandleCallback", JSON.stringify(data));

	} catch (e) {
		console.error(e);
		data.error = e.message;
		unityContext.send("CanisterConnection", "HandleCallback", JSON.stringify(data));
    }
};
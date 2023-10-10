import { AccountIdentifier } from "@dfinity/nns";
import { Principal } from "@dfinity/principal";

export async function ICLogin(cbIndex, unityContext, auth) {
    let data = {};
    data.cbIndex = cbIndex;
    try {
		const principal = await auth?.logIn();
		const id = AccountIdentifier.fromPrincipal({ principal });
		const result = auth?.isAuthReady;
		data.result = result;
		data.principal = principal.toText();
		data.accountId = id.toHex();
		unityContext.send("CanisterConnection", "HandleCallback", JSON.stringify(data));
    } catch (e) {
        console.error(e);
        data.error = e.message;
        unityContext.send("CanisterConnection", "HandleCallback", JSON.stringify(data));
    }
};
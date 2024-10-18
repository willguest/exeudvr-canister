import { Identity, HttpAgent } from "@dfinity/agent";
import { useAuth } from "../auth/auth";
import { createTokenActor } from "../token/index";
import unityBuildInfo from './UnityBuildInfo.json';

const { buildName, compressionExt } = unityBuildInfo;

// attempting to identify the size of the unity build
const buildSize = async () => {
	const dataFile = `../src/assets/Build/${buildName}.data${compressionExt}`;
	const wasmFile = `../assets/Build/${buildName}.wasm${compressionExt}`;

	const file1 = await fetch(dataFile, { method: 'HEAD' });
	const file2 = await fetch(wasmFile, { method: 'HEAD' });

	console.log("file types:\n" + 
	JSON.stringify(file1.headers.get('content-type')) + '\n' +
	JSON.stringify(file2.headers.get('content-type')) );

	const dS = file1.headers.get('content-length');
	const wS = file2.headers.get('content-length');
	return +wS;
}

interface loginResponse {
    cbindex: number,
    result: boolean,
    principal: string,
    accountId: string,
    error?: string
}

interface tokenResponse {
    cbIndex: number,
    result: boolean,
    fundCount: number
}

// Extend this file with new unity functions
export default function AddUnityFunctions(unityContext) {
	
    const auth = useAuth();
	
    unityContext.on("ICLogin", async function (cbIndex) {
		await IILogin(cbIndex, unityContext, auth);
	});

	unityContext.on("ICLogout", async function (cbIndex) {
		await IILogout(cbIndex, unityContext, auth);
	});
    
	unityContext.on("GetToken", async function (cbIndex) {
		await GetToken(cbIndex, unityContext, auth);
	});

	// alternative pattern, 
	// automate with function: construct (inputHandle: string, functionName: string)
    /*
	async function handleLogin(cbIndex){
		await IILogin(cbIndex, unityContext, auth);
	};
	
	useEffect(() => {
		unityContext.on("ICLogin", handleLogin);
		return () => {
			removeEventListener("ICLogin", handleLogin);
		};
	}, [addEventListener, removeEventListener, handleLogin]);
	*/
}
    
async function IILogin(cbIndex, ctx, auth) { 
    try {
		let data: loginResponse = {
            cbindex: cbIndex,
            result: false,
            principal: "",
            accountId: ""
        }

		data.cbindex = cbIndex;
		if (auth.isAuthReady && 
			auth.identity &&
			!auth.identity.getPrincipal().isAnonymous()){
			data.principal = auth.identity.getPrincipal().toString();
			data.result = true;
		}
		else{
			const identity: Identity = await auth?.logIn();
			const principal = identity.getPrincipal();
			data.principal = principal.toString();
			data.result = auth?.isAuthReady;
		}
		data.accountId = "";
		const sendStr = JSON.stringify(data);
        ctx.send("CanisterConnection", "HandleCallback", sendStr);

    } catch (e) {
        ctx.send("CanisterConnection", "HandleCallback", JSON.stringify(e.message));
    }
}

async function IILogout(cbIndex, unityContext, auth) { 
	await auth?.logOut();
	let data: loginResponse = {
		cbindex: cbIndex,
		result: true,
		principal: "",
		accountId: ""
	}
	const sendStr = JSON.stringify(data);
	unityContext.send("CanisterConnection", "HandleCallback", sendStr);
}


async function GetToken(cbIndex, ctx, auth) {
	try{
		const agent = new HttpAgent(auth.identity);
		const tokenActor = createTokenActor(agent);
		const response = await tokenActor.requestCoin();
		
		JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)

        let data: tokenResponse = {
            cbIndex: cbIndex,
            result: (response == response['ok']),
            fundCount: Number(response['ok'])
        }

		if (response['ok']){
			const fundNum = Number(response['ok']);
		}
		else if (response['err']){
			const responseErr = response['err'];
		}
		ctx.send("CanisterConnection", "HandleCallback", JSON.stringify(data));

	} catch (e) {
		ctx.send("CanisterConnection", "HandleCallback", JSON.stringify(e.message));
    }
};
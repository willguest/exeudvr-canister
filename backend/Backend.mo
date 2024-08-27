import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Prim "mo:prim";

shared(creator) actor class ExeudVR_Actor() = this {
	
	public type Balance = Nat;
	public type TokenIdentifier = Text;
	
	public type CommonError = {
      #InvalidToken: TokenIdentifier;
      #Other : Text;
    };

	public type CoinRequestResponse = Result.Result<Balance, CommonError>;

	public func idQuick() : async Principal {
      Principal.fromActor(this)
    };
	
	public shared func requestCoin() : async CoinRequestResponse {
		Prim.debugPrint("requesting a coin");
		let canisterId = "cps3y-fiaaa-aaaak-qav4a-cai" : Text;
		let iCoin = actor(canisterId): actor { 
			requestCoin: () -> async CoinRequestResponse };
		return await iCoin.requestCoin();
    };
	
}
import TransgateConnect from "@zkpass/transgate-js-sdk";

export const CONTRACT_ADDR = "0x77d35c666955199a1ebf7424089f29f48a635b349a95614a763a63d62f61779";

export const formatAddress = (addr: string) => {
	return addr.replace(/^0x/, "0x0");
};

export const formatIpfsHash = (hash: string) => {
	return hash.replace(/,/g, "");
};

export const zkPassVerify = async () => {
	try {
		const appid = "8fb9d43c-2f24-424e-a98d-7ba34a5532f5";

		const connector = new TransgateConnect(appid);

		const isAvailable = await connector.isTransgateAvailable();

		if (isAvailable) {
			const schemaId = "516a720e-29a4-4307-ae7b-5aec286e446e";

			const res = await connector.launch(schemaId);
		} else {
			console.log("Please install TransGate");
		}
	} catch (error) {
		console.log("transgate error", error);
	}
};

export const formatDate = (date: string) => date.split('-').reverse().join('. ');

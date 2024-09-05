"use client";
import {
	useAccount,
	useDisconnect,
	useStarkProfile,
} from "@starknet-react/core";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GenericModal from "./GenericModal";

const AddressBar = ({
	setOpenConnectedModal,
}: {
	setOpenConnectedModal: Dispatch<SetStateAction<boolean>>;
}) => {
	const { address } = useAccount();
	const { data: starkProfile } = useStarkProfile({
		address,
	});

	const toggleModal = () => {
		setOpenConnectedModal((prev) => !prev);
	};

	if (!address) {
		return null;
	}

	return (
		<button
			onClick={toggleModal}
			className="bg-primary py-2 px-4 text-white rounded-full transition duration-300"
		>
			<span>
				{address?.slice(0, 6).concat("...").concat(address?.slice(-5))}
			</span>
		</button>
	);
};

export default AddressBar;

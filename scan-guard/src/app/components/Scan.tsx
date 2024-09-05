import {
	LikeIcon,
	SaveIcon,
	ScanIcon2,
	StarIcon,
	StarIcon2,
} from "@/assets/icons";
import { abi } from "@/lib/abi";
import { CONTRACT_ADDR, formatIpfsHash, zkPassVerify } from "@/lib/config";
import { fetchIpfsFile } from "@/services/apiService";
import {
	useAccount,
	useContractRead,
	useContractWrite,
	useWaitForTransaction,
} from "@starknet-react/core";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "../Modal";
import { useParams } from "next/navigation";
type ProductProps = {
	product_id: number;
	name: string;
	manufacturer: string;
	manufactureDate: string;
  expiryDate: string;
};
export default function ScanProduct() {
	const [product, setProduct] = useState<ProductProps | any>();
	const [open, setOpen] = useState<boolean>(false);
	const [openWallet, setOpenWallet] = useState<boolean>(false);

	const params = useParams();
	const { address } = useAccount();
	let payload = params?.product;

	const toggleUserModal = () => {
		setOpenWallet((prev) => !prev);
	};

	const { data, isError, isLoading, error } = useContractRead({
		functionName: "verify",
		args: [payload as string],
		abi,
		address: CONTRACT_ADDR,
		watch: true,
	});

	console.log(data?.toString(), error, isLoading, "result");

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (data) {
					zkPassVerify()
					const ipfsResults = await fetchIpfsFile(
						formatIpfsHash(data.toString())
					);
					setProduct(ipfsResults);
				}
			} catch (e) {
				console.error("Error fetching from IPFS:", e);
			}
		};

		fetchData();
	}, [data]);

	useEffect(() => {
		setOpen(true);
	}, [product]);

	useEffect(() => {
		if (payload) {
			console.log(payload.length > 0);
			setOpen(true);
		}
	}, [payload]);

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<Modal title="" open={open} close={() => setOpen(false)}>
					{product != null ? (
						<div className="">
							<div className="hidden lg:grid  grid-cols-5 py-5 items-center gap-10">
								<div className="col-span-2">
									<p className="text-[48px] text-textPrimary font-semibold font-lato leading-[57.9px]">
									{product?.name}
									</p>
									<div className="flex  items-center gap-2 pt-10 ">
										<p className="text-base   text-textPrimary font-normal font-lato">
											Price:
										</p>
										
									</div>
									<p className="text-[20px] py-5 text-[#40403E] font-semibold font-lato leading-[24px]">
										About the Company/Producer
									</p>
									<p className="text-[16px] text-[#40403E] font-normal font-lato leading-[24px]">
										XYZ started the production of XY some years ago and has
										multiple variations of the product.
									</p>
								</div>
								<div className="col-span-1">
									<img src="/product.png" alt="product-image" />
									<div className="flex items-center justify-between pt-5">
										<div className="space-y-2 flex items-center justify-center flex-col">
											<ScanIcon2 />
											<p className="text-xs text-center font-lato leading-[9.6px]">
												Scan Again
											</p>
										</div>

										<div className="space-y-2 flex items-center justify-center flex-col">
											<SaveIcon />
											<p className="text-xs text-center font-lato leading-[9.6px]">
												Save
											</p>
										</div>
									</div>
								</div>

								<div className="col-span-2">
									<p className="text-[20px] py-5 text-textPrimary font-semibold font-lato leading-[24px]">
										Product Data
									</p>

									<div className="grid grid-cols-3 items-center pt-10 gap-2 justify-between">
										<div className="space-y-2  col-span-2">
											<p className="text-[#40403E] text-[16px] font-normal font-lato leading-[19.2px]">
												Manu. Date (DD.MM.YY):
											</p>
											<p className="text-[#40403E] text-[40px] font-bold font-lato leading-[52.2px]">
												15. 05. 2024
											</p>
										</div>

										<div className="space-y-2 col-span-1">
											<p className="text-[#40403E] text-[16px] font-normal font-lato leading-[19.2px]">
												No. Of Scans
											</p>
											<p className="text-[#40403E] text-[40px] font-bold font-lato leading-[52.2px]">
												42
											</p>
										</div>
									</div>

									<div className="grid grid-cols-3 items-center justify-between pt-10">
										<div className="space-y-2 col-span-2">
											<p className="text-[#40403E] text-[16px] font-normal font-lato leading-[19.2px]">
												Exp Date (DD.MM.YY):
											</p>
											<p className="text-[#EE5D55] text-[40px] font-bold font-lato leading-[52.2px]">
												15. 07. 2024
											</p>
										</div>

										<div className="space-y-2 col-span-1">
											<p className="text-[#40403E] text-[16px] font-normal font-lato leading-[19.2px]">
												Rating
											</p>
											<div className="flex  items-center gap-2">
												<p className="text-[#40403E] text-[40px] font-bold font-lato leading-[52.2px]">
													4.0
												</p>
												<StarIcon width={36} height={53} />
											</div>
										</div>
									</div>

									<div className="flex gap-5 pt-10">
										<p>Ingredients:</p>

										<div className="grid grid-cols-2 gap-5">
											<div className="flex items-center justify-center bg-[#17212D1F] rounded-md px-5 py-2">
												<p className="text-[#506480] font-lato">Ginger</p>
											</div>

											<div className="flex items-center justify-center bg-[#17212D1F] rounded-md px-5 py-2">
												<p className="text-[#506480] font-lato">Ginger</p>
											</div>
										</div>
									</div>

									<div className="flex items-center justify-between pt-10">
										<button className="shadow-lg bg-white px-10 py-2 flex items-center gap-2 rounded-full">
											<LikeIcon /> <p>97%</p>
										</button>

										<button className="shadow-lg bg-white px-10 py-2 flex items-center gap-2 rounded-full">
											<LikeIcon /> <p>97%</p>
										</button>
									</div>
								</div>
							</div>

							<div className="flex flex-col lg:hidden  py-5 items-center gap-10">
								<p className="text-[38px] text-textPrimary font-semibold font-lato leading-[57.9px]">
									Ginger Drink
								</p>

								<div className="">
									<img src="/product.png" alt="product-image" />
									<div className="flex items-center justify-between pt-5">
										<div className="space-y-2 flex items-center justify-center flex-col">
											<ScanIcon2 />
											<p className="text-xs text-center font-lato leading-[9.6px]">
												Scan Again
											</p>
										</div>

										<div className="space-y-2 flex items-center justify-center flex-col">
											<SaveIcon />
											<p className="text-xs text-center font-lato leading-[9.6px]">
												Save
											</p>
										</div>
									</div>
								</div>

								<div className="">
									<p className="text-[20px] py-5 text-textPrimary font-semibold font-lato leading-[24px]">
										Product Data
									</p>

									<div className="bg-white shadow-lg rounded-xl px-2 py-2">
										<div className="grid grid-cols-3  items-center pt-10 gap-2 justify-between">
											<div className="space-y-2 col-span-2  ">
												<p className="text-[#40403E] text-[16px] font-normal font-lato leading-[19.2px]">
													Manu. Date (DD.MM.YY):
												</p>
												<p className="text-[#40403E] text-[24px] lg:text-[40px] font-bold font-lato leading-[31.2px] lg:leading-[52.2px]">
													15. 05. 2024
												</p>
											</div>

											<div className="space-y-2">
												<p className="text-[#40403E] text-[16px] font-normal font-lato leading-[19.2px]">
													No. Of Scans
												</p>
												<p className="text-[#40403E] text-[24px] lg:text-[40px] font-bold font-lato leading-[31.2px] lg:leading-[52.2px]">
													42
												</p>
											</div>
										</div>

										<div className="grid grid-cols-3 items-center  justify-between pt-10">
											<div className="space-y-2 col-span-2">
												<p className="text-[#40403E] text-[16px] font-normal font-lato leading-[19.2px]">
													Exp Date (DD.MM.YY):
												</p>
												<p className="text-[#EE5D55]  text-[24px] lg:text-[40px] font-bold font-lato leading-[31.2px] lg:leading-[52.2px]">
													15. 07. 2024
												</p>
											</div>

											<div className="space-y-2 col-span-1">
												<p className="text-[#40403E] text-[16px] font-normal font-lato leading-[19.2px]">
													Rating
												</p>
												<div className="flex items-center gap-2">
													<p className="text-[#40403E] text-[24px] lg:text-[40px] font-bold font-lato leading-[31.2px] lg:leading-[52.2px]">
														4.0
													</p>
													<StarIcon2 />
												</div>
											</div>
										</div>
									</div>

									<div className="flex gap-5 pt-10">
										<p>Ingredients:</p>

										<div className="grid grid-cols-2 gap-5">
											<div className="flex items-center justify-center bg-[#17212D1F] rounded-md px-5 py-2">
												<p className="text-[#506480] font-lato">Ginger</p>
											</div>

											<div className="flex items-center justify-center bg-[#17212D1F] rounded-md px-5 py-2">
												<p className="text-[#506480] font-lato">Ginger</p>
											</div>
										</div>
									</div>

									<div className="flex items-center justify-between pt-10">
										<button className="shadow-lg bg-white px-10 py-2 flex items-center gap-2 rounded-full">
											<LikeIcon /> <p>97%</p>
										</button>

										<button className="shadow-lg bg-white px-10 py-2 flex items-center gap-2 rounded-full">
											<LikeIcon /> <p>97%</p>
										</button>
									</div>
								</div>

								<div className="">
									<div className="flex  items-center gap-2 pt-10 ">
										<p className="text-base   text-textPrimary font-normal font-lato">
											Price:
										</p>
										<p>
											NGN{" "}
											<span className="font-extrabold text-textPrimary text-[20px]  ">
												690.
											</span>
											00
										</p>
									</div>
									<p className="text-[20px] py-5 text-[#40403E] font-semibold font-lato leading-[24px]">
										About the Company/Producer
									</p>
									<p className="text-[16px] text-[#40403E] font-normal font-lato leading-[24px]">
										XYZ started the production of XY some years ago and has
										multiple variations of the product.
									</p>
								</div>
							</div>
						</div>
					) : (
						<div className="">
							<p className="text-2xl">No Product Found...</p>
						</div>
					)}
				</Modal>
			</div>
		</>
	);
}

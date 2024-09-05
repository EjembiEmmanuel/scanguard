"use client";
import {
	DiscordIcon,
	ScanIcon,
	TelegramIcon,
	TwitterIcon,
} from "../../assets/icons";
import Link from "next/link";

export default function Home() {

	return (
		<main className="">
			<header className="bg-producer  bg-no-repeat bg-contain lg:bg-cover">
				<nav className=" md:flex px-5 md:px-20 py-5  items-center justify-between backdrop-brightness-50 ">
					<Link
						href="/"
						className="text-white font-lato  font-extrabold text-2xl"
					>
						ScanGaurd
					</Link>
					<div className="hidden md:flex gap-6">
						<Link
							href="/"
							className="text-white font-lato  text-sm  font-normal"
						>
							Home
						</Link>
						<a href="#" className="text-white font-lato  text-sm font-normal ">
							About
						</a>
						<a href="#" className="text-white font-lato  text-sm font-normal">
							Producers
						</a>
					</div>

					<div className="hidden md:flex gap-5">
						<ScanIcon />

						<Link
							href="/producers"
							className="bg-white px-10 py-2 font-lato  rounded-full text-black text-sm border border-white"
						>
							Connect
						</Link>
					</div>
				</nav>

				<div className="grid  py-10 md:py-40 px-5 md:px-20 ">
					<div className="flex flex-col md:w-[445px] justify-center">
						<p className=" text-[20px] text-textSecondary lg:text-[54px] font-bold font-lato  md:leading-[64px] capitalize">
							Your products can be here too!
						</p>
						<p className="text-base  text-textSecondary  leading-[24px] pt-8 font-lato ">
							follow the simple steps to upload your products for proofing that
							you sell the best and realest product.
						</p>
					</div>
				</div>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 items-center px-5  md:px-[112px] py-10 md:py-5 bg-textSecondary">
				<div>
					<p className="text-[32px]  text-textPrimary font-lato">
						Your products can be here too
					</p>
					<p className="text-textPrimary font-[18px] leading-[24px] py-10 font-lato ">
						If you are a producer and you have a product you will like to
						register with ScanGuard, this is for you. With ScanGuard, you are in
						control of the information of the production, distribution, and
						sales of your products. You products will be recognized as
						explicitly yours and any counterfeit will be flagged as dangerous
						and unfit to be used.
					</p>

					<div className="space-y-2">
						<p className="font-lato text-[16px] text-textPrimary">
							Step 1: Connect your wallet address
						</p>
						<p className="font-lato text-[16px] text-textPrimary">
							Step 2: Input all required information of your product
						</p>
						<p className="font-lato text-[16px] text-textPrimary">
							Step 3: Submit for recording
						</p>
						<p className="font-lato text-[16px] text-textPrimary">
							Step 4: Save the product token
						</p>
					</div>

					<div className="flex gap-2 items-center pt-5">
						<Link  href="#" className="text-textSecondary bg-primary px-5 py-3 rounded-full">
							Get Started
						</Link>
					</div>
				</div>

				<div className="w-full h-full">
					<img
						className="w-full h-full object-cover"
						src="/bottle.png"
						alt="bottles"
					/>
				</div>
			</div>

			<footer className="bg-[#090606] py-10 px-10 ">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="flex gap-6">
						<Link href="#" className="text-white font-lato  text-sm  font-normal">
							Home
						</Link>
						<a href="#" className="text-white font-lato  text-sm font-normal ">
							About
						</a>
						<Link href="#" className="text-white font-lato  text-sm font-normal">
							Producers
						</Link>
					</div>

					<div className="flex gap-5">
						<Link href="#" className="text-white font-lato  text-sm  font-normal">
							Privacy
						</Link>
						<a href="#" className="text-white font-lato  text-sm  font-normal">
							Terms & Conditions
						</a>
					</div>



					<div className="flex items-center justify-between gap-5">
						<DiscordIcon />
						<TelegramIcon />
						<TwitterIcon />
					</div>
				</div>
			</footer>
		</main>
	);
}

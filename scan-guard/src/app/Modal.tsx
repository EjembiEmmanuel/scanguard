import { useState } from "react";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import {
  BackwardIcon
} from "@heroicons/react/24/outline";
import { BackIcon2 } from "@/assets/icons";

type ModalProps = {
	open: boolean;
	close: () => void;
	title: string;
	children: React.ReactNode;
};

export default function Modal({ open, title, children, close }: ModalProps) {
	return (
		<Transition show={open}>
			<Dialog className="relative z-10" onClose={close}>
				<TransitionChild
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" >
          </div>
				</TransitionChild>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<TransitionChild
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel className="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-6">
								<div onClick={close} className="w-[38px] cusor-pointer h-[32px]  rounded-full flex items-center justify-between  px-2 ml-1 bg-primary mt-4 ">	
										<BackIcon2  />
								</div>
								<div className="sm:flex sm:items-start">
									
									<div className="mt-3  sm:ml-4 sm:mt-0 sm:text-left">
										<DialogTitle
											as="h3"
											className="text-base font-semibold leading-6 text-gray-900"
										>
											{title}
										</DialogTitle>
										<div className="mt-2">{children}</div>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

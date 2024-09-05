use core::option::OptionTrait;
use core::traits::{TryInto, Into};
use core::starknet::SyscallResultTrait;
use openzeppelin::access::ownable::interface::{IOwnableDispatcher, IOwnableDispatcherTrait};
use starknet::{ContractAddress, class_hash::ClassHash, contract_address_const};
use snforge_std::{
    declare, ContractClassTrait, start_cheat_caller_address, stop_cheat_caller_address
};
use scanguard::interfaces::IProduct::{IProductsDispatcher, IProductsDispatcherTrait};
use scanguard::base::types::{ProductParams};


const ZERO_ADDR: felt252 = 0x0;
const OWNER_ADDR: felt252 = 0x1;
const USER_ONE_ADDR: felt252 = 0x2;

fn __setup__(owner: felt252) -> ContractAddress {
    // deploy Prodct contract
    let product_contract = declare("Product").unwrap();
    let mut product_constructor_calldata = array![owner];
    let (product_contract_address, _) = product_contract
        .deploy(@product_constructor_calldata)
        .unwrap_syscall();

    product_contract_address
}

#[test]
#[should_panic(expected: ('Caller cannot be zero addr',))]
fn test_deploy_contract_with_zero_addr() {
    let _product_contract_address = __setup__(ZERO_ADDR);
}

#[test]
fn test_get_owner() {
    let product_contract_address = __setup__(OWNER_ADDR);
    let ownable_dispatcher = IOwnableDispatcher { contract_address: product_contract_address };

    start_cheat_caller_address(product_contract_address, USER_ONE_ADDR.try_into().unwrap());

    let owner = ownable_dispatcher.owner();
    assert(owner == OWNER_ADDR.try_into().unwrap(), 'incorrect owner');

    stop_cheat_caller_address(product_contract_address);
}

#[test]
#[should_panic(expected: ('Caller is not the owner',))]
fn test_register_product_with_incorrect_owner() {
    let product_contract_address = __setup__(OWNER_ADDR);
    let product_dispatcher = IProductsDispatcher { contract_address: product_contract_address };

    start_cheat_caller_address(product_contract_address, USER_ONE_ADDR.try_into().unwrap());

    let product_id: felt252 = 1;
    let ipfs_hash: ByteArray = "QmVqyWcuoBpHvt5tT5Gw9eJz2qYJyGKw4NY4yEdFcopK69";

    product_dispatcher.register_product(product_id, ipfs_hash.clone());

    stop_cheat_caller_address(product_contract_address);
}

#[test]
fn test_register_product_() {
    let product_contract_address = __setup__(OWNER_ADDR);
    let product_dispatcher = IProductsDispatcher { contract_address: product_contract_address };

    start_cheat_caller_address(product_contract_address, OWNER_ADDR.try_into().unwrap());

    let product_id: felt252 = 1;
    let ipfs_hash: ByteArray = "QmVqyWcuoBpHvt5tT5Gw9eJz2qYJyGKw4NY4yEdFcopK69";

    product_dispatcher.register_product(product_id, ipfs_hash.clone());

    let verified_product = product_dispatcher.verify(product_id);
    assert(ipfs_hash == verified_product.ipfs_hash, 'no products found');

    stop_cheat_caller_address(product_contract_address);
}

#[test]
fn test_register_multiple_products() {
    let product_contract_address = __setup__(OWNER_ADDR);
    let product_dispatcher = IProductsDispatcher { contract_address: product_contract_address };

    start_cheat_caller_address(product_contract_address, OWNER_ADDR.try_into().unwrap());

    let product_one_id: felt252 = 1;
    let ipfs_hash_one: ByteArray = "QmVqyWcuoBpHvt5tT5Gw9eJz2qYJyGKw4NY4yEdFcopK69";

    let product_two_id: felt252 = 2;
    let ipfs_hash_two: ByteArray = "QmVqyWcuoBpHvt5tT5Gw9eJz2qYJyGKw4NY4yEdFcncep5";

    product_dispatcher.register_product(product_one_id, ipfs_hash_one.clone());

    let verified_product_one = product_dispatcher.verify(product_one_id);
    assert(ipfs_hash_one == verified_product_one.ipfs_hash, 'no product found');

    product_dispatcher.register_product(product_two_id, ipfs_hash_two.clone());

    let verified_product_two = product_dispatcher.verify(product_two_id);
    assert(ipfs_hash_two == verified_product_two.ipfs_hash, 'no product found');

    stop_cheat_caller_address(product_contract_address);
}


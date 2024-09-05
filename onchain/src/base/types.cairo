use core::serde::Serde;
use core::option::OptionTrait;

#[derive(Drop, Serde, starknet::Store, Clone)]
pub struct ProductParams {
    pub product_id: felt252,
    pub ipfs_hash: ByteArray,
}

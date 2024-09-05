
export const abi = [
  {
    "type": "impl",
    "name": "ProductImpl",
    "interface_name": "scanguard::interfaces::IProduct::IProducts"
  },
  {
    "type": "struct",
    "name": "core::byte_array::ByteArray",
    "members": [
      {
        "name": "data",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "pending_word",
        "type": "core::felt252"
      },
      {
        "name": "pending_word_len",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "type": "struct",
    "name": "scanguard::base::types::ProductParams",
    "members": [
      {
        "name": "product_id",
        "type": "core::felt252"
      },
      {
        "name": "ipfs_hash",
        "type": "core::byte_array::ByteArray"
      }
    ]
  },
  {
    "type": "interface",
    "name": "scanguard::interfaces::IProduct::IProducts",
    "items": [
      {
        "type": "function",
        "name": "verify",
        "inputs": [
          {
            "name": "product_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "scanguard::base::types::ProductParams"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "store_product",
        "inputs": [
          {
            "name": "product_id",
            "type": "core::felt252"
          },
          {
            "name": "ipfs_hash",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "ownable_contract_address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "event",
    "name": "scanguard::product::product::Product::Verify",
    "kind": "struct",
    "members": [
      {
        "name": "product_id",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "ipfs_hash",
        "type": "core::byte_array::ByteArray",
        "kind": "data"
      },
      {
        "name": "no_of_times_verified",
        "type": "core::integer::u64",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "scanguard::product::product::Product::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Verify",
        "type": "scanguard::product::product::Product::Verify",
        "kind": "nested"
      }
    ]
  }
]
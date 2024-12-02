export const FULLNODE_URL = "https://fullnode.devnet.sui.io";

export const CLIENT_ID =
  "382062898939-ppg79abson0i84hff1nnmjv4en4rmrkg.apps.googleusercontent.com";

export const REDIRECT_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://cryptomilan-frontend.vercel.app";

export const SUI_DEVNET_FAUCET = "https://faucet.devnet.sui.io/gas";

export const SUI_PROVER_DEV_ENDPOINT = "https://prover-dev.mystenlabs.com/v1";

export const KEY_PAIR_SESSION_STORAGE_KEY = "demo_ephemeral_key_pair";
export const KEY_PAIR_SESSION_STORAGE = "demo_ephemeral_key";
export const NONCE_SESSION_STORAGE_KEY = "demo_nonce_key";

export const USER_SALT_LOCAL_STORAGE_KEY = "demo_user_salt_key_pair";

export const RANDOMNESS_SESSION_STORAGE_KEY = "demo_randomness_key_pair";

export const MAX_EPOCH_LOCAL_STORAGE_KEY = "demo_max_epoch_key_pair";

export const ATTESTATION_CONTRACT =
  "0x3e4069eff4eec8d2a15ec372293dbeb90632d1f5b71bee87db3f7b06df2193c3";
export const REWARDS_CONTRACT =
  "0x7ae500436282efcc230f679b813f5f2f6c82f42bbf813cbc7ea63a97f2b67e85";
export const COIN_CONTRACT =
  "0xdcdc410672bf32087afcfe8ceaf2309ee7eaac5d0ce98a5a22dbdc9d189a66a9";

export const STEPS_LABELS_TRANS_KEY = [
  "16e758e8",
  "9b8b5398",
  "8adf5b45",
  "8b72e7cd",
  "66f6b490",
  "af802c7a",
  "c649dd70",
];

export const STEPS_DESC = [
  "ephemeralKeyPair",
  "47b83f4e",
  "fb399be8",
  "0a710e64",
  "32255d31",
  "8f2433d9",
];

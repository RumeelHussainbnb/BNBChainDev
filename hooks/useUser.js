import useSWR from "swr";
import fetcher from "../utils/fetcher";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers } from "ethers";


export default function useUser(publicKey, connected) {

  const publicKey_ = publicKey?.toLowerCase();
  let { data, error } = useSWR(
    connected && `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${publicKey_}`,
    fetcher
  );

  return {
    user: data,
    isAdmin: data && data.Role === "admin",
    connected,
    error,
  };
}


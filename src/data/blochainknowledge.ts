import { LibraryResponse, SettingsQueryOptions } from "@/types"
import { useQuery } from "@tanstack/react-query"
import client from "./client"

export const useFetchListBlockchainKnowledge = (language: SettingsQueryOptions) => {
    const { data, isLoading, refetch } = useQuery<LibraryResponse, Error>(
        ['blockchain-knowledge'],
        () => client.library.blockchainknowledge(
            { catname: "Blockchain Knowledge" }, language
        ),
    )
    return {
        blockchainknowledge: data?.result.data,
        isLoading,
        refetch
    }
}
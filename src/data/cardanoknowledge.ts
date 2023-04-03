import { LibraryResponse, SettingsQueryOptions } from "@/types"
import { useQuery } from "@tanstack/react-query"
import client from "./client"

export const useFetchListCardanoKnowledge = (language: SettingsQueryOptions) => {
    const { data, isLoading, refetch } = useQuery<LibraryResponse, Error>(
        ['cardano-knowledge'],
        () => client.library.cardanoknowledge(
            { catname: "Cardano Knowledge" }, language
        ),
    )
    return {
        cardanoknowledge: data?.result.data,
        isLoading,
        refetch
    }
}
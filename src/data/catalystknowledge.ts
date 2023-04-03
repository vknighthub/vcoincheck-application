import { LibraryResponse, SettingsQueryOptions } from "@/types"
import { useQuery } from "@tanstack/react-query"
import client from "./client"

export const useFetchListCatalystKnowledge = (language: SettingsQueryOptions) => {
    const { data, isLoading, refetch } = useQuery<LibraryResponse, Error>(
        ['catalyst-knowledge'],
        () => client.library.catalystknowledge(
            { catname: "Catalyst Knowledge" }, language
        ),
    )
    return {
        catalystknowledge: data?.result.data,
        isLoading,
        refetch
    }
}
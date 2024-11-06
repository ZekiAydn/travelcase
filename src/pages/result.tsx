import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import Layout from "@/components/Layout";
import FilterSidebar from "@/components/FilterSidebar";
import HotelList from "@/components/HotelList";
import fetchData from "@/utils/fetchData";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale || 'en', ['common'])),
        },
    };
};


interface FilterParams {
    from: string;
    destination: string;
    date: string;
    nights: string;
    people: string;
    rating:string;
}

export default function ResultPage() {
    const router = useRouter();
    const [filters, setFilters] = useState<FilterParams>({
        from: "",
        destination: "",
        date: "",
        nights: "1 Night",
        people: "2 People",
        rating:"",
    });

    useEffect(() => {
        const { from, destination, date, nights, people } = router.query;
        console.log(date)
        setFilters({
            from: (from as string) || "",
            destination: (destination as string) || "",
            date: (date as string) || "",
            nights: (nights as string) || "1 Night",
            people: (people as string) || "2 People",
            rating:"",
        });
    }, [router.query]);

    const { data: filteredData, isLoading, error } = useQuery({
        queryKey: ['filteredResults', filters] as [string, FilterParams],
        queryFn: ({ queryKey }) => fetchData({ queryKey }),
    });

    const handleFilterChange = (key: keyof FilterParams, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" />
                </div>
            </Layout>
        );
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 my-10 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
                <FilterSidebar
                    filters={filters}
                    setFilters={handleFilterChange}
                    nightOptions={Array.from({ length: 30 }, (_, i) => `${i + 1} Night`)}
                    peopleOptions={Array.from({ length: 30 }, (_, i) => `${i + 1} Person`)}
                />
                <HotelList hotels={filteredData || []} />
            </div>
        </Layout>
    );
}

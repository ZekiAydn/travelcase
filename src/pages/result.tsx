import { useRouter } from "next/router";
import { Spin } from "antd";
import Layout from "@/components/Layout";
import FilterSidebar from "@/components/FilterSidebar";
import HotelList from "@/components/HotelList";
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect } from "react";
import { mockData } from "@/data/data";
import moment from "moment";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale || 'en', ['common'])),
        },
    };
};

export default function ResultPage() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [filtersOpen, setFiltersOpen] = useState(true);
    const [filters, setFilters] = useState({
        from: Array.isArray(router.query.from) ? router.query.from[0] : router.query.from || "",
        destination: Array.isArray(router.query.destination) ? router.query.destination[0] : router.query.destination || "",
        date: Array.isArray(router.query.date) ? router.query.date[0] : router.query.date || moment().format("DD MMM YYYY"),
        nights: Array.isArray(router.query.nights) ? router.query.nights[0] : router.query.nights || "5 Nights",
        people: Array.isArray(router.query.people) ? router.query.people[0] : router.query.people || "2 People",
    });


    const [filteredData, setFilteredData] = useState(mockData);

    const nightOptions = Array.from({ length: 30 }, (_, i) => `${i + 1} ${t('night', { count: i + 1 })}`);
    const peopleOptions = Array.from({ length: 30 }, (_, i) => `${i + 1} ${t('person', { count: i + 1 })}`);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const newFilteredData = mockData.filter((hotel) => {
            const hotelNights = `${hotel.nights} ${t('night', { count: hotel.nights })}`;
            const totalPeople = Array.isArray(filters.people)
                ? parseInt(filters.people[0], 10)
                : parseInt(filters.people.split(" ")[0], 10);

            return hotelNights === filters.nights && hotel.adults + hotel.children === totalPeople;
        });
        setFilteredData(newFilteredData);
    }, [filters]);

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" tip={t('loading')} />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 my-10 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
                <FilterSidebar
                    filters={filters}
                    setFilters={handleFilterChange}
                    nightOptions={nightOptions}
                    peopleOptions={peopleOptions}
                    filtersOpen={filtersOpen}
                    setFiltersOpen={setFiltersOpen}
                />
                <HotelList hotels={filteredData} />
            </div>
        </Layout>
    );
}

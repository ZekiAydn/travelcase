import { mockData } from "@/data/data";

interface FilterParams {
    from?: string;
    destination?: string;
    date?: string;
    nights?: string;
    people?: string;
}

interface Hotel {
    title: string;
    location: string;
    price: string;
    originalPrice: string;
    rating: number;
    adults: number;
    children: number;
    date: string;
    nights: number;
    amenities: string;
    imageUrl: string;
}

const fetchData = async ({ queryKey }: { queryKey: [string, FilterParams] }): Promise<Hotel[]> => {
    const [_key, filters] = queryKey;

    return mockData.filter((hotel) => {
        const hotelNights = `${hotel.nights} Night`;
        const totalPeople = parseInt(filters.people?.split(" ")[0] || "1", 10);

        return (
            (!filters.from || hotel.location.toLowerCase().includes(filters.from.toLowerCase())) &&
            (!filters.destination || hotel.location.toLowerCase().includes(filters.destination.toLowerCase())) &&
            (!filters.date || hotel.date === filters.date) &&
            (!filters.nights || hotelNights === filters.nights) &&
            (!filters.people || hotel.adults + hotel.children === totalPeople)
        );
    });
};

export default fetchData;

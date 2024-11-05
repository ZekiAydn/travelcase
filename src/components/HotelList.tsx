import { Button, Divider } from "antd";
import { CalendarOutlined, MoonOutlined, UserOutlined, StarFilled, BoxPlotOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useTranslation } from 'next-i18next';
import React from "react";

interface Hotel {
    title: string;
    imageUrl: string;
    location: string;
    rating: number;
    adults: number;
    children: number;
    date: string;
    nights: number;
    amenities: string;
    originalPrice: string;
    price: string;
}

interface HotelListProps {
    hotels: Hotel[];
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
    const { t } = useTranslation('common');

    return (
        <div className="w-full lg:w-3/4">
            {hotels.length > 0 ? (
                hotels.map((hotel, index) => (
                    <div key={index} className="bg-white p-4 lg:p-6 flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 mb-6 rounded-lg ">
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                            <Image
                                src={hotel.imageUrl}
                                alt="Hotel Image"
                                width={363}
                                height={268}
                                className="rounded-lg w-full lg:max-h-72 object-cover"
                            />
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 border border-gray-300 rounded-lg p-4 lg:p-6 space-y-4">
                            <h2 className="text-lg font-semibold">{hotel.title}</h2>
                            <div className="flex items-center text-gray-600 text-sm mb-1">
                                <div className="flex items-center space-x-1 text-orange-500">
                                    {[...Array(Math.round(hotel.rating))].map((_, index) => (
                                        <StarFilled key={index} />
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-500">{hotel.location}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-4 sm:space-y-0">
                                {/* Hotel Details */}
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <UserOutlined />
                                        <span className="ml-2 text-sm font-light text-gray-500">
                                            {`${hotel.adults} ${t('adults')} - ${hotel.children} ${t('children')}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <CalendarOutlined />
                                        <span className="ml-2 text-sm font-light text-gray-500">
                                            {hotel.date}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <MoonOutlined />
                                        <span className="ml-2 text-sm font-light text-gray-500">
                                            {`${hotel.nights} ${t('nights')}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <BoxPlotOutlined />
                                        <span className="ml-2 text-sm font-light text-gray-500">
                                            {hotel.amenities}
                                        </span>
                                    </div>
                                </div>
                                {/* Divider on larger screens */}
                                <Divider type="vertical" className="hidden sm:block h-32 bg-gray-300" />
                                {/* Pricing and Button */}
                                <div className="flex flex-col items-end sm:items-start lg:items-end mt-4 sm:mt-0 w-full sm:w-1/2">
                                    <div className="text-gray-400 text-sm line-through text-end">{hotel.originalPrice}</div>
                                    <div className="flex flex-row w-full justify-end">
                                        <div className="text-xs text-gray-500 mr-1">{t('fromPP')}</div>
                                        <div className="text-xl font-bold text-gray-500">{hotel.price}</div>
                                    </div>
                                    <Button
                                        type="primary"
                                        className="bg-orange-500 hover:bg-orange-600 font-semibold mt-2 rounded-md w-full sm:w-auto"
                                    >
                                        {t('continue')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>{t('noResults')}</p>
            )}
        </div>
    );
};

export default HotelList;

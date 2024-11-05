import Layout from "../components/Layout";
import Image from "next/image";
import CustomRadio from "@/components/CustomRadio";
import SearchFilter from "@/components/SearchFilter";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetStaticProps} from "next";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale || 'en', ['common'])),
        },
    };
};

export default function HomePage() {
    return (
        <Layout>
            <div className="relative h-[500px]">
                <Image
                    src="/bg.svg"
                    alt="Background Image"
                    fill
                    objectFit="cover"
                    quality={100}
                    className="absolute inset-0"
                />
                <CustomRadio />
                <SearchFilter />
            </div>
        </Layout>
    );
}


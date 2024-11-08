export function generateMetadata({ params }) {

    const title = params?.slug
        ? `${params.slug}`
        : "Bible Verses | Daily Prayer | Divine Word";

    const description = params?.description
        ? `${params.description}`
        : "Bible Verses | Daily Prayer | Divine Word";

    return {
        title,
        description,
        keywords: "Bible verses, Scripture, God's Word, Bible study, Christian, spiritual, devotion, prayer, IPray Daily, Koinonia Global Messages, Apostle Joshua Selman"
    };
}

export default function KoinoniaMessageLayout({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}

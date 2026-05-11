import { getPayload } from "payload";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import Hero from "@/app/components/Hero";
import DiySlider from "@/app/components/Diyslider";
import Navbar from "@/app/components/Navbar";
import { getNavigation } from "@/lib/getNavigation";
import Footer from "@/app/components/Footer";
import ProductServices from "@/app/components/Productservices";
import ImageSlider from "@/app/components/ImageSlider";
import Contractor from "@/app/components/Contractor";
import DiySupportBlog from "@/app/components/DiySupportBlog";
import JpgMedia from "@/app/components/Jpgmedia";
import VideoSlider from "@/app/components/VideoSlider";
import Diyhero from "@/app/components/Diyhero";
import Quote from "@/app/components/Quote";
import Contacthero from "@/app/components/Contacthero";
import Inquireform from "@/app/components/Inquireform";
import About from "@/app/components/About";
import Features from "@/app/components/Features";
import Aboutlocation from "@/app/components/Aboutlocation";
import QuickLinks from "@/app/components/QuickLinks";
import Faqs from "@/app/components/Faqs";
import Reviews from "@/app/components/Reviews";
import StoreLocation from "@/app/components/StoreLocation";
import LocationInfo from "@/app/components/LocationInfo";
import { getLocationBySlug } from "@/lib/getLocations";
import { getPaintBySlug } from "@/lib/getPaint";
import { getGlassBySlug } from "@/lib/getGlass";
import { getDoorsBySlug } from "@/lib/getDoors";
import FeatureList from "@/app/components/FeatureList";
import FeaturedBrand from "@/app/components/FeaturedBrand";
import FaqTipsSlider from "@/app/components/FaqTipsSlider";
import ExteriorServices from "@/app/components/Exteriorservices";
import Brands from "@/app/components/Brands";
import SubHero from "@/app/components/SubHero";
import FeatureCards from "@/app/components/FeatureCards";
import Cta from "@/app/components/Cta";
import RecommendBlog from "@/app/components/RecommendBlogs";
import BlogSearch from "@/app/components/Blogsearch";
import BlogDetail from "@/app/components/Blogdetail";



export const dynamic = "force-dynamic";

const blockMap: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  diySlider: DiySlider,
  productServices: ProductServices,
  imageSlider: ImageSlider,
  contractor: Contractor,
  diySupportBlog: DiySupportBlog,
  jpgMedia: JpgMedia,
  videoSlider: VideoSlider,
  diyHero: Diyhero,
  quote: Quote,
  contactHero: Contacthero,
  inquireForm: Inquireform,
  about: About,
  features: Features,
  aboutLocation: Aboutlocation,
  quickLinks: QuickLinks,
  faqs: Faqs,
  faqTipsSlider: FaqTipsSlider,
  reviews: Reviews,
  storeLocation: StoreLocation,
  locationInfo: LocationInfo,
  featureList:FeatureList,
  featuredBrand:FeaturedBrand,
  featureCards:FeatureCards,
  exteriorServices:ExteriorServices,
  brands:Brands,
  subHero:SubHero,
  cta: Cta,
  recommendBlog:RecommendBlog,
  blogSearch: BlogSearch,
  blogDetail: BlogDetail,

};

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const navData = await getNavigation();
  const { slug: rawSlug } = await params;

  // ✅ Normalize slug — decode URI encoding, strip slashes, lowercase
  const slug = decodeURIComponent(rawSlug)
    .replace(/^\/+/, '')
    .toLowerCase()
    .trim()

  console.log('DynamicPage → slug:', slug)

  const payload = await getPayload({ config });

  // ── 1. Check Pages collection first
  const { docs } = await (payload as any).find({
    collection: "pages",
    where: { slug: { equals: slug } },
    depth: 3,
    limit: 1,
  });

  const page = docs[0];

  if (!page) {
    // ── 2. Check Locations
    const location = await getLocationBySlug(slug);
    if (location) {
      return (
        <>
          <Navbar navData={navData} />
          {(location.blocks ?? []).map((block: any, i: number) => {
            const Component = blockMap[block.blockType];
            if (!Component) return null;
            return <Component key={i} {...block} />;
          })}
          <Footer />
        </>
      );
    }

    // ── 3. Check Paint
    const paintItem = await getPaintBySlug(slug);
    if (paintItem) {
      return (
        <>
          <Navbar navData={navData} />
          {(paintItem.blocks ?? []).map((block: any, i: number) => {
            const Component = blockMap[block.blockType];
            if (!Component) return null;
            return <Component key={i} {...block} />;
          })}
          <Footer />
        </>
      );
    }

    // ── 4. Check Glass
    const glassItem = await getGlassBySlug(slug);
    if (glassItem) {
      return (
        <>
          <Navbar navData={navData} />
          {(glassItem.blocks ?? []).map((block: any, i: number) => {
            const Component = blockMap[block.blockType];
            if (!Component) return null;
            return <Component key={i} {...block} />;
          })}
          <Footer />
        </>
      );
    }

    // ── 5. Check Doors
    const doorsItem = await getDoorsBySlug(slug);
    if (doorsItem) {
      return (
        <>
          <Navbar navData={navData} />
          {(doorsItem.blocks ?? []).map((block: any, i: number) => {
            const Component = blockMap[block.blockType];
            if (!Component) return null;
            return <Component key={i} {...block} />;
          })}
          <Footer />
        </>
      );
    }

    // ── 6. Nothing found → 404
    return notFound();
  }

  // ── Render normal Page with its blocks
  return (
    <>
      <Navbar navData={navData} />
      {(page.blocks ?? []).map((block: any, i: number) => {
        const Component = blockMap[block.blockType];
        if (!Component) return null;
        return <Component key={i} {...block} />;
      })}
      <Footer />
    </>
  );
}
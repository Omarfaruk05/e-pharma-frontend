import MainContainer from "@/components/layout/MainContainer";
import Banner from "@/components/ui/Banner";
import HomeProducts from "@/components/ui/HomeProducts";
import Services from "@/components/ui/Services";

export default function Home() {
  return (
    <main>
      <MainContainer>
        <Banner />
        <Services />
        <div className="space-y-20">
          <HomeProducts category="OTc MEdicine" path="#" />
          <HomeProducts category="Diabetic Care" path="#" />
          <HomeProducts category="Baby Care" path="#" />
          <HomeProducts category="Dental Care" path="#" />
        </div>
      </MainContainer>
    </main>
  );
}

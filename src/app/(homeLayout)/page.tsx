import MainContainer from "@/components/layout/MainContainer";
import Banner from "@/components/ui/Banner";
import HomepageProductGroup from "@/components/ui/HomepageProductGroup";
import Services from "@/components/ui/Services";

export default function Home() {
  return (
    <main>
      <MainContainer>
        <Banner />
        <Services />
        <HomepageProductGroup />
      </MainContainer>
    </main>
  );
}

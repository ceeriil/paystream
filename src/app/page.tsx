"use client";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import { MainFooter, MainHeader } from "@/components";
import {
  SectionHero,
  SectionPaymentChallenges,
  SectionRoadmap,
  SectionStreamlineWorkflow,
  SectionGetStarted,
  SectionFAQ,
} from "@/components/LandingPage";

export default function Home() {
  return (
    <MainLayout>
      <MainHeader />
      <SectionHero />
      <SectionPaymentChallenges />
      <SectionStreamlineWorkflow />
      <SectionRoadmap />
      <SectionGetStarted />
      <SectionFAQ />
      <MainFooter />
    </MainLayout>
  );
}
